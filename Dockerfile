FROM node:20.14.0-bullseye-slim AS base
RUN apt-get update && \
    npm install -g pnpm
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/app/.pnpm-store pnpm install

COPY . .
RUN pnpm prisma generate