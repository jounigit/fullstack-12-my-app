FROM node:26-alpine

RUN apk add --no-cache curl

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production
ENV DEUG=my-app-backend:*

USER node

EXPOSE 3001
CMD ["npm", "start"]