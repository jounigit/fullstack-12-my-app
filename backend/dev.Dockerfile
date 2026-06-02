FROM node:26-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV DEBUG=my-app-backend-dev:*

CMD [ "npm", "run", "dev" ]