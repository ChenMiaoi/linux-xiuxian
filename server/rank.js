export const RANK_LEVELS = [
  { id: 1, name: '炼气', minPoints: 0 },
  { id: 2, name: '筑基', minPoints: 100 },
  { id: 3, name: '金丹', minPoints: 500 },
  { id: 4, name: '元婴', minPoints: 1500 },
  { id: 5, name: '化神', minPoints: 4000 },
  { id: 6, name: '炼虚', minPoints: 10000 },
  { id: 7, name: '合体', minPoints: 25000 },
  { id: 8, name: '大乘', minPoints: 60000 },
  { id: 9, name: '渡劫', minPoints: 150000 },
  { id: 10, name: '飞升', minPoints: 400000 },
]

export const POINT_RULES = {
  register: { points: 10 },
  comment: { points: 2, dailyCap: 5 },
  githubIssueAccepted: { points: 10 },
  githubPrMerged: { points: 80 },
}

export function rankForPoints(points = 0) {
  let current = RANK_LEVELS[0]
  for (const level of RANK_LEVELS) {
    if (points >= level.minPoints) current = level
  }

  const next = RANK_LEVELS.find((level) => level.minPoints > points) ?? null
  return {
    ...current,
    points,
    next,
    progress: next
      ? Math.round(((points - current.minPoints) / (next.minPoints - current.minPoints)) * 100)
      : 100,
  }
}
