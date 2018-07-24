const express = require('express');
const router = express.Router();
const retrieveDecisionCallback = require('./retrieve');
const createDecisionCallback = require('./create');
const updateDecisionCallback = require('./update');

router.get('/:case_id', retrieveDecisionCallback);
router.post('/:case_id', createDecisionCallback);
router.put('/:case_id', updateDecisionCallback);

module.exports = router;
