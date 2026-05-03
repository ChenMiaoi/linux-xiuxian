import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'
import { POINT_RULES, RANK_LEVELS, rankForPoints } from './rank.js'

const databasePath = process.env.DATABASE_PATH || path.resolve('data/app.db')
fs.mkdirSync(path.dirname(databasePath), { recursive: true })

export const db = new Database(databasePath)
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  cultivation_points INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_path TEXT NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comment_likes (
  comment_id INTEGER NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (comment_id, user_id)
);

CREATE TABLE IF NOT EXISTS point_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  source TEXT NOT NULL,
  points INTEGER NOT NULL,
  ref_type TEXT,
  ref_id TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(source, ref_type, ref_id)
);

CREATE TABLE IF NOT EXISTS rank_levels (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  min_points INTEGER NOT NULL UNIQUE,
  sort_order INTEGER NOT NULL UNIQUE
);

CREATE INDEX IF NOT EXISTS idx_sessions_token_hash ON sessions(token_hash);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_comments_page_path ON comments(page_path, created_at);
CREATE INDEX IF NOT EXISTS idx_comment_likes_user_id ON comment_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_point_events_user_source_created ON point_events(user_id, source, created_at);
CREATE INDEX IF NOT EXISTS idx_users_points ON users(cultivation_points DESC, created_at ASC);
`)

const userColumns = db.prepare('PRAGMA table_info(users)').all().map((column) => column.name)
const userColumnSet = new Set(userColumns)
if (!userColumnSet.has('github_id')) {
  db.exec('ALTER TABLE users ADD COLUMN github_id TEXT')
}
if (!userColumnSet.has('github_login')) {
  db.exec('ALTER TABLE users ADD COLUMN github_login TEXT')
}
if (!userColumnSet.has('github_avatar_url')) {
  db.exec('ALTER TABLE users ADD COLUMN github_avatar_url TEXT')
}
if (!userColumnSet.has('github_connected_at')) {
  db.exec('ALTER TABLE users ADD COLUMN github_connected_at TEXT')
}
db.exec('CREATE UNIQUE INDEX IF NOT EXISTS idx_users_github_id ON users(github_id) WHERE github_id IS NOT NULL')
const duplicateUsernames = db.prepare(`
  SELECT lower(username) AS normalized, COUNT(*) AS count
  FROM users
  GROUP BY lower(username)
  HAVING count > 1
  LIMIT 1
`).get()
if (!duplicateUsernames) {
  db.exec('CREATE UNIQUE INDEX IF NOT EXISTS idx_users_username_lower ON users(lower(username))')
}

const insertRank = db.prepare(`
INSERT INTO rank_levels (id, name, min_points, sort_order)
VALUES (@id, @name, @minPoints, @id)
ON CONFLICT(id) DO UPDATE SET
  name = excluded.name,
  min_points = excluded.min_points,
  sort_order = excluded.sort_order
`)
for (const level of RANK_LEVELS) insertRank.run(level)

export function publicUser(row) {
  if (!row) return null
  return {
    id: row.id,
    username: row.username,
    displayName: row.display_name,
    role: row.role,
    cultivationPoints: row.cultivation_points,
    rank: rankForPoints(row.cultivation_points),
    github: row.github_id ? {
      id: row.github_id,
      login: row.github_login,
      avatarUrl: row.github_avatar_url,
      connectedAt: row.github_connected_at,
    } : null,
    createdAt: row.created_at,
  }
}

export function addPoints(userId, points) {
  db.prepare(`
    UPDATE users
    SET cultivation_points = cultivation_points + ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(points, userId)
}

export function awardPoints(userId, { source, points, refType = null, refId = null }) {
  const result = db.transaction(() => {
    const inserted = db.prepare(`
      INSERT OR IGNORE INTO point_events (user_id, source, points, ref_type, ref_id)
      VALUES (?, ?, ?, ?, ?)
    `).run(userId, source, points, refType, refId == null ? null : String(refId))

    if (inserted.changes === 0) {
      return { awarded: false, points: 0, reason: 'duplicate' }
    }

    addPoints(userId, points)
    return { awarded: true, points }
  })()

  return result
}

export function awardCommentPoints(userId, commentId) {
  const todayCount = db.prepare(`
    SELECT COUNT(*) AS count
    FROM point_events
    WHERE user_id = ?
      AND source = 'comment'
      AND date(created_at, 'localtime') = date('now', 'localtime')
  `).get(userId).count

  if (todayCount >= POINT_RULES.comment.dailyCap) {
    return { awarded: false, points: 0, reason: 'daily_cap' }
  }

  return awardPoints(userId, {
    source: 'comment',
    points: POINT_RULES.comment.points,
    refType: 'comment',
    refId: commentId,
  })
}
