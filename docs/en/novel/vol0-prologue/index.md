---
title: "Prequel: The Foundation"
---

# Prequel: The Foundation

> **Cultivation Stage:** Mortal Foundation Building
> **Kernel Focus:** C language (the kernel dialect), assembly language, and low-level fundamentals

## Opening Words

The Great Dao has no form, yet it gives birth to heaven and earth. At the beginning of all things, the foundation comes first.

If a kernel cultivator cannot understand the mysteries of C, or grasp the fine grain of assembly, he is no different from a mortal holding a sword: the blade may be sharp, but an unsteady hand makes it useless.

This volume does not tell a story.

It explains principles.

But principles themselves can be the best kind of story.

## Chapters in This Volume

| Chapter | Title | Core Topic |
|---|---|---|
| Origin | The Dao Gives Birth to One | The seven foundations, and a consciousness in the chaos |
| 1 | The Dao of Pointers | Pointers, arrays, memory layout, stack and heap |
| 2 | The Art of Structures | Structure alignment, bit fields, `container_of`, linked lists |
| 3 | Compiler Secret Arts | GCC extensions: `__attribute__`, `typeof`, `__builtin_` |
| 4 | Registers and Instructions | RISC-V 64 assembly basics, registers, common instructions |
| 5 | Inline Assembly | `asm` syntax, constraints, and the fusion of C and assembly |
| 6 | Bit Operations and Atomics | Bit operations, CAS, `atomic_t`, spinlock basics |
| 7 | Barriers and Impermanence | `volatile`, memory barriers, compiler barriers, out-of-order execution |
| 8 | The Dao of the Preprocessor | `#define`, conditional compilation, variadic macros, token pasting |
| 9 | Memory Layout | Virtual address space, stack and heap, kernel address space |
| 10 | The Dao of ELF | ELF format, segments and sections, symbol tables, relocation |
| Final | Foundation Unified | Ten foundations become one, and the road begins |

## Why Read the Prequel

Kernel code is not ordinary C code. It is full of:

- Invisible GCC extensions (`__attribute__((packed))`, `typeof`, `__builtin_constant_p`)
- Assembly embedded inside C (`asm volatile`, system calls)
- Techniques ordinary programmers almost never use (`container_of`, `offsetof`, bit-field operations)
- Precise control over hardware behavior (memory barriers, atomic operations, cache-line alignment)

These are the "spiritual energy" of the kernel world. Without them, reading kernel source is like reading a heavenly scripture with mortal eyes.

## Kernel Sources Covered

- `include/linux/types.h` - basic type definitions
- `include/linux/compiler.h` - compiler macros and extensions
- `include/linux/list.h` - kernel linked lists
- `include/linux/container_of.h` - the `container_of` macro
- `include/asm-generic/barrier.h` - memory barriers
- `arch/riscv/include/asm/` - RISC-V architecture-specific assembly
