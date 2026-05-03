---
title: Linux 内核官方文档知识地图
---

# Linux 内核官方文档知识地图

> 来源：`vendor/linux/Documentation/`，当前抽取到 `.rst/.txt` 文档 4723 个，顶层分组 75 个。本文用于把官方文档中的内核知识点蒸馏成小说写作可引用的“道藏地图”。它不是替代源码或原文；写到具体机制、字段、函数时仍要回查原始 `.rst` 与 `vendor/linux/` 源码。

## 写作使用规则

- 章节中的关键知识点必须优先落到本文的某个知识域，再回到对应 `Documentation/...` 文件确认。
- 如果一个知识点横跨多个子系统，正文要写出边界。例如 DMA 同时涉及 driver API、core API、IOMMU、设备一致性，不应只写成“硬件直接搬运”。
- 文档中出现“历史实现”“正在演进”“架构相关”的内容时，小说要保留这种不确定性，避免写成永恒天条。
- `KernelSourceLink` 用于源码悬浮预览；官方文档路径用于写作取证，不建议在正文中长篇粘贴。
- 每卷至少选择 3-5 个官方文档点作为本卷新增细节来源；每章至少有一个可回查的核心机制。

## 总目录知识域

| 知识域 | 关键文档入口 | 小说用途 |
| --- | --- | --- |
| 启动、架构、固件 | `arch/`、`firmware-guide/`、`devicetree/`、`admin-guide/kernel-parameters.rst` | 第一卷的混沌初开、硬件界、早期初始化 |
| 开发流程与社区 | `process/`、`maintainer/`、`doc-guide/` | 第十卷飞升、补丁审查、Maintainer 责任 |
| 核心 API 与基础结构 | `core-api/` | 全书公共法术：kobject、kref、idr/xarray、workqueue、DMA、IRQ |
| 调度 | `scheduler/` | 第三卷公平、实时、deadline、EEVDF、调度域 |
| 内存管理 | `mm/`、`core-api/memory-allocation.rst` | 第四卷页表、VMA、页分配、slab、reclaim、swap、OOM |
| 文件系统与存储 | `filesystems/`、`block/`、`admin-guide/device-mapper/`、`nvdimm/`、`nvme/` | 第五卷 VFS、页缓存、块层、持久化、缓存与一致性 |
| 网络与 BPF | `networking/`、`bpf/`、`netlink/`、`netlabel/` | 第六卷协议栈、NAPI、netfilter、eBPF、可观测性 |
| 设备驱动 | `driver-api/`、`PCI/`、`usb/`、`i2c/`、`spi/`、`gpu/`、`sound/` | 第七卷设备模型、总线、DMA、中断、具体设备族 |
| 安全 | `security/`、`admin-guide/LSM/`、`admin-guide/hw-vuln/` | 第八卷 credentials、capabilities、LSM、硬件漏洞、密钥 |
| 并发、锁与 RCU | `locking/`、`RCU/`、`memory-barriers.txt` | 第九卷架构大道、读写并发、内存序、死锁 |
| 调试、测试、追踪 | `dev-tools/`、`trace/`、`fault-injection/`、`livepatch/` | 贯穿全书的破案工具与攻坚场景 |
| 用户空间 ABI 与管理 | `userspace-api/`、`admin-guide/ABI*`、`tools/` | 用户态与内核态边界、系统管理、可见接口 |
| 专用硬件子系统 | `hwmon/`、`iio/`、`input/`、`hid/`、`leds/`、`watchdog/` 等 | 第七卷支线、生活化设备剧情 |

## 顶层目录覆盖清单

