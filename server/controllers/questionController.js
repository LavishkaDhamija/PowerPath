const Student = require('../models/Student');

const AppError = require('../utils/AppError');

// @desc    Generate a new question based on student level
// @route   GET /api/question/:studentId
// @access  Private
const generateQuestion = async (req, res, next) => {
    try {
        const studentId = req.params.studentId;

        // Authorization: Ensure student can only generate questions for themselves
        if (studentId !== req.user._id.toString()) {
            return next(new AppError('Not authorized to generate questions for this user', 403));
        }

        // 1. Find Student
        const student = await Student.findById(studentId);

        if (!student) {
            return next(new AppError('Student not found', 404));
        }

        const level = student.currentLevel;
        let base, exponent;

        // 2. Adaptive Question Generation (Example Rules)
        switch (level) {
            case 1: // Easy: Base 2-5, Exponent 2-3
                base = Math.floor(Math.random() * 4) + 2;
                exponent = Math.floor(Math.random() * 2) + 2;
                break;
            case 2: // Medium: Base 2-9, Exponent 2-4
                base = Math.floor(Math.random() * 8) + 2;
                exponent = Math.floor(Math.random() * 3) + 2;
                break;
            case 3: // Hard: Base 3-12, Exponent 2-5
                base = Math.floor(Math.random() * 10) + 3;
                exponent = Math.floor(Math.random() * 4) + 2;
                break;
            case 4: // Advanced: Base 5-15, Exponent 2-6
                base = Math.floor(Math.random() * 11) + 5;
                exponent = Math.floor(Math.random() * 5) + 2;
                break;
            case 5: // Expert: Base 10-20, Exponent 2-8
                base = Math.floor(Math.random() * 11) + 10;
                exponent = Math.floor(Math.random() * 7) + 2;
                break;
            default: // Fallback
                base = 2;
                exponent = 2;
        }

        // 3. Return Question
        res.status(200).json({
            base,
            exponent,
            level
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    generateQuestion
};
