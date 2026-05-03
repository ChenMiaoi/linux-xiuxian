interface SidebarItem {
  text: string
  link?: string
  collapsed?: boolean
  items?: SidebarItem[]
}

interface SidebarGroup {
  text: string
  collapsed?: boolean
  items: SidebarItem[]
}

type SidebarConfig = Record<string, SidebarGroup[]>

const novelVolumes: Record<string, { label: string; chapters: { text: string; link: string }[] }> = {
  'vol0-prologue': {
    label: '前传：根基篇',
    chapters: [
      { text: '卷首语', link: '/novel/vol0-prologue/' },
      { text: '缘起·道生一', link: '/novel/vol0-prologue/ch000' },
      { text: '第一章：指针之道', link: '/novel/vol0-prologue/ch001' },
      { text: '第二章：结构之术', link: '/novel/vol0-prologue/ch002' },
      { text: '第三章：编译器秘法', link: '/novel/vol0-prologue/ch003' },
      { text: '第四章：寄存器与指令', link: '/novel/vol0-prologue/ch004' },
      { text: '第五章：内联汇编', link: '/novel/vol0-prologue/ch005' },
      { text: '第六章：位运算与原子操作', link: '/novel/vol0-prologue/ch006' },
      { text: '第七章：屏障与无常', link: '/novel/vol0-prologue/ch007' },
      { text: '第八章：预处理器之道', link: '/novel/vol0-prologue/ch008' },
      { text: '第九章：内存布局', link: '/novel/vol0-prologue/ch009' },
      { text: '第十章：ELF 之道', link: '/novel/vol0-prologue/ch010' },
      { text: '终章·筑基归一', link: '/novel/vol0-prologue/ch011' },
    ],
  },
  'vol1-chaos': {
    label: '第一卷：混沌初开',
    chapters: [
      { text: '卷首语', link: '/novel/vol1-chaos/' },
      { text: '第一章：天地未分', link: '/novel/vol1-chaos/ch01' },
      { text: '第二章：天雷劈下', link: '/novel/vol1-chaos/ch02' },
      { text: '第三章：命运之门', link: '/novel/vol1-chaos/ch03' },
      { text: '第四章：脱胎换骨', link: '/novel/vol1-chaos/ch04' },
      { text: '第五章：开天辟地', link: '/novel/vol1-chaos/ch05' },
      { text: '第六章：天选之子', link: '/novel/vol1-chaos/ch06' },
      { text: '第七章：天道初显', link: '/novel/vol1-chaos/ch07' },
      { text: '第八章：第一次祈祷', link: '/novel/vol1-chaos/ch08' },
      { text: '第九章：不期而至', link: '/novel/vol1-chaos/ch09' },
      { text: '第十章：世界末日', link: '/novel/vol1-chaos/ch10' },
      { text: '第十一章：劫后余生', link: '/novel/vol1-chaos/ch11' },
      { text: '第十二章：天道法则', link: '/novel/vol1-chaos/ch12' },
      { text: '第十三章：不甘 idle', link: '/novel/vol1-chaos/ch13' },
      { text: '第十四章：踏上征途', link: '/novel/vol1-chaos/ch14' },
      { text: '第十五章：新的开始', link: '/novel/vol1-chaos/ch15' },
    ],
  },
  'vol2-foundation': {
    label: '第二卷：万物之基',
    chapters: [
      { text: '卷首语', link: '/novel/vol2-foundation/' },
      { text: '第十六章：分身之术', link: '/novel/vol2-foundation/ch16' },
      { text: '第十七章：task_struct 之躯', link: '/novel/vol2-foundation/ch17' },
      { text: '第十八章：fork 大道', link: '/novel/vol2-foundation/ch18' },
      { text: '第十九章：写时复制', link: '/novel/vol2-foundation/ch19' },
      { text: '第二十章：蜕变之术', link: '/novel/vol2-foundation/ch20' },
      { text: '第二十一章：归途', link: '/novel/vol2-foundation/ch21' },
      { text: '第二十二章：僵尸之殇', link: '/novel/vol2-foundation/ch22' },
      { text: '第二十三章：等待之道', link: '/novel/vol2-foundation/ch23' },
      { text: '第二十四章：飞剑传书', link: '/novel/vol2-foundation/ch24' },
      { text: '第二十五章：信号处理', link: '/novel/vol2-foundation/ch25' },
      { text: '第二十六章：不可阻挡', link: '/novel/vol2-foundation/ch26' },
      { text: '第二十七章：shell 小妹', link: '/novel/vol2-foundation/ch27' },
      { text: '第二十八章：进程家族', link: '/novel/vol2-foundation/ch28' },
      { text: '第二十九章：分身有术', link: '/novel/vol2-foundation/ch29' },
      { text: '第三十章：kthreadd 婶婶', link: '/novel/vol2-foundation/ch30' },
      { text: '第三十一章：小千世界', link: '/novel/vol2-foundation/ch31' },
      { text: '第三十二章：因果之链', link: '/novel/vol2-foundation/ch32' },
      { text: '第三十三章：管道', link: '/novel/vol2-foundation/ch33' },
      { text: '第三十四章：共享之秘', link: '/novel/vol2-foundation/ch34' },
      { text: '第三十五章：万物归一', link: '/novel/vol2-foundation/ch35' },
    ],
  },
  'vol3-scheduler': {
    label: '第三卷：天道均衡',
    chapters: [
      { text: '卷首语', link: '/novel/vol3-scheduler/' },
      { text: '第三十六章：竞技场', link: '/novel/vol3-scheduler/ch36' },
      { text: '第三十七章：调度仙子', link: '/novel/vol3-scheduler/ch37' },
      { text: '第三十八章：红黑树', link: '/novel/vol3-scheduler/ch38' },
      { text: '第三十九章：时间片', link: '/novel/vol3-scheduler/ch39' },
      { text: '第四十章：优先级', link: '/novel/vol3-scheduler/ch40' },
      { text: '第四十一章：运行队列', link: '/novel/vol3-scheduler/ch41' },
      { text: '第四十二章：负载均衡', link: '/novel/vol3-scheduler/ch42' },
      { text: '第四十三章：域与组', link: '/novel/vol3-scheduler/ch43' },
      { text: '第四十四章：亲和性', link: '/novel/vol3-scheduler/ch44' },
      { text: '第四十五章：RT 调度', link: '/novel/vol3-scheduler/ch45' },
      { text: '第四十六章：Deadline', link: '/novel/vol3-scheduler/ch46' },
      { text: '第四十七章：上下文切换', link: '/novel/vol3-scheduler/ch47' },
      { text: '第四十八章：调度类', link: '/novel/vol3-scheduler/ch48' },
      { text: '第四十九章：睡眠与唤醒', link: '/novel/vol3-scheduler/ch49' },
      { text: '第五十章：idle 之道', link: '/novel/vol3-scheduler/ch50' },
      { text: '第五十一章：抢占', link: '/novel/vol3-scheduler/ch51' },
      { text: '第五十二章：调度延迟', link: '/novel/vol3-scheduler/ch52' },
      { text: '第五十三章：调度器演进', link: '/novel/vol3-scheduler/ch53' },
      { text: '第五十四章：多核之惑', link: '/novel/vol3-scheduler/ch54' },
      { text: '第五十五章：结丹圆满', link: '/novel/vol3-scheduler/ch55' },
    ],
  },
  'vol4-memory': {
    label: '第四卷：内景天地',
    chapters: [
      { text: '卷首语', link: '/novel/vol4-memory/' },
      { text: '第五十六章：内景初开', link: '/novel/vol4-memory/ch56' },
      { text: '第五十七章：页表经脉', link: '/novel/vol4-memory/ch57' },
      { text: '第五十八章：虚实之映', link: '/novel/vol4-memory/ch58' },
      { text: '第五十九章：内存宫殿', link: '/novel/vol4-memory/ch59' },
      { text: '第六十章：mmap 之术', link: '/novel/vol4-memory/ch60' },
      { text: '第六十一章：页 fault', link: '/novel/vol4-memory/ch61' },
      { text: '第六十二章：写时复制', link: '/novel/vol4-memory/ch62' },
      { text: '第六十三章：匿名之页', link: '/novel/vol4-memory/ch63' },
      { text: '第六十四章：文件之页', link: '/novel/vol4-memory/ch64' },
      { text: '第六十五章：页面回收', link: '/novel/vol4-memory/ch65' },
      { text: '第六十六章：kswapd', link: '/novel/vol4-memory/ch66' },
      { text: '第六十七章：交换之术', link: '/novel/vol4-memory/ch67' },
      { text: '第六十八章：页分配器', link: '/novel/vol4-memory/ch68' },
      { text: '第六十九章：Slab', link: '/novel/vol4-memory/ch69' },
      { text: '第七十章：vmalloc', link: '/novel/vol4-memory/ch70' },
      { text: '第七十一章：内存映射', link: '/novel/vol4-memory/ch71' },
      { text: '第七十二章：大页', link: '/novel/vol4-memory/ch72' },
      { text: '第七十三章：NUMA 内存', link: '/novel/vol4-memory/ch73' },
      { text: '第七十四章：OOM 杀手', link: '/novel/vol4-memory/ch74' },
      { text: '第七十五章：内存泄漏', link: '/novel/vol4-memory/ch75' },
      { text: '第七十六章：内存压缩', link: '/novel/vol4-memory/ch76' },
      { text: '第七十七章：透明大页', link: '/novel/vol4-memory/ch77' },
      { text: '第七十八章：内存调试', link: '/novel/vol4-memory/ch78' },
      { text: '第七十九章：内存之道', link: '/novel/vol4-memory/ch79' },
      { text: '第八十章：元婴圆满', link: '/novel/vol4-memory/ch80' },
    ],
  },
  'vol5-filesystem': {
    label: '第五卷：永恒之森',
    chapters: [
      { text: '卷首语', link: '/novel/vol5-filesystem/' },
      { text: '第八十一章：古树之森', link: '/novel/vol5-filesystem/ch81' },
      { text: '第八十二章：守护灵', link: '/novel/vol5-filesystem/ch82' },
      { text: '第八十三章：古树之躯', link: '/novel/vol5-filesystem/ch83' },
      { text: '第八十四章：路标', link: '/novel/vol5-filesystem/ch84' },
      { text: '第八十五章：文件之形', link: '/novel/vol5-filesystem/ch85' },
      { text: '第八十六章：挂载之道', link: '/novel/vol5-filesystem/ch86' },
      { text: '第八十七章：ext4 之基', link: '/novel/vol5-filesystem/ch87' },
      { text: '第八十八章：日志之道', link: '/novel/vol5-filesystem/ch88' },
      { text: '第八十九章：btrfs 之术', link: '/novel/vol5-filesystem/ch89' },
      { text: '第九十章：子卷与快照', link: '/novel/vol5-filesystem/ch90' },
      { text: '第九十一章：procfs', link: '/novel/vol5-filesystem/ch91' },
      { text: '第九十二章：sysfs', link: '/novel/vol5-filesystem/ch92' },
      { text: '第九十三章：tmpfs', link: '/novel/vol5-filesystem/ch93' },
      { text: '第九十四章：页缓存', link: '/novel/vol5-filesystem/ch94' },
      { text: '第九十五章：写回之道', link: '/novel/vol5-filesystem/ch95' },
      { text: '第九十六章：读写路径', link: '/novel/vol5-filesystem/ch96' },
      { text: '第九十七章：文件锁', link: '/novel/vol5-filesystem/ch97' },
      { text: '第九十八章：fsck', link: '/novel/vol5-filesystem/ch98' },
      { text: '第九十九章：文件系统之道', link: '/novel/vol5-filesystem/ch99' },
      { text: '第一百章：斩灵圆满', link: '/novel/vol5-filesystem/ch100' },
    ],
  },
  'vol6-network': {
    label: '第六卷：沧海横流',
    chapters: [
      { text: '卷首语', link: '/novel/vol6-network/' },
      { text: '第一百零六章：望海', link: '/novel/vol6-network/ch106' },
      { text: '第一百零七章：造船之术', link: '/novel/vol6-network/ch107' },
      { text: '第一百零八章：商船', link: '/novel/vol6-network/ch108' },
      { text: '第一百零九章：信鸽', link: '/novel/vol6-network/ch109' },
      { text: '第一百一十章：海图', link: '/novel/vol6-network/ch110' },
      { text: '第一百一十一章：sk_buff', link: '/novel/vol6-network/ch111' },
      { text: '第一百一十二章：港口', link: '/novel/vol6-network/ch112' },
      { text: '第一百一十三章：收帆', link: '/novel/vol6-network/ch113' },
      { text: '第一百一十四章：扬帆', link: '/novel/vol6-network/ch114' },
      { text: '第一百一十五章：握手之道', link: '/novel/vol6-network/ch115' },
      { text: '第一百一十六章：状态机', link: '/novel/vol6-network/ch116' },
      { text: '第一百一十七章：拥塞', link: '/novel/vol6-network/ch117' },
      { text: '第一百一十八章：重传', link: '/novel/vol6-network/ch118' },
      { text: '第一百一十九章：UDP 之道', link: '/novel/vol6-network/ch119' },
      { text: '第一百二十章：内河', link: '/novel/vol6-network/ch120' },
      { text: '第一百二十一章：信号旗', link: '/novel/vol6-network/ch121' },
      { text: '第一百二十二章：选帆', link: '/novel/vol6-network/ch122' },
      { text: '第一百二十三章：隔离之海', link: '/novel/vol6-network/ch123' },
      { text: '第一百二十四章：虚拟之船', link: '/novel/vol6-network/ch124' },
      { text: '第一百二十五章：eBPF', link: '/novel/vol6-network/ch125' },
      { text: '第一百二十六章：海防', link: '/novel/vol6-network/ch126' },
      { text: '第一百二十七章：航速', link: '/novel/vol6-network/ch127' },
      { text: '第一百二十八章：暗流', link: '/novel/vol6-network/ch128' },
      { text: '第一百二十九章：网络之道', link: '/novel/vol6-network/ch129' },
      { text: '第一百三十章：问道圆满', link: '/novel/vol6-network/ch130' },
    ],
  },
  'vol7-drivers': {
    label: '第七卷：天地之桥',
    chapters: [
      { text: '卷首语', link: '/novel/vol7-drivers/' },
      { text: '第一百三十一章：设备山脉', link: '/novel/vol7-drivers/ch131' },
      { text: '第一百三十二章：字符设备', link: '/novel/vol7-drivers/ch132' },
      { text: '第一百三十三章：块设备', link: '/novel/vol7-drivers/ch133' },
      { text: '第一百三十四章：PCI 枚举', link: '/novel/vol7-drivers/ch134' },
      { text: '第一百三十五章：中断之道', link: '/novel/vol7-drivers/ch135' },
      { text: '第一百三十六章：中断下半部', link: '/novel/vol7-drivers/ch136' },
      { text: '第一百三十七章：DMA', link: '/novel/vol7-drivers/ch137' },
      { text: '第一百三十八章：设备模型', link: '/novel/vol7-drivers/ch138' },
      { text: '第一百三十九章：总线', link: '/novel/vol7-drivers/ch139' },
      { text: '第一百四十章：平台设备', link: '/novel/vol7-drivers/ch140' },
      { text: '第一百四十一章：设备树', link: '/novel/vol7-drivers/ch141' },
      { text: '第一百四十二章：I2C', link: '/novel/vol7-drivers/ch142' },
      { text: '第一百四十三章：SPI', link: '/novel/vol7-drivers/ch143' },
      { text: '第一百四十四章：USB', link: '/novel/vol7-drivers/ch144' },
      { text: '第一百四十五章：网络设备', link: '/novel/vol7-drivers/ch145' },
      { text: '第一百四十六章：块设备层', link: '/novel/vol7-drivers/ch146' },
      { text: '第一百四十七章：SCSI', link: '/novel/vol7-drivers/ch147' },
      { text: '第一百四十八章：帧缓冲', link: '/novel/vol7-drivers/ch148' },
      { text: '第一百四十九章：输入设备', link: '/novel/vol7-drivers/ch149' },
      { text: '第一百五十章：时钟', link: '/novel/vol7-drivers/ch150' },
      { text: '第一百五十一章：电源管理', link: '/novel/vol7-drivers/ch151' },
      { text: '第一百五十二章：热插拔', link: '/novel/vol7-drivers/ch152' },
      { text: '第一百五十三章：设备调试', link: '/novel/vol7-drivers/ch153' },
      { text: '第一百五十四章：驱动之道', link: '/novel/vol7-drivers/ch154' },
      { text: '第一百五十五章：合道圆满', link: '/novel/vol7-drivers/ch155' },
    ],
  },
  'vol8-security': {
    label: '第八卷：天劫降临',
    chapters: [
      { text: '卷首语', link: '/novel/vol8-security/' },
      { text: '第一百五十六章：暗影', link: '/novel/vol8-security/ch156' },
      { text: '第一百五十七章：系统调用劫持', link: '/novel/vol8-security/ch157' },
      { text: '第一百五十八章：安全基石', link: '/novel/vol8-security/ch158' },
      { text: '第一百五十九章：权能之道', link: '/novel/vol8-security/ch159' },
      { text: '第一百六十章：沙箱之术', link: '/novel/vol8-security/ch160' },
      { text: '第一百六十一章：隔离之法', link: '/novel/vol8-security/ch161' },
      { text: '第一百六十二章：SELinux·铁面', link: '/novel/vol8-security/ch162' },
      { text: '第一百六十三章：安全上下文', link: '/novel/vol8-security/ch163' },
      { text: '第一百六十四章：策略之网', link: '/novel/vol8-security/ch164' },
      { text: '第一百六十五章：LSM 框架', link: '/novel/vol8-security/ch165' },
      { text: '第一百六十六章：AppArmor', link: '/novel/vol8-security/ch166' },
      { text: '第一百六十七章：内核地址空间布局', link: '/novel/vol8-security/ch167' },
      { text: '第一百六十八章：栈保护', link: '/novel/vol8-security/ch168' },
      { text: '第一百六十九章：影子诅咒', link: '/novel/vol8-security/ch169' },
      { text: '第一百七十章：熔毁之灾', link: '/novel/vol8-security/ch170' },
      { text: '第一百七十一章：内核加密', link: '/novel/vol8-security/ch171' },
      { text: '第一百七十二章：密钥管理', link: '/novel/vol8-security/ch172' },
      { text: '第一百七十三章：审计之道', link: '/novel/vol8-security/ch173' },
      { text: '第一百七十四章：完整性度量', link: '/novel/vol8-security/ch174' },
      { text: '第一百七十五章：天劫圆满', link: '/novel/vol8-security/ch175' },
    ],
  },
  'vol9-architecture': {
    label: '第九卷：大道无形',
    chapters: [
      { text: '卷首语', link: '/novel/vol9-architecture/' },
      { text: '第一百七十六章：无常', link: '/novel/vol9-architecture/ch176' },
      { text: '第一百七十七章：读取侧临界区', link: '/novel/vol9-architecture/ch177' },
      { text: '第一百七十八章：宽限期', link: '/novel/vol9-architecture/ch178' },
      { text: '第一百七十九章：回调与屏障', link: '/novel/vol9-architecture/ch179' },
      { text: '第一百八十章：内存屏障', link: '/novel/vol9-architecture/ch180' },
      { text: '第一百八十一章：原子操作', link: '/novel/vol9-architecture/ch181' },
      { text: '第一百八十二章：无锁链表', link: '/novel/vol9-architecture/ch182' },
      { text: '第一百八十三章：无锁队列', link: '/novel/vol9-architecture/ch183' },
      { text: '第一百八十四章：自旋锁的进化', link: '/novel/vol9-architecture/ch184' },
      { text: '第一百八十五章：互斥锁', link: '/novel/vol9-architecture/ch185' },
      { text: '第一百八十六章：读写锁', link: '/novel/vol9-architecture/ch186' },
      { text: '第一百八十七章：顺序锁', link: '/novel/vol9-architecture/ch187' },
      { text: '第一百八十八章：设计模式', link: '/novel/vol9-architecture/ch188' },
      { text: '第一百八十九章：可扩展性', link: '/novel/vol9-architecture/ch189' },
      { text: '第一百九十章：性能优化', link: '/novel/vol9-architecture/ch190' },
      { text: '第一百九十一章：跟踪之力', link: '/novel/vol9-architecture/ch191' },
      { text: '第一百九十二章：BPF 之道', link: '/novel/vol9-architecture/ch192' },
      { text: '第一百九十三章：内核调试', link: '/novel/vol9-architecture/ch193' },
      { text: '第一百九十四章：死锁检测', link: '/novel/vol9-architecture/ch194' },
      { text: '第一百九十五章：容器内核', link: '/novel/vol9-architecture/ch195' },
      { text: '第一百九十六章：虚拟化之道', link: '/novel/vol9-architecture/ch196' },
      { text: '第一百九十七章：KVM', link: '/novel/vol9-architecture/ch197' },
      { text: '第一百九十八章：实时补丁', link: '/novel/vol9-architecture/ch198' },
      { text: '第一百九十九章：内核构建', link: '/novel/vol9-architecture/ch199' },
      { text: '第二百章：大道无形', link: '/novel/vol9-architecture/ch200' },
    ],
  },
  'vol10-ascension': {
    label: '第十卷：飞升大道',
    chapters: [
      { text: '卷首语', link: '/novel/vol10-ascension/' },
      { text: '第二百零一章：补丁之道', link: '/novel/vol10-ascension/ch201' },
      { text: '第二百零二章：编码规范', link: '/novel/vol10-ascension/ch202' },
      { text: '第二百零三章：邮件列表', link: '/novel/vol10-ascension/ch203' },
      { text: '第二百零四章：代码审查', link: '/novel/vol10-ascension/ch204' },
      { text: '第二百零五章：测试之道', link: '/novel/vol10-ascension/ch205' },
      { text: '第二百零六章：文档之道', link: '/novel/vol10-ascension/ch206' },
      { text: '第二百零七章：发布周期', link: '/novel/vol10-ascension/ch207' },
      { text: '第二百零八章：维护者之道', link: '/novel/vol10-ascension/ch208' },
      { text: '第二百零九章：社区之道', link: '/novel/vol10-ascension/ch209' },
      { text: '第二百一十章：飞升大道', link: '/novel/vol10-ascension/ch210' },
    ],
  },
}

