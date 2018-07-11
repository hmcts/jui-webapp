const jp = require('jsonpath');
const express = require('express');

const router = express.Router();
const getCaseListCallback = require('./case-list');
const getCaseCallback = require('./case');

router.get('/:case_id', getCaseCallback);

router.get('/', getCaseListCallback);

module.exports = router;
