FROM        node:16.5.0-alpine

LABEL       author="Dmitry White"

# The ARG instruction defines a variable that users can pass at build-time to the builder
# with the docker build command using the --build-arg <varname>=<value> flag
# or in Docker Compose file "build.args"
ARG         buildversion

# One major difference between specifying env variables here
# and specifying them in docker-compose file is the desired
# WHEN for variable to be available: 
# Dockerfile will be Build-Time,
# docker-compose file will be Run-Time
ENV         NODE_ENV=production
ENV         BUILD=$buildversion

RUN         echo "Environment: ${NODE_ENV}; Build version: $BUILD;"

WORKDIR     /var/www
# Copy and intall dependencies as early as possible
# so that this layer gets reused if changes appear
# in the lines below
COPY        package.json package-lock.json ./
RUN         npm ci

ENV         PORT=3000

COPY        . ./
EXPOSE      $PORT

ENTRYPOINT  ["npm", "start"]