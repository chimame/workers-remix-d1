FROM node:16.18-bullseye-slim

RUN apt update && apt install -y curl && \
  curl -OL https://github.com/k0kubun/sqldef/releases/download/v0.15.7/sqlite3def_linux_amd64.tar.gz && \
  tar xf sqlite3def_linux_amd64.tar.gz -C /usr/local/bin/ && \
  npm install -g pnpm

WORKDIR /app
