const router = require('express').Router();

const auth = require('./auth');
const timeTable = require('./timeTable');
const school = require('./school');

router.use('/auth', auth);
router.use('/time-table', timeTable);
router.use('/school', school);

module.exports = router;
