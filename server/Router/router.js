'use strict';

const router = require('express').Router();
const message = require('../Controller/controller');

router.post('/url', message.getSourceCode);



//router.post('/events', message.postOne);

module.exports = router;