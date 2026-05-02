# Linux 内核修仙传

> 以修仙之名，悟内核之道。

一部以 Linux 内核为背景的修仙小说。进程是修士，调度器是天道，内存是内景天地，文件系统是永恒之森。

主角林小源从最底层的 idle 进程（PID 0）起步，历经九大境界，最终飞升成为内核 Maintainer。

## 阅读

在线阅读：[https://chenmiaoi.github.io/linux-xiuxian/](https://chenmiaoi.github.io/linux-xiuxian/)

## 本地开发

```bash
# 克隆仓库（含内核源码子模块）
git clone --recursive https://github.com/ChenMiaoi/linux-xiuxian.git
cd linux-xiuxian

# 安装依赖
npm install

# 本地预览
npm run dev

# 构建
npm run build
```

## 项目结构

```
├── .vitepress/          # VitePress 配置与自定义主题
├── docs/
│   ├── index.md         # 首页
│   ├── guide/           # 修仙指南（世界观、修炼体系、人物志）
│   ├── novel/           # 小说正文（十卷）
│   └── reference/       # 技术参考（内核地图、术语表、源码索引）
├── vendor/linux/        # Linux 内核源码（git submodule）
└── package.json
```

## 小说大纲

| 卷 | 卷名 | 内核子系统 | 境界 |
|---|---|---|---|
| 一 | 混沌初开 | Boot & 初始化 | 炼气期 |
| 二 | 万物之基 | 进程管理 | 筑基期 |
| 三 | 天道均衡 | 调度器 | 结丹期 |
| 四 | 内景天地 | 内存管理 | 元婴期 |
| 五 | 永恒之森 | 文件系统 | 斩灵期 |
| 六 | 沧海横流 | 网络 | 问道期 |
| 七 | 天地之桥 | 设备驱动 | 合道期 |
| 八 | 天劫降临 | 安全 | 渡劫期 |
| 九 | 大道无形 | 内核架构 | 大乘期 |
| 十 | 飞升大道 | 补丁提交 | 飞升 |

## 贡献

欢迎贡献！请阅读 [贡献手册](CONTRIBUTING.md) 了解详情。

## 许可证

本项目采用 [MIT 许可证](LICENSE)。

小说内容（`docs/` 目录）的版权归原作者所有。
Linux 内核源码（`vendor/linux/`）遵循 [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.html)。
