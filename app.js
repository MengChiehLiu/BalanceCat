// express app
const express = require('express');
const app = express();
const port = 3000;
const host = '0.0.0.0'

// CORS
const cors = require('cors');
app.use(cors());

// bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// rete limiter
const rateLimiter = require('./server/utils/rateLimiter.js');
app.use(rateLimiter);

// 將 public 目錄設為靜態目錄
app.use(express.static('public'));

// APIs
app.use('/', require('./server/views/api.js'));


// server
const server = app.listen(port, host, () => {
  console.log(`Hello World: http://127.0.0.1:${port}`);
});


// graceful shutdown
// const ioRedis = require('./server/utils/redis').client;
// server.on('close', () => ioRedis.disconnect());

module.exports = server;