---
title: Linux 内核官方文档蒸馏
---

# Linux 内核官方文档蒸馏

> 来源：`vendor/linux/Documentation/`。这份文件不是替代官方文档，而是给《Linux 内核修仙传》写作时使用的技术取证索引。写到具体机制时，先看本文件定位方向，再回到对应 `.rst` 和 `vendor/linux/` 源码确认细节。

> 完整知识地图见：`docs/refs/linux-kernel-documentation-knowledge-map.md`。全书扩写优先级见：`docs/refs/novel-kernel-expansion-analysis.md`。

## 使用原则

- `https://www.kernel.org/doc/html/latest/` 基本对应 Linux 源码树的 `Documentation/` 经 Sphinx 构建后的 HTML 文档；部分页面还会通过 kernel-doc 指令抽取源码注释。
- 小说可以使用修仙隐喻，但机制结论必须能落到 `Documentation/*.rst` 或真实源码路径。
- 写章节时优先引用本地 `vendor/linux/Documentation/`，不要只凭记忆写“Linux 一直如此”。
- 若官方文档说某机制正在演进，小说中要保留时代感，例如“旧法如此，新法正在替换”，不要把历史实现写成永恒天条。
- 技术小节的 `ChapterGate` 应考核刚讲过的机制，不考孤立名词。

## 顶层地图

| 文档入口 | 写作用途 | 对应小说卷 |
| --- | --- | --- |
| `Documentation/index.rst` | 官方文档总目录，区分开发流程、内部 API、用户文档、固件、架构等 | 全书总索引 |
| `Documentation/process/index.rst` | 补丁、社区、开发流程、稳定 API、代码风格、维护者规则 | 第十卷飞升、补丁线 |
| `Documentation/core-api/index.rst` | 核心 API、数据结构、并发、内存分配、DMA、RCU、memory barriers | 第三卷、第七卷、第九卷 |
| `Documentation/scheduler/index.rst` | CFS、EEVDF、deadline、RT group、调度域、schedutil 等 | 第三卷 |
| `Documentation/mm/index.rst` | 页表、进程地址空间、页分配、vmalloc、slab、回收、swap、OOM | 第四卷 |
| `Documentation/filesystems/index.rst` | VFS、文件系统实现、挂载、缓存、具体文件系统 | 第五卷 |
| `Documentation/networking/index.rst` | 网络栈、协议、设备、BPF、netfilter 等 | 第六卷 |
| `Documentation/driver-api/index.rst` | 设备模型、DMA、中断、总线、驱动框架 | 第七卷 |
| `Documentation/admin-guide/LSM/index.rst` | SELinux、AppArmor、Landlock、Yama 等 LSM | 第八卷 |
| `Documentation/RCU/index.rst` 与 `Documentation/locking/index.rst` | RCU、锁、内存屏障、并发推理 | 第九卷 |

## 各卷技术校准

### 第一卷：Boot & 初始化

主要取证路径：

- `Documentation/admin-guide/kernel-parameters.rst`
- `Documentation/core-api/boot-time-mm.rst`
- `Documentation/arch/*/` 下的架构启动文档
- 源码：`init/main.c`、`arch/*/kernel/head*`、`kernel/sched/idle.c`

写作要点：

- `start_kernel()` 是内核通用初始化主线，但早期启动入口强依赖架构，不能把 x86、RISC-V、ARM64 混成一条固定路径。
- PID 0 / idle / swapper 的叙事可以写成“最底层的起点”，但它不是普通用户进程，也不是通过 `fork()` 诞生。
- `rest_init()`、`kernel_init()`、`kthreadd` 是从启动世界走向进程世界的重要桥。

### 第二卷：进程管理

主要取证路径：

- `Documentation/core-api/kernel-api.rst`
- `Documentation/admin-guide/cgroup-v2.rst`
- `Documentation/admin-guide/cgroup-v1/`
- 源码：`kernel/fork.c`、`fs/exec.c`、`kernel/exit.c`、`kernel/signal.c`、`include/linux/sched.h`

写作要点：

