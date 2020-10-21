'use strict';

const router = require('express').Router();
const urldata = require('../Controller/urlscraper.js');

router.post('/url', urldata.getSourceCode);

module.exports = router;