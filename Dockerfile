FROM node:lts-alpine AS BUILD_IMAGE

RUN npm install -g serve

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

FROM pierrezemb/gostatic

WORKDIR /app

COPY --from=BUILD_IMAGE /app/dist /srv/http

EXPOSE 3000

CMD ["--port", "3000", "--fallback", "index.html"]