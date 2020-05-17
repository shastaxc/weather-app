FROM node:alpine3.11 as dev

WORKDIR /app/frontend

# To use packages in CLI without global install
ENV PATH /app/frontend/node_modules/.bin:$PATH

EXPOSE 4200

CMD ["/bin/sh", "-c", "npm run start:dev"]

##########################################################
FROM node:alpine3.11 as unit-test

WORKDIR /app/frontend

# To use packages in CLI without global install
ENV PATH /app/frontend/node_modules/.bin:$PATH
# Required for Jest watch mode
ENV GIT_WORK_TREE=/app/frontend GIT_DIR=/app/.git

# Required for Jest watch mode
RUN apk update && \
    apk add git

CMD ["/bin/sh", "-c", "npm run test:unit:watch"]
