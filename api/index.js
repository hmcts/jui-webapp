const express = require('express');
const router = express.Router();

const caseRoutes = require('./case');




router.use('/cases', caseRoutes);






module.exports = router;