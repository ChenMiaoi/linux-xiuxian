FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package*.json ./
COPY scripts/setup-git-hooks.mjs ./scripts/setup-git-hooks.mjs
RUN npm ci

FROM deps AS builder
WORKDIR /app
COPY . .
RUN VITEPRESS_LAST_UPDATED=false npm run build:docker

FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8080
ENV DATABASE_PATH=/data/app.db
ENV SITE_BASE=/linux-xiuxian/

COPY package*.json ./
COPY scripts/setup-git-hooks.mjs ./scripts/setup-git-hooks.mjs
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=builder /app/docs/.vitepress/dist ./docs/.vitepress/dist
COPY server ./server

RUN mkdir -p /data
VOLUME ["/data"]
EXPOSE 8080
CMD ["node", "server/index.js"]
