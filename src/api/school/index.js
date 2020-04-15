const router = require('express').Router();
const schoolCtrl = require('./school.ctrl');
const schoolMiddleware = require('../../middleware/school');

router.get('/', schoolMiddleware, schoolCtrl.getSchool);

module.exports = router;
