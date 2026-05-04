#!/usr/bin/env bash
set -euo pipefail

APP_NAME="${APP_NAME:-linux-xiuxian}"
DOMAIN="${DOMAIN:-linux-xiuxian.asia}"
REPO_DIR="${REPO_DIR:-/opt/linux-xiuxian}"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"
GITHUB_REPOSITORY="${GITHUB_REPOSITORY:-ChenMiaoi/linux-xiuxian}"
WEBHOOK_HOST="${WEBHOOK_HOST:-127.0.0.1}"
WEBHOOK_PORT="${WEBHOOK_PORT:-9000}"
WEBHOOK_PATH="${WEBHOOK_PATH:-/github-webhook}"
WEBHOOK_ENV_FILE="${WEBHOOK_ENV_FILE:-/etc/linux-xiuxian-webhook.env}"
DEPLOY_CONFIG_FILE="${DEPLOY_CONFIG_FILE:-/etc/linux-xiuxian.deploy.yaml}"
SERVICE_FILE="${SERVICE_FILE:-/etc/systemd/system/linux-xiuxian-webhook.service}"
HEALTHCHECK_URL="${HEALTHCHECK_URL:-http://127.0.0.1:8080/api/health}"
SERVICE_USER="${SERVICE_USER:-ubuntu}"
SERVICE_GROUP="${SERVICE_GROUP:-ubuntu}"
NGINX_SITE_CONFIG="${NGINX_SITE_CONFIG:-}"

if [[ "${EUID}" -ne 0 ]]; then
  echo "请用 sudo 运行: sudo bash deploy/install-webhook.sh"
  exit 1
fi

if [[ ! -d "${REPO_DIR}" ]]; then
  echo "仓库目录不存在: ${REPO_DIR}"
  exit 1
fi

if ! command -v openssl >/dev/null 2>&1; then
  echo "缺少 openssl，请先安装: sudo apt install -y openssl"
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "缺少 npm，请先安装 Node.js/npm"
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "缺少 docker，请先安装 Docker"
  exit 1
fi

WEBHOOK_SECRET="$(openssl rand -hex 32)"

cat > "${WEBHOOK_ENV_FILE}" <<EOF
WEBHOOK_HOST=${WEBHOOK_HOST}
WEBHOOK_PORT=${WEBHOOK_PORT}
WEBHOOK_PATH=${WEBHOOK_PATH}
WEBHOOK_SECRET=${WEBHOOK_SECRET}
REPO_DIR=${REPO_DIR}
DEPLOY_BRANCH=${DEPLOY_BRANCH}
GITHUB_REPOSITORY=${GITHUB_REPOSITORY}
HEALTHCHECK_URL=${HEALTHCHECK_URL}
DEPLOY_CONFIG_FILE=${DEPLOY_CONFIG_FILE}
EOF

chmod 600 "${WEBHOOK_ENV_FILE}"
chown root:root "${WEBHOOK_ENV_FILE}"

if [[ ! -f "${DEPLOY_CONFIG_FILE}" ]]; then
  if [[ -f "${REPO_DIR}/.deploy.yaml" ]]; then
    cp "${REPO_DIR}/.deploy.yaml" "${DEPLOY_CONFIG_FILE}"
  else
    cat > "${DEPLOY_CONFIG_FILE}" <<EOF
node_env: production
host: 0.0.0.0
port: 8080
database_path: /data/app.db
site_base: /
cookie:
  secret: ${WEBHOOK_SECRET}
  secure: true
trust_proxy: true
rate_limit:
  max: 120
  window: 1 minute
admin_usernames: []
app_origin: https://${DOMAIN}
github:
  client_id: ""
  client_secret: ""
  callback_url: "https://${DOMAIN}/api/github/callback"
EOF
  fi
  chmod 600 "${DEPLOY_CONFIG_FILE}"
fi

sed \
  -e "s|^WorkingDirectory=.*|WorkingDirectory=${REPO_DIR}|" \
  -e "s|^EnvironmentFile=.*|EnvironmentFile=${WEBHOOK_ENV_FILE}|" \
  -e "s|^User=.*|User=${SERVICE_USER}|" \
  -e "s|^Group=.*|Group=${SERVICE_GROUP}|" \
  "${REPO_DIR}/deploy/linux-xiuxian-webhook.service" > "${SERVICE_FILE}"

systemctl daemon-reload
systemctl enable --now linux-xiuxian-webhook

if [[ -n "${NGINX_SITE_CONFIG}" ]]; then
  if [[ ! -f "${NGINX_SITE_CONFIG}" ]]; then
    echo "Nginx 配置文件不存在: ${NGINX_SITE_CONFIG}"
    exit 1
  fi

  if ! grep -q "location = ${WEBHOOK_PATH}" "${NGINX_SITE_CONFIG}"; then
    cp "${NGINX_SITE_CONFIG}" "${NGINX_SITE_CONFIG}.bak.$(date +%Y%m%d%H%M%S)"
    python3 - "${NGINX_SITE_CONFIG}" "${WEBHOOK_PATH}" "${WEBHOOK_PORT}" <<'PY'
import pathlib
import sys

path = pathlib.Path(sys.argv[1])
webhook_path = sys.argv[2]
webhook_port = sys.argv[3]
text = path.read_text()
location = f"""
  location = {webhook_path} {{
    proxy_pass http://127.0.0.1:{webhook_port}{webhook_path};
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }}

"""
marker = "  location / {"
if marker not in text:
    raise SystemExit(f"未找到插入位置: {marker}")
path.write_text(text.replace(marker, location + marker, 1))
PY
    nginx -t
    systemctl reload nginx
  fi
fi

echo
echo "Webhook 服务已安装。"
echo
echo "GitHub Webhook 配置:"
echo "  Payload URL: https://${DOMAIN}${WEBHOOK_PATH}"
echo "  Content type: application/json"
echo "  Secret: ${WEBHOOK_SECRET}"
echo "  Events: Just the push event"
echo
echo "生产配置文件: ${DEPLOY_CONFIG_FILE}"
echo "如需配置 GitHub OAuth，请编辑:"
echo "  sudo nano ${DEPLOY_CONFIG_FILE}"
echo
echo "查看服务状态:"
echo "  sudo systemctl status linux-xiuxian-webhook"
echo
echo "查看部署日志:"
echo "  sudo journalctl -u linux-xiuxian-webhook -f"
