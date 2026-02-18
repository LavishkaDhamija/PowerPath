const Student = require('../models/Student');

const AppError = require('../utils/AppError');

// @desc    Get student progress (accuracy, level, history)
// @route   GET /api/progress/:studentId
// @access  Private
const getProgress = async (req, res, next) => {
    try {
        const studentId = req.params.studentId;

        // 1. Authorization: Ensure student can only access their own data
        if (studentId !== req.user._id.toString()) {
            return next(new AppError('Not authorized to view this profile', 403));
        }

        // 2. Find Student
        const student = await Student.findById(studentId);

        if (!student) {
            return next(new AppError('Student not found', 404));
        }

        // 2. Calculate Accuracy
        let accuracy = 0;
        if (student.totalAttempts > 0) {
            accuracy = (student.correctAnswers / student.totalAttempts) * 100;
        }

        // 3. Return Stats
        res.status(200).json({
            totalAttempts: student.totalAttempts,
            correctAnswers: student.correctAnswers,
            wrongAnswers: student.wrongAnswers,
            accuracy: accuracy.toFixed(2)
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProgress
};
