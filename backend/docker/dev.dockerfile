FROM node:alpine3.11 as dev

WORKDIR /app/backend

# To use packages in CLI without global install
ENV PATH /app/backend/node_modules/.bin:$PATH

EXPOSE 3000

CMD ["/bin/sh", "-c", "npm run start:dev"]