| 目录 | 文档数 | 蒸馏定位 |
| --- | ---: | --- |
| `admin-guide` | 402 | 管理员视角：内核参数、ABI、cgroup、LSM、硬件漏洞、设备配置、故障处理 |
| `arch` | 240 | 架构差异：启动、异常、中断、内存布局、特定 CPU 约束 |
| `core-api` | 74 | 内核内部 API：数据结构、IRQ、DMA、内存分配、workqueue、kobject |
| `scheduler` | 19 | 调度核心：CFS、EEVDF、Deadline、RT、调度域、能耗、扩展调度 |
| `mm` | 47 | 内存管理：页表、地址空间、页分配、vmalloc、slab、回收、swap、OOM、DAMON |
| `filesystems` | 147 | VFS 与具体文件系统、缓存、目录锁、debugfs、configfs、网络文件系统 |
| `block` | 16 | 块层、队列、blk-mq、统计、写回与块设备语义 |
| `networking` | 261 | 网络协议、驱动、NAPI、offload、桥接、bonding、隧道、TCP 变体 |
| `bpf` | 53 | eBPF 设计、helper、map、kfunc、libbpf、程序类型、验证边界 |
| `driver-api` | 359 | 驱动模型、总线、DMA、ACPI、wireless、CXL、firmware、媒体等驱动接口 |
| `PCI` | 25 | PCI 枚举、电源、MSI、热插拔、I/O 虚拟化相关路径 |
| `usb` | 26 | USB core、gadget、type-C、驱动与用户接口 |
| `i2c` | 45 | I2C 总线、设备、sysfs、mux、调试和驱动编写 |
| `spi` | 7 | SPI 总线与设备驱动 |
| `gpu` | 102 | DRM、显示、调度、驱动开发、GPU 子系统 |
| `sound` | 58 | ALSA、HD-Audio、SoC audio、声音驱动 |
| `input` | 35 | 输入设备、event、gameport、设备驱动 |
| `hid` | 13 | HID 设备与 BPF/HID 扩展 |
| `hwmon` | 274 | 硬件监控芯片与传感器驱动 |
| `iio` | 26 | Industrial I/O、缓冲、触发器、传感器 |
| `leds` | 24 | LED class、trigger、设备驱动 |
| `watchdog` | 10 | watchdog 框架与驱动 |
| `power` | 29 | 电源管理、suspend、runtime PM、能耗模型 |
| `cpu-freq` | 4 | CPU 频率调节与 governor |
| `firmware-guide` | 24 | ACPI、EFI、固件接口、DMI、firmware loader |
| `devicetree` | 711 | 设备树绑定，是驱动与硬件描述的大型资料库 |
| `security` | 28 | credentials、keys、LSM、Landlock、IMA、self-protection、TPM |
| `locking` | 18 | mutex、spinlock、rtmutex、seqlock、lockdep、futex |
| `RCU` | 20 | RCU 概念、需求、数据结构、grace period、stall、torture |
| `dev-tools` | 55 | KASAN、KCSAN、KFENCE、kmemleak、KUnit、kselftest、checkpatch |
| `trace` | 61 | ftrace、events、kprobe/eprobe/fprobe、histogram、OSNoise、timerlat |
| `fault-injection` | 5 | 故障注入，用于制造可靠的灾难和调试剧情 |
| `livepatch` | 9 | 运行中修补内核，适合“不断机疗伤”剧情 |
| `kbuild` | 14 | Kbuild、Kconfig、模块构建、LLVM、可复现构建 |
| `process` | 55 | 开发流程、补丁、代码风格、回归、安全漏洞、AI 助手规则 |
| `maintainer` | 8 | 维护者手册、入口档案、特定子系统维护说明 |
| `doc-guide` | 7 | Sphinx、kernel-doc、文档写作规则 |
| `userspace-api` | 458 | UAPI、ioctl、eBPF syscall、GPIO、media、netlink、sysfs ABI |
| `tools` | 42 | perf、rtla、rv、testing tools 等用户态工具 |
| `virt` | 63 | KVM、virtio、guest/host、SEV/TDX 等虚拟化文档 |
| `rust` | 6 | Rust for Linux、编码规范、quick start |
| `crypto` | 28 | 内核 crypto API、算法、异步加密、硬件加速 |
| `accounting` | 6 | taskstats、delay accounting、PSI、cgroupstats |
| `ABI` | 文本树 | sysfs/procfs 等 ABI 描述，通常由 admin-guide 汇总 |

