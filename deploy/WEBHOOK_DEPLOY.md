# GitHub Webhook 自动部署

这个方案不需要 GitHub Actions SSH 到服务器。GitHub push 事件会请求服务器上的 webhook，服务器本地校验签名后拉取最新 `main` 并执行 Docker 部署。

## 1. 服务器环境变量

复制示例文件：

```bash
sudo cp /opt/linux-xiuxian/deploy/linux-xiuxian-webhook.env.example /etc/linux-xiuxian-webhook.env
sudo nano /etc/linux-xiuxian-webhook.env
```

生成一个 webhook secret：

```bash
openssl rand -hex 32
```

填入：

```env
WEBHOOK_HOST=127.0.0.1
WEBHOOK_PORT=9000
WEBHOOK_PATH=/github-webhook
WEBHOOK_SECRET=生成的随机密钥
REPO_DIR=/opt/linux-xiuxian
DEPLOY_BRANCH=main
GITHUB_REPOSITORY=ChenMiaoi/linux-xiuxian
HEALTHCHECK_URL=http://127.0.0.1:8080/api/health
DEPLOY_CONFIG_FILE=/etc/linux-xiuxian.deploy.yaml
```

权限：

```bash
sudo chmod 600 /etc/linux-xiuxian-webhook.env
sudo chown root:root /etc/linux-xiuxian-webhook.env
```

生产部署配置不要放在仓库里的 `.deploy.yaml`，否则 webhook 服务执行 `git reset --hard origin/main` 时会覆盖服务器本地修改。改用 `/etc/linux-xiuxian.deploy.yaml`：

```bash
sudo cp /opt/linux-xiuxian/.deploy.yaml /etc/linux-xiuxian.deploy.yaml
sudo nano /etc/linux-xiuxian.deploy.yaml
sudo chmod 600 /etc/linux-xiuxian.deploy.yaml
```

## 2. 安装 systemd 服务

```bash
sudo cp /opt/linux-xiuxian/deploy/linux-xiuxian-webhook.service /etc/systemd/system/linux-xiuxian-webhook.service
sudo systemctl daemon-reload
sudo systemctl enable --now linux-xiuxian-webhook
sudo systemctl status linux-xiuxian-webhook
```

查看日志：

```bash
journalctl -u linux-xiuxian-webhook -f
```

## 3. Nginx 反代 webhook

在 HTTPS server 块的 `location /` 前加入：

```nginx
location = /github-webhook {
  proxy_pass http://127.0.0.1:9000/github-webhook;
  proxy_http_version 1.1;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

重载：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 4. GitHub 配置 Webhook

进入仓库 `Settings -> Webhooks -> Add webhook`：

- Payload URL: `https://linux-xiuxian.asia/github-webhook`
- Content type: `application/json`
- Secret: `/etc/linux-xiuxian-webhook.env` 里的 `WEBHOOK_SECRET`
- Which events: `Just the push event`
- Active: 勾选

保存后 GitHub 会发送 ping。之后 push 到 `main`，服务器会自动部署。
