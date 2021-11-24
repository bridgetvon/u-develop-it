const express = require('express');
const inputCheck = require('../../utils/inputCheck');
const router = express.Router();
const db = require('../../db/connection');

router.use(require('./candidateRoutes'));
router.use(require('./partyRoutes'));
router.use(require('./voterRoutes'));


module.exports = router;