const router = require('express').Router();
const timeTableCtrl = require('./timeTable.ctrl');

router.get('/', timeTableCtrl.getTimeTable);

module.exports = router;
