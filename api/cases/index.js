const jp = require('jsonpath');
const express = require('express');

const router = express.Router();
const getCaseListCallback = require('./case-list');
const getCaseCallback = require('./case');
const events = require('../events');
const questions = require('../questions');

router.get('/', getCaseListCallback);
router.get('/:case_id/events', events);
router.get('/:case_id', getCaseCallback);
router.post('/:case_id/questions', questions);
router.patch('/:case_id/questions/:question_id', questions);
router.delete('/:case_id/questions/:question_id', questions);

module.exports = router;