## 第一卷：Boot、初始化、硬件觉醒

可引用知识点：

- 架构入口不同：x86、ARM、RISC-V 的 early boot 路径不同，`start_kernel()` 是通用主线而非最早入口。
- `setup_arch()` 属于架构定制阶段，适合写“各派山门先校准自身地脉”。
- kernel parameters 是启动时传给内核的“天命诏书”，能影响调度、内存、安全、调试等多个子系统。
- firmware、ACPI、EFI、Device Tree 是硬件界给内核界的描述方式；它们不是同一种东西。
- `init_task`/PID 0 是静态初始化的特殊存在，不是普通 `fork()` 产物。

文档入口：

- `Documentation/index.rst`
- `Documentation/arch/*/`
- `Documentation/firmware-guide/index.rst`
- `Documentation/devicetree/index.rst`
- `Documentation/admin-guide/kernel-parameters.rst`
- `Documentation/core-api/boot-time-mm.rst`

扩写方向：

- 第一卷可以补“固件传书”：BIOS/UEFI/Device Tree/ACPI 不是背景板，而是硬件界与内核界第一次交接。
- 启动章节可加入 kernel command line 的冲突，例如一个参数改变 panic、init、调度或内存行为。

## 第二卷：进程、身份与资源边界

可引用知识点：

- `task_struct` 是进程身份中心，但具体字段高度依赖配置和子系统。
- `fork()` 的核心不是机械复制，而是按标志决定共享或复制资源。
- `execve()` 替换用户态程序映像，进程身份连续但地址空间和可执行文件语义重建。
- 信号是异步通知，不等同于可靠消息队列；`SIGKILL`、`SIGSTOP` 有特殊不可捕获语义。
- namespace 改变进程看到的世界，cgroup 管资源和层级，不要混用。
- PSI、delay accounting、taskstats 可把“进程受苦”量化成系统压力。

文档入口：

- `Documentation/admin-guide/cgroup-v2.rst`
- `Documentation/admin-guide/cgroup-v1/`
- `Documentation/accounting/psi.rst`
- `Documentation/accounting/delay-accounting.rst`
- `Documentation/core-api/cgroup.rst`
- `Documentation/userspace-api/`

扩写方向：

- 第二卷可把 cgroup/PSI 写成“因果簿”和“众生压力计”，让进程不只是会 `fork()`，还会被资源法则约束。
- 命名空间章节可更明确区分 PID、mount、net、UTS 等不同“幻境”。

## 第三卷：调度、公平、期限与多核

可引用知识点：

- CFS 经典模型是理想多任务 CPU，通过 `vruntime` 逼近公平。
- EEVDF 引入 lag 与 virtual deadline，在 eligible 任务中选择期限最早者。
- Deadline 调度关注 runtime、deadline、period；RT 调度关注实时优先级和抢占。
- 调度域、调度组、capacity aware、energy aware 是多核/异构 CPU 的关键。
- util clamp、schedutil 把调度与频率/能耗联系起来。
- `completion` 是等待某件事完成的同步原语，可作为“闭关结界”的机制。

文档入口：

- `Documentation/scheduler/sched-design-CFS.rst`
- `Documentation/scheduler/sched-eevdf.rst`
- `Documentation/scheduler/sched-deadline.rst`
- `Documentation/scheduler/sched-rt-group.rst`
- `Documentation/scheduler/sched-domains.rst`
- `Documentation/scheduler/sched-capacity.rst`
- `Documentation/scheduler/sched-energy.rst`
- `Documentation/scheduler/sched-util-clamp.rst`

扩写方向：

- 第三卷已补 EEVDF，但第 40、43、52、55 章仍可补 nice design、sched domains、energy aware、sched debug。
- 终章“调度器全貌”应从 CFS 扩成调度类层级、负载均衡、能耗、实时、deadline、EEVDF 的总图。

## 第四卷：内存、页表、回收与灾难

