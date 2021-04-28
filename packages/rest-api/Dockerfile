FROM node:lts-alpine AS base

ARG APP_VERSION_ARG=v0.0.0
ENV APP_VERSION=$APP_VERSION_ARG

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

COPY packages/eslint-config/ packages/eslint-config/
COPY packages/prettier-config/ packages/prettier-config/

COPY packages/common/ packages/common/
COPY packages/database/ packages/database/
COPY packages/rest-api/ packages/rest-api/

RUN yarn install --non-interactive

RUN yarn workspace @mach/common build
RUN yarn workspace @mach/database build
RUN yarn workspace @mach/rest-api build

ENV NODE_ENV=production
RUN yarn install --production --pure-lockfile --non-interactive --cache-folder ./ycache; rm -rf ./ycache

EXPOSE $PORT

CMD ["node", "packages/rest-api/dist/index"]
