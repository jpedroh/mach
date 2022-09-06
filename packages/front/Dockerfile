FROM node:lts AS build

ARG APP_VERSION_ARG=v0.0.0
ENV VITE_APP_VERSION=$APP_VERSION_ARG
ENV SKIP_PREFLIGHT_CHECK=true
ENV PUBLIC_URL=/

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

COPY packages/eslint-config/ packages/eslint-config/
COPY packages/prettier-config/ packages/prettier-config/

COPY packages/common/ packages/common/
COPY packages/front/ packages/front/

RUN yarn install --pure-lockfile --non-interactive

RUN yarn workspace @mach/common build
RUN yarn workspace @mach/front build

FROM nginx:1.15-alpine
COPY --from=build /usr/src/app/packages/front/build /usr/share/nginx/html
COPY packages/front/nginx/nginx.conf /etc/nginx/conf.d/default.conf