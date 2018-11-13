FROM node:8.9.0

MAINTAINER "HMCTS Team <https://github.com/hmcts>"
LABEL maintainer = "HMCTS Team <https://github.com/hmcts>"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
COPY yarn.lock .

RUN yarn install

COPY . .
RUN yarn build

EXPOSE 8080
CMD [ "yarn", "start" ]
