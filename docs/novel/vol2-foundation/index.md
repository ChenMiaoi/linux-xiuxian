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
| 十六 | 分身之术 | 初次领悟 `fork()` |
| 十七 | task_struct 之躯 | 理解进程的肉身 |
| 十八 | fork 大道 | 掌握进程创建的奥秘 |
| ... | ... | ... |
| 三十五 | 万物归一 | 筑基圆满 |

## 涉及内核源码

- `kernel/fork.c` — 进程创建
- `kernel/exec.c` — 程序执行
- `kernel/exit.c` — 进程退出
- `kernel/signal.c` — 信号处理
- `include/linux/sched.h` — `task_struct` 定义
