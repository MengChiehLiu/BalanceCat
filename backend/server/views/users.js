const router = require('express').Router();
const usersController = require('../controllers/users.js');

router.use('/', usersController);

module.exports = router;