FROM node:18.16.1-alpine

WORKDIR /BalanceCat/backend
EXPOSE 3001

COPY . .
RUN npm install -g pm2 && npm install --production

CMD pm2-runtime start pm2-config.json