- `task_struct` 是进程叙事的“肉身”，但很多字段是配置相关或子系统内部细节，写字段时要回源码确认。
- `fork()` 不是简单复制一切，关键在 `copy_process()` 以及地址空间、文件表、信号处理、命名空间等资源的选择性复制与共享。
- `execve()` 替换用户态程序映像，不等于换掉同一个任务的全部内核身份。
- cgroup 是资源控制与层级组织，不只是“进程分组名册”。

### 第三卷：调度器

主要取证路径：

- `Documentation/scheduler/sched-design-CFS.rst`
- `Documentation/scheduler/sched-eevdf.rst`
- `Documentation/scheduler/sched-deadline.rst`
- `Documentation/scheduler/sched-rt-group.rst`
- `Documentation/scheduler/sched-domains.rst`
- 源码：`kernel/sched/core.c`、`kernel/sched/fair.c`、`kernel/sched/rt.c`、`kernel/sched/deadline.c`、`kernel/sched/sched.h`

写作要点：

- CFS 的经典核心是“理想多任务 CPU”模型：用 `vruntime` 表示任务相对公平份额，历史上按 `vruntime` 组织红黑树并选择最左实体。
- 当前文档明确说明 CFS 正在给 EEVDF 让路。EEVDF 仍追求相同优先级 runnable 任务之间的公平，但会计算 lag 与 virtual deadline，在 eligible 任务中选择虚拟期限最早者。
- 写第三卷时，红黑树可以作为旧法与基础数据结构讲清楚；现代主线应补上 EEVDF 的“虚拟期限”与“lag”。
- 调度类有层次：stop、deadline、RT、fair、idle 等；普通进程公平调度不应覆盖实时和 deadline 语义。
- Deadline 调度的 runtime、deadline、period 是时间契约，但小说里不要写成万能硬实时保证；准入、带宽、系统负载与实现限制都要保留边界。

### 第四卷：内存管理

主要取证路径：

- `Documentation/mm/page_tables.rst`
- `Documentation/mm/process_addrs.rst`
- `Documentation/mm/page_allocation.rst`
- `Documentation/mm/vmalloc.rst`
- `Documentation/mm/slab.rst`
- `Documentation/mm/page_reclaim.rst`
- `Documentation/mm/swap.rst`
- `Documentation/mm/oom.rst`
- `Documentation/core-api/memory-allocation.rst`
- 源码：`mm/memory.c`、`mm/mmap.c`、`mm/page_alloc.c`、`mm/vmscan.c`、`mm/oom_kill.c`、`include/linux/mm_types.h`

写作要点：

- Linux 软件页表是最多五级的通用模型：PGD、P4D、PUD、PMD、PTE；具体架构可以 folding，不能把四级或三级当成全局定律。
- 页表把 CPU 看到的虚拟地址映射到外部总线看到的物理地址；PFN 是物理地址除以 `PAGE_SIZE`。
- 缺页异常既可能是正常机制（lazy allocation、COW、swap-in），也可能是权限错误或非法地址；用户态错误通常表现为 `SIGSEGV`。
- `kmalloc` 适合小对象且物理连续；`vmalloc` 提供虚拟连续但通常物理不连续；大量同类对象使用 slab cache。
- `GFP_KERNEL` 可能睡眠并触发 reclaim；中断/原子上下文不能随便使用会睡眠的分配标志。

### 第五卷：文件系统

主要取证路径：

- `Documentation/filesystems/`
- `Documentation/filesystems/vfs.rst`
- `Documentation/filesystems/path-lookup.rst`
- `Documentation/filesystems/proc.rst`
- `Documentation/filesystems/sysfs.rst`
- 源码：`fs/`、`include/linux/fs.h`、`fs/namei.c`

写作要点：

- VFS 是统一抽象层，核心叙事应围绕 superblock、inode、dentry、file 及 operations。
- dentry 是路径查找缓存的关键，不要把它写成磁盘上永久对象。
- procfs/sysfs 是暴露内核信息与对象模型的接口，不等同于普通磁盘文件系统。

### 第六卷：网络栈

主要取证路径：

