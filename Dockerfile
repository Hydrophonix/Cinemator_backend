FROM node:12.18.2-alpine

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/package.json
COPY ./dist /usr/src/app

RUN npm i --production
RUN apk add curl

EXPOSE 4000

CMD ["node", "main.js"]