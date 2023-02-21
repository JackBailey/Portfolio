FROM node:lts-alpine

RUN npm install -g serve

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "serve", "dist", "-p", "3000", "-s", "-n"]