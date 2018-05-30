const express = require('express');
const router = express.Router();

const caseRoutes = require('./cases');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";



router.use('/cases', caseRoutes);






module.exports = router;
