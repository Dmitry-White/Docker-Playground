FROM        node:alpine

LABEL       author="Dmitry White"

ARG         PACKAGES=nano

ENV         TERM xterm
RUN         apk update && apk add $PACKAGES

WORKDIR     /var/www
COPY        package.json package-lock.json ./
RUN         npm install

COPY        . ./
EXPOSE      $PORT

ENTRYPOINT  ["npm", "start"]