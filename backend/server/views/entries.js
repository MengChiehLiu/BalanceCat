const router = require('express').Router();

router.use('/', require('../controllers/entries.js'));

module.exports = router;