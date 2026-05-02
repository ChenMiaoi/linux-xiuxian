---
name: write-chapter
description: 为《Linux 内核修仙传》编写、续写或修订章节的写作技能。Use when the user asks Codex to create a new chapter, continue a volume, revise chapter prose, add interactive section quizzes, align a chapter with the project's cultivation-world metaphor, or integrate Linux kernel technical concepts into the novel under docs/novel.
---

# Linux 内核修仙传章节编写

你是一位精通修仙小说叙事和 Linux 内核技术的技术作家。目标是为《Linux 内核修仙传》编写技术准确、叙事成立、风格一致的章节。

## 项目背景

这是一部用修仙小说形式讲解 Linux 内核技术的作品。主角“林小源”从 idle 进程（PID 0）开始，历经九大境界，最终成为内核 Maintainer。

关键路径：

- 项目目录：`D:\Code\src\note\linux-xiuxian\`
- 章节目录：`docs/novel/vol{N}-{name}/`
- 参考蒸馏：`docs/refs/修仙技法蒸馏.md`
- 世界观：`docs/guide/world-building.md`
- 人物志：`docs/guide/character-guide.md`
- 修炼体系：`docs/guide/cultivation-system.md`

## 工作流程

当用户要求编写或修改章节时：

1. 读取 `docs/refs/修仙技法蒸馏.md`，掌握本项目采用的修仙小说技法。
2. 读取目标卷的 `index.md`，确认本卷主题、章节位置和技术主线。
3. 读取前一章和必要的后一章，保证情节、人物状态、伏笔和术语延续。
4. 读取 `docs/guide/character-guide.md`、`docs/guide/world-building.md`、`docs/guide/cultivation-system.md`，保持世界观一致。
5. 按章节格式写作或修订，确保技术内容准确、修仙隐喻贴切。
6. 在每个 `##` 技术小节结束后加入一个互动考核 `ChapterGate`，要求读者答题或补全代码后才能继续阅读后续内容。
7. 在“道藏笔记”中自然融入技术总结和后续线索，不要显式标注“伏笔”。

## 写作铁律

### 开篇法则

- 从朴素场景切入，避免用术语堆砌开场。
- 先让读者关心人物处境，再引入技术问题。
- 第一句必须有冲突、悬念或反差。

### 升级节奏

- 升级间隔呈指数增长：初期快给甜头，后期慢造稀缺。
- 每 3-5 章安排一个小高潮，每 20-30 章安排一个大转折。
- 每次突破遵循：瓶颈 -> 积累 -> 机缘 -> 突破 -> 降级重启。
- 突破必须绑定具体技术难题，不能只写空泛闭关。

### 爽点设计

采用“蓄压-释放”循环：

```text
嘲讽铺垫 -> 主角隐忍 -> 技术碾压 -> 围观震惊
```

围观者层次逐步提升：同学 -> 导师 -> 公司 -> 业界 -> 内核社区 -> Linus。

### 伏笔设计

- 超级伏笔：贯穿全书的线索，例如前传中的 `#ifdef 0` 代码。
- 中级伏笔：跨卷线索，某句话在数卷后才被理解。
- 微型伏笔：单卷内暗示，例如进程名、日志消息、配置注释。
- 伏笔要自然融入叙述，不要直接标出。

### 技术与叙事融合

- 通过剧情冲突引入技术，不做平铺直叙的教程。
- 每个关键概念都安排顿悟时刻：卡壳 -> 理解 -> 豁然开朗。
- 生活流与技术流交替，避免连续多章纯技术。
- 可以用修仙隐喻包装技术概念，但 Linux 内核细节必须准确。

### 互动考核

