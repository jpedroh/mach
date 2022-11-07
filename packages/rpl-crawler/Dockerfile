FROM node:lts-alpine AS base

RUN apk add curl
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /usr/src/app

COPY package.json .
COPY pnpm-*.yaml ./

COPY packages/common/ packages/common/
COPY packages/database/ packages/database/
COPY packages/rpl-crawler/ packages/rpl-crawler/

ENV NODE_ENV=production
RUN pnpm install

CMD ["node", "packages/rpl-crawler/dist/main"]