可引用知识点：

- Linux 软件页表最多五级，架构可折叠层级；不要固定写成四级或三层。
- page fault 既可能是正常路径，也可能是权限错误；lazy allocation、COW、swap-in 都会触发正常缺页。
- `kmalloc` 小对象且物理连续；`vmalloc` 虚拟连续但物理上通常不连续；slab cache 适合同类对象。
- GFP flags 表达上下文约束；`GFP_KERNEL` 可睡眠，原子/中断上下文要避免。
- reclaim、kswapd、direct reclaim、swap、OOM 是内存压力的连续谱。
- MGLRU、DAMON、KSM、NUMA、hugetlb/THP 是第四卷可加深的现代内容。

文档入口：

- `Documentation/mm/page_tables.rst`
- `Documentation/mm/process_addrs.rst`
- `Documentation/mm/page_allocation.rst`
- `Documentation/mm/vmalloc.rst`
- `Documentation/mm/slab.rst`
- `Documentation/mm/page_reclaim.rst`
- `Documentation/mm/swap.rst`
- `Documentation/mm/oom.rst`
- `Documentation/mm/multigen_lru.rst`
- `Documentation/mm/damon/index.rst`
- `Documentation/core-api/memory-allocation.rst`

扩写方向：

- 第四卷末段技术密度偏低，可扩充 compaction、THP、KASAN、MGLRU、DAMON，把“内景天地”写成动态治理系统。
- OOM 不只是一刀杀人，可加入 overcommit、oom_score、memcg OOM、reclaim 失败链。

## 第五卷：VFS、页缓存、块层与持久化

可引用知识点：

- VFS 抽象由 superblock、inode、dentry、file 及 operations 串起。
- dentry 是路径查找缓存，不是磁盘永久结构。
- page cache 连接文件系统与内存管理，是文件 I/O 性能和一致性的核心。
- block layer、blk-mq、device mapper、writeback 能把文件系统与设备山脉连起来。
- debugfs/configfs/procfs/sysfs 的语义不同，不应都写成“特殊文件”。
- FS-Cache、DAX、netfs、overlayfs 等适合扩充“森林分支”。

文档入口：

- `Documentation/filesystems/vfs.rst`
- `Documentation/filesystems/path-lookup.rst`
- `Documentation/filesystems/locking.rst`
- `Documentation/filesystems/caching/`
- `Documentation/filesystems/debugfs.rst`
- `Documentation/filesystems/configfs.rst`
- `Documentation/filesystems/sysfs.rst`
- `Documentation/block/`
- `Documentation/admin-guide/device-mapper/`

扩写方向：

- 第五卷可把页缓存和 writeback 加成内存卷与文件系统卷的交汇大事件。
- 第 100 章总结偏短，可加入 VFS、page cache、block、具体文件系统的四层总图。

## 第六卷：网络、NAPI、BPF 与可观测性

可引用知识点：

- Socket 是用户态入口，数据包在内核里经过协议、路由、队列、设备、驱动。
- NAPI 把中断驱动转为轮询/批处理，适合写中断魔尊和软中断下半部的协作。
- checksum/segmentation offload 让硬件承担部分网络工作。
- netfilter 是包过滤和 NAT 的关键；tc、XDP、eBPF 是网络可编程路径。
- Netlink 是用户态与内核网络配置/事件沟通的重要通道。
- bonding、bridge、vlan、tunnel 是网络之海的“阵法”和“航路”。

文档入口：

- `Documentation/networking/napi.rst`
- `Documentation/networking/netdevices.rst`
- `Documentation/networking/checksum-offloads.rst`
- `Documentation/networking/segmentation-offloads.rst`
- `Documentation/networking/filter.rst`
- `Documentation/networking/bridge.rst`
- `Documentation/networking/bonding.rst`
- `Documentation/bpf/`
- `Documentation/userspace-api/netlink/`

扩写方向：

