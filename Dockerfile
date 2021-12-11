FROM node:16-alpine
LABEL org.opencontainers.image.source="https://github.com/MitsyBot/Cdn"

RUN mkdir -p /usr/src/cdn
WORKDIR /usr/src/cdn

RUN apk update && apk upgrade
RUN apk add git

COPY . /usr/src/cdn/
RUN npm install

