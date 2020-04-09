const router = require('express').Router();
const timeTableCtrl = require('./timeTable.ctrl');

router.get('/', timeTableCtrl.getTimeTable);
router.put('/', timeTableCtrl.setTimeTable);

module.exports = router;
