FROM node:16-alpine as builder
LABEL org.opencontainers.image.source="https://github.com/MitsyBot/cdn"

RUN mkdir -p /usr/src/cdn
WORKDIR /usr/src/cdn

RUN apk update && apk upgrade
RUN apk add git

COPY . /usr/src/cdn/
RUN npm install

FROM node:16-alpine as runner
WORKDIR /usr/src/cdn
COPY --from=builder /usr/src/cdn /usr/src/cdn

CMD ["npm", "run", "start"]
