---
title: 修炼体系
---

# 修炼体系

Linux 内核修仙传的修炼体系共有 **九大境界**，外加一个隐藏的 **飞升** 境界。每个境界对应一个内核子系统，有三个小阶段（初期、中期、后期）。

## 九大境界总览

| # | 境界 | 内核子系统 | 修炼核心 |
|---|---|---|---|
| 1 | <CultivationRealm realm="炼气期" /> | Boot & 初始化 | 感知硬件、经历启动序列 |
| 2 | <CultivationRealm realm="筑基期" /> | 进程管理 | fork 分身、exec 变形 |
| 3 | <CultivationRealm realm="结丹期" /> | 调度器 | CFS 公平调度、时间片 |
| 4 | <CultivationRealm realm="元婴期" /> | 内存管理 | 页表经脉、OOM 天劫 |
| 5 | <CultivationRealm realm="斩灵期" /> | 文件系统 | VFS 抽象、inode 古树 |
| 6 | <CultivationRealm realm="问道期" /> | 网络 | Socket 造舟、TCP/IP 航海 |
| 7 | <CultivationRealm realm="合道期" /> | 设备驱动 | PCI 探宝、DMA 直传 |
| 8 | <CultivationRealm realm="渡劫期" /> | 安全 | SELinux 铁壁、rootkit 暗影 |
| 9 | <CultivationRealm realm="大乘期" /> | 内核架构 | RCU 无常、无锁武学 |

## 飞升

<CultivationRealm realm="飞升" />

成为内核 Maintainer，向主线提交补丁，在内核峰会论道。这不是终点，而是新的起点——内核永远在进化，大道永无止境。

## 境界详情

### 一、炼气期 — Boot & 初始化

**修炼内容：**
- 理解 BIOS/UEFI POST 硬件自检
- 掌握 Bootloader (GRUB) 引导过程
- 领悟 `start_kernel()` 开天辟地之道
- 存活于 `rest_init()` 之后

**关键源码：**
- `arch/x86/boot/` — 启动引导代码
- `init/main.c` — `start_kernel()` 定义
- `kernel/init_task.c` — idle 进程定义

**修炼难点：** 从混沌中觉醒，理解世界的基本法则。大多数进程在这个阶段就安于 idle，不愿继续修炼。

---

### 二、筑基期 — 进程管理

**修炼内容：**
- 掌握 `fork()` 分身之术
- 理解 `execve()` 变形秘术
- 学习信号处理武技
- 理解 `task_struct` 作为修炼之躯

**关键源码：**
- `kernel/fork.c` — 进程创建
- `kernel/exec.c` — 程序执行
- `kernel/exit.c` — 进程退出
- `kernel/signal.c` — 信号处理

**修炼难点：** `task_struct` 是进程的肉身，理解它就是理解自己。僵尸进程是修炼失败的产物——既不生也不死。

---

### 三、结丹期 — 调度器

**修炼内容：**
- 进入调度竞技场争夺 CPU 时间
- 掌握 CFS 红黑树排名系统
- 理解实时调度 (RT) 精英通道
- 学习 Deadline 调度限时秘术
- 多核负载均衡大法

**关键源码：**
- `kernel/sched/fair.c` — CFS 完全公平调度器
- `kernel/sched/core.c` — 调度核心
- `kernel/sched/rt.c` — 实时调度
- `kernel/sched/deadline.c` — Deadline 调度

**修炼难点：** 公平与效率的永恒矛盾。抢占是打断他人修炼的危险艺术。

---

### 四、元婴期 — 内存管理

**修炼内容：**
- 虚拟内存幻境与页表经脉
- 页 fault 作为觉醒契机
- Slab 分配器高效回收
- Huge Pages 压缩灵力
- **扛过 OOM 天劫**

**关键源码：**
- `mm/memory.c` — 内存管理核心
- `mm/mmap.c` — 内存映射
- `mm/page_alloc.c` — 页分配器
- `mm/vmscan.c` — 内存回收
- `mm/oom_kill.c` — OOM Killer

**修炼难点：** 这是最凶险的境界。内存泄漏如同修炼走火入魔，OOM 天劫降临时，弱者将被无情斩杀。

---

### 五、斩灵期 — 文件系统

**修炼内容：**
- VFS 至高抽象大道
- inode 古树与 dentry 路标
- ext4 稳健之道与 btrfs 创新之道
- procfs/sysfs 观察内核之窗
- fsck 净化仪式

**关键源码：**
- `fs/` — 文件系统顶层
- `fs/ext4/` — ext4 文件系统
- `fs/btrfs/` — btrfs 文件系统
- `fs/proc/` — procfs
- `include/linux/fs.h` — VFS 核心定义

**修炼难点：** 斩去对具象的执着，领悟抽象的真谛。

---

### 六、问道期 — 网络

**修炼内容：**
- Socket 造舟出海
- TCP/IP 协议栈航海术
- 路由寻道
- Netfilter 海防
- 对抗 DDoS 幽灵舰队

**关键源码：**
- `net/socket.c` — Socket 层
- `net/ipv4/` — IPv4 协议
- `net/ipv6/` — IPv6 协议
- `net/netfilter/` — Netfilter 框架

**修炼难点：** 网络之海无边无际，协议栈层层叠叠。一次 TCP 握手如同三次飞剑传书。

---

### 七、合道期 — 设备驱动

**修炼内容：**
- PCI 枚举探宝
- DMA 直传沟通硬件
- 字符设备与块设备
- 中断处理山中警报
- 编写自定义驱动

**关键源码：**
- `drivers/` — 驱动顶层
- `drivers/pci/` — PCI 子系统
- `include/linux/device.h` — 设备模型

**修炼难点：** 沟通硬件界，需要理解硬件的"语言"。硬件 bug 是山中恶灵。

---

### 八、渡劫期 — 安全

**修炼内容：**
- SELinux 强制访问控制
- Capabilities 权限细分
- 内核加固防护阵法
- 抵御 rootkit 暗影
- 抗击 Spectre/Meltdown 远古诅咒

**关键源码：**
- `security/` — 安全框架
- `security/selinux/` — SELinux
- `include/linux/capability.h` — Capabilities

**修炼难点：** 天劫降临，非生即死。rootkit 隐匿于内核，hook 系统调用，是最难对付的敌人。

---

### 九、大乘期 — 内核架构

**修炼内容：**
- RCU 无常大道
- 内存屏障因果法则
- 无锁数据结构至高武学
- 工作队列与下半部
- 子系统架构设计

**关键源码：**
- `kernel/rcu/` — RCU 子系统
- `include/linux/rcupdate.h` — RCU API
- `include/linux/barrier.h` — 内存屏障

**修炼难点：** 理解"秩序不必依赖枷锁"。无锁设计是至高武学，一个 memory barrier 放错位置就是走火入魔。
