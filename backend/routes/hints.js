const express = require('express');
const router = express.Router();
const { getHint } = require('../controllers/hintController');

// Get hint for assignment
router.post('/:assignmentId', getHint);

module.exports = router;