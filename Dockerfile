FROM node:22.9.0-bullseye-slim AS dev

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn prisma generate

FROM node:22.9.0-bullseye-slim AS production

WORKDIR /app

COPY --from=dev /app/node_modules ./node_modules

COPY . .