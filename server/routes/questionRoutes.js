const express = require('express');
const router = express.Router();
const { generateQuestion } = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:studentId', protect, generateQuestion);

module.exports = router;
