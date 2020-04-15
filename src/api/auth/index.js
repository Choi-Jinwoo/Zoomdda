const router = require('express').Router();
const authCtrl = require('./auth.ctrl');

router.get('/', authCtrl.login);

module.exports = router;