- 第六卷平均篇幅偏低，适合补 NAPI、XDP/eBPF、netfilter、拥塞控制、offload。
- 第 130 章总结非常短，应扩成“Socket -> 协议栈 -> qdisc -> driver -> NIC -> BPF 可编程面”的大图。

## 第七卷：设备模型、总线、DMA 与具体设备族

可引用知识点：

- Linux driver model 的核心是 bus、device、driver、class、kobject/kset。
- probe/remove 是驱动与设备匹配后的生命周期，不是“驱动主动找到一切”。
- DMA 必须区分 CPU 虚拟地址、物理地址、DMA address、缓存一致性和映射生命周期。
- PCI、USB、I2C、SPI、platform、ACPI、Device Tree 都是不同设备发现/描述模型。
- runtime PM、devres、firmware loader、regmap、irq、workqueue 都是驱动常用支撑。
- GPU、sound、input、hwmon、IIO 可作为不同门派支线。

文档入口：

- `Documentation/driver-api/driver-model/`
- `Documentation/driver-api/basics.rst`
- `Documentation/core-api/dma-api.rst`
- `Documentation/core-api/dma-api-howto.rst`
- `Documentation/PCI/`
- `Documentation/usb/`
- `Documentation/i2c/`
- `Documentation/spi/`
- `Documentation/power/runtime_pm.rst`
- `Documentation/driver-api/firmware/`

扩写方向：

- 第七卷技术术语密度偏低，尤其 ch140、ch142、ch143、ch155 等，可补 platform/DT、I2C/SPI、USB、runtime PM、devres。
- DMA 章节应补 streaming/coherent mapping、cache sync、IOMMU，不要只写“直传”。

## 第八卷：安全、身份、LSM 与硬件漏洞

可引用知识点：

- credentials 管 UID/GID、capabilities、keyrings 等身份材料。
- capabilities 是拆分 root 权力，不是比 root 更高的头衔。
- LSM 是 hook 框架；SELinux/AppArmor/Landlock/Smack/TOMOYO/Yama 是具体策略或模块。
- kernel self-protection 包括内存保护、控制流、攻击面收缩等多层思路。
- IMA/IPE/keys/TPM 把完整性、密钥、信任根连起来。
- 硬件漏洞缓解通常有性能代价和配置边界。

文档入口：

- `Documentation/security/credentials.rst`
- `Documentation/security/lsm.rst`
- `Documentation/security/lsm-development.rst`
- `Documentation/security/landlock.rst`
- `Documentation/admin-guide/LSM/SELinux.rst`
- `Documentation/admin-guide/LSM/apparmor.rst`
- `Documentation/security/keys/`
- `Documentation/security/self-protection.rst`
- `Documentation/admin-guide/hw-vuln/`

扩写方向：

- 第八卷平均篇幅和术语密度都偏低，应优先扩充 credentials、capabilities、LSM hook、keyrings、IMA/IPE、硬件漏洞缓解。
- rootkit 暗影可从“hook syscall”升级到篡改 credentials、隐藏模块、规避 LSM、污染 BPF/trace 的复合威胁。

## 第九卷：并发、RCU、锁、内存序和架构权衡

可引用知识点：

- RCU 是 read-copy-update：读侧低开销，更新侧发布新版本并等待 grace period 后回收旧对象。
- RCU 不是“没有锁”，它把同步成本转移到了更新和回收路径。
- spinlock、mutex、rwsem、seqlock、rtmutex 各有上下文与实时性约束。
- lockdep 是运行时锁正确性验证器，可写成“因果审判碑”。
- memory barriers 约束 CPU/编译器可见性和顺序，不是通用加速符。
- refcount 与 atomic 语义不同，生命周期对象要优先考虑 refcount 语义。

文档入口：

- `Documentation/RCU/whatisRCU.rst`
- `Documentation/RCU/rcu.rst`
- `Documentation/RCU/Design/Requirements/Requirements.rst`
- `Documentation/locking/locktypes.rst`
- `Documentation/locking/lockdep-design.rst`
- `Documentation/locking/seqlock.rst`
- `Documentation/locking/rt-mutex-design.rst`
- `Documentation/memory-barriers.txt`
- `Documentation/core-api/refcount-vs-atomic.rst`

