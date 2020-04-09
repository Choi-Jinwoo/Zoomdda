const router = require('express').Router();

const timeTable = require('./timeTable');

router.use('/time-table', timeTable);

module.exports = router;
