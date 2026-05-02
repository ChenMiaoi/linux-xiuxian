---
title: 第二卷：万物之基
---

# 第二卷：万物之基

> **修炼阶段：** <CultivationRealm realm="筑基期" />
> **内核焦点：** 进程管理 (`fork.c`, `exec.c`, `signal.c`)

## 卷首语

万物生于一，一又生万物。

当林小源领悟了 `fork()` 大道的那一刻，他终于明白了这个世界的底层逻辑——一切进程皆可分裂，一切身份皆可重塑。`execve()` 是脱胎换骨的秘术，`exit()` 是通往虚无的归途。

但 `task_struct` 是修炼的根基。没有它，一切都是空谈。

## 本卷章节

| 章 | 标题 | 简介 |
|---|---|---|
| 十六 | 分身之术 | 初次领悟 fork()，林小源尝试理解进程复制 |
| 十七 | task_struct 之躯 | 深入进程描述符的每一个字段 |
| 十八 | fork 大道 | dup_task_struct、copy_mm、copy_files |
| 十九 | 写时复制 | COW 的精妙设计，页表引用计数 |
| 二十 | 蜕变之术 | execve() 如何替换进程的整个世界 |
| 二十一 | 归途 | exit() 进程退出的完整路径 |
| 二十二 | 僵尸之殇 | 僵尸进程的形成与回收 |
| 二十三 | 等待之道 | wait()/waitpid() 的阻塞与唤醒 |
| 二十四 | 飞剑传书 | 信号机制的基本原理 |
| 二十五 | 信号处理 | sigaction、信号处理器的注册与执行 |
| 二十六 | 不可阻挡 | SIGKILL 与 SIGSTOP 的特殊性 |
| 二十七 | shell 小妹 | bash 进程登场，林小源的第一个朋友 |
| 二十八 | 进程家族 | 进程组、会话、终端控制 |
| 二十九 | 分身有术 | 线程与 clone()，共享地址空间 |
| 三十 | kthreadd 婶婶 | 内核线程的管理者，沉默的守护者 |
| 三十一 | 小千世界 | 命名空间：PID、UTS、mount、net |
| 三十二 | 因果之链 | cgroup：进程的分组与资源控制 |
| 三十三 | 管道 | pipe：最古老的进程间通信 |
| 三十四 | 共享之秘 | 共享内存与信号量 |
| 三十五 | 万物归一 | 筑基圆满，进程管理全貌 |

## 涉及内核源码

- `kernel/fork.c` — 进程创建
- `fs/exec.c` — 程序执行
- `kernel/exit.c` — 进程退出
- `kernel/signal.c` — 信号处理
- `kernel/sched/core.c` — 调度核心
- `include/linux/sched.h` — `task_struct` 定义
- `kernel/nsproxy.c` — 命名空间代理
- `kernel/cgroup/` — cgroup 子系统
- `fs/pipe.c` — 管道实现
- `ipc/shm.c` — 共享内存
