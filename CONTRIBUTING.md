# 贡献手册

感谢你对 **Linux 内核修仙传** 的关注！以下是参与贡献的方式。

## 如何贡献

### 修正错误

发现错别字、技术错误或表述不清？直接提 Issue 或提交 PR。

### 撰写章节

1. Fork 本仓库
2. 创建分支：`git checkout -b feat/vol1-ch02`
3. 按照章节模板撰写内容
4. 提交 PR，标题格式：`feat(vol1): 第二章 天雷劈下`

### 改进技术参考

修正术语对照、补充内核源码注解、完善内核地图——都欢迎。

## 章节模板

每章 markdown 文件应遵循以下结构：

```markdown
---
title: 第X章：章节标题
---

# 第X章：章节标题

<CultivationRealm realm="当前境界" />

> **涉及内核源码：** <KernelSourceLink path="kernel/sched/fair.c" />

## 正文

[小说内容]

---

### 道藏笔记

::: tip 内核启示
[技术解读，关联内核源码]
:::

---

<ChapterNav prev="/novel/vol1-chaos/chXX" next="/novel/vol1-chaos/chXX" />
```

### 境界徽章

使用 `<CultivationRealm>` 组件，支持的境界值：

- `炼气初期/中期/后期`
- `筑基初期/中期/后期`
- `结丹初期/中期/后期`
- `元婴初期/中期/后期`
- `斩灵初期/中期/后期`
- `问道初期/中期/后期`
- `合道初期/中期/后期`
- `渡劫初期/中期/后期`
- `大乘初期/中期/后期`
- `飞升`

### 内核源码链接

使用 `<KernelSourceLink>` 组件链接到真实内核源码：

```html
<!-- 链接到文件 -->
<KernelSourceLink path="kernel/sched/fair.c" />

<!-- 链接到文件的特定行 -->
<KernelSourceLink path="init/main.c" line="700" />
```

## 写作风格

### 技术准确性

- 每个修仙概念必须映射真实的内核机制
- 道藏笔记中的技术描述应准确，可引用内核源码
- 不确定的地方标注 `TODO` 或查阅 `vendor/linux` 中的源码

### 叙事风格

- 硬核技术为骨，修仙叙事为肉
- 适当使用程序员梗和内核社区趣闻
- 保持主角的草根视角——他也在学习，不是全知全能

### 命名规范

- 内核概念的修仙化命名需在 [术语对照表](docs/reference/glossary.md) 中登记
- 保持前后一致——同一个概念在不同章节应使用相同的修仙名称

## 文件命名

- 章节文件：`ch01.md`, `ch02.md` ...（两位数字补零）
- 卷目录：`vol1-chaos/`, `vol2-foundation/` ...
- 每卷必须有 `index.md` 作为卷首语

## 提交规范

使用 Conventional Commits 格式：

```
<type>(<scope>): <description>
```

- `feat(vol1): 第二章 天雷劈下`
- `fix(guide): 修正修炼体系中的术语错误`
- `docs(reference): 补充网络子系统源码注解`
- `style(theme): 调整境界徽章配色`
- `chore: 更新 VitePress 版本`

## 提问与讨论

- 报告 Issue：使用 GitHub Issues
- 讨论剧情走向：使用 GitHub Discussions

## 许可证

提交的内容默认遵循本项目的 [MIT 许可证](LICENSE)。
