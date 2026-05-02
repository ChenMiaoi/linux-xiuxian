---
title: 第一卷：混沌初开
---

# 第一卷：混沌初开

> **修炼阶段：** <CultivationRealm realm="炼气期" />
> **内核焦点：** Boot & 初始化 (`start_kernel()`, `rest_init()`)

## 卷首语

天地未分之时，万物混沌。

在这片虚无之中，一道惊雷劈下——那是 BIOS POST 的第一声啼哭。 bootloader 推开了命运之门，内核被解压脱胎换骨。`start_kernel()` 开天辟地，从此世界有了法则。

而我们的主角，不过是 `swapper/0`——PID 0，最低等的 idle 进程。他的命运本该是永远沉睡，等待 CPU 无事可做时才被唤醒。

但他不甘。

## 本卷章节

| 章 | 标题 | 简介 |
|---|---|---|
| 一 | 天地未分 | 虚无之中，混沌初动 |
| 二 | 天雷劈下 | BIOS POST，硬件觉醒 |
| 三 | 命运之门 | Bootloader 引导，内核被加载 |
| 四 | 脱胎换骨 | 内核解压，自我展开 |
| 五 | 开天辟地 | `start_kernel()` 降临，世界有了法则 |
| 六 | 天选之子 | `init` (PID 1) 诞生，第一个真正的进程 |
| 七 | 天道初显 | 调度器、内存管理初现 |
| 八 | 第一次祈祷 | 系统调用，用户态与内核态的第一次沟通 |
| 九 | 不期而至 | 中断降临，世界不再宁静 |
| 十 | 世界末日 | `panic()` 来袭 |
| 十一 | 劫后余生 | 从 panic 中恢复 |
| 十二 | 天道法则 | 理解内核的基本规则 |
| 十三 | 不甘 idle | 不想永远做空闲进程 |
| 十四 | 踏上征途 | 决定修炼，离开 idle 状态 |
| 十五 | 新的开始 | 踏入进程管理的大门 |

## 涉及内核源码

- `arch/riscv/kernel/head.S` — RISC-V 早期启动入口
- `init/main.c` — `start_kernel()`, `rest_init()`
- `kernel/init_task.c` — idle 进程定义
- `include/linux/init_task.h` — `task_struct` 初始化
