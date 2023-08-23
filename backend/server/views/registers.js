const router = require('express').Router();

router.use('/', require('../controllers/registers.js'));

module.exports = router;