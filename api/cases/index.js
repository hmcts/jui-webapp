const jp = require('jsonpath');
const express = require('express');

const router = express.Router();
const getCaseListCallback = require('./case-list');
const getCaseCallback = require('./case');
const events = require('../events');
const questions = require('../questions');

router.get('/', getCaseListCallback);
router.get('/jurisdiction/:jur/casetype/:casetype/:case_id/events', events);
router.get('/jurisdiction/:jur/casetype/:casetype/:case_id', getCaseCallback);
router.post('/jurisdiction/:jur/casetype/:casetype/:case_id/questions', questions);
router.patch('/jurisdiction/:jur/casetype/:casetype/:case_id/questions/:question_id', questions);
router.delete('/jurisdiction/:jur/casetype/:casetype/:case_id/questions/:question_id', questions);

module.exports = router;
