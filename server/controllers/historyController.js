const Attempt = require('../models/Attempt');
const AppError = require('../utils/AppError');

// @desc    Get student attempt history
// @route   GET /api/history/:studentId
// @access  Private
const getHistory = async (req, res, next) => {
    try {
        const studentId = req.params.studentId;

        // Authorization: Ensure student can only access their own history
        if (studentId !== req.user._id.toString()) {
            return next(new AppError('Not authorized to view this history', 403));
        }

        // Find attempts for this student, sorted by newest first
        const history = await Attempt.find({ studentId })
            .sort({ timestamp: -1 }) // -1 = Descending (Newest first)
            .limit(10)               // Only get the last 10 attempts
            .select('base exponent isCorrect timestamp'); // Only return these fields

        res.status(200).json(history);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getHistory
};
