const router = require('express').Router();
const timeTableCtrl = require('./timeTable.ctrl');
const schoolMiddleware = require('../../middleware/school');

router.get('/', schoolMiddleware, timeTableCtrl.getTimeTable);
router.post('/', timeTableCtrl.setTimeTable);

module.exports = router;
