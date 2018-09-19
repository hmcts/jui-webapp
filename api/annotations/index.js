const express = require('express');

const router = express.Router();
const getAnnotationSet = require('./annotation-set');

router.get('/filter', getAnnotationSet);

module.exports = router;
