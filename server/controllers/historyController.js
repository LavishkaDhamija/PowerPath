const Attempt = require('../models/Attempt');

// @desc    Get student attempt history
// @route   GET /api/history/:studentId
// @access  Private
const getHistory = async (req, res) => {
    try {
        const studentId = req.params.studentId;

        // Find attempts for this student, sorted by newest first
        const history = await Attempt.find({ studentId })
            .sort({ timestamp: -1 }) // -1 = Descending (Newest first)
            .limit(10)               // Only get the last 10 attempts
            .select('base exponent isCorrect timestamp'); // Only return these fields

        res.status(200).json(history);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getHistory
};
