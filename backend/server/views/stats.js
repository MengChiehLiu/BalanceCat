const router = require('express').Router();

router.use('/', require('../controllers/stats.js'));

module.exports = router;