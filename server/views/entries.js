const router = require('express').Router();

router.use('/', require('../controllers/entries/record.js'));

module.exports = router;