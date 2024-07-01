FROM node:20.14.0-bullseye-slim AS base
RUN apt-get update
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .
RUN yarn prisma generate