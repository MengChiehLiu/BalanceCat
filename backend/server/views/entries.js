const router = require('express').Router();

router.use('/', require('../controllers/entries/get.js'));
router.use('/', require('../controllers/entries/post.js'));
router.use('/', require('../controllers/entries/delete.js'));
router.use('/', require('../controllers/entries/revise.js'));
router.use('/', require('../controllers/entries/history.js'));

module.exports = router;