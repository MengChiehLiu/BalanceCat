const router = require('express').Router();

router.use('/', require('../controllers/entries/post.js'));

module.exports = router;