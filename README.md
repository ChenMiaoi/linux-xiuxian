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

## 部署

项目默认支持根路径部署，适合直接通过域名访问，例如 `https://linux-xiuxian.asia/`。

```bash
# 构建并启动 Docker 服务，默认监听宿主机 8080 端口
npm run deploy
```

如果前面有 HTTPS Nginx 反代，请在本机 `.deploy.yaml` 中确认：

```yaml
site_base: /
trust_proxy: true
cookie:
  secure: true
app_origin: https://linux-xiuxian.asia
```

Nginx 模板见 `deploy/nginx-linux-xiuxian.conf.template`，将其中的 `__DOMAIN__` 和 `__UPSTREAM__` 替换后即可使用。

腾讯云 Lighthouse 这类证书文件部署方式，可按下面替换：

```nginx
server {
    listen 443 ssl;
    server_tokens off;
    keepalive_timeout 5;
    server_name linux-xiuxian.asia;
    access_log logs/linux-xiuxian.log;
    error_log logs/linux-xiuxian.error.log;

    ssl_certificate linux-xiuxian.asia_bundle.crt;
    ssl_certificate_key linux-xiuxian.asia.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    client_max_body_size 2m;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }
}
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
