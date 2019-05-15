FROM node:12.2.0-alpine

RUN apk update --no-cache && apk add git

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY src /app/src
COPY .eslintrc.json /app
COPY .git/ /app/.git/

RUN git rev-parse HEAD > /app/revision || true \
  && yarn test --verbose --passWithNoTests \
  && ./node_modules/.bin/eslint ./src/

FROM node:12.2.0-alpine

WORKDIR /app

COPY package.json /app/
COPY --from=0 /app/revision /app
COPY src /app/src

EXPOSE 8888

CMD ["node", "src/app.js"]
