const router = require('express').Router();

router.use('/', require('../controllers/registers/get.js'));

module.exports = router;