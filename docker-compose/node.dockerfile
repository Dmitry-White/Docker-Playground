FROM        node:alpine

LABEL       author="Dmitry White"

ENV         NODE_ENV=production

WORKDIR     /var/www
# Copy and intall dependencies as early as possible
# so that this layer gets reused if changes appear
# in the lines below
COPY        package.json package-lock.json ./
RUN         npm install

ENV         PORT=3000

COPY        . ./
EXPOSE      $PORT

ENTRYPOINT  ["npm", "start"]