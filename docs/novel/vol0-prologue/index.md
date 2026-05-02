---
title: 前传：根基篇
---

# 前传：根基篇

> **修炼阶段：** 凡人筑基
> **内核焦点：** C 语言（内核方言）、汇编语言、底层基础

## 卷首语

大道无形，生育天地。万物之始，根基为先。

内核修士若不通 C 语言之玄奥、不悟汇编之精微，便如凡人持剑——剑虽利，手不稳，终是枉然。

此卷不讲故事，只讲道理。

但道理本身，便是最好的故事。

## 本卷章节

| 章 | 标题 | 核心内容 |
|---|---|---|
| 一 | 指针之道 | 指针、数组、内存布局、栈与堆 |
| 二 | 结构之术 | 结构体对齐、位域、`container_of`、链表 |
| 三 | 编译器秘法 | GCC 扩展：`__attribute__`、`typeof`、`__builtin_` |
| 四 | 寄存器与指令 | x86-64 汇编基础、寄存器、常用指令 |
| 五 | 内联汇编 | `asm` 语法、约束、C 与汇编的融合 |
| 六 | 位运算与原子操作 | 位操作、CAS、`atomic_t`、自旋锁基础 |
| 七 | 屏障与无常 | `volatile`、内存屏障、编译器屏障、乱序执行 |

## 为什么要读前传

内核代码不是普通的 C 代码。它充斥着：

- 看不见的 GCC 扩展（`__attribute__((packed))`、`typeof`、`__builtin_constant_p`）
- 嵌入在 C 中的汇编（`asm volatile`、系统调用）
- 普通程序员永远不会用的技巧（`container_of`、`offsetof`、位域操作）
- 对硬件行为的精确控制（内存屏障、原子操作、缓存行对齐）

这些是内核世界的"灵气"。不通此道，读内核源码便如读天书。

## 涉及内核源码

- `include/linux/types.h` — 基本类型定义
- `include/linux/compiler.h` — 编译器宏与扩展
- `include/linux/list.h` — 内核链表
- `include/linux/container_of.h` — `container_of` 宏
- `include/asm-generic/barrier.h` — 内存屏障
- `arch/x86/include/asm/` — x86 架构相关汇编