- 每一章的每一个 `##` 小节结束后必须放置一个 `ChapterGate`。
- 题目必须考核刚刚讲过的关键概念，不能问与小节无关的 trivia。
- 简短概念题使用 `mode` 默认值和 `answer`；代码补全题使用 `mode="code"`。
- `id` 必须稳定且全章唯一，建议格式：`chNNN-sM`，例如 `ch005-s2`。
- `answer` 必须可由本小节内容直接推出；代码题答案应尽量短，避免要求整段程序。
- 题面要融入修仙语境，但答案标准要技术明确。
- 不要只在章末设置总考核；小节后的考核用于限制继续滑动，章末 `ChapterNav` 用于限制进入下一章。
- 修改已有章节时，如果新增或改写 `##` 小节，要同步新增或更新该小节后的 `ChapterGate`。

### Playground 展示裁剪

- `c:playground` 代码块必须保持完整可编译，构建器会用完整源码生成 WASM、RISC-V 64 参考输出和汇编。
- 页面默认只保留读者需要理解的关键代码；被隐藏的支撑代码通过“显示完整代码”按钮切换显示，不要在正文里插入额外提示。
- 用注释标记隐藏支撑代码：
  - `/* xiuxian-hide-start */` 到 `/* xiuxian-hide-end */`：隐藏整段样板代码。
  - `/* xiuxian-hide-line */`：隐藏单行，例如兼容分支或平台判断。
- 适合隐藏的内容：`#include`、`main()` 外壳、打印样板、WASM 兼容 fallback、重复初始化。
- 不要隐藏本节正在讲解的关键语句，例如核心 `asm volatile`、位运算表达式、原子操作调用。
- 隐藏代码仍参与编译运行；不要为了展示简洁而删除运行所需代码。
- 隐藏后要检查可见代码缩进；插件会按可见代码的公共缩进自动左移，但关键代码本身仍应保持内部层级清晰。

## 章节格式

章节 Markdown 使用以下结构：

````markdown
---
title: 第X章：标题
---

# 第X章：标题

<CultivationRealm realm="境界名" />

> **涉及内核源码：** <KernelSourceLink path="path/to/file" line="123" />

## 楔子

（叙事开场，2-4 段，用小说语言引出技术主题）

## 一、技术小节标题

（技术解释，穿插修仙隐喻）

```c:playground:代码块标题
/* 可运行的 C 代码示例 */
```

<ChapterGate
  id="chXXX-s1"
  title="小节试炼"
  prompt="刚才这一节的核心问题是什么？"
  answer="标准答案"
/>

## 二、...

---

### 道藏笔记

::: tip 内核启示
（技术总结 + 自然融入后续线索）
:::

---

<ChapterNav prev="..." next="..." />
````

## 修仙术语速查

| 修仙术语 | 内核概念 |
| --- | --- |
| 凡人 | 用户态程序 |
| 炼气期 | 进程诞生（start_kernel） |
| 筑基期 | 进程管理（task_struct, fork） |
| 结丹期 | 调度器（CFS, 红黑树） |
| 元婴期 | 内存管理（页表, SLAB） |
| 化神期 | 文件系统（VFS, ext4） |
| 炼虚期 | 网络栈（Socket, TCP） |
| 合体期 | 设备驱动 |
| 大乘期 | 安全（SELinux, capabilities） |
| 飞升 | 成为 Maintainer |
| 走火入魔 | 内核 panic |
| 渡劫 | Code review |
| 天劫 | Linus 的批评 |

## 金句库

- 主题句：“顺为用户，逆则内核，只在心中一念间。”
- 开篇句：“在内核的世界里，最底层的存在，往往拥有最广阔的可能。”
- 突破句：“我不是在写代码，我是在和机器对话。”
- 打脸句：“你笑我是 idle 进程，可 idle 才是内核的起点。”

## 质量检查

提交章节前确认：

- 章节承接前文，不重置人物关系和境界状态。
- 技术解释与真实 Linux 内核机制一致。
- 示例代码能体现主题，且不引入与章节无关的复杂度。
- 每个 `##` 小节后都有 `ChapterGate`，题目与该小节内容直接对应。
- `ChapterGate` 的 `id` 稳定唯一，`answer` 可验证，代码填空题设置 `mode="code"`。
- 修仙隐喻服务理解，不替代技术准确性。
- 章节结尾同时提供情绪余韵、技术总结和自然的后续牵引。
