const express = require('express');
const router = express.Router();

const getCaseListCallback = require('./case-list');
const getCaseCallback = require('./case');

router.get('/', getCaseListCallback);
router.get('/jurisdiction/:jur/casetype/:casetype/:case_id', getCaseCallback);

module.exports = router;
