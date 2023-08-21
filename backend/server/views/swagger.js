const router = require('express').Router();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BalanceCat: Your Personal Double Entry Bookkeeping Simplified',
      version: '1.0.0',
      description: 'API documentation BalanceCat backend',
    },
  },
  tags: [
    {
      name: 'users',
      description: 'APIs related to user management',
    },
    {
      name: 'db',
      description: 'APIs related to database',
    }
  ],
  apis: ['./server/controllers/**/*.js'], // 指定你的路由檔案位置，可以使用通配符
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);


router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
