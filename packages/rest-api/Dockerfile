FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /usr/src

COPY dist/ dist/
COPY package.json .
COPY yarn.lock .
COPY openapi.json .
RUN npm install --only=production

EXPOSE $PORT

CMD ["node", "dist/index"]
