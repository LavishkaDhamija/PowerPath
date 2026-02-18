const express = require('express');
const router = express.Router();
const { getHistory } = require('../controllers/historyController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:studentId', protect, getHistory);

module.exports = router;
