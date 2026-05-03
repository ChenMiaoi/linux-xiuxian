import type { KernelSourceTerm } from './kernel-source-terms'

export const generatedKernelSourceTerms: Record<string, KernelSourceTerm> = {
  "start_kernel": {
    "label": "start_kernel",
    "path": "init/main.c",
    "line": 1017,
    "endLine": 1044,
    "symbol": "start_kernel",
    "note": "内核 C 入口"
  },
  "init_task": {
    "label": "init_task",
    "path": "include/linux/init_task.h",
    "symbol": "init_task",
    "note": "PID 0 的静态 task_struct"
  },
  "task_struct": {
    "label": "task_struct",
    "path": "include/linux/sched.h",
    "line": 820,
    "endLine": 850,
    "symbol": "task_struct",
    "note": "进程描述符"
  },
  "state": {
    "label": "state",
    "path": "include/linux/sched.h",
    "line": 828,
    "endLine": 836,
    "symbol": "__state",
    "note": "进程状态字段"
  },
  "__state": {
    "label": "__state",
    "path": "include/linux/sched.h",
    "line": 828,
    "endLine": 836,
    "symbol": "__state",
    "note": "进程状态字段"
  },
  "pid": {
    "label": "pid",
    "path": "include/linux/sched.h",
    "line": 1060,
    "endLine": 1061,
    "symbol": "pid",
    "note": "进程 ID"
  },
  "tgid": {
    "label": "tgid",
    "path": "include/linux/sched.h",
    "line": 1060,
    "endLine": 1061,
    "symbol": "tgid",
    "note": "线程组 ID"
  },
  "real_parent": {
    "label": "real_parent",
    "path": "include/linux/sched.h",
    "line": 1068,
    "endLine": 1077,
    "symbol": "real_parent",
    "note": "真实父进程指针"
  },
  "parent": {
    "label": "parent",
    "path": "include/linux/sched.h",
    "line": 1068,
    "endLine": 1077,
    "symbol": "parent",
    "note": "当前父进程指针"
  },
  "children": {
    "label": "children",
    "path": "include/linux/sched.h",
    "line": 1080,
    "endLine": 1084,
    "symbol": "children",
    "note": "子进程链表"
  },
  "sibling": {
    "label": "sibling",
    "path": "include/linux/sched.h",
    "line": 1080,
    "endLine": 1084,
    "symbol": "sibling",
    "note": "兄弟进程链表"
  },
  "comm": {
    "label": "comm",
    "path": "include/linux/sched.h",
    "line": 1170,
    "endLine": 1170,
    "symbol": "comm",
    "note": "任务名字段"
  },
  "prio": {
    "label": "prio",
    "path": "include/linux/sched.h",
    "line": 866,
    "endLine": 868,
    "symbol": "prio",
    "note": "进程优先级字段"
  },
  "static_prio": {
    "label": "static_prio",
    "path": "include/linux/sched.h",
    "line": 866,
    "endLine": 868,
    "symbol": "static_prio",
    "note": "静态优先级字段"
  },
  "normal_prio": {
    "label": "normal_prio",
    "path": "include/linux/sched.h",
    "line": 866,
    "endLine": 868,
    "symbol": "normal_prio",
    "note": "普通优先级字段"
  },
  "policy": {
    "label": "policy",
    "path": "include/linux/sched.h",
    "line": 920,
    "endLine": 920,
    "symbol": "policy",
    "note": "调度策略字段"
  },
  "se": {
    "label": "se",
    "path": "include/linux/sched.h",
    "line": 871,
    "endLine": 871,
    "symbol": "se",
    "note": "CFS 调度实体字段"
  },
  "mm": {
    "label": "mm",
    "path": "include/linux/sched.h",
    "line": 962,
    "endLine": 963,
    "symbol": "mm",
    "note": "用户地址空间描述符指针"
  },
  "mm_struct": {
    "label": "mm_struct",
    "path": "include/linux/mm_types.h",
    "line": 1172,
    "endLine": 1202,
    "symbol": "mm_struct",
    "note": "进程地址空间描述符"
  },
  "files": {
    "label": "files",
    "path": "include/linux/sched.h",
    "line": 1186,
    "endLine": 1186,
    "symbol": "files",
    "note": "打开文件表指针"
  },
  "files_struct": {
    "label": "files_struct",
    "path": "include/linux/fdtable.h",
    "line": 38,
    "endLine": 63,
    "symbol": "files_struct",
    "note": "打开文件表"
  },
  "signal": {
    "label": "signal",
    "path": "include/linux/sched.h",
    "line": 1197,
    "endLine": 1197,
    "symbol": "signal",
    "note": "线程组共享信号状态"
  },
  "signal_struct": {
    "label": "signal_struct",
    "path": "include/linux/sched/signal.h",
    "line": 94,
    "endLine": 124,
    "symbol": "signal_struct",
    "note": "信号状态结构"
  },
  "fs": {
    "label": "fs",
    "path": "include/linux/sched.h",
    "line": 1183,
    "endLine": 1183,
    "symbol": "fs",
    "note": "文件系统上下文字段"
  },
  "fs_struct": {
    "label": "fs_struct",
    "path": "include/linux/fs_struct.h",
    "line": 10,
    "endLine": 18,
    "symbol": "fs_struct",
    "note": "文件系统上下文结构"
  },
  "f_pos": {
    "label": "f_pos",
    "path": "include/linux/fs.h",
    "line": 1282,
    "endLine": 1282,
    "symbol": "f_pos",
    "note": "文件当前位置"
  },
  "f_mode": {
    "label": "f_mode",
    "path": "include/linux/fs.h",
    "line": 1262,
    "endLine": 1263,
    "symbol": "f_mode",
    "note": "文件打开模式"
  },
  "file_operations": {
    "label": "file_operations",
    "path": "include/linux/fs.h",
    "line": 1926,
    "endLine": 1960,
    "symbol": "file_operations",
    "note": "文件操作表"
  },
  "sighand": {
    "label": "sighand",
    "path": "include/linux/sched.h",
    "line": 1196,
    "endLine": 1197,
    "symbol": "sighand",
    "note": "信号处理表指针"
  },
  "sighand_struct": {
    "label": "sighand_struct",
    "path": "include/linux/sched/signal.h",
    "line": 21,
    "endLine": 27,
    "symbol": "sighand_struct",
    "note": "信号处理表"
  },
  "cred": {
    "label": "cred",
    "path": "include/linux/cred.h",
    "line": 115,
    "endLine": 132,
    "symbol": "cred",
    "note": "凭证结构"
  },
  "uid": {
    "label": "uid",
    "path": "include/linux/cred.h",
    "line": 115,
    "endLine": 123,
    "symbol": "uid",
    "note": "真实用户 ID"
  },
  "euid": {
    "label": "euid",
    "path": "include/linux/cred.h",
    "line": 115,
    "endLine": 123,
    "symbol": "euid",
    "note": "有效用户 ID"
  },
  "gid": {
    "label": "gid",
    "path": "include/linux/cred.h",
    "line": 115,
    "endLine": 123,
    "symbol": "gid",
    "note": "真实组 ID"
  },
  "egid": {
    "label": "egid",
    "path": "include/linux/cred.h",
    "line": 115,
    "endLine": 123,
    "symbol": "egid",
    "note": "有效组 ID"
  },
  "ptrace": {
    "label": "ptrace",
    "path": "include/linux/sched.h",
    "line": 843,
    "endLine": 843,
    "symbol": "ptrace",
    "note": "ptrace 状态字段"
  },
  "setuid": {
    "label": "setuid",
    "path": "include/linux/cred.h",
    "line": 115,
    "endLine": 123,
    "symbol": "euid",
    "note": "setuid 机制影响有效 UID"
  },
  "copy_process": {
    "label": "copy_process",
    "path": "kernel/fork.c",
    "line": 1969,
    "endLine": 2005,
    "symbol": "copy_process",
    "note": "进程复制核心路径"
  },
  "kernel_clone": {
    "label": "kernel_clone",
    "path": "kernel/fork.c",
    "line": 2670,
    "endLine": 2705,
    "symbol": "kernel_clone",
    "note": "clone/fork 内核入口"
  },
  "kthreadd": {
    "label": "kthreadd",
    "path": "kernel/fork.c",
    "symbol": "kthreadd",
    "note": "内核线程守护进程"
  },
  "kernel/sched/core.c": {
    "label": "kernel/sched/core.c",
    "path": "kernel/sched/core.c",
    "line": 1,
    "endLine": 24,
    "symbol": "kernel/sched/core.c",
    "note": "源码文件"
  },
  "kernel/sched/fair.c": {
    "label": "kernel/sched/fair.c",
    "path": "kernel/sched/fair.c",
    "line": 1,
    "endLine": 24,
    "symbol": "kernel/sched/fair.c",
    "note": "源码文件"
  },
  "net/socket.c": {
    "label": "net/socket.c",
    "path": "net/socket.c",
    "line": 1,
    "endLine": 24,
    "symbol": "net/socket.c",
    "note": "源码文件"
  },
  "arch/x86/kernel/irq.c": {
    "label": "arch/x86/kernel/irq.c",
    "path": "arch/x86/kernel/irq.c",
    "line": 1,
    "endLine": 24,
    "symbol": "arch/x86/kernel/irq.c",
    "note": "源码文件"
  },
  "kernel/softirq.c": {
    "label": "kernel/softirq.c",
    "path": "kernel/softirq.c",
    "line": 1,
    "endLine": 24,
    "symbol": "kernel/softirq.c",
    "note": "源码文件"
  },
  "arch/x86/entry/entry_64.S": {
    "label": "arch/x86/entry/entry_64.S",
    "path": "arch/x86/entry/entry_64.S",
    "line": 1,
    "endLine": 24,
    "symbol": "arch/x86/entry/entry_64.S",
    "note": "源码文件"
  },
  "mm/oom_kill.c": {
    "label": "mm/oom_kill.c",
    "path": "mm/oom_kill.c",
    "line": 1,
    "endLine": 24,
    "symbol": "mm/oom_kill.c",
    "note": "源码文件"
  },
  "init/main.c": {
    "label": "init/main.c",
    "path": "init/main.c",
    "line": 1,
    "endLine": 24,
    "symbol": "init/main.c",
    "note": "源码文件"
  },
  "kernel/fork.c": {
    "label": "kernel/fork.c",
    "path": "kernel/fork.c",
    "line": 1,
    "endLine": 24,
    "symbol": "kernel/fork.c",
    "note": "源码文件"
  },
  "kernel/exit.c": {
    "label": "kernel/exit.c",
    "path": "kernel/exit.c",
    "line": 1,
    "endLine": 24,
    "symbol": "kernel/exit.c",
    "note": "源码文件"
  },
  "kernel/signal.c": {
    "label": "kernel/signal.c",
    "path": "kernel/signal.c",
    "line": 1,
    "endLine": 24,
    "symbol": "kernel/signal.c",
    "note": "源码文件"
  },
  "kernel/sched/rt.c": {
    "label": "kernel/sched/rt.c",
    "path": "kernel/sched/rt.c",
    "line": 1,
    "endLine": 24,
    "symbol": "kernel/sched/rt.c",
    "note": "源码文件"
  },
  "kernel/sched/deadline.c": {
    "label": "kernel/sched/deadline.c",
    "path": "kernel/sched/deadline.c",
    "line": 1,
    "endLine": 24,
    "symbol": "kernel/sched/deadline.c",
    "note": "源码文件"
  },
  "mm/memory.c": {
    "label": "mm/memory.c",
    "path": "mm/memory.c",
    "line": 1,
    "endLine": 24,
    "symbol": "mm/memory.c",
    "note": "源码文件"
  },
  "mm/mmap.c": {
    "label": "mm/mmap.c",
    "path": "mm/mmap.c",
    "line": 1,
    "endLine": 24,
    "symbol": "mm/mmap.c",
    "note": "源码文件"
  },
  "mm/page_alloc.c": {
    "label": "mm/page_alloc.c",
    "path": "mm/page_alloc.c",
    "line": 1,
    "endLine": 24,
    "symbol": "mm/page_alloc.c",
    "note": "源码文件"
  },
  "mm/vmscan.c": {
    "label": "mm/vmscan.c",
    "path": "mm/vmscan.c",
    "line": 1,
    "endLine": 24,
    "symbol": "mm/vmscan.c",
    "note": "源码文件"
  },
  "include/linux/fs.h": {
    "label": "include/linux/fs.h",
    "path": "include/linux/fs.h",
    "line": 1,
    "endLine": 24,
    "symbol": "include/linux/fs.h",
    "note": "源码文件"
  },
  "include/linux/device.h": {
    "label": "include/linux/device.h",
    "path": "include/linux/device.h",
    "line": 1,
    "endLine": 24,
    "symbol": "include/linux/device.h",
    "note": "源码文件"
  },
  "include/linux/capability.h": {
    "label": "include/linux/capability.h",
    "path": "include/linux/capability.h",
    "line": 1,
    "endLine": 24,
    "symbol": "include/linux/capability.h",
    "note": "源码文件"
  },
  "include/linux/rcupdate.h": {
    "label": "include/linux/rcupdate.h",
    "path": "include/linux/rcupdate.h",
    "line": 1,
    "endLine": 24,
    "symbol": "include/linux/rcupdate.h",
    "note": "源码文件"
  },
  "include/linux/types.h": {
    "label": "include/linux/types.h",
    "path": "include/linux/types.h",
    "line": 1,
    "endLine": 24,
    "symbol": "include/linux/types.h",
    "note": "源码文件"
  },
  "arch/riscv/include/asm/page.h": {
    "label": "arch/riscv/include/asm/page.h",
    "path": "arch/riscv/include/asm/page.h",
    "line": 1,
    "endLine": 24,
    "symbol": "arch/riscv/include/asm/page.h",
    "note": "源码文件"
  },
  "include/linux/list.h": {
    "label": "include/linux/list.h",
    "path": "include/linux/list.h",
    "line": 1,
    "endLine": 24,
    "symbol": "include/linux/list.h",
    "note": "源码文件"
  },
  "include/linux/container_of.h": {
    "label": "include/linux/container_of.h",
    "path": "include/linux/container_of.h",
    "line": 1,
    "endLine": 24,
    "symbol": "include/linux/container_of.h",
    "note": "源码文件"
  },
  "include/linux/compiler.h": {
    "label": "include/linux/compiler.h",
    "path": "include/linux/compiler.h",
    "line": 1,
    "endLine": 24,
    "symbol": "include/linux/compiler.h",
    "note": "源码文件"
  },
  "include/linux/compiler_types.h": {
    "label": "include/linux/compiler_types.h",
    "path": "include/linux/compiler_types.h",
    "line": 1,
    "endLine": 24,
    "symbol": "include/linux/compiler_types.h",
    "note": "源码文件"
  },
  "arch/riscv/include/asm/ptrace.h": {
    "label": "arch/riscv/include/asm/ptrace.h",
    "path": "arch/riscv/include/asm/ptrace.h",
    "line": 1,
    "endLine": 24,
    "symbol": "arch/riscv/include/asm/ptrace.h",
    "note": "源码文件"
  },
  "arch/riscv/kernel/entry.S": {
    "label": "arch/riscv/kernel/entry.S",
    "path": "arch/riscv/kernel/entry.S",
    "line": 1,
    "endLine": 24,
    "symbol": "arch/riscv/kernel/entry.S",
    "note": "源码文件"
  },
  "arch/riscv/include/asm/csr.h": {
    "label": "arch/riscv/include/asm/csr.h",
    "path": "arch/riscv/include/asm/csr.h",
    "line": 1,
    "endLine": 24,
    "symbol": "arch/riscv/include/asm/csr.h",
    "note": "源码文件"
  },
  "arch/riscv/include/asm/barrier.h": {
    "label": "arch/riscv/include/asm/barrier.h",
    "path": "arch/riscv/include/asm/barrier.h",
    "line": 1,
    "endLine": 24,
    "symbol": "arch/riscv/include/asm/barrier.h",
    "note": "源码文件"
  },
  "arch/riscv/include/asm/cmpxchg.h": {
    "label": "arch/riscv/include/asm/cmpxchg.h",
    "path": "arch/riscv/include/asm/cmpxchg.h",
    "line": 1,
    "endLine": 24,
    "symbol": "arch/riscv/include/asm/cmpxchg.h",
    "note": "源码文件"
  },
  "include/linux/bitops.h": {
    "label": "include/linux/bitops.h",
    "path": "include/linux/bitops.h",
    "line": 1,
    "endLine": 24,
    "symbol": "include/linux/bitops.h",
    "note": "源码文件"
  },
  "include/linux/atomic.h": {
    "label": "include/linux/atomic.h",
    "path": "include/linux/atomic.h",
    "line": 1,
    "endLine": 24,
    "symbol": "include/linux/atomic.h",
    "note": "源码文件"
  },
  "include/linux/spinlock.h": {
    "label": "include/linux/spinlock.h",
    "path": "include/linux/spinlock.h",
    "line": 1,
    "endLine": 24,
    "symbol": "include/linux/spinlock.h",
    "note": "源码文件"
  },
  "include/asm-generic/barrier.h": {
    "label": "include/asm-generic/barrier.h",
    "path": "include/asm-generic/barrier.h",
    "line": 1,
    "endLine": 24,
    "symbol": "include/asm-generic/barrier.h",
    "note": "源码文件"
  },
  "include/linux/stringify.h": {
    "label": "include/linux/stringify.h",
    "path": "include/linux/stringify.h",
    "line": 1,
    "endLine": 24,
    "symbol": "include/linux/stringify.h",
    "note": "源码文件"
  },
  "Documentation/arch/riscv/vm-layout.rst": {
    "label": "Documentation/arch/riscv/vm-layout.rst",
    "path": "Documentation/arch/riscv/vm-layout.rst",
    "line": 1,
    "endLine": 24,
    "symbol": "Documentation/arch/riscv/vm-layout.rst",
    "note": "源码文件"
  },
  "fs/binfmt_elf.c": {
    "label": "fs/binfmt_elf.c",
    "path": "fs/binfmt_elf.c",
    "line": 1,
    "endLine": 24,
    "symbol": "fs/binfmt_elf.c",
    "note": "源码文件"
  },
  "include/uapi/linux/elf.h": {
    "label": "include/uapi/linux/elf.h",
    "path": "include/uapi/linux/elf.h",
    "line": 1,
    "endLine": 24,
    "symbol": "include/uapi/linux/elf.h",
    "note": "源码文件"
  },
  "include/linux/elf.h": {
    "label": "include/linux/elf.h",
    "path": "include/linux/elf.h",
    "line": 1,
    "endLine": 24,
    "symbol": "include/linux/elf.h",
    "note": "源码文件"
  },
  "arch/riscv/kernel/head.S": {
    "label": "arch/riscv/kernel/head.S",
    "path": "arch/riscv/kernel/head.S",
    "line": 1,
    "endLine": 24,
    "symbol": "arch/riscv/kernel/head.S",
    "note": "源码文件"
  },
  "kernel/panic.c": {
    "label": "kernel/panic.c",
    "path": "kernel/panic.c",
    "line": 1,
    "endLine": 24,
    "symbol": "kernel/panic.c",
    "note": "源码文件"
  },
  "include/linux/sched.h": {
    "label": "include/linux/sched.h",
    "path": "include/linux/sched.h",
    "line": 1,
    "endLine": 24,
    "symbol": "include/linux/sched.h",
    "note": "源码文件"
  },
  "include/linux/init_task.h": {
    "label": "include/linux/init_task.h",
    "path": "include/linux/init_task.h",
    "line": 1,
    "endLine": 24,
    "symbol": "include/linux/init_task.h",
    "note": "源码文件"
  },
  "scripts/get_maintainer.pl": {
    "label": "scripts/get_maintainer.pl",
    "path": "scripts/get_maintainer.pl",
    "line": 1,
    "endLine": 24,
    "symbol": "scripts/get_maintainer.pl",
    "note": "源码文件"
  },
  "fs/ext4/super.c": {
    "label": "fs/ext4/super.c",
    "path": "fs/ext4/super.c",
    "line": 1,
    "endLine": 24,
    "symbol": "fs/ext4/super.c",
    "note": "源码文件"
  },
  "fs/exec.c": {
    "label": "fs/exec.c",
    "path": "fs/exec.c",
    "line": 1,
    "endLine": 24,
    "symbol": "fs/exec.c",
    "note": "源码文件"
  },
  "kernel/nsproxy.c": {
    "label": "kernel/nsproxy.c",
    "path": "kernel/nsproxy.c",
    "line": 1,
    "endLine": 24,
    "symbol": "kernel/nsproxy.c",
    "note": "源码文件"
  },
  "fs/pipe.c": {
    "label": "fs/pipe.c",
    "path": "fs/pipe.c",
    "line": 1,
    "endLine": 24,
    "symbol": "fs/pipe.c",
    "note": "源码文件"
  },
  "ipc/shm.c": {
    "label": "ipc/shm.c",
    "path": "ipc/shm.c",
    "line": 1,
    "endLine": 24,
    "symbol": "ipc/shm.c",
    "note": "源码文件"
  },
  "kernel/sched/stop_task.c": {
    "label": "kernel/sched/stop_task.c",
    "path": "kernel/sched/stop_task.c",
    "line": 1,
    "endLine": 24,
    "symbol": "kernel/sched/stop_task.c",
    "note": "源码文件"
  },
  "kernel/sched/sched.h": {
    "label": "kernel/sched/sched.h",
    "path": "kernel/sched/sched.h",
    "line": 1,
    "endLine": 24,
    "symbol": "kernel/sched/sched.h",
    "note": "源码文件"
  },
  "mm/vmalloc.c": {
    "label": "mm/vmalloc.c",
    "path": "mm/vmalloc.c",
    "line": 1,
    "endLine": 24,
    "symbol": "mm/vmalloc.c",
    "note": "源码文件"
  },
  "mm/swap_state.c": {
    "label": "mm/swap_state.c",
    "path": "mm/swap_state.c",
    "line": 1,
    "endLine": 24,
    "symbol": "mm/swap_state.c",
    "note": "源码文件"
  },
  "mm/compaction.c": {
    "label": "mm/compaction.c",
    "path": "mm/compaction.c",
    "line": 1,
    "endLine": 24,
    "symbol": "mm/compaction.c",
    "note": "源码文件"
  },
  "include/linux/mm_types.h": {
    "label": "include/linux/mm_types.h",
    "path": "include/linux/mm_types.h",
    "line": 1,
    "endLine": 24,
    "symbol": "include/linux/mm_types.h",
    "note": "源码文件"
  },
  "func": {
    "label": "func",
    "path": "arch/riscv/boot/dts/starfive/jh7110-pinfunc.h",
    "line": 27,
    "endLine": 50,
    "symbol": "func",
    "note": "自动匹配的内核源码"
  },
  "device": {
    "label": "device",
    "path": "arch/riscv/boot/dts/starfive/Makefile",
    "line": 2,
    "endLine": 21,
    "symbol": "device",
    "note": "自动匹配的内核源码"
  },
  "asm": {
    "label": "asm",
    "path": "arch/riscv/boot/loader.lds.S",
    "line": 3,
    "endLine": 18,
    "symbol": "asm",
    "note": "自动匹配的内核源码"
  },
  "_start": {
    "label": "_start",
    "path": "arch/riscv/boot/loader.lds.S",
    "line": 7,
    "endLine": 18,
    "symbol": "_start",
    "note": "自动匹配的内核源码"
  },
  "KERNEL_LINK_ADDR": {
    "label": "KERNEL_LINK_ADDR",
    "path": "arch/riscv/boot/loader.lds.S",
    "line": 11,
    "endLine": 18,
    "symbol": "KERNEL_LINK_ADDR",
    "note": "自动匹配的内核源码"
  },
  "section": {
    "label": "section",
    "path": "arch/riscv/boot/loader.S",
    "line": 4,
    "endLine": 9,
    "symbol": "section",
    "note": "自动匹配的内核源码"
  },
  "file": {
    "label": "file",
    "path": "arch/riscv/boot/Makefile",
    "line": 4,
    "endLine": 27,
    "symbol": "file",
    "note": "自动匹配的内核源码"
  },
  "add": {
    "label": "add",
    "path": "arch/riscv/boot/Makefile",
    "line": 4,
    "endLine": 27,
    "symbol": "add",
    "note": "自动匹配的内核源码"
  },
  "and": {
    "label": "and",
    "path": "arch/riscv/boot/Makefile",
    "line": 5,
    "endLine": 28,
    "symbol": "and",
    "note": "自动匹配的内核源码"
  },
  "main": {
    "label": "main",
    "path": "arch/riscv/boot/Makefile",
    "line": 8,
    "endLine": 31,
    "symbol": "main",
    "note": "自动匹配的内核源码"
  },
  "vmlinux": {
    "label": "vmlinux",
    "path": "arch/riscv/boot/Makefile",
    "line": 23,
    "endLine": 46,
    "symbol": "vmlinux",
    "note": "自动匹配的内核源码"
  },
  "CONFIG_SMP": {
    "label": "CONFIG_SMP",
    "path": "arch/riscv/configs/defconfig",
    "line": 37,
    "endLine": 60,
    "symbol": "CONFIG_SMP",
    "note": "自动匹配的内核源码"
  },
  "root": {
    "label": "root",
    "path": "arch/riscv/configs/nommu_k210_sdcard_defconfig",
    "line": 27,
    "endLine": 50,
    "symbol": "root",
    "note": "自动匹配的内核源码"
  },
  "dev": {
    "label": "dev",
    "path": "arch/riscv/configs/nommu_k210_sdcard_defconfig",
    "line": 27,
    "endLine": 50,
    "symbol": "dev",
    "note": "自动匹配的内核源码"
  },
  "zero": {
    "label": "zero",
    "path": "arch/riscv/crypto/aes-macros.S",
    "line": 59,
    "endLine": 82,
    "symbol": "zero",
    "note": "自动匹配的内核源码"
  },
  "blt": {
    "label": "blt",
    "path": "arch/riscv/crypto/aes-macros.S",
    "line": 82,
    "endLine": 105,
    "symbol": "blt",
    "note": "自动匹配的内核源码"
  },
  "beq": {
    "label": "beq",
    "path": "arch/riscv/crypto/aes-macros.S",
    "line": 91,
    "endLine": 114,
    "symbol": "beq",
    "note": "自动匹配的内核源码"
  },
  "const": {
    "label": "const",
    "path": "arch/riscv/crypto/aes-riscv64-glue.c",
    "line": 24,
    "endLine": 47,
    "symbol": "const",
    "note": "自动匹配的内核源码"
  },
  "struct": {
    "label": "struct",
    "path": "arch/riscv/crypto/aes-riscv64-glue.c",
    "line": 24,
    "endLine": 47,
    "symbol": "struct",
    "note": "自动匹配的内核源码"
  },
  "len": {
    "label": "len",
    "path": "arch/riscv/crypto/aes-riscv64-glue.c",
    "line": 25,
    "endLine": 48,
    "symbol": "len",
    "note": "自动匹配的内核源码"
  },
  "return": {
    "label": "return",
    "path": "arch/riscv/crypto/aes-riscv64-glue.c",
    "line": 77,
    "endLine": 100,
    "symbol": "return",
    "note": "自动匹配的内核源码"
  },
  "inline": {
    "label": "inline",
    "path": "arch/riscv/crypto/aes-riscv64-glue.c",
    "line": 90,
    "endLine": 113,
    "symbol": "inline",
    "note": "自动匹配的内核源码"
  },
  "false": {
    "label": "false",
    "path": "arch/riscv/crypto/aes-riscv64-glue.c",
    "line": 98,
    "endLine": 121,
    "symbol": "false",
    "note": "自动匹配的内核源码"
  },
  "available": {
    "label": "available",
    "path": "arch/riscv/crypto/aes-riscv64-glue.c",
    "line": 186,
    "endLine": 209,
    "symbol": "available",
    "note": "自动匹配的内核源码"
  },
  "unlikely": {
    "label": "unlikely",
    "path": "arch/riscv/crypto/aes-riscv64-glue.c",
    "line": 191,
    "endLine": 214,
    "symbol": "unlikely",
    "note": "自动匹配的内核源码"
  },
  "u32": {
    "label": "u32",
    "path": "arch/riscv/crypto/aes-riscv64-glue.c",
    "line": 238,
    "endLine": 261,
    "symbol": "u32",
    "note": "自动匹配的内核源码"
  },
  "counter": {
    "label": "counter",
    "path": "arch/riscv/crypto/aes-riscv64-glue.c",
    "line": 241,
    "endLine": 264,
    "symbol": "counter",
    "note": "自动匹配的内核源码"
  },
  "aligned": {
    "label": "aligned",
    "path": "arch/riscv/crypto/aes-riscv64-glue.c",
    "line": 247,
    "endLine": 270,
    "symbol": "aligned",
    "note": "自动匹配的内核源码"
  },
  "likely": {
    "label": "likely",
    "path": "arch/riscv/crypto/aes-riscv64-glue.c",
    "line": 370,
    "endLine": 393,
    "symbol": "likely",
    "note": "自动匹配的内核源码"
  },
  "__init": {
    "label": "__init",
    "path": "arch/riscv/crypto/aes-riscv64-glue.c",
    "line": 507,
    "endLine": 530,
    "symbol": "__init",
    "note": "自动匹配的内核源码"
  },
  "__exit": {
    "label": "__exit",
    "path": "arch/riscv/crypto/aes-riscv64-glue.c",
    "line": 545,
    "endLine": 567,
    "symbol": "__exit",
    "note": "自动匹配的内核源码"
  },
  "module_init": {
    "label": "module_init",
    "path": "arch/riscv/crypto/aes-riscv64-glue.c",
    "line": 555,
    "endLine": 567,
    "symbol": "module_init",
    "note": "自动匹配的内核源码"
  },
  "module_exit": {
    "label": "module_exit",
    "path": "arch/riscv/crypto/aes-riscv64-glue.c",
    "line": 556,
    "endLine": 567,
    "symbol": "module_exit",
    "note": "自动匹配的内核源码"
  },
  "srli": {
    "label": "srli",
    "path": "arch/riscv/crypto/aes-riscv64-zvkned-zvbb-zvkg.S",
    "line": 110,
    "endLine": 133,
    "symbol": "srli",
    "note": "自动匹配的内核源码"
  },
  "slli": {
    "label": "slli",
    "path": "arch/riscv/crypto/aes-riscv64-zvkned-zvbb-zvkg.S",
    "line": 122,
    "endLine": 145,
    "symbol": "slli",
    "note": "自动匹配的内核源码"
  },
  "sub": {
    "label": "sub",
    "path": "arch/riscv/crypto/aes-riscv64-zvkned-zvbb-zvkg.S",
    "line": 188,
    "endLine": 211,
    "symbol": "sub",
    "note": "自动匹配的内核源码"
  },
  "next": {
    "label": "next",
    "path": "arch/riscv/crypto/aes-riscv64-zvkned-zvbb-zvkg.S",
    "line": 193,
    "endLine": 216,
    "symbol": "next",
    "note": "自动匹配的内核源码"
  },
  "result": {
    "label": "result",
    "path": "arch/riscv/crypto/aes-riscv64-zvkned-zvbb-zvkg.S",
    "line": 194,
    "endLine": 217,
    "symbol": "result",
    "note": "自动匹配的内核源码"
  },
  "select": {
    "label": "select",
    "path": "arch/riscv/crypto/aes-riscv64-zvkned-zvbb-zvkg.S",
    "line": 202,
    "endLine": 225,
    "symbol": "select",
    "note": "自动匹配的内核源码"
  },
  "bge": {
    "label": "bge",
    "path": "arch/riscv/crypto/aes-riscv64-zvkned-zvbb-zvkg.S",
    "line": 207,
    "endLine": 230,
    "symbol": "bge",
    "note": "自动匹配的内核源码"
  },
  "ret": {
    "label": "ret",
    "path": "arch/riscv/crypto/aes-riscv64-zvkned-zvbb-zvkg.S",
    "line": 225,
    "endLine": 248,
    "symbol": "ret",
    "note": "自动匹配的内核源码"
  },
  "store": {
    "label": "store",
    "path": "arch/riscv/crypto/aes-riscv64-zvkned-zvbb-zvkg.S",
    "line": 234,
    "endLine": 257,
    "symbol": "store",
    "note": "自动匹配的内核源码"
  },
  "always": {
    "label": "always",
    "path": "arch/riscv/crypto/aes-riscv64-zvkned-zvbb-zvkg.S",
    "line": 302,
    "endLine": 313,
    "symbol": "always",
    "note": "自动匹配的内核源码"
  },
  "prev": {
    "label": "prev",
    "path": "arch/riscv/crypto/aes-riscv64-zvkned.S",
    "line": 102,
    "endLine": 125,
    "symbol": "prev",
    "note": "自动匹配的内核源码"
  },
  "memory": {
    "label": "memory",
    "path": "arch/riscv/errata/andes/errata.c",
    "line": 10,
    "endLine": 33,
    "symbol": "memory",
    "note": "自动匹配的内核源码"
  },
  "tmp": {
    "label": "tmp",
    "path": "arch/riscv/errata/mips/errata.c",
    "line": 42,
    "endLine": 65,
    "symbol": "tmp",
    "note": "自动匹配的内核源码"
  },
  "address": {
    "label": "address",
    "path": "arch/riscv/errata/thead/errata.c",
    "line": 47,
    "endLine": 70,
    "symbol": "address",
    "note": "自动匹配的内核源码"
  },
  "sync": {
    "label": "sync",
    "path": "arch/riscv/errata/thead/errata.c",
    "line": 65,
    "endLine": 88,
    "symbol": "sync",
    "note": "自动匹配的内核源码"
  },
  "volatile": {
    "label": "volatile",
    "path": "arch/riscv/errata/thead/errata.c",
    "line": 75,
    "endLine": 98,
    "symbol": "volatile",
    "note": "自动匹配的内核源码"
  },
  "CONFIG_KASAN": {
    "label": "CONFIG_KASAN",
    "path": "arch/riscv/errata/thead/Makefile",
    "line": 6,
    "endLine": 12,
    "symbol": "CONFIG_KASAN",
    "note": "自动匹配的内核源码"
  },
  "u64": {
    "label": "u64",
    "path": "arch/riscv/include/asm/acpi.h",
    "line": 18,
    "endLine": 41,
    "symbol": "u64",
    "note": "自动匹配的内核源码"
  },
  "__VA_ARGS__": {
    "label": "__VA_ARGS__",
    "path": "arch/riscv/include/asm/alternative-macros.h",
    "line": 53,
    "endLine": 76,
    "symbol": "__VA_ARGS__",
    "note": "自动匹配的内核源码"
  },
  "init": {
    "label": "init",
    "path": "arch/riscv/include/asm/alternative.h",
    "line": 15,
    "endLine": 38,
    "symbol": "init",
    "note": "自动匹配的内核源码"
  },
  "s32": {
    "label": "s32",
    "path": "arch/riscv/include/asm/alternative.h",
    "line": 41,
    "endLine": 64,
    "symbol": "s32",
    "note": "自动匹配的内核源码"
  },
  "u16": {
    "label": "u16",
    "path": "arch/riscv/include/asm/alternative.h",
    "line": 43,
    "endLine": 66,
    "symbol": "u16",
    "note": "自动匹配的内核源码"
  },
  "cpu_relax": {
    "label": "cpu_relax",
    "path": "arch/riscv/include/asm/archrandom.h",
    "line": 44,
    "endLine": 67,
    "symbol": "cpu_relax",
    "note": "自动匹配的内核源码"
  },
  "__always_inline": {
    "label": "__always_inline",
    "path": "arch/riscv/include/asm/arch_hweight.h",
    "line": 20,
    "endLine": 43,
    "symbol": "__always_inline",
    "note": "自动匹配的内核源码"
  },
  "reg": {
    "label": "reg",
    "path": "arch/riscv/include/asm/asm-extable.h",
    "line": 56,
    "endLine": 79,
    "symbol": "reg",
    "note": "自动匹配的内核源码"
  },
  "pt_regs": {
    "label": "pt_regs",
    "path": "arch/riscv/include/asm/asm-prototypes.h",
    "line": 34,
    "endLine": 57,
    "symbol": "pt_regs",
    "note": "自动匹配的内核源码"
  },
  "do_trap_ecall_u": {
    "label": "do_trap_ecall_u",
    "path": "arch/riscv/include/asm/asm-prototypes.h",
    "line": 51,
    "endLine": 64,
    "symbol": "do_trap_ecall_u",
    "note": "自动匹配的内核源码"
  },
  "amoswap": {
    "label": "amoswap",
    "path": "arch/riscv/include/asm/asm.h",
    "line": 32,
    "endLine": 55,
    "symbol": "amoswap",
    "note": "自动匹配的内核源码"
  },
  "stack": {
    "label": "stack",
    "path": "arch/riscv/include/asm/asm.h",
    "line": 114,
    "endLine": 137,
    "symbol": "stack",
    "note": "自动匹配的内核源码"
  },
  "s11": {
    "label": "s11",
    "path": "arch/riscv/include/asm/assembler.h",
    "line": 59,
    "endLine": 82,
    "symbol": "s11",
    "note": "自动匹配的内核源码"
  },
  "bne": {
    "label": "bne",
    "path": "arch/riscv/include/asm/assembler.h",
    "line": 79,
    "endLine": 102,
    "symbol": "bne",
    "note": "自动匹配的内核源码"
  },
  "cmpxchg": {
    "label": "cmpxchg",
    "path": "arch/riscv/include/asm/atomic.h",
    "line": 19,
    "endLine": 42,
    "symbol": "cmpxchg",
    "note": "自动匹配的内核源码"
  },
  "atomic_t": {
    "label": "atomic_t",
    "path": "arch/riscv/include/asm/atomic.h",
    "line": 27,
    "endLine": 50,
    "symbol": "atomic_t",
    "note": "自动匹配的内核源码"
  },
  "READ_ONCE": {
    "label": "READ_ONCE",
    "path": "arch/riscv/include/asm/atomic.h",
    "line": 29,
    "endLine": 52,
    "symbol": "READ_ONCE",
    "note": "自动匹配的内核源码"
  },
  "WRITE_ONCE": {
    "label": "WRITE_ONCE",
    "path": "arch/riscv/include/asm/atomic.h",
    "line": 33,
    "endLine": 56,
    "symbol": "WRITE_ONCE",
    "note": "自动匹配的内核源码"
  },
  "s64": {
    "label": "s64",
    "path": "arch/riscv/include/asm/atomic.h",
    "line": 38,
    "endLine": 61,
    "symbol": "s64",
    "note": "自动匹配的内核源码"
  },
  "xor": {
    "label": "xor",
    "path": "arch/riscv/include/asm/atomic.h",
    "line": 77,
    "endLine": 100,
    "symbol": "xor",
    "note": "自动匹配的内核源码"
  },
  "barrier": {
    "label": "barrier",
    "path": "arch/riscv/include/asm/atomic.h",
    "line": 213,
    "endLine": 236,
    "symbol": "barrier",
    "note": "自动匹配的内核源码"
  },
  "fence": {
    "label": "fence",
    "path": "arch/riscv/include/asm/barrier.h",
    "line": 15,
    "endLine": 38,
    "symbol": "fence",
    "note": "自动匹配的内核源码"
  },
  "spinlock": {
    "label": "spinlock",
    "path": "arch/riscv/include/asm/barrier.h",
    "line": 29,
    "endLine": 52,
    "symbol": "spinlock",
    "note": "自动匹配的内核源码"
  },
  "typeof": {
    "label": "typeof",
    "path": "arch/riscv/include/asm/barrier.h",
    "line": 63,
    "endLine": 86,
    "symbol": "typeof",
    "note": "自动匹配的内核源码"
  },
  "clz": {
    "label": "clz",
    "path": "arch/riscv/include/asm/bitops.h",
    "line": 42,
    "endLine": 65,
    "symbol": "clz",
    "note": "自动匹配的内核源码"
  },
  "__builtin_constant_p": {
    "label": "__builtin_constant_p",
    "path": "arch/riscv/include/asm/bitops.h",
    "line": 68,
    "endLine": 91,
    "symbol": "__builtin_constant_p",
    "note": "自动匹配的内核源码"
  },
  "__builtin_clz": {
    "label": "__builtin_clz",
    "path": "arch/riscv/include/asm/bitops.h",
    "line": 156,
    "endLine": 179,
    "symbol": "__builtin_clz",
    "note": "自动匹配的内核源码"
  },
  "test_bit": {
    "label": "test_bit",
    "path": "arch/riscv/include/asm/cacheflush.h",
    "line": 26,
    "endLine": 49,
    "symbol": "test_bit",
    "note": "自动匹配的内核源码"
  },
  "clear_bit": {
    "label": "clear_bit",
    "path": "arch/riscv/include/asm/cacheflush.h",
    "line": 27,
    "endLine": 50,
    "symbol": "clear_bit",
    "note": "自动匹配的内核源码"
  },
  "vm_flags": {
    "label": "vm_flags",
    "path": "arch/riscv/include/asm/cacheflush.h",
    "line": 39,
    "endLine": 62,
    "symbol": "vm_flags",
    "note": "自动匹配的内核源码"
  },
  "VM_EXEC": {
    "label": "VM_EXEC",
    "path": "arch/riscv/include/asm/cacheflush.h",
    "line": 39,
    "endLine": 62,
    "symbol": "VM_EXEC",
    "note": "自动匹配的内核源码"
  },
  "WFI": {
    "label": "WFI",
    "path": "arch/riscv/include/asm/cpuidle.h",
    "line": 18,
    "endLine": 25,
    "symbol": "WFI",
    "note": "自动匹配的内核源码"
  },
  "status": {
    "label": "status",
    "path": "arch/riscv/include/asm/csr.h",
    "line": 21,
    "endLine": 44,
    "symbol": "status",
    "note": "自动匹配的内核源码"
  },
  "exec": {
    "label": "exec",
    "path": "arch/riscv/include/asm/elf.h",
    "line": 48,
    "endLine": 71,
    "symbol": "exec",
    "note": "自动匹配的内核源码"
  },
  "brk": {
    "label": "brk",
    "path": "arch/riscv/include/asm/elf.h",
    "line": 51,
    "endLine": 74,
    "symbol": "brk",
    "note": "自动匹配的内核源码"
  },
  "linux_binprm": {
    "label": "linux_binprm",
    "path": "arch/riscv/include/asm/elf.h",
    "line": 124,
    "endLine": 147,
    "symbol": "linux_binprm",
    "note": "自动匹配的内核源码"
  },
  "pause": {
    "label": "pause",
    "path": "arch/riscv/include/asm/errata_list.h",
    "line": 47,
    "endLine": 70,
    "symbol": "pause",
    "note": "自动匹配的内核源码"
  },
  "match": {
    "label": "match",
    "path": "arch/riscv/include/asm/errata_list.h",
    "line": 49,
    "endLine": 72,
    "symbol": "match",
    "note": "自动匹配的内核源码"
  },
  "ioremap": {
    "label": "ioremap",
    "path": "arch/riscv/include/asm/fixmap.h",
    "line": 44,
    "endLine": 67,
    "symbol": "ioremap",
    "note": "自动匹配的内核源码"
  },
  "syscall": {
    "label": "syscall",
    "path": "arch/riscv/include/asm/ftrace.h",
    "line": 41,
    "endLine": 64,
    "symbol": "syscall",
    "note": "自动匹配的内核源码"
  },
  "vm_area_struct": {
    "label": "vm_area_struct",
    "path": "arch/riscv/include/asm/hugetlb.h",
    "line": 35,
    "endLine": 58,
    "symbol": "vm_area_struct",
    "note": "自动匹配的内核源码"
  },
  "interrupts": {
    "label": "interrupts",
    "path": "arch/riscv/include/asm/irqflags.h",
    "line": 18,
    "endLine": 41,
    "symbol": "interrupts",
    "note": "自动匹配的内核源码"
  },
  "vmalloc": {
    "label": "vmalloc",
    "path": "arch/riscv/include/asm/irq_stack.h",
    "line": 9,
    "endLine": 32,
    "symbol": "vmalloc",
    "note": "自动匹配的内核源码"
  },
  "cmdline": {
    "label": "cmdline",
    "path": "arch/riscv/include/asm/kexec.h",
    "line": 74,
    "endLine": 79,
    "symbol": "cmdline",
    "note": "自动匹配的内核源码"
  },
  "sstatus": {
    "label": "sstatus",
    "path": "arch/riscv/include/asm/kgdb.h",
    "line": 64,
    "endLine": 87,
    "symbol": "sstatus",
    "note": "自动匹配的内核源码"
  },
  "pgd": {
    "label": "pgd",
    "path": "arch/riscv/include/asm/kvm_gstage.h",
    "line": 17,
    "endLine": 40,
    "symbol": "pgd",
    "note": "自动匹配的内核源码"
  },
  "spinlock_t": {
    "label": "spinlock_t",
    "path": "arch/riscv/include/asm/kvm_host.h",
    "line": 165,
    "endLine": 188,
    "symbol": "spinlock_t",
    "note": "自动匹配的内核源码"
  },
  "perf": {
    "label": "perf",
    "path": "arch/riscv/include/asm/kvm_host.h",
    "line": 271,
    "endLine": 294,
    "symbol": "perf",
    "note": "自动匹配的内核源码"
  },
  "flag": {
    "label": "flag",
    "path": "arch/riscv/include/asm/kvm_vcpu_pmu.h",
    "line": 51,
    "endLine": 74,
    "symbol": "flag",
    "note": "自动匹配的内核源码"
  },
  "container_of": {
    "label": "container_of",
    "path": "arch/riscv/include/asm/kvm_vcpu_pmu.h",
    "line": 64,
    "endLine": 87,
    "symbol": "container_of",
    "note": "自动匹配的内核源码"
  },
  "probe": {
    "label": "probe",
    "path": "arch/riscv/include/asm/kvm_vcpu_sbi.h",
    "line": 50,
    "endLine": 73,
    "symbol": "probe",
    "note": "自动匹配的内核源码"
  },
  "runtime": {
    "label": "runtime",
    "path": "arch/riscv/include/asm/kvm_vcpu_timer.h",
    "line": 34,
    "endLine": 53,
    "symbol": "runtime",
    "note": "自动匹配的内核源码"
  },
  "curr": {
    "label": "curr",
    "path": "arch/riscv/include/asm/membarrier.h",
    "line": 14,
    "endLine": 37,
    "symbol": "curr",
    "note": "自动匹配的内核源码"
  },
  "smp_mb": {
    "label": "smp_mb",
    "path": "arch/riscv/include/asm/membarrier.h",
    "line": 47,
    "endLine": 51,
    "symbol": "smp_mb",
    "note": "自动匹配的内核源码"
  },
  "VM_READ": {
    "label": "VM_READ",
    "path": "arch/riscv/include/asm/mman.h",
    "line": 16,
    "endLine": 27,
    "symbol": "VM_READ",
    "note": "自动匹配的内核源码"
  },
  "VM_WRITE": {
    "label": "VM_WRITE",
    "path": "arch/riscv/include/asm/mman.h",
    "line": 16,
    "endLine": 27,
    "symbol": "VM_WRITE",
    "note": "自动匹配的内核源码"
  },
  "readl": {
    "label": "readl",
    "path": "arch/riscv/include/asm/mmio.h",
    "line": 141,
    "endLine": 153,
    "symbol": "readl",
    "note": "自动匹配的内核源码"
  },
  "writel": {
    "label": "writel",
    "path": "arch/riscv/include/asm/mmio.h",
    "line": 145,
    "endLine": 153,
    "symbol": "writel",
    "note": "自动匹配的内核源码"
  },
  "PAGE_OFFSET": {
    "label": "PAGE_OFFSET",
    "path": "arch/riscv/include/asm/page.h",
    "line": 23,
    "endLine": 46,
    "symbol": "PAGE_OFFSET",
    "note": "自动匹配的内核源码"
  },
  "free": {
    "label": "free",
    "path": "arch/riscv/include/asm/page.h",
    "line": 24,
    "endLine": 47,
    "symbol": "free",
    "note": "自动匹配的内核源码"
  },
  "pr_err": {
    "label": "pr_err",
    "path": "arch/riscv/include/asm/pgtable-64.h",
    "line": 268,
    "endLine": 291,
    "symbol": "pr_err",
    "note": "自动匹配的内核源码"
  },
  "swap": {
    "label": "swap",
    "path": "arch/riscv/include/asm/pgtable-bits.h",
    "line": 30,
    "endLine": 53,
    "symbol": "swap",
    "note": "自动匹配的内核源码"
  },
  "VMALLOC_START": {
    "label": "VMALLOC_START",
    "path": "arch/riscv/include/asm/pgtable.h",
    "line": 45,
    "endLine": 68,
    "symbol": "VMALLOC_START",
    "note": "自动匹配的内核源码"
  },
  "MODULES_VADDR": {
    "label": "MODULES_VADDR",
    "path": "arch/riscv/include/asm/pgtable.h",
    "line": 60,
    "endLine": 83,
    "symbol": "MODULES_VADDR",
    "note": "自动匹配的内核源码"
  },
  "TASK_SIZE": {
    "label": "TASK_SIZE",
    "path": "arch/riscv/include/asm/pgtable.h",
    "line": 154,
    "endLine": 177,
    "symbol": "TASK_SIZE",
    "note": "自动匹配的内核源码"
  },
  "xchg": {
    "label": "xchg",
    "path": "arch/riscv/include/asm/pgtable.h",
    "line": 655,
    "endLine": 678,
    "symbol": "xchg",
    "note": "自动匹配的内核源码"
  },
  "mmap": {
    "label": "mmap",
    "path": "arch/riscv/include/asm/processor.h",
    "line": 50,
    "endLine": 73,
    "symbol": "mmap",
    "note": "自动匹配的内核源码"
  },
  "exit": {
    "label": "exit",
    "path": "arch/riscv/include/asm/processor.h",
    "line": 73,
    "endLine": 96,
    "symbol": "exit",
    "note": "自动匹配的内核源码"
  },
  "schedule": {
    "label": "schedule",
    "path": "arch/riscv/include/asm/processor.h",
    "line": 85,
    "endLine": 108,
    "symbol": "schedule",
    "note": "自动匹配的内核源码"
  },
  "top": {
    "label": "top",
    "path": "arch/riscv/include/asm/processor.h",
    "line": 93,
    "endLine": 116,
    "symbol": "top",
    "note": "自动匹配的内核源码"
  },
  "offsetof": {
    "label": "offsetof",
    "path": "arch/riscv/include/asm/processor.h",
    "line": 132,
    "endLine": 155,
    "symbol": "offsetof",
    "note": "自动匹配的内核源码"
  },
  "THREAD_SIZE": {
    "label": "THREAD_SIZE",
    "path": "arch/riscv/include/asm/processor.h",
    "line": 142,
    "endLine": 165,
    "symbol": "THREAD_SIZE",
    "note": "自动匹配的内核源码"
  },
  "cpumask": {
    "label": "cpumask",
    "path": "arch/riscv/include/asm/sbi.h",
    "line": 11,
    "endLine": 34,
    "symbol": "cpumask",
    "note": "自动匹配的内核源码"
  },
  "protocol": {
    "label": "protocol",
    "path": "arch/riscv/include/asm/sbi.h",
    "line": 475,
    "endLine": 498,
    "symbol": "protocol",
    "note": "自动匹配的内核源码"
  },
  "lockdep": {
    "label": "lockdep",
    "path": "arch/riscv/include/asm/simd.h",
    "line": 50,
    "endLine": 65,
    "symbol": "lockdep",
    "note": "自动匹配的内核源码"
  },
  "setup_arch": {
    "label": "setup_arch",
    "path": "arch/riscv/include/asm/smp.h",
    "line": 31,
    "endLine": 54,
    "symbol": "setup_arch",
    "note": "自动匹配的内核源码"
  },
  "__section": {
    "label": "__section",
    "path": "arch/riscv/include/asm/soc.h",
    "line": 16,
    "endLine": 25,
    "symbol": "__section",
    "note": "自动匹配的内核源码"
  },
  "compatible": {
    "label": "compatible",
    "path": "arch/riscv/include/asm/soc.h",
    "line": 17,
    "endLine": 25,
    "symbol": "compatible",
    "note": "自动匹配的内核源码"
  },
  "trylock": {
    "label": "trylock",
    "path": "arch/riscv/include/asm/spinlock.h",
    "line": 35,
    "endLine": 51,
    "symbol": "trylock",
    "note": "自动匹配的内核源码"
  },
  "never": {
    "label": "never",
    "path": "arch/riscv/include/asm/stackprotector.h",
    "line": 11,
    "endLine": 23,
    "symbol": "never",
    "note": "自动匹配的内核源码"
  },
  "memmove": {
    "label": "memmove",
    "path": "arch/riscv/include/asm/string.h",
    "line": 19,
    "endLine": 42,
    "symbol": "memmove",
    "note": "自动匹配的内核源码"
  },
  "satp": {
    "label": "satp",
    "path": "arch/riscv/include/asm/suspend.h",
    "line": 20,
    "endLine": 43,
    "symbol": "satp",
    "note": "自动匹配的内核源码"
  },
  "sys_call_table": {
    "label": "sys_call_table",
    "path": "arch/riscv/include/asm/syscall.h",
    "line": 19,
    "endLine": 42,
    "symbol": "sys_call_table",
    "note": "自动匹配的内核源码"
  },
  "__attribute__": {
    "label": "__attribute__",
    "path": "arch/riscv/include/asm/syscall_wrapper.h",
    "line": 37,
    "endLine": 60,
    "symbol": "__attribute__",
    "note": "自动匹配的内核源码"
  },
  "noinline": {
    "label": "noinline",
    "path": "arch/riscv/include/asm/syscall_wrapper.h",
    "line": 39,
    "endLine": 62,
    "symbol": "noinline",
    "note": "自动匹配的内核源码"
  },
  "preempt_count": {
    "label": "preempt_count",
    "path": "arch/riscv/include/asm/thread_info.h",
    "line": 55,
    "endLine": 78,
    "symbol": "preempt_count",
    "note": "自动匹配的内核源码"
  },
  "batch": {
    "label": "batch",
    "path": "arch/riscv/include/asm/tlbflush.h",
    "line": 64,
    "endLine": 74,
    "symbol": "batch",
    "note": "自动匹配的内核源码"
  },
  "sleep": {
    "label": "sleep",
    "path": "arch/riscv/include/asm/uaccess.h",
    "line": 231,
    "endLine": 254,
    "symbol": "sleep",
    "note": "自动匹配的内核源码"
  },
  "kernel_clone_args": {
    "label": "kernel_clone_args",
    "path": "arch/riscv/include/asm/usercfi.h",
    "line": 18,
    "endLine": 41,
    "symbol": "kernel_clone_args",
    "note": "自动匹配的内核源码"
  },
  "ecall": {
    "label": "ecall",
    "path": "arch/riscv/include/asm/vdso/getrandom.h",
    "line": 20,
    "endLine": 31,
    "symbol": "ecall",
    "note": "自动匹配的内核源码"
  },
  "div": {
    "label": "div",
    "path": "arch/riscv/include/asm/vdso/processor.h",
    "line": 16,
    "endLine": 30,
    "symbol": "div",
    "note": "自动匹配的内核源码"
  },
  "max": {
    "label": "max",
    "path": "arch/riscv/include/asm/vendor_extensions/andes.h",
    "line": 12,
    "endLine": 20,
    "symbol": "max",
    "note": "自动匹配的内核源码"
  },
  "sigreturn": {
    "label": "sigreturn",
    "path": "arch/riscv/include/uapi/asm/ptrace.h",
    "line": 75,
    "endLine": 98,
    "symbol": "sigreturn",
    "note": "自动匹配的内核源码"
  },
  "sysctl": {
    "label": "sysctl",
    "path": "arch/riscv/Kconfig",
    "line": 639,
    "endLine": 662,
    "symbol": "sysctl",
    "note": "自动匹配的内核源码"
  },
  "copy_to_user": {
    "label": "copy_to_user",
    "path": "arch/riscv/Kconfig",
    "line": 648,
    "endLine": 671,
    "symbol": "copy_to_user",
    "note": "自动匹配的内核源码"
  },
  "copy_from_user": {
    "label": "copy_from_user",
    "path": "arch/riscv/Kconfig",
    "line": 648,
    "endLine": 671,
    "symbol": "copy_from_user",
    "note": "自动匹配的内核源码"
  },
  "gcc": {
    "label": "gcc",
    "path": "arch/riscv/Kconfig",
    "line": 867,
    "endLine": 890,
    "symbol": "gcc",
    "note": "自动匹配的内核源码"
  },
  "speed": {
    "label": "speed",
    "path": "arch/riscv/Kconfig",
    "line": 954,
    "endLine": 977,
    "symbol": "speed",
    "note": "自动匹配的内核源码"
  },
  "security": {
    "label": "security",
    "path": "arch/riscv/Kconfig",
    "line": 1148,
    "endLine": 1171,
    "symbol": "security",
    "note": "自动匹配的内核源码"
  },
  "clock": {
    "label": "clock",
    "path": "arch/riscv/Kconfig",
    "line": 1249,
    "endLine": 1272,
    "symbol": "clock",
    "note": "自动匹配的内核源码"
  },
  "memblock": {
    "label": "memblock",
    "path": "arch/riscv/kernel/acpi.c",
    "line": 20,
    "endLine": 43,
    "symbol": "memblock",
    "note": "自动匹配的内核源码"
  },
  "__initdata": {
    "label": "__initdata",
    "path": "arch/riscv/kernel/acpi.c",
    "line": 32,
    "endLine": 55,
    "symbol": "__initdata",
    "note": "自动匹配的内核源码"
  },
  "pr_warn": {
    "label": "pr_warn",
    "path": "arch/riscv/kernel/acpi.c",
    "line": 242,
    "endLine": 265,
    "symbol": "pr_warn",
    "note": "自动匹配的内核源码"
  },
  "pr_info": {
    "label": "pr_info",
    "path": "arch/riscv/kernel/acpi_numa.c",
    "line": 82,
    "endLine": 105,
    "symbol": "pr_info",
    "note": "自动匹配的内核源码"
  },
  "EINTR": {
    "label": "EINTR",
    "path": "arch/riscv/kernel/compat_signal.c",
    "line": 126,
    "endLine": 149,
    "symbol": "EINTR",
    "note": "自动匹配的内核源码"
  },
  "SIGSEGV": {
    "label": "SIGSEGV",
    "path": "arch/riscv/kernel/compat_signal.c",
    "line": 155,
    "endLine": 178,
    "symbol": "SIGSEGV",
    "note": "自动匹配的内核源码"
  },
  "SA_SIGINFO": {
    "label": "SA_SIGINFO",
    "path": "arch/riscv/kernel/compat_signal.c",
    "line": 227,
    "endLine": 244,
    "symbol": "SA_SIGINFO",
    "note": "自动匹配的内核源码"
  },
  "sa_handler": {
    "label": "sa_handler",
    "path": "arch/riscv/kernel/compat_signal.c",
    "line": 230,
    "endLine": 244,
    "symbol": "sa_handler",
    "note": "自动匹配的内核源码"
  },
  "strip": {
    "label": "strip",
    "path": "arch/riscv/kernel/compat_vdso/Makefile",
    "line": 49,
    "endLine": 72,
    "symbol": "strip",
    "note": "自动匹配的内核源码"
  },
  "sort": {
    "label": "sort",
    "path": "arch/riscv/kernel/compat_vdso/Makefile",
    "line": 57,
    "endLine": 73,
    "symbol": "sort",
    "note": "自动匹配的内核源码"
  },
  "idle": {
    "label": "idle",
    "path": "arch/riscv/kernel/cpu-hotplug.c",
    "line": 65,
    "endLine": 77,
    "symbol": "idle",
    "note": "自动匹配的内核源码"
  },
  "__noreturn": {
    "label": "__noreturn",
    "path": "arch/riscv/kernel/cpu-hotplug.c",
    "line": 67,
    "endLine": 77,
    "symbol": "__noreturn",
    "note": "自动匹配的内核源码"
  },
  "show": {
    "label": "show",
    "path": "arch/riscv/kernel/cpu.c",
    "line": 364,
    "endLine": 382,
    "symbol": "show",
    "note": "自动匹配的内核源码"
  },
  "set_bit": {
    "label": "set_bit",
    "path": "arch/riscv/kernel/cpufeature.c",
    "line": 600,
    "endLine": 623,
    "symbol": "set_bit",
    "note": "自动匹配的内核源码"
  },
  "RWX": {
    "label": "RWX",
    "path": "arch/riscv/kernel/efi.c",
    "line": 42,
    "endLine": 65,
    "symbol": "RWX",
    "note": "自动匹配的内核源码"
  },
  "maps": {
    "label": "maps",
    "path": "arch/riscv/kernel/efi.c",
    "line": 52,
    "endLine": 75,
    "symbol": "maps",
    "note": "自动匹配的内核源码"
  },
  "mutex": {
    "label": "mutex",
    "path": "arch/riscv/kernel/ftrace.c",
    "line": 162,
    "endLine": 185,
    "symbol": "mutex",
    "note": "自动匹配的内核源码"
  },
  "smp_wmb": {
    "label": "smp_wmb",
    "path": "arch/riscv/kernel/ftrace.c",
    "line": 194,
    "endLine": 217,
    "symbol": "smp_wmb",
    "note": "自动匹配的内核源码"
  },
  "__bss_start": {
    "label": "__bss_start",
    "path": "arch/riscv/kernel/head.S",
    "line": 273,
    "endLine": 296,
    "symbol": "__bss_start",
    "note": "自动匹配的内核源码"
  },
  "__bss_stop": {
    "label": "__bss_stop",
    "path": "arch/riscv/kernel/head.S",
    "line": 274,
    "endLine": 297,
    "symbol": "__bss_stop",
    "note": "自动匹配的内核源码"
  },
  "wait": {
    "label": "wait",
    "path": "arch/riscv/kernel/head.S",
    "line": 343,
    "endLine": 366,
    "symbol": "wait",
    "note": "自动匹配的内核源码"
  },
  "init_IRQ": {
    "label": "init_IRQ",
    "path": "arch/riscv/kernel/irq.c",
    "line": 142,
    "endLine": 151,
    "symbol": "init_IRQ",
    "note": "自动匹配的内核源码"
  },
  "panic": {
    "label": "panic",
    "path": "arch/riscv/kernel/irq.c",
    "line": 148,
    "endLine": 151,
    "symbol": "panic",
    "note": "自动匹配的内核源码"
  },
  "kexec": {
    "label": "kexec",
    "path": "arch/riscv/kernel/kexec_elf.c",
    "line": 9,
    "endLine": 32,
    "symbol": "kexec",
    "note": "自动匹配的内核源码"
  },
  "PT_LOAD": {
    "label": "PT_LOAD",
    "path": "arch/riscv/kernel/kexec_elf.c",
    "line": 38,
    "endLine": 61,
    "symbol": "PT_LOAD",
    "note": "自动匹配的内核源码"
  },
  "e_entry": {
    "label": "e_entry",
    "path": "arch/riscv/kernel/kexec_elf.c",
    "line": 104,
    "endLine": 127,
    "symbol": "e_entry",
    "note": "自动匹配的内核源码"
  },
  "local_irq_disable": {
    "label": "local_irq_disable",
    "path": "arch/riscv/kernel/machine_kexec.c",
    "line": 110,
    "endLine": 133,
    "symbol": "local_irq_disable",
    "note": "自动匹配的内核源码"
  },
  "crash": {
    "label": "crash",
    "path": "arch/riscv/kernel/machine_kexec.c",
    "line": 118,
    "endLine": 141,
    "symbol": "crash",
    "note": "自动匹配的内核源码"
  },
  "crash_kernel": {
    "label": "crash_kernel",
    "path": "arch/riscv/kernel/machine_kexec.c",
    "line": 142,
    "endLine": 165,
    "symbol": "crash_kernel",
    "note": "自动匹配的内核源码"
  },
  "kfree": {
    "label": "kfree",
    "path": "arch/riscv/kernel/machine_kexec_file.c",
    "line": 83,
    "endLine": 106,
    "symbol": "kfree",
    "note": "自动匹配的内核源码"
  },
  "list_head": {
    "label": "list_head",
    "path": "arch/riscv/kernel/module.c",
    "line": 20,
    "endLine": 43,
    "symbol": "list_head",
    "note": "自动匹配的内核源码"
  },
  "pr_debug": {
    "label": "pr_debug",
    "path": "arch/riscv/kernel/module.c",
    "line": 789,
    "endLine": 812,
    "symbol": "pr_debug",
    "note": "自动匹配的内核源码"
  },
  "printk": {
    "label": "printk",
    "path": "arch/riscv/kernel/paravirt.c",
    "line": 16,
    "endLine": 39,
    "symbol": "printk",
    "note": "自动匹配的内核源码"
  },
  "SYSTEM_RUNNING": {
    "label": "SYSTEM_RUNNING",
    "path": "arch/riscv/kernel/patch.c",
    "line": 32,
    "endLine": 55,
    "symbol": "SYSTEM_RUNNING",
    "note": "自动匹配的内核源码"
  },
  "period": {
    "label": "period",
    "path": "arch/riscv/kernel/probes/kprobes.c",
    "line": 154,
    "endLine": 177,
    "symbol": "period",
    "note": "自动匹配的内核源码"
  },
  "arch_cpu_idle": {
    "label": "arch_cpu_idle",
    "path": "arch/riscv/kernel/process.c",
    "line": 45,
    "endLine": 68,
    "symbol": "arch_cpu_idle",
    "note": "自动匹配的内核源码"
  },
  "clone_flags": {
    "label": "clone_flags",
    "path": "arch/riscv/kernel/process.c",
    "line": 242,
    "endLine": 265,
    "symbol": "clone_flags",
    "note": "自动匹配的内核源码"
  },
  "CLONE_VM": {
    "label": "CLONE_VM",
    "path": "arch/riscv/kernel/process.c",
    "line": 249,
    "endLine": 272,
    "symbol": "CLONE_VM",
    "note": "自动匹配的内核源码"
  },
  "fork": {
    "label": "fork",
    "path": "arch/riscv/kernel/process.c",
    "line": 273,
    "endLine": 296,
    "symbol": "fork",
    "note": "自动匹配的内核源码"
  },
  "htop": {
    "label": "htop",
    "path": "arch/riscv/kernel/sbi.c",
    "line": 261,
    "endLine": 284,
    "symbol": "htop",
    "note": "自动匹配的内核源码"
  },
  "jump_label_init": {
    "label": "jump_label_init",
    "path": "arch/riscv/kernel/setup.c",
    "line": 321,
    "endLine": 344,
    "symbol": "jump_label_init",
    "note": "自动匹配的内核源码"
  },
  "parse_early_param": {
    "label": "parse_early_param",
    "path": "arch/riscv/kernel/setup.c",
    "line": 322,
    "endLine": 345,
    "symbol": "parse_early_param",
    "note": "自动匹配的内核源码"
  },
  "free_initmem": {
    "label": "free_initmem",
    "path": "arch/riscv/kernel/setup.c",
    "line": 377,
    "endLine": 400,
    "symbol": "free_initmem",
    "note": "自动匹配的内核源码"
  },
  "get_signal": {
    "label": "get_signal",
    "path": "arch/riscv/kernel/signal.c",
    "line": 534,
    "endLine": 557,
    "symbol": "get_signal",
    "note": "自动匹配的内核源码"
  },
  "sa_flags": {
    "label": "sa_flags",
    "path": "arch/riscv/kernel/signal.c",
    "line": 544,
    "endLine": 567,
    "symbol": "sa_flags",
    "note": "自动匹配的内核源码"
  },
  "SA_RESTART": {
    "label": "SA_RESTART",
    "path": "arch/riscv/kernel/signal.c",
    "line": 544,
    "endLine": 567,
    "symbol": "SA_RESTART",
    "note": "自动匹配的内核源码"
  },
  "smp_setup_processor_id": {
    "label": "smp_setup_processor_id",
    "path": "arch/riscv/kernel/smp.c",
    "line": 59,
    "endLine": 82,
    "symbol": "smp_setup_processor_id",
    "note": "自动匹配的内核源码"
  },
  "atomic_dec": {
    "label": "atomic_dec",
    "path": "arch/riscv/kernel/smp.c",
    "line": 96,
    "endLine": 119,
    "symbol": "atomic_dec",
    "note": "自动匹配的内核源码"
  },
  "IRQ_HANDLED": {
    "label": "IRQ_HANDLED",
    "path": "arch/riscv/kernel/smp.c",
    "line": 169,
    "endLine": 192,
    "symbol": "IRQ_HANDLED",
    "note": "自动匹配的内核源码"
  },
  "cpu_startup_entry": {
    "label": "cpu_startup_entry",
    "path": "arch/riscv/kernel/smpboot.c",
    "line": 263,
    "endLine": 265,
    "symbol": "cpu_startup_entry",
    "note": "自动匹配的内核源码"
  },
  "atomic_inc": {
    "label": "atomic_inc",
    "path": "arch/riscv/kernel/sys_hwprobe.c",
    "line": 514,
    "endLine": 537,
    "symbol": "atomic_inc",
    "note": "自动匹配的内核源码"
  },
  "atomic_dec_and_test": {
    "label": "atomic_dec_and_test",
    "path": "arch/riscv/kernel/sys_hwprobe.c",
    "line": 519,
    "endLine": 542,
    "symbol": "atomic_dec_and_test",
    "note": "自动匹配的内核源码"
  },
  "time_init": {
    "label": "time_init",
    "path": "arch/riscv/kernel/time.c",
    "line": 20,
    "endLine": 43,
    "symbol": "time_init",
    "note": "自动匹配的内核源码"
  },
  "rdtime": {
    "label": "rdtime",
    "path": "arch/riscv/kernel/unaligned_access_speed.c",
    "line": 95,
    "endLine": 118,
    "symbol": "rdtime",
    "note": "自动匹配的内核源码"
  },
  "alloc_pages": {
    "label": "alloc_pages",
    "path": "arch/riscv/kernel/unaligned_access_speed.c",
    "line": 170,
    "endLine": 193,
    "symbol": "alloc_pages",
    "note": "自动匹配的内核源码"
  },
  "weight": {
    "label": "weight",
    "path": "arch/riscv/kernel/unaligned_access_speed.c",
    "line": 195,
    "endLine": 218,
    "symbol": "weight",
    "note": "自动匹配的内核源码"
  },
  "__setup": {
    "label": "__setup",
    "path": "arch/riscv/kernel/unaligned_access_speed.c",
    "line": 375,
    "endLine": 398,
    "symbol": "__setup",
    "note": "自动匹配的内核源码"
  },
  "clone": {
    "label": "clone",
    "path": "arch/riscv/kernel/usercfi.c",
    "line": 286,
    "endLine": 309,
    "symbol": "clone",
    "note": "自动匹配的内核源码"
  },
  "vm_start": {
    "label": "vm_start",
    "path": "arch/riscv/kernel/vdso.c",
    "line": 39,
    "endLine": 62,
    "symbol": "vm_start",
    "note": "自动匹配的内核源码"
  },
  "ioctl": {
    "label": "ioctl",
    "path": "arch/riscv/kvm/gstage.c",
    "line": 248,
    "endLine": 271,
    "symbol": "ioctl",
    "note": "自动匹配的内核源码"
  },
  "spin_lock": {
    "label": "spin_lock",
    "path": "arch/riscv/kvm/mmu.c",
    "line": 29,
    "endLine": 52,
    "symbol": "spin_lock",
    "note": "自动匹配的内核源码"
  },
  "vm_end": {
    "label": "vm_end",
    "path": "arch/riscv/kvm/mmu.c",
    "line": 197,
    "endLine": 220,
    "symbol": "vm_end",
    "note": "自动匹配的内核源码"
  },
  "smp_rmb": {
    "label": "smp_rmb",
    "path": "arch/riscv/kvm/mmu.c",
    "line": 479,
    "endLine": 502,
    "symbol": "smp_rmb",
    "note": "自动匹配的内核源码"
  },
  "test_and_set_bit": {
    "label": "test_and_set_bit",
    "path": "arch/riscv/kvm/vcpu.c",
    "line": 381,
    "endLine": 404,
    "symbol": "test_and_set_bit",
    "note": "自动匹配的内核源码"
  },
  "TASK_INTERRUPTIBLE": {
    "label": "TASK_INTERRUPTIBLE",
    "path": "arch/riscv/kvm/vcpu.c",
    "line": 672,
    "endLine": 695,
    "symbol": "TASK_INTERRUPTIBLE",
    "note": "自动匹配的内核源码"
  },
  "stat": {
    "label": "stat",
    "path": "arch/riscv/kvm/vcpu.c",
    "line": 945,
    "endLine": 968,
    "symbol": "stat",
    "note": "自动匹配的内核源码"
  },
  "DEFINE_SPINLOCK": {
    "label": "DEFINE_SPINLOCK",
    "path": "arch/riscv/kvm/vmid.c",
    "line": 24,
    "endLine": 47,
    "symbol": "DEFINE_SPINLOCK",
    "note": "自动匹配的内核源码"
  },
  "double": {
    "label": "double",
    "path": "arch/riscv/lib/csum.c",
    "line": 123,
    "endLine": 146,
    "symbol": "double",
    "note": "自动匹配的内核源码"
  },
  "shell": {
    "label": "shell",
    "path": "arch/riscv/Makefile",
    "line": 84,
    "endLine": 107,
    "symbol": "shell",
    "note": "自动匹配的内核源码"
  },
  "echo": {
    "label": "echo",
    "path": "arch/riscv/Makefile",
    "line": 84,
    "endLine": 107,
    "symbol": "echo",
    "note": "自动匹配的内核源码"
  },
  "SIGKILL": {
    "label": "SIGKILL",
    "path": "arch/riscv/mm/fault.c",
    "line": 90,
    "endLine": 113,
    "symbol": "SIGKILL",
    "note": "自动匹配的内核源码"
  },
  "kill": {
    "label": "kill",
    "path": "arch/riscv/mm/fault.c",
    "line": 127,
    "endLine": 150,
    "symbol": "kill",
    "note": "自动匹配的内核源码"
  },
  "handle_mm_fault": {
    "label": "handle_mm_fault",
    "path": "arch/riscv/mm/fault.c",
    "line": 362,
    "endLine": 385,
    "symbol": "handle_mm_fault",
    "note": "自动匹配的内核源码"
  },
  "kmalloc": {
    "label": "kmalloc",
    "path": "arch/riscv/mm/init.c",
    "line": 174,
    "endLine": 197,
    "symbol": "kmalloc",
    "note": "自动匹配的内核源码"
  },
  "restrict": {
    "label": "restrict",
    "path": "arch/riscv/mm/init.c",
    "line": 246,
    "endLine": 269,
    "symbol": "restrict",
    "note": "自动匹配的内核源码"
  },
  "VM_SHARED": {
    "label": "VM_SHARED",
    "path": "arch/riscv/mm/init.c",
    "line": 358,
    "endLine": 381,
    "symbol": "VM_SHARED",
    "note": "自动匹配的内核源码"
  },
  "test_and_clear_bit": {
    "label": "test_and_clear_bit",
    "path": "arch/riscv/mm/pgtable.c",
    "line": 37,
    "endLine": 60,
    "symbol": "test_and_clear_bit",
    "note": "自动匹配的内核源码"
  },
  "s16": {
    "label": "s16",
    "path": "arch/riscv/net/bpf_jit_comp32.c",
    "line": 835,
    "endLine": 858,
    "symbol": "s16",
    "note": "自动匹配的内核源码"
  },
  "mul": {
    "label": "mul",
    "path": "arch/riscv/net/bpf_jit_comp32.c",
    "line": 1057,
    "endLine": 1080,
    "symbol": "mul",
    "note": "自动匹配的内核源码"
  },
  "foo": {
    "label": "foo",
    "path": "arch/riscv/net/bpf_jit_comp64.c",
    "line": 330,
    "endLine": 353,
    "symbol": "foo",
    "note": "自动匹配的内核源码"
  },
  "address_space": {
    "label": "address_space",
    "path": "block/bdev.c",
    "line": 85,
    "endLine": 108,
    "symbol": "address_space",
    "note": "自动匹配的内核源码"
  },
  "s_type": {
    "label": "s_type",
    "path": "block/bdev.c",
    "line": 223,
    "endLine": 246,
    "symbol": "s_type",
    "note": "自动匹配的内核源码"
  },
  "s_blocksize": {
    "label": "s_blocksize",
    "path": "block/bdev.c",
    "line": 243,
    "endLine": 266,
    "symbol": "s_blocksize",
    "note": "自动匹配的内核源码"
  },
  "super_operations": {
    "label": "super_operations",
    "path": "block/bdev.c",
    "line": 420,
    "endLine": 443,
    "symbol": "super_operations",
    "note": "自动匹配的内核源码"
  },
  "i_mode": {
    "label": "i_mode",
    "path": "block/bdev.c",
    "line": 472,
    "endLine": 495,
    "symbol": "i_mode",
    "note": "自动匹配的内核源码"
  },
  "i_ino": {
    "label": "i_ino",
    "path": "block/bdev.c",
    "line": 510,
    "endLine": 533,
    "symbol": "i_ino",
    "note": "自动匹配的内核源码"
  },
  "list_for_each_entry": {
    "label": "list_for_each_entry",
    "path": "block/bdev.c",
    "line": 530,
    "endLine": 553,
    "symbol": "list_for_each_entry",
    "note": "自动匹配的内核源码"
  },
  "s_inodes": {
    "label": "s_inodes",
    "path": "block/bdev.c",
    "line": 530,
    "endLine": 553,
    "symbol": "s_inodes",
    "note": "自动匹配的内核源码"
  },
  "wait_queue_head_t": {
    "label": "wait_queue_head_t",
    "path": "block/bdev.c",
    "line": 607,
    "endLine": 630,
    "symbol": "wait_queue_head_t",
    "note": "自动匹配的内核源码"
  },
  "TASK_UNINTERRUPTIBLE": {
    "label": "TASK_UNINTERRUPTIBLE",
    "path": "block/bdev.c",
    "line": 610,
    "endLine": 633,
    "symbol": "TASK_UNINTERRUPTIBLE",
    "note": "自动匹配的内核源码"
  },
  "f_flags": {
    "label": "f_flags",
    "path": "block/bdev.c",
    "line": 991,
    "endLine": 1014,
    "symbol": "f_flags",
    "note": "自动匹配的内核源码"
  },
  "fsync": {
    "label": "fsync",
    "path": "block/bdev.c",
    "line": 1303,
    "endLine": 1326,
    "symbol": "fsync",
    "note": "自动匹配的内核源码"
  },
  "spin_lock_irqsave": {
    "label": "spin_lock_irqsave",
    "path": "block/bfq-cgroup.c",
    "line": 881,
    "endLine": 904,
    "symbol": "spin_lock_irqsave",
    "note": "自动匹配的内核源码"
  },
  "rcu_read_lock": {
    "label": "rcu_read_lock",
    "path": "block/bfq-cgroup.c",
    "line": 1144,
    "endLine": 1167,
    "symbol": "rcu_read_lock",
    "note": "自动匹配的内核源码"
  },
  "seek": {
    "label": "seek",
    "path": "block/bfq-iosched.c",
    "line": 167,
    "endLine": 190,
    "symbol": "seek",
    "note": "自动匹配的内核源码"
  },
  "systemd": {
    "label": "systemd",
    "path": "block/bfq-iosched.c",
    "line": 1280,
    "endLine": 1303,
    "symbol": "systemd",
    "note": "自动匹配的内核源码"
  },
  "uptodate": {
    "label": "uptodate",
    "path": "block/bfq-iosched.c",
    "line": 2459,
    "endLine": 2482,
    "symbol": "uptodate",
    "note": "自动匹配的内核源码"
  },
  "active_list": {
    "label": "active_list",
    "path": "block/bfq-iosched.c",
    "line": 2651,
    "endLine": 2674,
    "symbol": "active_list",
    "note": "自动匹配的内核源码"
  },
  "kmemleak": {
    "label": "kmemleak",
    "path": "block/bio.c",
    "line": 21,
    "endLine": 44,
    "symbol": "kmemleak",
    "note": "自动匹配的内核源码"
  },
  "submit_bio": {
    "label": "submit_bio",
    "path": "block/bio.c",
    "line": 376,
    "endLine": 399,
    "symbol": "submit_bio",
    "note": "自动匹配的内核源码"
  },
  "nice": {
    "label": "nice",
    "path": "block/blk-cgroup.c",
    "line": 961,
    "endLine": 984,
    "symbol": "nice",
    "note": "自动匹配的内核源码"
  },
  "clamp": {
    "label": "clamp",
    "path": "block/blk-cgroup.c",
    "line": 1947,
    "endLine": 1970,
    "symbol": "clamp",
    "note": "自动匹配的内核源码"
  },
  "kobject": {
    "label": "kobject",
    "path": "block/blk-core.c",
    "line": 483,
    "endLine": 506,
    "symbol": "kobject",
    "note": "自动匹配的内核源码"
  },
  "poll": {
    "label": "poll",
    "path": "block/blk-core.c",
    "line": 931,
    "endLine": 954,
    "symbol": "poll",
    "note": "自动匹配的内核源码"
  },
  "unlink": {
    "label": "unlink",
    "path": "block/blk-crypto-profile.c",
    "line": 399,
    "endLine": 422,
    "symbol": "unlink",
    "note": "自动匹配的内核源码"
  },
  "synchronize_rcu": {
    "label": "synchronize_rcu",
    "path": "block/blk-flush.c",
    "line": 529,
    "endLine": 541,
    "symbol": "synchronize_rcu",
    "note": "自动匹配的内核源码"
  },
  "CAP_SYS_NICE": {
    "label": "CAP_SYS_NICE",
    "path": "block/blk-ioc.c",
    "line": 252,
    "endLine": 275,
    "symbol": "CAP_SYS_NICE",
    "note": "自动匹配的内核源码"
  },
  "PF_EXITING": {
    "label": "PF_EXITING",
    "path": "block/blk-ioc.c",
    "line": 273,
    "endLine": 296,
    "symbol": "PF_EXITING",
    "note": "自动匹配的内核源码"
  },
  "wait_queue_entry": {
    "label": "wait_queue_entry",
    "path": "block/blk-iocost.c",
    "line": 566,
    "endLine": 589,
    "symbol": "wait_queue_entry",
    "note": "自动匹配的内核源码"
  },
  "rmb": {
    "label": "rmb",
    "path": "block/blk-iocost.c",
    "line": 1159,
    "endLine": 1182,
    "symbol": "rmb",
    "note": "自动匹配的内核源码"
  },
  "wmb": {
    "label": "wmb",
    "path": "block/blk-iocost.c",
    "line": 1186,
    "endLine": 1209,
    "symbol": "wmb",
    "note": "自动匹配的内核源码"
  },
  "atomic_add": {
    "label": "atomic_add",
    "path": "block/blk-iolatency.c",
    "line": 349,
    "endLine": 372,
    "symbol": "atomic_add",
    "note": "自动匹配的内核源码"
  },
  "atomic_sub": {
    "label": "atomic_sub",
    "path": "block/blk-iolatency.c",
    "line": 361,
    "endLine": 384,
    "symbol": "atomic_sub",
    "note": "自动匹配的内核源码"
  },
  "bus_type": {
    "label": "bus_type",
    "path": "block/blk-mq-cpumap.c",
    "line": 105,
    "endLine": 128,
    "symbol": "bus_type",
    "note": "自动匹配的内核源码"
  },
  "deadline": {
    "label": "deadline",
    "path": "block/blk-mq-sched.c",
    "line": 158,
    "endLine": 181,
    "symbol": "deadline",
    "note": "自动匹配的内核源码"
  },
  "CONFIG_LOCKDEP": {
    "label": "CONFIG_LOCKDEP",
    "path": "block/blk-mq.c",
    "line": 115,
    "endLine": 138,
    "symbol": "CONFIG_LOCKDEP",
    "note": "自动匹配的内核源码"
  },
  "ksoftirqd": {
    "label": "ksoftirqd",
    "path": "block/blk-mq.c",
    "line": 1281,
    "endLine": 1304,
    "symbol": "ksoftirqd",
    "note": "自动匹配的内核源码"
  },
  "uevent": {
    "label": "uevent",
    "path": "block/blk-sysfs.c",
    "line": 992,
    "endLine": 1015,
    "symbol": "uevent",
    "note": "自动匹配的内核源码"
  },
  "CLOSED": {
    "label": "CLOSED",
    "path": "block/blk-zoned.c",
    "line": 34,
    "endLine": 57,
    "symbol": "CLOSED",
    "note": "自动匹配的内核源码"
  },
  "TASK_RUNNING": {
    "label": "TASK_RUNNING",
    "path": "block/blk-zoned.c",
    "line": 1834,
    "endLine": 1857,
    "symbol": "TASK_RUNNING",
    "note": "自动匹配的内核源码"
  },
  "kthread_create": {
    "label": "kthread_create",
    "path": "block/blk-zoned.c",
    "line": 1911,
    "endLine": 1934,
    "symbol": "kthread_create",
    "note": "自动匹配的内核源码"
  },
  "kref": {
    "label": "kref",
    "path": "block/bsg-lib.c",
    "line": 154,
    "endLine": 177,
    "symbol": "kref",
    "note": "自动匹配的内核源码"
  },
  "cdev": {
    "label": "cdev",
    "path": "block/bsg.c",
    "line": 9,
    "endLine": 32,
    "symbol": "cdev",
    "note": "自动匹配的内核源码"
  },
  "cdev_init": {
    "label": "cdev_init",
    "path": "block/bsg.c",
    "line": 248,
    "endLine": 271,
    "symbol": "cdev_init",
    "note": "自动匹配的内核源码"
  },
  "alloc_chrdev_region": {
    "label": "alloc_chrdev_region",
    "path": "block/bsg.c",
    "line": 290,
    "endLine": 309,
    "symbol": "alloc_chrdev_region",
    "note": "自动匹配的内核源码"
  },
  "removable": {
    "label": "removable",
    "path": "block/disk-events.c",
    "line": 266,
    "endLine": 289,
    "symbol": "removable",
    "note": "自动匹配的内核源码"
  },
  "i_size": {
    "label": "i_size",
    "path": "block/fops.c",
    "line": 599,
    "endLine": 622,
    "symbol": "i_size",
    "note": "自动匹配的内核源码"
  },
  "write_iter": {
    "label": "write_iter",
    "path": "block/fops.c",
    "line": 957,
    "endLine": 979,
    "symbol": "write_iter",
    "note": "自动匹配的内核源码"
  },
  "socket": {
    "label": "socket",
    "path": "block/genhd.c",
    "line": 42,
    "endLine": 65,
    "symbol": "socket",
    "note": "自动匹配的内核源码"
  },
  "udev": {
    "label": "udev",
    "path": "block/genhd.c",
    "line": 85,
    "endLine": 108,
    "symbol": "udev",
    "note": "自动匹配的内核源码"
  },
  "fsck": {
    "label": "fsck",
    "path": "block/Kconfig",
    "line": 86,
    "endLine": 109,
    "symbol": "fsck",
    "note": "自动匹配的内核源码"
  },
  "Applied": {
    "label": "Applied",
    "path": "block/partitions/efi.c",
    "line": 24,
    "endLine": 47,
    "symbol": "Applied",
    "note": "自动匹配的内核源码"
  },
  "packed": {
    "label": "packed",
    "path": "block/partitions/ldm.c",
    "line": 644,
    "endLine": 667,
    "symbol": "packed",
    "note": "自动匹配的内核源码"
  },
  "map_count": {
    "label": "map_count",
    "path": "block/partitions/mac.c",
    "line": 80,
    "endLine": 103,
    "symbol": "map_count",
    "note": "自动匹配的内核源码"
  },
  "get_unaligned": {
    "label": "get_unaligned",
    "path": "block/t10-pi.c",
    "line": 206,
    "endLine": 229,
    "symbol": "get_unaligned",
    "note": "自动匹配的内核源码"
  },
  "put_unaligned": {
    "label": "put_unaligned",
    "path": "block/t10-pi.c",
    "line": 237,
    "endLine": 260,
    "symbol": "put_unaligned",
    "note": "自动匹配的内核源码"
  },
  "d_inode": {
    "label": "d_inode",
    "path": "fs/9p/acl.c",
    "line": 152,
    "endLine": 175,
    "symbol": "d_inode",
    "note": "自动匹配的内核源码"
  },
  "d_parent": {
    "label": "d_parent",
    "path": "fs/9p/fid.c",
    "line": 153,
    "endLine": 176,
    "symbol": "d_parent",
    "note": "自动匹配的内核源码"
  },
  "d_name": {
    "label": "d_name",
    "path": "fs/9p/fid.c",
    "line": 161,
    "endLine": 184,
    "symbol": "d_name",
    "note": "自动匹配的内核源码"
  },
  "s_root": {
    "label": "s_root",
    "path": "fs/9p/fid.c",
    "line": 202,
    "endLine": 225,
    "symbol": "s_root",
    "note": "自动匹配的内核源码"
  },
  "kobj_attribute": {
    "label": "kobj_attribute",
    "path": "fs/9p/v9fs.c",
    "line": 592,
    "endLine": 615,
    "symbol": "kobj_attribute",
    "note": "自动匹配的内核源码"
  },
  "inode_operations": {
    "label": "inode_operations",
    "path": "fs/9p/v9fs.h",
    "line": 190,
    "endLine": 213,
    "symbol": "inode_operations",
    "note": "自动匹配的内核源码"
  },
  "pipe": {
    "label": "pipe",
    "path": "fs/9p/vfs_file.c",
    "line": 376,
    "endLine": 399,
    "symbol": "pipe",
    "note": "自动匹配的内核源码"
  },
  "vm_ops": {
    "label": "vm_ops",
    "path": "fs/9p/vfs_file.c",
    "line": 478,
    "endLine": 501,
    "symbol": "vm_ops",
    "note": "自动匹配的内核源码"
  },
  "vm_file": {
    "label": "vm_file",
    "path": "fs/9p/vfs_file.c",
    "line": 496,
    "endLine": 519,
    "symbol": "vm_file",
    "note": "自动匹配的内核源码"
  },
  "vm_pgoff": {
    "label": "vm_pgoff",
    "path": "fs/9p/vfs_file.c",
    "line": 497,
    "endLine": 520,
    "symbol": "vm_pgoff",
    "note": "自动匹配的内核源码"
  },
  "i_op": {
    "label": "i_op",
    "path": "fs/9p/vfs_inode.c",
    "line": 276,
    "endLine": 299,
    "symbol": "i_op",
    "note": "自动匹配的内核源码"
  },
  "i_nlink": {
    "label": "i_nlink",
    "path": "fs/9p/vfs_inode.c",
    "line": 482,
    "endLine": 505,
    "symbol": "i_nlink",
    "note": "自动匹配的内核源码"
  },
  "mknod": {
    "label": "mknod",
    "path": "fs/9p/vfs_inode.c",
    "line": 640,
    "endLine": 663,
    "symbol": "mknod",
    "note": "自动匹配的内核源码"
  },
  "mkdir": {
    "label": "mkdir",
    "path": "fs/9p/vfs_inode.c",
    "line": 664,
    "endLine": 687,
    "symbol": "mkdir",
    "note": "自动匹配的内核源码"
  },
  "s_maxbytes": {
    "label": "s_maxbytes",
    "path": "fs/9p/vfs_super.c",
    "line": 39,
    "endLine": 62,
    "symbol": "s_maxbytes",
    "note": "自动匹配的内核源码"
  },
  "s_op": {
    "label": "s_op",
    "path": "fs/9p/vfs_super.c",
    "line": 44,
    "endLine": 67,
    "symbol": "s_op",
    "note": "自动匹配的内核源码"
  },
  "qlen": {
    "label": "qlen",
    "path": "fs/adfs/dir.c",
    "line": 333,
    "endLine": 356,
    "symbol": "qlen",
    "note": "自动匹配的内核源码"
  },
  "AF_INET": {
    "label": "AF_INET",
    "path": "fs/afs/addr_list.c",
    "line": 176,
    "endLine": 199,
    "symbol": "AF_INET",
    "note": "自动匹配的内核源码"
  },
  "AF_INET6": {
    "label": "AF_INET6",
    "path": "fs/afs/addr_list.c",
    "line": 178,
    "endLine": 201,
    "symbol": "AF_INET6",
    "note": "自动匹配的内核源码"
  },
  "SOCK_DGRAM": {
    "label": "SOCK_DGRAM",
    "path": "fs/afs/addr_list.c",
    "line": 294,
    "endLine": 317,
    "symbol": "SOCK_DGRAM",
    "note": "自动匹配的内核源码"
  },
  "malloc": {
    "label": "malloc",
    "path": "fs/afs/afs_vl.h",
    "line": 58,
    "endLine": 81,
    "symbol": "malloc",
    "note": "自动匹配的内核源码"
  },
  "ECONNREFUSED": {
    "label": "ECONNREFUSED",
    "path": "fs/afs/cell.c",
    "line": 499,
    "endLine": 522,
    "symbol": "ECONNREFUSED",
    "note": "自动匹配的内核源码"
  },
  "mtu": {
    "label": "mtu",
    "path": "fs/afs/cmservice.c",
    "line": 500,
    "endLine": 523,
    "symbol": "mtu",
    "note": "自动匹配的内核源码"
  },
  "sk_buff": {
    "label": "sk_buff",
    "path": "fs/afs/cm_security.c",
    "line": 22,
    "endLine": 45,
    "symbol": "sk_buff",
    "note": "自动匹配的内核源码"
  },
  "EDEADLK": {
    "label": "EDEADLK",
    "path": "fs/afs/flock.c",
    "line": 789,
    "endLine": 812,
    "symbol": "EDEADLK",
    "note": "自动匹配的内核源码"
  },
  "__initcall": {
    "label": "__initcall",
    "path": "fs/aio.c",
    "line": 359,
    "endLine": 382,
    "symbol": "__initcall",
    "note": "自动匹配的内核源码"
  },
  "do_mmap": {
    "label": "do_mmap",
    "path": "fs/aio.c",
    "line": 606,
    "endLine": 629,
    "symbol": "do_mmap",
    "note": "自动匹配的内核源码"
  },
  "munmap": {
    "label": "munmap",
    "path": "fs/aio.c",
    "line": 969,
    "endLine": 992,
    "symbol": "munmap",
    "note": "自动匹配的内核源码"
  },
  "SIGPIPE": {
    "label": "SIGPIPE",
    "path": "fs/autofs/waitq.c",
    "line": 53,
    "endLine": 76,
    "symbol": "SIGPIPE",
    "note": "自动匹配的内核源码"
  },
  "siginfo_t": {
    "label": "siginfo_t",
    "path": "fs/binfmt_elf.c",
    "line": 62,
    "endLine": 85,
    "symbol": "siginfo_t",
    "note": "自动匹配的内核源码"
  },
  "load_elf_binary": {
    "label": "load_elf_binary",
    "path": "fs/binfmt_elf.c",
    "line": 70,
    "endLine": 93,
    "symbol": "load_elf_binary",
    "note": "自动匹配的内核源码"
  },
  "MAP_PRIVATE": {
    "label": "MAP_PRIVATE",
    "path": "fs/binfmt_elf.c",
    "line": 677,
    "endLine": 700,
    "symbol": "MAP_PRIVATE",
    "note": "自动匹配的内核源码"
  },
  "start_code": {
    "label": "start_code",
    "path": "fs/binfmt_elf.c",
    "line": 846,
    "endLine": 869,
    "symbol": "start_code",
    "note": "自动匹配的内核源码"
  },
  "end_code": {
    "label": "end_code",
    "path": "fs/binfmt_elf.c",
    "line": 846,
    "endLine": 869,
    "symbol": "end_code",
    "note": "自动匹配的内核源码"
  },
  "PT_INTERP": {
    "label": "PT_INTERP",
    "path": "fs/binfmt_elf.c",
    "line": 882,
    "endLine": 905,
    "symbol": "PT_INTERP",
    "note": "自动匹配的内核源码"
  },
  "begin_new_exec": {
    "label": "begin_new_exec",
    "path": "fs/binfmt_elf.c",
    "line": 1010,
    "endLine": 1033,
    "symbol": "begin_new_exec",
    "note": "自动匹配的内核源码"
  },
  "start_stack": {
    "label": "start_stack",
    "path": "fs/binfmt_elf.c",
    "line": 1306,
    "endLine": 1329,
    "symbol": "start_stack",
    "note": "自动匹配的内核源码"
  },
  "start_brk": {
    "label": "start_brk",
    "path": "fs/binfmt_elf.c",
    "line": 1330,
    "endLine": 1353,
    "symbol": "start_brk",
    "note": "自动匹配的内核源码"
  },
  "overcommit": {
    "label": "overcommit",
    "path": "fs/btrfs/block-group.c",
    "line": 1448,
    "endLine": 1471,
    "symbol": "overcommit",
    "note": "自动匹配的内核源码"
  },
  "btrfs_file_read_iter": {
    "label": "btrfs_file_read_iter",
    "path": "fs/btrfs/direct-io.c",
    "line": 487,
    "endLine": 510,
    "symbol": "btrfs_file_read_iter",
    "note": "自动匹配的内核源码"
  },
  "rb_tree": {
    "label": "rb_tree",
    "path": "fs/btrfs/free-space-cache.c",
    "line": 2441,
    "endLine": 2464,
    "symbol": "rb_tree",
    "note": "自动匹配的内核源码"
  },
  "rwlock": {
    "label": "rwlock",
    "path": "fs/btrfs/locking.c",
    "line": 153,
    "endLine": 176,
    "symbol": "rwlock",
    "note": "自动匹配的内核源码"
  },
  "find_first_bit": {
    "label": "find_first_bit",
    "path": "fs/btrfs/relocation.c",
    "line": 3903,
    "endLine": 3926,
    "symbol": "find_first_bit",
    "note": "自动匹配的内核源码"
  },
  "kset": {
    "label": "kset",
    "path": "fs/btrfs/sysfs.c",
    "line": 2245,
    "endLine": 2268,
    "symbol": "kset",
    "note": "自动匹配的内核源码"
  },
  "bdflush": {
    "label": "bdflush",
    "path": "fs/buffer.c",
    "line": 9,
    "endLine": 32,
    "symbol": "bdflush",
    "note": "自动匹配的内核源码"
  },
  "kernel_thread": {
    "label": "kernel_thread",
    "path": "fs/buffer.c",
    "line": 9,
    "endLine": 32,
    "symbol": "kernel_thread",
    "note": "自动匹配的内核源码"
  },
  "do_exit": {
    "label": "do_exit",
    "path": "fs/cachefiles/namei.c",
    "line": 529,
    "endLine": 552,
    "symbol": "do_exit",
    "note": "自动匹配的内核源码"
  },
  "madvise": {
    "label": "madvise",
    "path": "fs/ceph/addr.c",
    "line": 498,
    "endLine": 521,
    "symbol": "madvise",
    "note": "自动匹配的内核源码"
  },
  "d_children": {
    "label": "d_children",
    "path": "fs/ceph/dir.c",
    "line": 178,
    "endLine": 201,
    "symbol": "d_children",
    "note": "自动匹配的内核源码"
  },
  "write_pos": {
    "label": "write_pos",
    "path": "fs/ceph/file.c",
    "line": 1789,
    "endLine": 1812,
    "symbol": "write_pos",
    "note": "自动匹配的内核源码"
  },
  "cat": {
    "label": "cat",
    "path": "fs/ceph/super.h",
    "line": 35,
    "endLine": 58,
    "symbol": "cat",
    "note": "自动匹配的内核源码"
  },
  "cdev_add": {
    "label": "cdev_add",
    "path": "fs/char_dev.c",
    "line": 285,
    "endLine": 308,
    "symbol": "cdev_add",
    "note": "自动匹配的内核源码"
  },
  "cfs": {
    "label": "cfs",
    "path": "fs/coda/psdev.c",
    "line": 372,
    "endLine": 395,
    "symbol": "cfs",
    "note": "自动匹配的内核源码"
  },
  "SIGSTOP": {
    "label": "SIGSTOP",
    "path": "fs/coda/upcall.c",
    "line": 623,
    "endLine": 646,
    "symbol": "SIGSTOP",
    "note": "自动匹配的内核源码"
  },
  "SIGINT": {
    "label": "SIGINT",
    "path": "fs/coda/upcall.c",
    "line": 624,
    "endLine": 647,
    "symbol": "SIGINT",
    "note": "自动匹配的内核源码"
  },
  "exit_code": {
    "label": "exit_code",
    "path": "fs/coredump.c",
    "line": 484,
    "endLine": 507,
    "symbol": "exit_code",
    "note": "自动匹配的内核源码"
  },
  "TIF_SIGPENDING": {
    "label": "TIF_SIGPENDING",
    "path": "fs/coredump.c",
    "line": 516,
    "endLine": 539,
    "symbol": "TIF_SIGPENDING",
    "note": "自动匹配的内核源码"
  },
  "AF_UNIX": {
    "label": "AF_UNIX",
    "path": "fs/coredump.c",
    "line": 673,
    "endLine": 696,
    "symbol": "AF_UNIX",
    "note": "自动匹配的内核源码"
  },
  "sun_path": {
    "label": "sun_path",
    "path": "fs/coredump.c",
    "line": 679,
    "endLine": 702,
    "symbol": "sun_path",
    "note": "自动匹配的内核源码"
  },
  "SOCK_STREAM": {
    "label": "SOCK_STREAM",
    "path": "fs/coredump.c",
    "line": 690,
    "endLine": 713,
    "symbol": "SOCK_STREAM",
    "note": "自动匹配的内核源码"
  },
  "remap_pfn_range": {
    "label": "remap_pfn_range",
    "path": "fs/cramfs/inode.c",
    "line": 406,
    "endLine": 429,
    "symbol": "remap_pfn_range",
    "note": "自动匹配的内核源码"
  },
  "request_key": {
    "label": "request_key",
    "path": "fs/crypto/keysetup_v1.c",
    "line": 55,
    "endLine": 78,
    "symbol": "request_key",
    "note": "自动匹配的内核源码"
  },
  "vfs_caches_init": {
    "label": "vfs_caches_init",
    "path": "fs/dcache.c",
    "line": 3401,
    "endLine": 3412,
    "symbol": "vfs_caches_init",
    "note": "自动匹配的内核源码"
  },
  "CLOSE_WAIT": {
    "label": "CLOSE_WAIT",
    "path": "fs/dlm/midcomms.c",
    "line": 58,
    "endLine": 81,
    "symbol": "CLOSE_WAIT",
    "note": "自动匹配的内核源码"
  },
  "ESTABLISHED": {
    "label": "ESTABLISHED",
    "path": "fs/dlm/midcomms.c",
    "line": 238,
    "endLine": 261,
    "symbol": "ESTABLISHED",
    "note": "自动匹配的内核源码"
  },
  "do_execveat_common": {
    "label": "do_execveat_common",
    "path": "fs/exec.c",
    "line": 431,
    "endLine": 454,
    "symbol": "do_execveat_common",
    "note": "自动匹配的内核源码"
  },
  "vfs_read": {
    "label": "vfs_read",
    "path": "fs/exec.c",
    "line": 824,
    "endLine": 847,
    "symbol": "vfs_read",
    "note": "自动匹配的内核源码"
  },
  "exit_notify": {
    "label": "exit_notify",
    "path": "fs/exec.c",
    "line": 950,
    "endLine": 973,
    "symbol": "exit_notify",
    "note": "自动匹配的内核源码"
  },
  "exit_state": {
    "label": "exit_state",
    "path": "fs/exec.c",
    "line": 953,
    "endLine": 976,
    "symbol": "exit_state",
    "note": "自动匹配的内核源码"
  },
  "exit_signal": {
    "label": "exit_signal",
    "path": "fs/exec.c",
    "line": 998,
    "endLine": 1021,
    "symbol": "exit_signal",
    "note": "自动匹配的内核源码"
  },
  "SIGCHLD": {
    "label": "SIGCHLD",
    "path": "fs/exec.c",
    "line": 998,
    "endLine": 1021,
    "symbol": "SIGCHLD",
    "note": "自动匹配的内核源码"
  },
  "EXIT_ZOMBIE": {
    "label": "EXIT_ZOMBIE",
    "path": "fs/exec.c",
    "line": 1001,
    "endLine": 1024,
    "symbol": "EXIT_ZOMBIE",
    "note": "自动匹配的内核源码"
  },
  "do_wait": {
    "label": "do_wait",
    "path": "fs/exec.c",
    "line": 1005,
    "endLine": 1028,
    "symbol": "do_wait",
    "note": "自动匹配的内核源码"
  },
  "CLONE_SIGHAND": {
    "label": "CLONE_SIGHAND",
    "path": "fs/exec.c",
    "line": 1040,
    "endLine": 1063,
    "symbol": "CLONE_SIGHAND",
    "note": "自动匹配的内核源码"
  },
  "CLONE_THREAD": {
    "label": "CLONE_THREAD",
    "path": "fs/exec.c",
    "line": 1050,
    "endLine": 1073,
    "symbol": "CLONE_THREAD",
    "note": "自动匹配的内核源码"
  },
  "search_binary_handler": {
    "label": "search_binary_handler",
    "path": "fs/exec.c",
    "line": 1089,
    "endLine": 1112,
    "symbol": "search_binary_handler",
    "note": "自动匹配的内核源码"
  },
  "execve": {
    "label": "execve",
    "path": "fs/exec.c",
    "line": 1121,
    "endLine": 1144,
    "symbol": "execve",
    "note": "自动匹配的内核源码"
  },
  "exec_binprm": {
    "label": "exec_binprm",
    "path": "fs/exec.c",
    "line": 1447,
    "endLine": 1470,
    "symbol": "exec_binprm",
    "note": "自动匹配的内核源码"
  },
  "CLONE_FS": {
    "label": "CLONE_FS",
    "path": "fs/exec.c",
    "line": 1507,
    "endLine": 1530,
    "symbol": "CLONE_FS",
    "note": "自动匹配的内核源码"
  },
  "fdatasync": {
    "label": "fdatasync",
    "path": "fs/ext4/ext4.h",
    "line": 1179,
    "endLine": 1202,
    "symbol": "fdatasync",
    "note": "自动匹配的内核源码"
  },
  "ext4_file_read_iter": {
    "label": "ext4_file_read_iter",
    "path": "fs/ext4/file.c",
    "line": 130,
    "endLine": 153,
    "symbol": "ext4_file_read_iter",
    "note": "自动匹配的内核源码"
  },
  "exe": {
    "label": "exe",
    "path": "fs/fat/fat.h",
    "line": 43,
    "endLine": 66,
    "symbol": "exe",
    "note": "自动匹配的内核源码"
  },
  "FD_CLOEXEC": {
    "label": "FD_CLOEXEC",
    "path": "fs/fcntl.c",
    "line": 467,
    "endLine": 490,
    "symbol": "FD_CLOEXEC",
    "note": "自动匹配的内核源码"
  },
  "find_last_bit": {
    "label": "find_last_bit",
    "path": "fs/file.c",
    "line": 366,
    "endLine": 389,
    "symbol": "find_last_bit",
    "note": "自动匹配的内核源码"
  },
  "exit_files": {
    "label": "exit_files",
    "path": "fs/file.c",
    "line": 518,
    "endLine": 541,
    "symbol": "exit_files",
    "note": "自动匹配的内核源码"
  },
  "dup2": {
    "label": "dup2",
    "path": "fs/file.c",
    "line": 1302,
    "endLine": 1325,
    "symbol": "dup2",
    "note": "自动匹配的内核源码"
  },
  "exit_fs": {
    "label": "exit_fs",
    "path": "fs/fs_struct.c",
    "line": 90,
    "endLine": 113,
    "symbol": "exit_fs",
    "note": "自动匹配的内核源码"
  },
  "pipe_buffer": {
    "label": "pipe_buffer",
    "path": "fs/fuse/dev.c",
    "line": 858,
    "endLine": 881,
    "symbol": "pipe_buffer",
    "note": "自动匹配的内核源码"
  },
  "dirty_ratio": {
    "label": "dirty_ratio",
    "path": "fs/fuse/inode.c",
    "line": 1634,
    "endLine": 1657,
    "symbol": "dirty_ratio",
    "note": "自动匹配的内核源码"
  },
  "id_table": {
    "label": "id_table",
    "path": "fs/fuse/virtio_fs.c",
    "line": 1235,
    "endLine": 1258,
    "symbol": "id_table",
    "note": "自动匹配的内核源码"
  },
  "nr_inodes": {
    "label": "nr_inodes",
    "path": "fs/gfs2/inode.c",
    "line": 611,
    "endLine": 634,
    "symbol": "nr_inodes",
    "note": "自动匹配的内核源码"
  },
  "hugetlbfs": {
    "label": "hugetlbfs",
    "path": "fs/hugetlbfs/inode.c",
    "line": 43,
    "endLine": 66,
    "symbol": "hugetlbfs",
    "note": "自动匹配的内核源码"
  },
  "shmget": {
    "label": "shmget",
    "path": "fs/hugetlbfs/inode.c",
    "line": 153,
    "endLine": 176,
    "symbol": "shmget",
    "note": "自动匹配的内核源码"
  },
  "CONFIG_PROVE_LOCKING": {
    "label": "CONFIG_PROVE_LOCKING",
    "path": "fs/jbd2/journal.c",
    "line": 657,
    "endLine": 680,
    "symbol": "CONFIG_PROVE_LOCKING",
    "note": "自动匹配的内核源码"
  },
  "SIGHUP": {
    "label": "SIGHUP",
    "path": "fs/jffs2/background.c",
    "line": 31,
    "endLine": 54,
    "symbol": "SIGHUP",
    "note": "自动匹配的内核源码"
  },
  "vfs_write": {
    "label": "vfs_write",
    "path": "fs/kernfs/dir.c",
    "line": 1514,
    "endLine": 1537,
    "symbol": "vfs_write",
    "note": "自动匹配的内核源码"
  },
  "f_count": {
    "label": "f_count",
    "path": "fs/lockd/lockd.h",
    "line": 196,
    "endLine": 219,
    "symbol": "f_count",
    "note": "自动匹配的内核源码"
  },
  "nlattr": {
    "label": "nlattr",
    "path": "fs/lockd/svc.c",
    "line": 716,
    "endLine": 739,
    "symbol": "nlattr",
    "note": "自动匹配的内核源码"
  },
  "link_path_walk": {
    "label": "link_path_walk",
    "path": "fs/namei.c",
    "line": 2574,
    "endLine": 2597,
    "symbol": "link_path_walk",
    "note": "自动匹配的内核源码"
  },
  "path_openat": {
    "label": "path_openat",
    "path": "fs/namei.c",
    "line": 4838,
    "endLine": 4861,
    "symbol": "path_openat",
    "note": "自动匹配的内核源码"
  },
  "CLONE_NEWNS": {
    "label": "CLONE_NEWNS",
    "path": "fs/namespace.c",
    "line": 175,
    "endLine": 198,
    "symbol": "CLONE_NEWNS",
    "note": "自动匹配的内核源码"
  },
  "____cacheline_aligned": {
    "label": "____cacheline_aligned",
    "path": "fs/nfs/iostat.h",
    "line": 21,
    "endLine": 44,
    "symbol": "____cacheline_aligned",
    "note": "自动匹配的内核源码"
  },
  "keyctl": {
    "label": "keyctl",
    "path": "fs/nfs/nfs4idmap.c",
    "line": 44,
    "endLine": 67,
    "symbol": "keyctl",
    "note": "自动匹配的内核源码"
  },
  "net_device": {
    "label": "net_device",
    "path": "fs/nfsd/nfssvc.c",
    "line": 437,
    "endLine": 460,
    "symbol": "net_device",
    "note": "自动匹配的内核源码"
  },
  "sendmsg": {
    "label": "sendmsg",
    "path": "fs/nfsd/vfs.c",
    "line": 996,
    "endLine": 1019,
    "symbol": "sendmsg",
    "note": "自动匹配的内核源码"
  },
  "watchdog": {
    "label": "watchdog",
    "path": "fs/notify/fanotify/fanotify.h",
    "line": 445,
    "endLine": 468,
    "symbol": "watchdog",
    "note": "自动匹配的内核源码"
  },
  "CLONE_NEWPID": {
    "label": "CLONE_NEWPID",
    "path": "fs/nsfs.c",
    "line": 255,
    "endLine": 278,
    "symbol": "CLONE_NEWPID",
    "note": "自动匹配的内核源码"
  },
  "CLONE_NEWNET": {
    "label": "CLONE_NEWNET",
    "path": "fs/nsfs.c",
    "line": 493,
    "endLine": 516,
    "symbol": "CLONE_NEWNET",
    "note": "自动匹配的内核源码"
  },
  "CLONE_NEWUTS": {
    "label": "CLONE_NEWUTS",
    "path": "fs/nsfs.c",
    "line": 509,
    "endLine": 532,
    "symbol": "CLONE_NEWUTS",
    "note": "自动匹配的内核源码"
  },
  "__builtin_unreachable": {
    "label": "__builtin_unreachable",
    "path": "fs/ntfs3/frecord.c",
    "line": 2412,
    "endLine": 2435,
    "symbol": "__builtin_unreachable",
    "note": "自动匹配的内核源码"
  },
  "sock_create": {
    "label": "sock_create",
    "path": "fs/ocfs2/cluster/tcp.c",
    "line": 1562,
    "endLine": 1585,
    "symbol": "sock_create",
    "note": "自动匹配的内核源码"
  },
  "LISTEN": {
    "label": "LISTEN",
    "path": "fs/ocfs2/cluster/tcp.c",
    "line": 1955,
    "endLine": 1978,
    "symbol": "LISTEN",
    "note": "自动匹配的内核源码"
  },
  "do_sys_open": {
    "label": "do_sys_open",
    "path": "fs/ocfs2/file.c",
    "line": 1363,
    "endLine": 1386,
    "symbol": "do_sys_open",
    "note": "自动匹配的内核源码"
  },
  "openat": {
    "label": "openat",
    "path": "fs/open.c",
    "line": 1381,
    "endLine": 1404,
    "symbol": "openat",
    "note": "自动匹配的内核源码"
  },
  "SIG_IGN": {
    "label": "SIG_IGN",
    "path": "fs/proc/array.c",
    "line": 256,
    "endLine": 279,
    "symbol": "SIG_IGN",
    "note": "自动匹配的内核源码"
  },
  "SIG_DFL": {
    "label": "SIG_DFL",
    "path": "fs/proc/array.c",
    "line": 258,
    "endLine": 281,
    "symbol": "SIG_DFL",
    "note": "自动匹配的内核源码"
  },
  "oom_score_adj": {
    "label": "oom_score_adj",
    "path": "fs/proc/base.c",
    "line": 1113,
    "endLine": 1136,
    "symbol": "oom_score_adj",
    "note": "自动匹配的内核源码"
  },
  "is_global_init": {
    "label": "is_global_init",
    "path": "fs/proc/base.c",
    "line": 1188,
    "endLine": 1211,
    "symbol": "is_global_init",
    "note": "自动匹配的内核源码"
  },
  "oom_score": {
    "label": "oom_score",
    "path": "fs/proc/base.c",
    "line": 3381,
    "endLine": 3404,
    "symbol": "oom_score",
    "note": "自动匹配的内核源码"
  },
  "rmmod": {
    "label": "rmmod",
    "path": "fs/proc/inode.c",
    "line": 225,
    "endLine": 248,
    "symbol": "rmmod",
    "note": "自动匹配的内核源码"
  },
  "mempolicy": {
    "label": "mempolicy",
    "path": "fs/proc/internal.h",
    "line": 19,
    "endLine": 42,
    "symbol": "mempolicy",
    "note": "自动匹配的内核源码"
  },
  "nr_running": {
    "label": "nr_running",
    "path": "fs/proc/loadavg.c",
    "line": 24,
    "endLine": 38,
    "symbol": "nr_running",
    "note": "自动匹配的内核源码"
  },
  "total_vm": {
    "label": "total_vm",
    "path": "fs/proc/task_mmu.c",
    "line": 40,
    "endLine": 63,
    "symbol": "total_vm",
    "note": "自动匹配的内核源码"
  },
  "platform_get_resource": {
    "label": "platform_get_resource",
    "path": "fs/pstore/ram.c",
    "line": 657,
    "endLine": 680,
    "symbol": "platform_get_resource",
    "note": "自动匹配的内核源码"
  },
  "platform_driver": {
    "label": "platform_driver",
    "path": "fs/pstore/ram.c",
    "line": 903,
    "endLine": 926,
    "symbol": "platform_driver",
    "note": "自动匹配的内核源码"
  },
  "of_match_table": {
    "label": "of_match_table",
    "path": "fs/pstore/ram.c",
    "line": 908,
    "endLine": 931,
    "symbol": "of_match_table",
    "note": "自动匹配的内核源码"
  },
  "try_to_wake_up": {
    "label": "try_to_wake_up",
    "path": "fs/select.c",
    "line": 191,
    "endLine": 214,
    "symbol": "try_to_wake_up",
    "note": "自动匹配的内核源码"
  },
  "read_pos": {
    "label": "read_pos",
    "path": "fs/seq_file.c",
    "line": 195,
    "endLine": 218,
    "symbol": "read_pos",
    "note": "自动匹配的内核源码"
  },
  "add_key": {
    "label": "add_key",
    "path": "fs/smb/client/cifsacl.c",
    "line": 471,
    "endLine": 494,
    "symbol": "add_key",
    "note": "自动匹配的内核源码"
  },
  "passwd": {
    "label": "passwd",
    "path": "fs/smb/client/cifsproto.h",
    "line": 324,
    "endLine": 347,
    "symbol": "passwd",
    "note": "自动匹配的内核源码"
  },
  "request_sock": {
    "label": "request_sock",
    "path": "fs/smb/server/connection.h",
    "line": 15,
    "endLine": 38,
    "symbol": "request_sock",
    "note": "自动匹配的内核源码"
  },
  "netdev": {
    "label": "netdev",
    "path": "fs/smb/server/smb2pdu.c",
    "line": 7960,
    "endLine": 7983,
    "symbol": "netdev",
    "note": "自动匹配的内核源码"
  },
  "sys_write": {
    "label": "sys_write",
    "path": "fs/ubifs/file.c",
    "line": 31,
    "endLine": 54,
    "symbol": "sys_write",
    "note": "自动匹配的内核源码"
  },
  "sys_read": {
    "label": "sys_read",
    "path": "fs/ubifs/file.c",
    "line": 35,
    "endLine": 58,
    "symbol": "sys_read",
    "note": "自动匹配的内核源码"
  },
  "device_driver": {
    "label": "device_driver",
    "path": "include/linux/acpi.h",
    "line": 752,
    "endLine": 775,
    "symbol": "device_driver",
    "note": "自动匹配的内核源码"
  },
  "objtool": {
    "label": "objtool",
    "path": "include/linux/annotate.h",
    "line": 65,
    "endLine": 88,
    "symbol": "objtool",
    "note": "自动匹配的内核源码"
  },
  "NAK": {
    "label": "NAK",
    "path": "include/linux/bcma/bcma_driver_pci.h",
    "line": 152,
    "endLine": 175,
    "symbol": "NAK",
    "note": "自动匹配的内核源码"
  },
  "BPF_PROG_TYPE_SOCKET_FILTER": {
    "label": "BPF_PROG_TYPE_SOCKET_FILTER",
    "path": "include/linux/bpf_types.h",
    "line": 5,
    "endLine": 28,
    "symbol": "BPF_PROG_TYPE_SOCKET_FILTER",
    "note": "自动匹配的内核源码"
  },
  "BPF_PROG_TYPE_XDP": {
    "label": "BPF_PROG_TYPE_XDP",
    "path": "include/linux/bpf_types.h",
    "line": 11,
    "endLine": 34,
    "symbol": "BPF_PROG_TYPE_XDP",
    "note": "自动匹配的内核源码"
  },
  "BPF_PROG_TYPE_KPROBE": {
    "label": "BPF_PROG_TYPE_KPROBE",
    "path": "include/linux/bpf_types.h",
    "line": 39,
    "endLine": 62,
    "symbol": "BPF_PROG_TYPE_KPROBE",
    "note": "自动匹配的内核源码"
  },
  "BPF_PROG_TYPE_TRACEPOINT": {
    "label": "BPF_PROG_TYPE_TRACEPOINT",
    "path": "include/linux/bpf_types.h",
    "line": 41,
    "endLine": 64,
    "symbol": "BPF_PROG_TYPE_TRACEPOINT",
    "note": "自动匹配的内核源码"
  },
  "sk_buff_head": {
    "label": "sk_buff_head",
    "path": "include/linux/can/rx-offload.h",
    "line": 22,
    "endLine": 45,
    "symbol": "sk_buff_head",
    "note": "自动匹配的内核源码"
  },
  "TCP_NODELAY": {
    "label": "TCP_NODELAY",
    "path": "include/linux/ceph/libceph.h",
    "line": 35,
    "endLine": 58,
    "symbol": "TCP_NODELAY",
    "note": "自动匹配的内核源码"
  },
  "delta_exec": {
    "label": "delta_exec",
    "path": "include/linux/cgroup.h",
    "line": 794,
    "endLine": 817,
    "symbol": "delta_exec",
    "note": "自动匹配的内核源码"
  },
  "clocks": {
    "label": "clocks",
    "path": "include/linux/clk/davinci.h",
    "line": 14,
    "endLine": 18,
    "symbol": "clocks",
    "note": "自动匹配的内核源码"
  },
  "sa_mask": {
    "label": "sa_mask",
    "path": "include/linux/compat.h",
    "line": 147,
    "endLine": 170,
    "symbol": "sa_mask",
    "note": "自动匹配的内核源码"
  },
  "__builtin_expect": {
    "label": "__builtin_expect",
    "path": "include/linux/compiler.h",
    "line": 19,
    "endLine": 42,
    "symbol": "__builtin_expect",
    "note": "自动匹配的内核源码"
  },
  "always_inline": {
    "label": "always_inline",
    "path": "include/linux/compiler_attributes.h",
    "line": 49,
    "endLine": 72,
    "symbol": "always_inline",
    "note": "自动匹配的内核源码"
  },
  "console_init": {
    "label": "console_init",
    "path": "include/linux/console.h",
    "line": 738,
    "endLine": 745,
    "symbol": "console_init",
    "note": "自动匹配的内核源码"
  },
  "boot_cpu_init": {
    "label": "boot_cpu_init",
    "path": "include/linux/cpu.h",
    "line": 33,
    "endLine": 56,
    "symbol": "boot_cpu_init",
    "note": "自动匹配的内核源码"
  },
  "CPUHP_ONLINE": {
    "label": "CPUHP_ONLINE",
    "path": "include/linux/cpuhotplug.h",
    "line": 27,
    "endLine": 50,
    "symbol": "CPUHP_ONLINE",
    "note": "自动匹配的内核源码"
  },
  "MADV_NOHUGEPAGE": {
    "label": "MADV_NOHUGEPAGE",
    "path": "include/linux/damon.h",
    "line": 123,
    "endLine": 146,
    "symbol": "MADV_NOHUGEPAGE",
    "note": "自动匹配的内核源码"
  },
  "debug_objects_early_init": {
    "label": "debug_objects_early_init",
    "path": "include/linux/debugobjects.h",
    "line": 89,
    "endLine": 112,
    "symbol": "debug_objects_early_init",
    "note": "自动匹配的内核源码"
  },
  "bus_register": {
    "label": "bus_register",
    "path": "include/linux/device/bus.h",
    "line": 116,
    "endLine": 139,
    "symbol": "bus_register",
    "note": "自动匹配的内核源码"
  },
  "dma_sync_single_for_cpu": {
    "label": "dma_sync_single_for_cpu",
    "path": "include/linux/dma-mapping.h",
    "line": 435,
    "endLine": 458,
    "symbol": "dma_sync_single_for_cpu",
    "note": "自动匹配的内核源码"
  },
  "dma_sync_single_for_device": {
    "label": "dma_sync_single_for_device",
    "path": "include/linux/dma-mapping.h",
    "line": 442,
    "endLine": 465,
    "symbol": "dma_sync_single_for_device",
    "note": "自动匹配的内核源码"
  },
  "dma_map_single": {
    "label": "dma_map_single",
    "path": "include/linux/dma-mapping.h",
    "line": 603,
    "endLine": 626,
    "symbol": "dma_map_single",
    "note": "自动匹配的内核源码"
  },
  "dma_unmap_single": {
    "label": "dma_unmap_single",
    "path": "include/linux/dma-mapping.h",
    "line": 604,
    "endLine": 627,
    "symbol": "dma_unmap_single",
    "note": "自动匹配的内核源码"
  },
  "nlmsghdr": {
    "label": "nlmsghdr",
    "path": "include/linux/drbd_genl.h",
    "line": 5,
    "endLine": 28,
    "symbol": "nlmsghdr",
    "note": "自动匹配的内核源码"
  },
  "NETLINK_GENERIC": {
    "label": "NETLINK_GENERIC",
    "path": "include/linux/drbd_genl_api.h",
    "line": 6,
    "endLine": 29,
    "symbol": "NETLINK_GENERIC",
    "note": "自动匹配的内核源码"
  },
  "netif_receive_skb": {
    "label": "netif_receive_skb",
    "path": "include/linux/etherdevice.h",
    "line": 565,
    "endLine": 588,
    "symbol": "netif_receive_skb",
    "note": "自动匹配的内核源码"
  },
  "__builtin_": {
    "label": "__builtin_",
    "path": "include/linux/fortify-string.h",
    "line": 144,
    "endLine": 167,
    "symbol": "__builtin_",
    "note": "自动匹配的内核源码"
  },
  "sys_execve": {
    "label": "sys_execve",
    "path": "include/linux/fs.h",
    "line": 117,
    "endLine": 140,
    "symbol": "sys_execve",
    "note": "自动匹配的内核源码"
  },
  "ftrace_init": {
    "label": "ftrace_init",
    "path": "include/linux/ftrace.h",
    "line": 1189,
    "endLine": 1212,
    "symbol": "ftrace_init",
    "note": "自动匹配的内核源码"
  },
  "__alloc_pages": {
    "label": "__alloc_pages",
    "path": "include/linux/gfp.h",
    "line": 231,
    "endLine": 254,
    "symbol": "__alloc_pages",
    "note": "自动匹配的内核源码"
  },
  "kcompactd": {
    "label": "kcompactd",
    "path": "include/linux/gfp_types.h",
    "line": 372,
    "endLine": 392,
    "symbol": "kcompactd",
    "note": "自动匹配的内核源码"
  },
  "khugepaged": {
    "label": "khugepaged",
    "path": "include/linux/gfp_types.h",
    "line": 374,
    "endLine": 392,
    "symbol": "khugepaged",
    "note": "自动匹配的内核源码"
  },
  "netif_rx": {
    "label": "netif_rx",
    "path": "include/linux/hdlc.h",
    "line": 27,
    "endLine": 50,
    "symbol": "netif_rx",
    "note": "自动匹配的内核源码"
  },
  "ndo_start_xmit": {
    "label": "ndo_start_xmit",
    "path": "include/linux/hdlc.h",
    "line": 93,
    "endLine": 116,
    "symbol": "ndo_start_xmit",
    "note": "自动匹配的内核源码"
  },
  "hrtimers_init": {
    "label": "hrtimers_init",
    "path": "include/linux/hrtimer.h",
    "line": 344,
    "endLine": 358,
    "symbol": "hrtimers_init",
    "note": "自动匹配的内核源码"
  },
  "__schedule": {
    "label": "__schedule",
    "path": "include/linux/hrtimer_rearm.h",
    "line": 66,
    "endLine": 84,
    "symbol": "__schedule",
    "note": "自动匹配的内核源码"
  },
  "SCL": {
    "label": "SCL",
    "path": "include/linux/i2c-algo-pca.h",
    "line": 36,
    "endLine": 59,
    "symbol": "SCL",
    "note": "自动匹配的内核源码"
  },
  "i2c_client": {
    "label": "i2c_client",
    "path": "include/linux/i2c-smbus.h",
    "line": 29,
    "endLine": 52,
    "symbol": "i2c_client",
    "note": "自动匹配的内核源码"
  },
  "i2c_driver": {
    "label": "i2c_driver",
    "path": "include/linux/i2c.h",
    "line": 35,
    "endLine": 58,
    "symbol": "i2c_driver",
    "note": "自动匹配的内核源码"
  },
  "i2c_master_recv": {
    "label": "i2c_master_recv",
    "path": "include/linux/i2c.h",
    "line": 69,
    "endLine": 92,
    "symbol": "i2c_master_recv",
    "note": "自动匹配的内核源码"
  },
  "i2c_master_send": {
    "label": "i2c_master_send",
    "path": "include/linux/i2c.h",
    "line": 99,
    "endLine": 122,
    "symbol": "i2c_master_send",
    "note": "自动匹配的内核源码"
  },
  "i2c_transfer": {
    "label": "i2c_transfer",
    "path": "include/linux/i2c.h",
    "line": 130,
    "endLine": 153,
    "symbol": "i2c_transfer",
    "note": "自动匹配的内核源码"
  },
  "SDA": {
    "label": "SDA",
    "path": "include/linux/i2c.h",
    "line": 605,
    "endLine": 628,
    "symbol": "SDA",
    "note": "自动匹配的内核源码"
  },
  "dev_queue_xmit": {
    "label": "dev_queue_xmit",
    "path": "include/linux/if_team.h",
    "line": 249,
    "endLine": 272,
    "symbol": "dev_queue_xmit",
    "note": "自动匹配的内核源码"
  },
  "skb_push": {
    "label": "skb_push",
    "path": "include/linux/if_vlan.h",
    "line": 371,
    "endLine": 394,
    "symbol": "skb_push",
    "note": "自动匹配的内核源码"
  },
  "poking_init": {
    "label": "poking_init",
    "path": "include/linux/init.h",
    "line": 149,
    "endLine": 172,
    "symbol": "poking_init",
    "note": "自动匹配的内核源码"
  },
  "TIMER_SOFTIRQ": {
    "label": "TIMER_SOFTIRQ",
    "path": "include/linux/interrupt.h",
    "line": 553,
    "endLine": 576,
    "symbol": "TIMER_SOFTIRQ",
    "note": "自动匹配的内核源码"
  },
  "NET_TX_SOFTIRQ": {
    "label": "NET_TX_SOFTIRQ",
    "path": "include/linux/interrupt.h",
    "line": 554,
    "endLine": 577,
    "symbol": "NET_TX_SOFTIRQ",
    "note": "自动匹配的内核源码"
  },
  "NET_RX_SOFTIRQ": {
    "label": "NET_RX_SOFTIRQ",
    "path": "include/linux/interrupt.h",
    "line": 555,
    "endLine": 578,
    "symbol": "NET_RX_SOFTIRQ",
    "note": "自动匹配的内核源码"
  },
  "early_irq_init": {
    "label": "early_irq_init",
    "path": "include/linux/interrupt.h",
    "line": 868,
    "endLine": 882,
    "symbol": "early_irq_init",
    "note": "自动匹配的内核源码"
  },
  "rb_leftmost": {
    "label": "rb_leftmost",
    "path": "include/linux/interval_tree_generic.h",
    "line": 140,
    "endLine": 163,
    "symbol": "rb_leftmost",
    "note": "自动匹配的内核源码"
  },
  "dup_mm": {
    "label": "dup_mm",
    "path": "include/linux/iommu.h",
    "line": 1611,
    "endLine": 1634,
    "symbol": "dup_mm",
    "note": "自动匹配的内核源码"
  },
  "IRQ_NONE": {
    "label": "IRQ_NONE",
    "path": "include/linux/irqreturn.h",
    "line": 7,
    "endLine": 21,
    "symbol": "IRQ_NONE",
    "note": "自动匹配的内核源码"
  },
  "JMP": {
    "label": "JMP",
    "path": "include/linux/jump_label.h",
    "line": 427,
    "endLine": 450,
    "symbol": "JMP",
    "note": "自动匹配的内核源码"
  },
  "kexec_load": {
    "label": "kexec_load",
    "path": "include/linux/kexec.h",
    "line": 90,
    "endLine": 113,
    "symbol": "kexec_load",
    "note": "自动匹配的内核源码"
  },
  "lockdep_init": {
    "label": "lockdep_init",
    "path": "include/linux/lockdep.h",
    "line": 88,
    "endLine": 111,
    "symbol": "lockdep_init",
    "note": "自动匹配的内核源码"
  },
  "maple_tree_init": {
    "label": "maple_tree_init",
    "path": "include/linux/maple_tree.h",
    "line": 571,
    "endLine": 594,
    "symbol": "maple_tree_init",
    "note": "自动匹配的内核源码"
  },
  "MPOL_BIND": {
    "label": "MPOL_BIND",
    "path": "include/linux/mempolicy.h",
    "line": 52,
    "endLine": 75,
    "symbol": "MPOL_BIND",
    "note": "自动匹配的内核源码"
  },
  "MPOL_DEFAULT": {
    "label": "MPOL_DEFAULT",
    "path": "include/linux/mempolicy.h",
    "line": 63,
    "endLine": 86,
    "symbol": "MPOL_DEFAULT",
    "note": "自动匹配的内核源码"
  },
  "platform_get_irq": {
    "label": "platform_get_irq",
    "path": "include/linux/mfd/88pm80x.h",
    "line": 347,
    "endLine": 370,
    "symbol": "platform_get_irq",
    "note": "自动匹配的内核源码"
  },
  "ETH_P_IP": {
    "label": "ETH_P_IP",
    "path": "include/linux/mlx5/fs_helpers.h",
    "line": 57,
    "endLine": 80,
    "symbol": "ETH_P_IP",
    "note": "自动匹配的内核源码"
  },
  "ETH_P_IPV6": {
    "label": "ETH_P_IPV6",
    "path": "include/linux/mlx5/fs_helpers.h",
    "line": 60,
    "endLine": 83,
    "symbol": "ETH_P_IPV6",
    "note": "自动匹配的内核源码"
  },
  "mm_core_init_early": {
    "label": "mm_core_init_early",
    "path": "include/linux/mm.h",
    "line": 49,
    "endLine": 72,
    "symbol": "mm_core_init_early",
    "note": "自动匹配的内核源码"
  },
  "mm_core_init": {
    "label": "mm_core_init",
    "path": "include/linux/mm.h",
    "line": 50,
    "endLine": 73,
    "symbol": "mm_core_init",
    "note": "自动匹配的内核源码"
  },
  "mprotect": {
    "label": "mprotect",
    "path": "include/linux/mm.h",
    "line": 298,
    "endLine": 321,
    "symbol": "mprotect",
    "note": "自动匹配的内核源码"
  },
  "VM_STACK": {
    "label": "VM_STACK",
    "path": "include/linux/mm.h",
    "line": 440,
    "endLine": 463,
    "symbol": "VM_STACK",
    "note": "自动匹配的内核源码"
  },
  "INTERRUPTIBLE": {
    "label": "INTERRUPTIBLE",
    "path": "include/linux/mm.h",
    "line": 702,
    "endLine": 725,
    "symbol": "INTERRUPTIBLE",
    "note": "自动匹配的内核源码"
  },
  "page_address_init": {
    "label": "page_address_init",
    "path": "include/linux/mm.h",
    "line": 2962,
    "endLine": 2985,
    "symbol": "page_address_init",
    "note": "自动匹配的内核源码"
  },
  "MAP_HUGETLB": {
    "label": "MAP_HUGETLB",
    "path": "include/linux/mman.h",
    "line": 55,
    "endLine": 78,
    "symbol": "MAP_HUGETLB",
    "note": "自动匹配的内核源码"
  },
  "do_initcalls": {
    "label": "do_initcalls",
    "path": "include/linux/module.h",
    "line": 85,
    "endLine": 108,
    "symbol": "do_initcalls",
    "note": "自动匹配的内核源码"
  },
  "SOCK_RAW": {
    "label": "SOCK_RAW",
    "path": "include/linux/net.h",
    "line": 73,
    "endLine": 96,
    "symbol": "SOCK_RAW",
    "note": "自动匹配的内核源码"
  },
  "SOCK_SEQPACKET": {
    "label": "SOCK_SEQPACKET",
    "path": "include/linux/net.h",
    "line": 75,
    "endLine": 98,
    "symbol": "SOCK_SEQPACKET",
    "note": "自动匹配的内核源码"
  },
  "setsockopt": {
    "label": "setsockopt",
    "path": "include/linux/net.h",
    "line": 211,
    "endLine": 234,
    "symbol": "setsockopt",
    "note": "自动匹配的内核源码"
  },
  "recvfrom": {
    "label": "recvfrom",
    "path": "include/linux/net.h",
    "line": 225,
    "endLine": 248,
    "symbol": "recvfrom",
    "note": "自动匹配的内核源码"
  },
  "NET_XMIT_DROP": {
    "label": "NET_XMIT_DROP",
    "path": "include/linux/netdevice.h",
    "line": 120,
    "endLine": 143,
    "symbol": "NET_XMIT_DROP",
    "note": "自动匹配的内核源码"
  },
  "NETDEV_TX_BUSY": {
    "label": "NETDEV_TX_BUSY",
    "path": "include/linux/netdevice.h",
    "line": 136,
    "endLine": 159,
    "symbol": "NETDEV_TX_BUSY",
    "note": "自动匹配的内核源码"
  },
  "ndo_open": {
    "label": "ndo_open",
    "path": "include/linux/netdevice.h",
    "line": 1082,
    "endLine": 1105,
    "symbol": "ndo_open",
    "note": "自动匹配的内核源码"
  },
  "ndo_stop": {
    "label": "ndo_stop",
    "path": "include/linux/netdevice.h",
    "line": 1086,
    "endLine": 1109,
    "symbol": "ndo_stop",
    "note": "自动匹配的内核源码"
  },
  "iptables": {
    "label": "iptables",
    "path": "include/linux/netfilter/ipset/ip_set.h",
    "line": 318,
    "endLine": 341,
    "symbol": "iptables",
    "note": "自动匹配的内核源码"
  },
  "sendto": {
    "label": "sendto",
    "path": "include/linux/netlink.h",
    "line": 22,
    "endLine": 45,
    "symbol": "sendto",
    "note": "自动匹配的内核源码"
  },
  "sar": {
    "label": "sar",
    "path": "include/linux/nfs_iostat.h",
    "line": 14,
    "endLine": 37,
    "symbol": "sar",
    "note": "自动匹配的内核源码"
  },
  "clone_flag": {
    "label": "clone_flag",
    "path": "include/linux/ns/ns_common_types.h",
    "line": 196,
    "endLine": 219,
    "symbol": "clone_flag",
    "note": "自动匹配的内核源码"
  },
  "__stack_chk_fail": {
    "label": "__stack_chk_fail",
    "path": "include/linux/panic.h",
    "line": 35,
    "endLine": 58,
    "symbol": "__stack_chk_fail",
    "note": "自动匹配的内核源码"
  },
  "pci_register_driver": {
    "label": "pci_register_driver",
    "path": "include/linux/pci.h",
    "line": 973,
    "endLine": 996,
    "symbol": "pci_register_driver",
    "note": "自动匹配的内核源码"
  },
  "setup_per_cpu_areas": {
    "label": "setup_per_cpu_areas",
    "path": "include/linux/percpu.h",
    "line": 133,
    "endLine": 156,
    "symbol": "setup_per_cpu_areas",
    "note": "自动匹配的内核源码"
  },
  "alloc_pid": {
    "label": "alloc_pid",
    "path": "include/linux/pid.h",
    "line": 133,
    "endLine": 156,
    "symbol": "alloc_pid",
    "note": "自动匹配的内核源码"
  },
  "pid_idr_init": {
    "label": "pid_idr_init",
    "path": "include/linux/pid_namespace.h",
    "line": 138,
    "endLine": 148,
    "symbol": "pid_idr_init",
    "note": "自动匹配的内核源码"
  },
  "sched_init": {
    "label": "sched_init",
    "path": "include/linux/preempt.h",
    "line": 63,
    "endLine": 86,
    "symbol": "sched_init",
    "note": "自动匹配的内核源码"
  },
  "CONFIG_PREEMPT_NONE": {
    "label": "CONFIG_PREEMPT_NONE",
    "path": "include/linux/preempt.h",
    "line": 482,
    "endLine": 505,
    "symbol": "CONFIG_PREEMPT_NONE",
    "note": "自动匹配的内核源码"
  },
  "CONFIG_PREEMPT_VOLUNTARY": {
    "label": "CONFIG_PREEMPT_VOLUNTARY",
    "path": "include/linux/preempt.h",
    "line": 486,
    "endLine": 509,
    "symbol": "CONFIG_PREEMPT_VOLUNTARY",
    "note": "自动匹配的内核源码"
  },
  "CONFIG_PREEMPT": {
    "label": "CONFIG_PREEMPT",
    "path": "include/linux/preempt.h",
    "line": 490,
    "endLine": 513,
    "symbol": "CONFIG_PREEMPT",
    "note": "自动匹配的内核源码"
  },
  "cwnd": {
    "label": "cwnd",
    "path": "include/linux/qed/qed_iscsi_if.h",
    "line": 75,
    "endLine": 98,
    "symbol": "cwnd",
    "note": "自动匹配的内核源码"
  },
  "rcu_scheduler_starting": {
    "label": "rcu_scheduler_starting",
    "path": "include/linux/rcutiny.h",
    "line": 127,
    "endLine": 145,
    "symbol": "rcu_scheduler_starting",
    "note": "自动匹配的内核源码"
  },
  "TIF_NEED_RESCHED": {
    "label": "TIF_NEED_RESCHED",
    "path": "include/linux/rseq_entry.h",
    "line": 166,
    "endLine": 189,
    "symbol": "TIF_NEED_RESCHED",
    "note": "自动匹配的内核源码"
  },
  "vfork": {
    "label": "vfork",
    "path": "include/linux/sched/mm.h",
    "line": 228,
    "endLine": 251,
    "symbol": "vfork",
    "note": "自动匹配的内核源码"
  },
  "wait4": {
    "label": "wait4",
    "path": "include/linux/sched/signal.h",
    "line": 101,
    "endLine": 124,
    "symbol": "wait4",
    "note": "自动匹配的内核源码"
  },
  "sigpending": {
    "label": "sigpending",
    "path": "include/linux/sched/signal.h",
    "line": 107,
    "endLine": 130,
    "symbol": "sigpending",
    "note": "自动匹配的内核源码"
  },
  "kill_pid": {
    "label": "kill_pid",
    "path": "include/linux/sched/signal.h",
    "line": 340,
    "endLine": 363,
    "symbol": "kill_pid",
    "note": "自动匹配的内核源码"
  },
  "fork_init": {
    "label": "fork_init",
    "path": "include/linux/sched/task.h",
    "line": 78,
    "endLine": 101,
    "symbol": "fork_init",
    "note": "自动匹配的内核源码"
  },
  "do_group_exit": {
    "label": "do_group_exit",
    "path": "include/linux/sched/task.h",
    "line": 93,
    "endLine": 116,
    "symbol": "do_group_exit",
    "note": "自动匹配的内核源码"
  },
  "cache_nice_tries": {
    "label": "cache_nice_tries",
    "path": "include/linux/sched/topology.h",
    "line": 82,
    "endLine": 105,
    "symbol": "cache_nice_tries",
    "note": "自动匹配的内核源码"
  },
  "balance_interval": {
    "label": "balance_interval",
    "path": "include/linux/sched/topology.h",
    "line": 91,
    "endLine": 114,
    "symbol": "balance_interval",
    "note": "自动匹配的内核源码"
  },
  "idle_balance": {
    "label": "idle_balance",
    "path": "include/linux/sched/topology.h",
    "line": 94,
    "endLine": 117,
    "symbol": "idle_balance",
    "note": "自动匹配的内核源码"
  },
  "cfs_rq": {
    "label": "cfs_rq",
    "path": "include/linux/sched.h",
    "line": 65,
    "endLine": 88,
    "symbol": "cfs_rq",
    "note": "自动匹配的内核源码"
  },
  "__TASK_STOPPED": {
    "label": "__TASK_STOPPED",
    "path": "include/linux/sched.h",
    "line": 110,
    "endLine": 133,
    "symbol": "__TASK_STOPPED",
    "note": "自动匹配的内核源码"
  },
  "sched_entity": {
    "label": "sched_entity",
    "path": "include/linux/sched.h",
    "line": 481,
    "endLine": 504,
    "symbol": "sched_entity",
    "note": "自动匹配的内核源码"
  },
  "min_vruntime": {
    "label": "min_vruntime",
    "path": "include/linux/sched.h",
    "line": 580,
    "endLine": 603,
    "symbol": "min_vruntime",
    "note": "自动匹配的内核源码"
  },
  "vruntime": {
    "label": "vruntime",
    "path": "include/linux/sched.h",
    "line": 594,
    "endLine": 617,
    "symbol": "vruntime",
    "note": "自动匹配的内核源码"
  },
  "wake_up_new_task": {
    "label": "wake_up_new_task",
    "path": "include/linux/sched.h",
    "line": 1993,
    "endLine": 2016,
    "symbol": "wake_up_new_task",
    "note": "自动匹配的内核源码"
  },
  "sched_setaffinity": {
    "label": "sched_setaffinity",
    "path": "include/linux/sched.h",
    "line": 2335,
    "endLine": 2358,
    "symbol": "sched_setaffinity",
    "note": "自动匹配的内核源码"
  },
  "SIGQUIT": {
    "label": "SIGQUIT",
    "path": "include/linux/signal.h",
    "line": 357,
    "endLine": 380,
    "symbol": "SIGQUIT",
    "note": "自动匹配的内核源码"
  },
  "SIGUSR1": {
    "label": "SIGUSR1",
    "path": "include/linux/signal.h",
    "line": 364,
    "endLine": 387,
    "symbol": "SIGUSR1",
    "note": "自动匹配的内核源码"
  },
  "SIGTERM": {
    "label": "SIGTERM",
    "path": "include/linux/signal.h",
    "line": 369,
    "endLine": 392,
    "symbol": "SIGTERM",
    "note": "自动匹配的内核源码"
  },
  "SIGTSTP": {
    "label": "SIGTSTP",
    "path": "include/linux/signal.h",
    "line": 373,
    "endLine": 396,
    "symbol": "SIGTSTP",
    "note": "自动匹配的内核源码"
  },
  "SIG_KERNEL_ONLY_MASK": {
    "label": "SIG_KERNEL_ONLY_MASK",
    "path": "include/linux/signal.h",
    "line": 419,
    "endLine": 442,
    "symbol": "SIG_KERNEL_ONLY_MASK",
    "note": "自动匹配的内核源码"
  },
  "signals_init": {
    "label": "signals_init",
    "path": "include/linux/signal.h",
    "line": 455,
    "endLine": 478,
    "symbol": "signals_init",
    "note": "自动匹配的内核源码"
  },
  "sigaction": {
    "label": "sigaction",
    "path": "include/linux/signal_types.h",
    "line": 37,
    "endLine": 60,
    "symbol": "sigaction",
    "note": "自动匹配的内核源码"
  },
  "SA_NODEFER": {
    "label": "SA_NODEFER",
    "path": "include/linux/signal_types.h",
    "line": 86,
    "endLine": 89,
    "symbol": "SA_NODEFER",
    "note": "自动匹配的内核源码"
  },
  "skb_put": {
    "label": "skb_put",
    "path": "include/linux/skbuff.h",
    "line": 746,
    "endLine": 769,
    "symbol": "skb_put",
    "note": "自动匹配的内核源码"
  },
  "skb_pull": {
    "label": "skb_pull",
    "path": "include/linux/skbuff.h",
    "line": 746,
    "endLine": 769,
    "symbol": "skb_pull",
    "note": "自动匹配的内核源码"
  },
  "alloc_skb": {
    "label": "alloc_skb",
    "path": "include/linux/skbuff.h",
    "line": 1091,
    "endLine": 1114,
    "symbol": "alloc_skb",
    "note": "自动匹配的内核源码"
  },
  "mm_init": {
    "label": "mm_init",
    "path": "include/linux/stackdepot.h",
    "line": 96,
    "endLine": 119,
    "symbol": "mm_init",
    "note": "自动匹配的内核源码"
  },
  "static_call_init": {
    "label": "static_call_init",
    "path": "include/linux/static_call.h",
    "line": 165,
    "endLine": 188,
    "symbol": "static_call_init",
    "note": "自动匹配的内核源码"
  },
  "ssthresh": {
    "label": "ssthresh",
    "path": "include/linux/tcp.h",
    "line": 445,
    "endLine": 468,
    "symbol": "ssthresh",
    "note": "自动匹配的内核源码"
  },
  "tick_init": {
    "label": "tick_init",
    "path": "include/linux/tick.h",
    "line": 18,
    "endLine": 41,
    "symbol": "tick_init",
    "note": "自动匹配的内核源码"
  },
  "timekeeping_init": {
    "label": "timekeeping_init",
    "path": "include/linux/timekeeping.h",
    "line": 11,
    "endLine": 34,
    "symbol": "timekeeping_init",
    "note": "自动匹配的内核源码"
  },
  "timers_init": {
    "label": "timers_init",
    "path": "include/linux/timer.h",
    "line": 171,
    "endLine": 194,
    "symbol": "timers_init",
    "note": "自动匹配的内核源码"
  },
  "setsid": {
    "label": "setsid",
    "path": "include/linux/tty.h",
    "line": 156,
    "endLine": 179,
    "symbol": "setsid",
    "note": "自动匹配的内核源码"
  },
  "SO_REUSEADDR": {
    "label": "SO_REUSEADDR",
    "path": "include/uapi/asm-generic/socket.h",
    "line": 12,
    "endLine": 35,
    "symbol": "SO_REUSEADDR",
    "note": "自动匹配的内核源码"
  },
  "SO_RCVBUF": {
    "label": "SO_RCVBUF",
    "path": "include/uapi/asm-generic/socket.h",
    "line": 18,
    "endLine": 41,
    "symbol": "SO_RCVBUF",
    "note": "自动匹配的内核源码"
  },
  "SO_REUSEPORT": {
    "label": "SO_REUSEPORT",
    "path": "include/uapi/asm-generic/socket.h",
    "line": 27,
    "endLine": 50,
    "symbol": "SO_REUSEPORT",
    "note": "自动匹配的内核源码"
  },
  "SO_RCVTIMEO": {
    "label": "SO_RCVTIMEO",
    "path": "include/uapi/asm-generic/socket.h",
    "line": 161,
    "endLine": 179,
    "symbol": "SO_RCVTIMEO",
    "note": "自动匹配的内核源码"
  },
  "SO_SNDTIMEO": {
    "label": "SO_SNDTIMEO",
    "path": "include/uapi/asm-generic/socket.h",
    "line": 162,
    "endLine": 179,
    "symbol": "SO_SNDTIMEO",
    "note": "自动匹配的内核源码"
  },
  "load_balance": {
    "label": "load_balance",
    "path": "include/uapi/drm/i915_drm.h",
    "line": 2272,
    "endLine": 2295,
    "symbol": "load_balance",
    "note": "自动匹配的内核源码"
  },
  "TCP_KEEPIDLE": {
    "label": "TCP_KEEPIDLE",
    "path": "include/uapi/linux/bpf.h",
    "line": 2956,
    "endLine": 2979,
    "symbol": "TCP_KEEPIDLE",
    "note": "自动匹配的内核源码"
  },
  "send_signal": {
    "label": "send_signal",
    "path": "include/uapi/linux/bpf.h",
    "line": 6014,
    "endLine": 6037,
    "symbol": "send_signal",
    "note": "自动匹配的内核源码"
  },
  "ET_REL": {
    "label": "ET_REL",
    "path": "include/uapi/linux/elf.h",
    "line": 73,
    "endLine": 96,
    "symbol": "ET_REL",
    "note": "自动匹配的内核源码"
  },
  "ETH_P_ARP": {
    "label": "ETH_P_ARP",
    "path": "include/uapi/linux/if_ether.h",
    "line": 54,
    "endLine": 77,
    "symbol": "ETH_P_ARP",
    "note": "自动匹配的内核源码"
  },
  "eth0": {
    "label": "eth0",
    "path": "include/uapi/linux/if_vlan.h",
    "line": 46,
    "endLine": 67,
    "symbol": "eth0",
    "note": "自动匹配的内核源码"
  },
  "MPOL_PREFERRED": {
    "label": "MPOL_PREFERRED",
    "path": "include/uapi/linux/mempolicy.h",
    "line": 21,
    "endLine": 44,
    "symbol": "MPOL_PREFERRED",
    "note": "自动匹配的内核源码"
  },
  "MPOL_INTERLEAVE": {
    "label": "MPOL_INTERLEAVE",
    "path": "include/uapi/linux/mempolicy.h",
    "line": 23,
    "endLine": 46,
    "symbol": "MPOL_INTERLEAVE",
    "note": "自动匹配的内核源码"
  },
  "NETLINK_ROUTE": {
    "label": "NETLINK_ROUTE",
    "path": "include/uapi/linux/netlink.h",
    "line": 9,
    "endLine": 32,
    "symbol": "NETLINK_ROUTE",
    "note": "自动匹配的内核源码"
  },
  "NETLINK_NETFILTER": {
    "label": "NETLINK_NETFILTER",
    "path": "include/uapi/linux/netlink.h",
    "line": 21,
    "endLine": 44,
    "symbol": "NETLINK_NETFILTER",
    "note": "自动匹配的内核源码"
  },
  "NETLINK_KOBJECT_UEVENT": {
    "label": "NETLINK_KOBJECT_UEVENT",
    "path": "include/uapi/linux/netlink.h",
    "line": 24,
    "endLine": 47,
    "symbol": "NETLINK_KOBJECT_UEVENT",
    "note": "自动匹配的内核源码"
  },
  "context_switch": {
    "label": "context_switch",
    "path": "include/uapi/linux/perf_event.h",
    "line": 455,
    "endLine": 478,
    "symbol": "context_switch",
    "note": "自动匹配的内核源码"
  },
  "CLONE_FILES": {
    "label": "CLONE_FILES",
    "path": "include/uapi/linux/sched.h",
    "line": 13,
    "endLine": 36,
    "symbol": "CLONE_FILES",
    "note": "自动匹配的内核源码"
  },
  "shmat": {
    "label": "shmat",
    "path": "include/uapi/linux/shm.h",
    "line": 73,
    "endLine": 96,
    "symbol": "shmat",
    "note": "自动匹配的内核源码"
  },
  "__builtin_bswap32": {
    "label": "__builtin_bswap32",
    "path": "include/uapi/linux/swab.h",
    "line": 115,
    "endLine": 138,
    "symbol": "__builtin_bswap32",
    "note": "自动匹配的内核源码"
  },
  "dirty_background_ratio": {
    "label": "dirty_background_ratio",
    "path": "include/uapi/linux/sysctl.h",
    "line": 173,
    "endLine": 196,
    "symbol": "dirty_background_ratio",
    "note": "自动匹配的内核源码"
  },
  "dirty_writeback_centisecs": {
    "label": "dirty_writeback_centisecs",
    "path": "include/uapi/linux/sysctl.h",
    "line": 175,
    "endLine": 198,
    "symbol": "dirty_writeback_centisecs",
    "note": "自动匹配的内核源码"
  },
  "TIME_WAIT": {
    "label": "TIME_WAIT",
    "path": "include/uapi/linux/timex.h",
    "line": 202,
    "endLine": 208,
    "symbol": "TIME_WAIT",
    "note": "自动匹配的内核源码"
  },
  "WNOHANG": {
    "label": "WNOHANG",
    "path": "include/uapi/linux/wait.h",
    "line": 5,
    "endLine": 24,
    "symbol": "WNOHANG",
    "note": "自动匹配的内核源码"
  },
  "waitid": {
    "label": "waitid",
    "path": "include/uapi/linux/wait.h",
    "line": 16,
    "endLine": 24,
    "symbol": "waitid",
    "note": "自动匹配的内核源码"
  },
  "kernel_init": {
    "label": "kernel_init",
    "path": "init/main.c",
    "line": 122,
    "endLine": 145,
    "symbol": "kernel_init",
    "note": "自动匹配的内核源码"
  },
  "kthreadd_done": {
    "label": "kthreadd_done",
    "path": "init/main.c",
    "line": 714,
    "endLine": 737,
    "symbol": "kthreadd_done",
    "note": "自动匹配的内核源码"
  },
  "rest_init": {
    "label": "rest_init",
    "path": "init/main.c",
    "line": 716,
    "endLine": 739,
    "symbol": "rest_init",
    "note": "自动匹配的内核源码"
  },
  "do_basic_setup": {
    "label": "do_basic_setup",
    "path": "init/main.c",
    "line": 1483,
    "endLine": 1506,
    "symbol": "do_basic_setup",
    "note": "自动匹配的内核源码"
  },
  "run_init_process": {
    "label": "run_init_process",
    "path": "init/main.c",
    "line": 1502,
    "endLine": 1525,
    "symbol": "run_init_process",
    "note": "自动匹配的内核源码"
  },
  "kernel_init_freeable": {
    "label": "kernel_init_freeable",
    "path": "init/main.c",
    "line": 1531,
    "endLine": 1554,
    "symbol": "kernel_init_freeable",
    "note": "自动匹配的内核源码"
  },
  "cgroup_attach_task": {
    "label": "cgroup_attach_task",
    "path": "kernel/cgroup/cgroup-internal.h",
    "line": 244,
    "endLine": 267,
    "symbol": "cgroup_attach_task",
    "note": "自动匹配的内核源码"
  },
  "waitpid": {
    "label": "waitpid",
    "path": "kernel/cgroup/cgroup.c",
    "line": 6193,
    "endLine": 6216,
    "symbol": "waitpid",
    "note": "自动匹配的内核源码"
  },
  "mmap_region": {
    "label": "mmap_region",
    "path": "kernel/events/uprobes.c",
    "line": 1592,
    "endLine": 1615,
    "symbol": "mmap_region",
    "note": "自动匹配的内核源码"
  },
  "exit_mm": {
    "label": "exit_mm",
    "path": "kernel/exit.c",
    "line": 458,
    "endLine": 481,
    "symbol": "exit_mm",
    "note": "自动匹配的内核源码"
  },
  "wait_task_zombie": {
    "label": "wait_task_zombie",
    "path": "kernel/exit.c",
    "line": 1172,
    "endLine": 1195,
    "symbol": "wait_task_zombie",
    "note": "自动匹配的内核源码"
  },
  "kernel_waitid": {
    "label": "kernel_waitid",
    "path": "kernel/exit.c",
    "line": 1794,
    "endLine": 1817,
    "symbol": "kernel_waitid",
    "note": "自动匹配的内核源码"
  },
  "dup_task_struct": {
    "label": "dup_task_struct",
    "path": "kernel/fork.c",
    "line": 911,
    "endLine": 934,
    "symbol": "dup_task_struct",
    "note": "自动匹配的内核源码"
  },
  "copy_mm": {
    "label": "copy_mm",
    "path": "kernel/fork.c",
    "line": 1559,
    "endLine": 1582,
    "symbol": "copy_mm",
    "note": "自动匹配的内核源码"
  },
  "copy_files": {
    "label": "copy_files",
    "path": "kernel/fork.c",
    "line": 1617,
    "endLine": 1640,
    "symbol": "copy_files",
    "note": "自动匹配的内核源码"
  },
  "copy_sighand": {
    "label": "copy_sighand",
    "path": "kernel/fork.c",
    "line": 1647,
    "endLine": 1670,
    "symbol": "copy_sighand",
    "note": "自动匹配的内核源码"
  },
  "copy_signal": {
    "label": "copy_signal",
    "path": "kernel/fork.c",
    "line": 1696,
    "endLine": 1719,
    "symbol": "copy_signal",
    "note": "自动匹配的内核源码"
  },
  "rcu_preempt": {
    "label": "rcu_preempt",
    "path": "kernel/rcu/tree.h",
    "line": 466,
    "endLine": 489,
    "symbol": "rcu_preempt",
    "note": "自动匹配的内核源码"
  },
  "stop_sched_class": {
    "label": "stop_sched_class",
    "path": "kernel/sched/core.c",
    "line": 202,
    "endLine": 225,
    "symbol": "stop_sched_class",
    "note": "自动匹配的内核源码"
  },
  "idle_sched_class": {
    "label": "idle_sched_class",
    "path": "kernel/sched/core.c",
    "line": 211,
    "endLine": 234,
    "symbol": "idle_sched_class",
    "note": "自动匹配的内核源码"
  },
  "task_tick": {
    "label": "task_tick",
    "path": "kernel/sched/core.c",
    "line": 901,
    "endLine": 924,
    "symbol": "task_tick",
    "note": "自动匹配的内核源码"
  },
  "fair_sched_class": {
    "label": "fair_sched_class",
    "path": "kernel/sched/core.c",
    "line": 1398,
    "endLine": 1421,
    "symbol": "fair_sched_class",
    "note": "自动匹配的内核源码"
  },
  "pick_next_task": {
    "label": "pick_next_task",
    "path": "kernel/sched/core.c",
    "line": 1450,
    "endLine": 1473,
    "symbol": "pick_next_task",
    "note": "自动匹配的内核源码"
  },
  "dequeue_task": {
    "label": "dequeue_task",
    "path": "kernel/sched/core.c",
    "line": 1570,
    "endLine": 1593,
    "symbol": "dequeue_task",
    "note": "自动匹配的内核源码"
  },
  "enqueue_task": {
    "label": "enqueue_task",
    "path": "kernel/sched/core.c",
    "line": 2153,
    "endLine": 2176,
    "symbol": "enqueue_task",
    "note": "自动匹配的内核源码"
  },
  "select_task_rq": {
    "label": "select_task_rq",
    "path": "kernel/sched/core.c",
    "line": 3502,
    "endLine": 3525,
    "symbol": "select_task_rq",
    "note": "自动匹配的内核源码"
  },
  "rt_sched_class": {
    "label": "rt_sched_class",
    "path": "kernel/sched/core.c",
    "line": 3642,
    "endLine": 3665,
    "symbol": "rt_sched_class",
    "note": "自动匹配的内核源码"
  },
  "dl_sched_class": {
    "label": "dl_sched_class",
    "path": "kernel/sched/core.c",
    "line": 7531,
    "endLine": 7554,
    "symbol": "dl_sched_class",
    "note": "自动匹配的内核源码"
  },
  "rt_period_us": {
    "label": "rt_period_us",
    "path": "kernel/sched/core.c",
    "line": 10165,
    "endLine": 10188,
    "symbol": "rt_period_us",
    "note": "自动匹配的内核源码"
  },
  "rt_runtime_us": {
    "label": "rt_runtime_us",
    "path": "kernel/sched/core.c",
    "line": 10256,
    "endLine": 10279,
    "symbol": "rt_runtime_us",
    "note": "自动匹配的内核源码"
  },
  "pthread_create": {
    "label": "pthread_create",
    "path": "kernel/sched/core.c",
    "line": 11011,
    "endLine": 11034,
    "symbol": "pthread_create",
    "note": "自动匹配的内核源码"
  },
  "__pick_first_entity": {
    "label": "__pick_first_entity",
    "path": "kernel/sched/debug.c",
    "line": 926,
    "endLine": 949,
    "symbol": "__pick_first_entity",
    "note": "自动匹配的内核源码"
  },
  "NICE_0_LOAD": {
    "label": "NICE_0_LOAD",
    "path": "kernel/sched/fair.c",
    "line": 254,
    "endLine": 277,
    "symbol": "NICE_0_LOAD",
    "note": "自动匹配的内核源码"
  },
  "__enqueue_entity": {
    "label": "__enqueue_entity",
    "path": "kernel/sched/fair.c",
    "line": 1006,
    "endLine": 1029,
    "symbol": "__enqueue_entity",
    "note": "自动匹配的内核源码"
  },
  "__dequeue_entity": {
    "label": "__dequeue_entity",
    "path": "kernel/sched/fair.c",
    "line": 1015,
    "endLine": 1038,
    "symbol": "__dequeue_entity",
    "note": "自动匹配的内核源码"
  },
  "do_idle": {
    "label": "do_idle",
    "path": "kernel/sched/idle.c",
    "line": 278,
    "endLine": 301,
    "symbol": "do_idle",
    "note": "自动匹配的内核源码"
  },
  "build_sched_domains": {
    "label": "build_sched_domains",
    "path": "kernel/sched/topology.c",
    "line": 1066,
    "endLine": 1089,
    "symbol": "build_sched_domains",
    "note": "自动匹配的内核源码"
  },
  "sig_task_ignored": {
    "label": "sig_task_ignored",
    "path": "kernel/signal.c",
    "line": 84,
    "endLine": 107,
    "symbol": "sig_task_ignored",
    "note": "自动匹配的内核源码"
  },
  "getpid": {
    "label": "getpid",
    "path": "kernel/sys.c",
    "line": 999,
    "endLine": 1022,
    "symbol": "getpid",
    "note": "自动匹配的内核源码"
  },
  "gettid": {
    "label": "gettid",
    "path": "kernel/sys.c",
    "line": 1005,
    "endLine": 1028,
    "symbol": "gettid",
    "note": "自动匹配的内核源码"
  },
  "setpgid": {
    "label": "setpgid",
    "path": "kernel/sys.c",
    "line": 1114,
    "endLine": 1137,
    "symbol": "setpgid",
    "note": "自动匹配的内核源码"
  },
  "set_ftrace_filter": {
    "label": "set_ftrace_filter",
    "path": "kernel/trace/ftrace.c",
    "line": 4269,
    "endLine": 4292,
    "symbol": "set_ftrace_filter",
    "note": "自动匹配的内核源码"
  },
  "__builtin_ctz": {
    "label": "__builtin_ctz",
    "path": "lib/clz_ctz.c",
    "line": 8,
    "endLine": 31,
    "symbol": "__builtin_ctz",
    "note": "自动匹配的内核源码"
  },
  "do_wp_page": {
    "label": "do_wp_page",
    "path": "mm/huge_memory.c",
    "line": 2195,
    "endLine": 2218,
    "symbol": "do_wp_page",
    "note": "自动匹配的内核源码"
  },
  "do_anonymous_page": {
    "label": "do_anonymous_page",
    "path": "mm/memory.c",
    "line": 98,
    "endLine": 121,
    "symbol": "do_anonymous_page",
    "note": "自动匹配的内核源码"
  },
  "select_bad_process": {
    "label": "select_bad_process",
    "path": "mm/oom_kill.c",
    "line": 362,
    "endLine": 385,
    "symbol": "select_bad_process",
    "note": "自动匹配的内核源码"
  },
  "oom_kill_process": {
    "label": "oom_kill_process",
    "path": "mm/oom_kill.c",
    "line": 1008,
    "endLine": 1031,
    "symbol": "oom_kill_process",
    "note": "自动匹配的内核源码"
  },
  "shrink_node": {
    "label": "shrink_node",
    "path": "mm/vmpressure.c",
    "line": 128,
    "endLine": 151,
    "symbol": "shrink_node",
    "note": "自动匹配的内核源码"
  },
  "skbuff_head_cache": {
    "label": "skbuff_head_cache",
    "path": "net/core/skbuff.c",
    "line": 5159,
    "endLine": 5182,
    "symbol": "skbuff_head_cache",
    "note": "自动匹配的内核源码"
  },
  "SYN_RECV": {
    "label": "SYN_RECV",
    "path": "net/core/sock_reuseport.c",
    "line": 614,
    "endLine": 637,
    "symbol": "SYN_RECV",
    "note": "自动匹配的内核源码"
  },
  "tcp_tw_reuse": {
    "label": "tcp_tw_reuse",
    "path": "net/ipv4/sysctl_net_ipv4.c",
    "line": 1100,
    "endLine": 1123,
    "symbol": "tcp_tw_reuse",
    "note": "自动匹配的内核源码"
  },
  "tcp_set_state": {
    "label": "tcp_set_state",
    "path": "net/ipv4/tcp.c",
    "line": 1083,
    "endLine": 1106,
    "symbol": "tcp_set_state",
    "note": "自动匹配的内核源码"
  },
  "ISN": {
    "label": "ISN",
    "path": "net/ipv4/tcp_fastopen.c",
    "line": 475,
    "endLine": 498,
    "symbol": "ISN",
    "note": "自动匹配的内核源码"
  },
  "tcp_rcv_state_process": {
    "label": "tcp_rcv_state_process",
    "path": "net/ipv4/tcp_input.c",
    "line": 7044,
    "endLine": 7067,
    "symbol": "tcp_rcv_state_process",
    "note": "自动匹配的内核源码"
  },
  "tcp_v4_connect": {
    "label": "tcp_v4_connect",
    "path": "net/ipv4/tcp_ipv4.c",
    "line": 208,
    "endLine": 231,
    "symbol": "tcp_v4_connect",
    "note": "自动匹配的内核源码"
  },
  "SYN_SENT": {
    "label": "SYN_SENT",
    "path": "net/ipv4/tcp_minisocks.c",
    "line": 787,
    "endLine": 810,
    "symbol": "SYN_SENT",
    "note": "自动匹配的内核源码"
  },
  "FIN_WAIT": {
    "label": "FIN_WAIT",
    "path": "net/netfilter/ipvs/ip_vs_proto_tcp.c",
    "line": 377,
    "endLine": 400,
    "symbol": "FIN_WAIT",
    "note": "自动匹配的内核源码"
  }
}
