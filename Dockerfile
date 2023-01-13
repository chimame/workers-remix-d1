FROM node:16.18-bullseye-slim

RUN npm install -g pnpm

WORKDIR /app
