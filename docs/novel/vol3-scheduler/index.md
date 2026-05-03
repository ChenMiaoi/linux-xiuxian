---
title: 第三卷：天道均衡
---

# 第三卷：天道均衡

> **修炼阶段：** <CultivationRealm realm="结丹期" />
> **内核焦点：** 调度器 (`kernel/sched/fair.c`, `kernel/sched/core.c`, EEVDF)

## 卷首语

天道酬勤，亦酬公平。

在调度竞技场中，每一个进程都渴望更多的 CPU 时间。旧日的 CFS 以 `vruntime` 和红黑树为天秤，试图模拟一台理想的多任务 CPU；新的 EEVDF 又把公平推进到 lag 与 virtual deadline 的尺度上，追问谁被亏欠、谁期限更近。想走捷径？RT 与 Deadline 的精英们早已占据了更严苛的通道。

这是关于公平与效率的修行。

## 本卷章节

| 章 | 标题 | 简介 |
|---|---|---|
| 三十六 | 竞技场 | 进入调度竞技场，理解 CPU 时间的竞争 |
| 三十七 | 调度仙子 | CFS 调度器登场，vruntime、lag 与 EEVDF 的公平新法 |
| 三十八 | 红黑树 | 红黑树作为旧日天秤的实现细节 |
| 三十九 | 时间片 | 时间片的分配、抢占与唤醒抢占 |
| 四十 | 优先级 | nice 值、权重与调度精度 |
| 四十一 | 运行队列 | per-CPU 运行队列的设计 |
| 四十二 | 负载均衡 | 多核之间的任务迁移 |
| 四十三 | 域与组 | 调度域与调度组的层次结构 |
| 四十四 | 亲和性 | CPU 亲和性与 NUMA 感知调度 |
| 四十五 | RT 调度 | 实时调度器的精英路径 |
| 四十六 | Deadline | 截止时间调度器的时间之约 |
| 四十七 | 上下文切换 | context_switch 的开销与优化 |
| 四十八 | 调度类 | 调度类的层次与优先级 |
| 四十九 | 睡眠与唤醒 | wait_queue 与进程状态转换 |
| 五十 | idle 之道 | idle 进程的调度特殊性 |
| 五十一 | 抢占 | 抢占式调度与内核抢占 |
| 五十二 | 调度延迟 | 延迟的来源与优化策略 |
| 五十三 | 调度器演进 | 从 O(1) 到 CFS 的历史变迁 |
| 五十四 | 多核之惑 | 多核调度的挑战与权衡 |
| 五十五 | 结丹圆满 | 调度器全貌与修行总结 |

## 涉及内核源码

- `kernel/sched/core.c` — 调度核心
- `kernel/sched/fair.c` — CFS 调度器
- `Documentation/scheduler/sched-eevdf.rst` — EEVDF 调度文档
- `kernel/sched/rt.c` — 实时调度器
- `kernel/sched/deadline.c` — Deadline 调度器
- `kernel/sched/stop_task.c` — Stop 调度类
- `kernel/sched/idle_task.c` — Idle 调度类
- `include/linux/sched.h` — 进程描述符
- `kernel/sched/sched.h` — 调度器内部结构
