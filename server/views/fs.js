const router = require('express').Router();

router.use('/', require('../controllers/fs/get.js'));

module.exports = router;