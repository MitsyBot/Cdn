FROM node:16-alpine as builder

RUN mkdir -p /usr/src/cdn
WORKDIR /usr/src/cdn

RUN apk update && apk upgrade
RUN apk add git

COPY . /usr/src/cdn/
RUN npm install

LABEL org.opencontainers.image.source="https://github.com/MitsyBot/Cdn"

FROM node:16-alpine as runner

LABEL org.opencontainers.image.source="https://github.com/MitsyBot/Cdn"

WORKDIR /usr/src/cdn
COPY --from=builder /usr/src/cdn /usr/src/cdn

CMD ["npm", "run", "start"]
