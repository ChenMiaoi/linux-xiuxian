---
title: 第四卷：内景天地
---

# 第四卷：内景天地

> **修炼阶段：** <CultivationRealm realm="元婴期" />
> **内核焦点：** 内存管理 (`mm/`)

## 卷首语

元婴修士，内景自成天地。

虚拟内存是一场精妙的幻术——你以为自己拥有无尽的疆土，实则一切都被页表映射到有限的物理内存之上。页 fault 是觉醒的契机，OOM 是天劫的降临。

这是最凶险的境界。十修九死，绝非虚言。

## 本卷章节

| 章 | 标题 | 简介 |
|---|---|---|
| 五十六 | 内景初开 | 虚拟内存的基本概念，mm_struct 登场 |
| 五十七 | 页表经脉 | 页表结构（Sv39），PTE 的每一个 bit |
| 五十八 | 虚实之映 | 虚拟地址到物理地址的翻译过程 |
| 五十九 | 内存宫殿 | VMA（vm_area_struct），进程的地址空间布局 |
| 六十 | mmap 之术 | mmap() 系统调用与需求分页 |
| 六十一 | 页 fault | 缺页异常的处理流程 |
| 六十二 | 写时复制 | COW 的深层实现与页表引用计数 |
| 六十三 | 匿名之页 | 匿名页与零页的特殊处理 |
| 六十四 | 文件之页 | 文件映射与 page cache |
| 六十五 | 页面回收 | LRU 链表与页面回收策略 |
| 六十六 | kswapd | 内核交换守护进程 |
| 六十七 | 交换之术 | swap 机制与 swap cache |
| 六十八 | 页分配器 | 伙伴系统（buddy system） |
| 六十九 | Slab | Slab 分配器与 kmalloc/kfree |
| 七十 | vmalloc | vmalloc 与内核虚拟地址空间 |
| 七十一 | 内存映射 | 内核内存映射与 remap_pfn_range |
| 七十二 | 大页 | 大页（Huge Pages）机制 |
| 七十三 | NUMA 内存 | NUMA 内存分配与 mempolicy |
| 七十四 | OOM 杀手 | OOM killer 与 oom_score |
| 七十五 | 内存泄漏 | 内存泄漏检测与 kmemleak |
| 七十六 | 内存压缩 | 内存碎片整理（compaction） |
| 七十七 | 透明大页 | 透明大页（THP）机制 |
| 七十八 | 内存调试 | KASAN 与内存调试工具 |
| 七十九 | 内存之道 | 内存管理的设计哲学 |
| 八十 | 元婴圆满 | 内存管理全貌与修行总结 |

## 涉及内核源码

- `mm/memory.c` — 页面 fault 处理
- `mm/mmap.c` — 内存映射
- `mm/page_alloc.c` — 页分配器（伙伴系统）
- `mm/vmscan.c` — 页面回收
- `mm/oom_kill.c` — OOM 杀手
- `mm/slab.c` — Slab 分配器
- `mm/vmalloc.c` — vmalloc
- `mm/swap_state.c` — swap 缓存
- `mm/compaction.c` — 内存压缩
- `include/linux/mm_types.h` — 内存管理数据结构
- `arch/riscv/mm/` — RISC-V 架构相关内存管理
