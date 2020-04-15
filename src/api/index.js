const router = require('express').Router();

const auth = require('./auth');
// const timeTable = require('./timeTable');

router.use('/auth', auth);
// router.use('/time-table', timeTable);

module.exports = router;
