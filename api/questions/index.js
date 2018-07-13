const express = require('express');
const router = express.Router();
const createQuestionCallback = require('./create');

/* SAVE Question */
router.post('/:case_id', createQuestionCallback);

module.exports = router;
