const ranks = [
  { name: '炼气', minPoints: 0, className: 'realm-qi' },
  { name: '筑基', minPoints: 100, className: 'realm-foundation' },
  { name: '金丹', minPoints: 500, className: 'realm-core' },
  { name: '元婴', minPoints: 1500, className: 'realm-nascent' },
  { name: '化神', minPoints: 4000, className: 'realm-spirit' },
  { name: '炼虚', minPoints: 10000, className: 'realm-dao' },
  { name: '合体', minPoints: 25000, className: 'realm-merge' },
  { name: '大乘', minPoints: 60000, className: 'realm-mahayana' },
  { name: '渡劫', minPoints: 150000, className: 'realm-tribulation' },
  { name: '飞升', minPoints: 400000, className: 'realm-immortal' },
]

export function rankForPoints(points = 0) {
  let current = ranks[0]
  for (const rank of ranks) {
    if (points >= rank.minPoints) current = rank
  }
  return current
}