- `Documentation/networking/`
- `Documentation/networking/filter.rst`
- `Documentation/networking/napi.rst`
- `Documentation/networking/netdevices.rst`
- 源码：`net/socket.c`、`net/ipv4/`、`net/ipv6/`、`net/core/`、`net/netfilter/`

写作要点：

- Socket 是用户空间看到的抽象，包在内核中会经过协议栈、路由、队列、设备层。
- NAPI、softirq、队列与驱动之间的协作适合写成“中断魔尊与下半部”的长期关系。
- TCP 不是只靠三次握手，拥塞控制、重传、窗口、状态机都是后续深入点。

### 第七卷：设备驱动

主要取证路径：

- `Documentation/driver-api/`
- `Documentation/core-api/dma-api.rst`
- `Documentation/core-api/dma-api-howto.rst`
- `Documentation/PCI/`
- `Documentation/driver-api/driver-model/`
- 源码：`drivers/`、`include/linux/device.h`、`include/linux/dma-mapping.h`

写作要点：

- 设备模型不是“驱动文件集合”，而是 device、driver、bus、class 的关系网。
- DMA 叙事必须区分 CPU 地址、设备可见 DMA 地址、缓存一致性与映射生命周期。
- 中断上半部尽量短，下半部/线程化中断/工作队列承接较重工作。

### 第八卷：安全

主要取证路径：

- `Documentation/admin-guide/LSM/`
- `Documentation/security/`
- `Documentation/admin-guide/hw-vuln/`
- `Documentation/process/security-bugs.rst`
- 源码：`security/`、`include/linux/lsm_hooks.h`、`include/uapi/linux/capability.h`

写作要点：

- Capabilities 是把 root 权限拆细，不是“比 root 更高一级”。
- LSM 是安全决策框架；SELinux、AppArmor、Landlock 等是具体模块或机制。
- 硬件漏洞缓解要写成代价权衡，不能写成单一法术彻底消灭。

### 第九卷：内核架构与并发

主要取证路径：

- `Documentation/RCU/`
- `Documentation/locking/`
- `Documentation/core-api/wrappers/memory-barriers.rst`
- `Documentation/core-api/refcount-vs-atomic.rst`
- `Documentation/core-api/workqueue.rst`
- 源码：`kernel/rcu/`、`kernel/workqueue.c`、`include/linux/rcupdate.h`、`include/linux/atomic/`

写作要点：

- RCU 的叙事核心是读侧低开销、更新侧等待 grace period，不是“完全无锁”。
- memory barrier 是约束可见性和顺序的工具，不能被写成通用性能优化法宝。
- refcount 与 atomic 的语义不同，涉及对象生命周期时不要随意替换。

### 第十卷：飞升与社区

主要取证路径：

- `Documentation/process/submitting-patches.rst`
- `Documentation/process/submit-checklist.rst`
- `Documentation/process/development-process.rst`
- `Documentation/process/coding-style.rst`
- `Documentation/process/stable-api-nonsense.rst`
- `Documentation/maintainer/`

写作要点：

- “飞升”不是把代码写完，而是补丁经过讨论、审查、修改、合并并承担维护责任。
- commit message、Signed-off-by、回归风险、测试说明、维护者路径都是剧情冲突点。
- Linux 内核没有对内核内部模块承诺稳定 API；这可以转化为“天道不为懒人冻结”的世界观规则。

## 常见纠偏清单

- 不要把 `Documentation/` 当成唯一事实来源；它会包含历史说明、待整理文档和 kernel-doc 抽取内容。
- 不要把某架构实现写成所有架构通用机制。
- 不要把“默认普通任务调度”写成“所有任务调度”；实时、deadline、stop、idle 都有特殊规则。
- 不要把 page fault 全写成错误；很多缺页是正常的懒分配、COW 或 swap-in。
- 不要把 `vmalloc` 写成大号 `kmalloc`；两者物理连续性不同。
- 不要把 `root` 写成绕过一切；capabilities、LSM、命名空间都会改变权限语义。
- 不要把 RCU 写成没有代价；读侧轻，更新侧和回收侧仍有复杂约束。
