---
title: 源码注解
---

# 源码注解

本书涉及的关键内核源码文件索引。所有源码均可在 `vendor/linux` 子模块中找到。

## 启动与初始化

| 文件 | 修仙对应 | 关键函数/结构 |
|---|---|---|
| `init/main.c` | 天道中枢 | `start_kernel()`, `rest_init()` |
| `kernel/init_task.c` | 林小源的起源 | `init_task` 结构体定义 |
| `arch/x86/boot/` | 混沌之源 | 引导代码 |

## 进程管理

| 文件 | 修仙对应 | 关键函数/结构 |
|---|---|---|
| `kernel/fork.c` | 分身之术 | `kernel_clone()`, `copy_process()` |
| `kernel/exec.c` | 变形秘术 | `do_execveat_common()` |
| `kernel/exit.c` | 归虚 | `do_exit()`, `wait_task_zombie()` |
| `kernel/signal.c` | 飞剑传书 | `send_signal()`, `get_signal()` |
| `include/linux/sched.h` | 修仙之躯 | `struct task_struct` 定义 |

## 调度器

| 文件 | 修仙对应 | 关键函数/结构 |
|---|---|---|
| `kernel/sched/core.c` | 天道中枢 | `schedule()`, `__schedule()` |
| `kernel/sched/fair.c` | 红黑天秤 | CFS 调度器实现 |
| `kernel/sched/rt.c` | 精英通道 | 实时调度 |
| `kernel/sched/deadline.c` | 限时秘术 | Deadline 调度 |

## 内存管理

| 文件 | 修仙对应 | 关键函数/结构 |
|---|---|---|
| `mm/memory.c` | 内景核心 | `handle_mm_fault()` |
| `mm/mmap.c` | 内景映射 | `do_mmap()`, `mmap_region()` |
| `mm/page_alloc.c` | 灵力分配 | `__alloc_pages()` |
| `mm/vmscan.c` | 灵力回收 | `shrink_node()` |
| `mm/oom_kill.c` | 天劫降临 | `oom_kill_process()` |
| `mm/slab.c` | 精炼大师 | Slab 分配器 |

## 文件系统

| 文件 | 修仙对应 | 关键函数/结构 |
|---|---|---|
| `include/linux/fs.h` | VFS 经书 | `struct file_operations`, `struct inode` |
| `fs/ext4/` | 老树 | ext4 实现 |
| `fs/btrfs/` | 新树 | btrfs 实现 |
| `fs/proc/` | 窗户 | procfs 实现 |

## 网络

| 文件 | 修仙对应 | 关键函数/结构 |
|---|---|---|
| `net/socket.c` | 造舟术 | Socket 层 |
| `net/ipv4/` | IPv4 航海 | IPv4 协议栈 |
| `net/netfilter/` | 海防 | Netfilter 框架 |

## 安全

| 文件 | 修仙对应 | 关键函数/结构 |
|---|---|---|
| `security/selinux/` | 铁面 | SELinux 实现 |
| `include/linux/capability.h` | 封号 | Capabilities 定义 |

## 高级机制

| 文件 | 修仙对应 | 关键函数/结构 |
|---|---|---|
| `kernel/rcu/` | 无常之道 | RCU 实现 |
| `include/linux/rcupdate.h` | RCU 经书 | `rcu_read_lock()`, `synchronize_rcu()` |
