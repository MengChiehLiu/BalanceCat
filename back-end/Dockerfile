FROM node:18.16.1-alpine

WORKDIR /BalanceCat
EXPOSE 3000

COPY . .
RUN npm install -g pm2 && npm install --production

CMD pm2-runtime start pm2-config.json