function buildNovelSidebar(prefix: string = ''): SidebarGroup[] {
  const groups: SidebarGroup[] = []
  const volumeKeys = Object.keys(novelVolumes)

  for (let i = 0; i < volumeKeys.length; i++) {
    const vol = novelVolumes[volumeKeys[i]]
    groups.push({
      text: vol.label,
      collapsed: i > 0,
      items: vol.chapters.map((ch) => ({
        text: ch.text,
        link: `${prefix}${ch.link}`,
      })),
    })
  }

  return groups
}

export function getZhSidebar(): SidebarConfig {
  return {
    '/guide/': [
      {
        text: '修仙指南',
        items: [
          { text: '简介', link: '/guide/introduction' },
          { text: '修炼体系', link: '/guide/cultivation-system' },
          { text: '人物志', link: '/guide/character-guide' },
          { text: '世界观设定', link: '/guide/world-building' },
        ],
      },
    ],
    '/reference/': [
      {
        text: '道藏（技术参考）',
        items: [
          { text: '内核地图', link: '/reference/kernel-map' },
          { text: '术语对照', link: '/reference/glossary' },
          { text: '源码注解', link: '/reference/source-annotations' },
        ],
      },
    ],
    '/novel/': buildNovelSidebar(),
  }
}

export function getEnSidebar(): SidebarConfig {
  return {
    '/en/guide/': [
      {
        text: 'Cultivation Guide',
        items: [
          { text: 'Introduction', link: '/en/guide/introduction' },
        ],
      },
    ],
    '/en/reference/': [
      {
        text: 'Technical Reference',
        items: [
          { text: 'Kernel Map', link: '/en/reference/kernel-map' },
        ],
      },
    ],
    '/en/novel/': [
      {
        text: 'Novel',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/en/novel/' },
        ],
      },
    ],
  }
}