扩写方向：

- 第九卷平均篇幅最低之一，应该重点补锁类型、RCU 宽限期、内存屏障、lockdep、KCSAN。
- 终章“架构总结”应从哲学总结扩成并发设计模式图：锁、RCU、percpu、workqueue、barrier、refcount。

## 第十卷：补丁、维护者、社区与飞升

可引用知识点：

- Linux 开发不是提交代码即结束，而是规划、编码、发补丁、评审、修改、跟进、维护。
- commit message、Signed-off-by、Fixes、Cc stable、测试说明、回归风险都是“飞升文书”。
- stable API nonsense 是内核内部不承诺稳定 API 的重要世界观法则。
- regression handling 和 security bugs 规定了严重问题的处理方式。
- maintainer handbook 强调维护者不只是审核代码，还要管理人、风险和长期责任。
- AI coding assistants 文档可以转化为第十卷的“器灵辅助但不可替代悟道”。

文档入口：

- `Documentation/process/development-process.rst`
- `Documentation/process/submitting-patches.rst`
- `Documentation/process/submit-checklist.rst`
- `Documentation/process/coding-style.rst`
- `Documentation/process/stable-api-nonsense.rst`
- `Documentation/process/handling-regressions.rst`
- `Documentation/process/security-bugs.rst`
- `Documentation/process/coding-assistants.rst`
- `Documentation/maintainer/`

扩写方向：

- 第十卷技术术语密度最低，应大幅补 process/maintainer 文档，把飞升写成社区流程而不是单纯名场面。
- 可新增或扩写 review thread、v2/v3 补丁、CI failure、regression report、stable backport、Maintainer 交接。

## 跨卷可复用知识点

### 可观测性三件套

- `printk` 与日志：适合日志仙翁。
- ftrace/kprobe/eprobe/perf/trace events：适合破案剧情。
- BPF：适合后期“无需改内核也能观察/干预”的高阶法术。

文档入口：`Documentation/trace/`、`Documentation/dev-tools/`、`Documentation/bpf/`。

### 测试与调试工具

- KASAN：内存越界和 use-after-free。
- KCSAN：数据竞争。
- KFENCE：低开销内存错误检测。
- kmemleak：泄漏追踪。
- KUnit/kselftest：把修行成果变成可重复试炼。
- fault injection：主动制造灾难。

文档入口：`Documentation/dev-tools/`、`Documentation/fault-injection/`。

### ABI 与边界

- UAPI、sysfs ABI、procfs、ioctl、netlink 都是用户态与内核态的契约。
- 内部 API 可以变，用户可见 ABI 要谨慎维护。

文档入口：`Documentation/userspace-api/`、`Documentation/admin-guide/abi.rst`、`Documentation/process/stable-api-nonsense.rst`。

### 配置与构建

- Kconfig 决定天赋开关。
- Kbuild 决定法术如何编成内核。
- modules 文档适合游方修士。
- reproducible builds 可写成“同炉炼出同丹”。

文档入口：`Documentation/kbuild/`。

## 小说写作查证模板

写一个技术小节前，按这个顺序记录：

```text
小说小节：
内核知识域：
官方文档：
源码路径：
关键机制：
不能误写的边界：
修仙隐喻：
ChapterGate 标准答案：
```

示例：

```text
小说小节：调度仙子讲虚拟期限
内核知识域：scheduler / EEVDF
官方文档：Documentation/scheduler/sched-eevdf.rst
源码路径：kernel/sched/fair.c, include/linux/sched.h
关键机制：lag >= 0 的 eligible 任务中选择 virtual deadline 最早者
不能误写的边界：EEVDF 是 fair 调度演进，不等于 Deadline 调度类
修仙隐喻：债据（lag）与限期文书（virtual deadline）
ChapterGate 标准答案：virtual deadline
```

