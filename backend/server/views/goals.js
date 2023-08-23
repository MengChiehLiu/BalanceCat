const router = require('express').Router();

const goalsController = require('../controllers/goals.js');

router.use('/', goalsController);

module.exports = router;
