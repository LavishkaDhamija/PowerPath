const Student = require('../models/Student');

// @desc    Get student progress (accuracy, level, history)
// @route   GET /api/progress/:studentId
// @access  Private
const getProgress = async (req, res) => {
    try {
        const studentId = req.params.studentId;

        // 1. Find Student
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
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
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getProgress
};
