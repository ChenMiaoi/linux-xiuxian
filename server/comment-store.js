import { db } from './db.js'

export function softDeleteCommentTree(commentId) {
  return db.prepare(`
    WITH RECURSIVE comment_tree(id) AS (
      SELECT id FROM comments WHERE id = ?
      UNION ALL
      SELECT comments.id
      FROM comments
      JOIN comment_tree ON comments.parent_id = comment_tree.id
    )
    UPDATE comments
    SET status = 'deleted', updated_at = CURRENT_TIMESTAMP
    WHERE id IN (SELECT id FROM comment_tree)
      AND status = 'active'
  `).run(commentId)
}
