const pointMilestones = [
  [10, '初入山门', '踏入内核仙途，已领入门玉简。'],
  [30, '炼气小修', '吐纳有成，能辨进程与线程之气。'],
  [60, '引气入核', '初窥内核门径，能循调用而入。'],
  [100, '筑基道童', '根基渐稳，已可承接大道术式。'],
  [200, '页表行者', '行走虚实之间，识得地址映射。'],
  [350, '锁阵参悟者', '略通并发锁阵，知争用之险。'],
  [500, '金丹初成', '一粒金丹吞入腹，调度大道始分明。'],
  [800, '内存观星客', '仰观页框星河，俯察 slab 微尘。'],
  [1200, '中断听雷人', '听雷辨 IRQ，遇惊不乱。'],
  [1500, '元婴出窍', '元婴初成，可神游子系统之间。'],
  [2500, '驱动驭器师', '能与设备通灵，驱外设如臂使指。'],
  [4000, '化神真人', '神识化入内核，可察路径隐微。'],
  [7000, '调度观命者', '观众生 runnable，知时间片荣枯。'],
  [10000, '炼虚道君', '炼虚入道，能见抽象背后真形。'],
  [16000, '文件森罗客', '游历 inode 林海，识得缓存根脉。'],
  [25000, '合体尊者', '诸法合体，能统摄多端复杂性。'],
  [40000, '网络踏浪人', '踏包而行，穿协议沧海。'],
  [60000, '大乘真君', '大乘已至，胸中自有一部内核。'],
  [100000, '补丁渡海者', '携补丁渡海，能抵维护者彼岸。'],
  [150000, '渡劫天尊', '雷劫临身，仍能稳住 ABI。'],
  [250000, '大道维护者', '知取舍、守边界、护众生用户态。'],
  [400000, '飞升内核仙', '功行圆满，飞升主线。'],
]

const commentMilestones = [
  [1, '一言问道', '留下第一道神念。'],
  [5, '竹简留声', '多次留言，已有同道闻声而至。'],
  [10, '论道常客', '常在章末论道。'],
  [25, '经楼辩士', '能以评论点亮经楼。'],
  [50, '百问半师', '半百发言，问答之间自成章法。'],
  [100, '道场讲经人', '讲经百段，能引新人入门。'],
  [200, '舌灿莲华客', '言辞成阵，论道不绝。'],
  [500, '万言归一者', '留言如河，终归一理。'],
]

const chapterMilestones = [
  [1, '破关初醒', '破开第一道章节封印。'],
  [3, '三关试炼者', '连破三关，心性初定。'],
  [5, '五卷窥门人', '五章入心，已非门外看客。'],
  [10, '十章行脚僧', '十章行脚，脚下已有道痕。'],
  [20, '经卷巡游者', '巡游多章，能串起前后脉络。'],
  [40, '卷海泛舟客', '泛舟卷海，所见渐广。'],
  [80, '百章问鼎人', '近百章问鼎，耐心可嘉。'],
  [120, '内核藏经守夜人', '长夜守经，灯火不灭。'],
]

const githubIssueMilestones = [
  [1, 'Issue 传讯符使', '曾以 Issue 传讯维护者。'],
  [5, '勘误巡山人', '巡山勘误，补缺拾遗。'],
  [20, '洞察瑕疵者', '能在细枝末节中发现裂纹。'],
  [50, '天机报信人', '频传要讯，助道场清明。'],
]

const githubPrMilestones = [
  [1, '补丁入门客', '已有补丁并入道场。'],
  [3, '三符合道者', '三次合道，渐识协作礼法。'],
  [10, '补丁炼器师', '十枚补丁淬炼成器。'],
  [30, '主线铸剑人', '铸剑入主线，锋芒有度。'],
  [100, '维护道侣', '长期共修，已近维护者之列。'],
]

function addMilestoneTitles(titles, count, source, milestones, tone = 'normal') {
  for (const [threshold, name, description] of milestones) {
    if (count >= threshold) {
      titles.push({ name, description, source, tone, threshold })
    }
  }
}

export function buildUserTitles(user, stats = {}) {
  const titles = []

  addMilestoneTitles(titles, user.cultivation_points || 0, '修为', pointMilestones, 'realm')
  addMilestoneTitles(titles, stats.commentCount || 0, '论道', commentMilestones)
  addMilestoneTitles(titles, stats.chapterUnlockCount || 0, '破关', chapterMilestones, 'chapter')
  addMilestoneTitles(titles, stats.githubIssueCount || 0, 'GitHub', githubIssueMilestones, 'github')
  addMilestoneTitles(titles, stats.githubPrCount || 0, 'GitHub', githubPrMilestones, 'github')

  if (user.github_id) {
    titles.push({ name: '外域结契者', description: '已与 GitHub 外域账号结契。', source: 'GitHub', tone: 'github', threshold: 1 })
  }
  if (user.role === 'admin') {
    titles.push({ name: '护山执事', description: '执掌道场秩序，巡查异常。', source: '治理', tone: 'admin', threshold: 1 })
  }
  if (user.status === 'muted') {
    titles.push({ name: '闭口思过者', description: '暂入静室，禁言思过。', source: '治理', tone: 'warning', threshold: 1 })
  }
  if (user.status === 'banned') {
    titles.push({ name: '逐出山门者', description: '已被封禁，法籍暂闭。', source: '治理', tone: 'danger', threshold: 1 })
  }
  if ((stats.deletedCommentCount || 0) >= 3) {
    titles.push({ name: '心魔缠身', description: '多条留言被清理，需谨慎发言。', source: '治理', tone: 'warning', threshold: stats.deletedCommentCount })
  }
  if ((stats.adminPrivilegeAttemptCount || 0) >= 1) {
    titles.push({ name: '窥禁阁者', description: '曾尝试触碰管理员禁阁。', source: '治理', tone: 'danger', threshold: stats.adminPrivilegeAttemptCount })
  }

  const deduped = [...new Map(titles.map((title) => [title.name, title])).values()]
  const primary = deduped.at(-1) || { name: '无名散修', description: '尚未留下足够道痕。', source: '初始', tone: 'normal', threshold: 0 }
  return {
    primary,
    unlocked: deduped,
    count: deduped.length,
  }
}
