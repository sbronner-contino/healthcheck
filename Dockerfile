FROM node:12.2.0-alpine

RUN apk update --no-cache && apk add git

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY src /app/src
COPY .eslintrc.json /app
COPY .git/ /app/.git/

RUN yarn test --verbose --passWithNoTests \
  && ./node_modules/.bin/eslint ./src/ \
  && git rev-parse HEAD > /app/revision || true

FROM node:12.2.0-alpine

WORKDIR /app

COPY package.json /app/
COPY --from=0 /app/revision /app
COPY src /app/src

RUN addgroup -S app_group && adduser -S app -G app_group && chown -R app:app_group /app

USER app

EXPOSE 8888

CMD ["node", "src/app.js"]
