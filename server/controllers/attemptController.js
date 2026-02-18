const Attempt = require('../models/Attempt');
const Student = require('../models/Student');
const { adjustDifficulty } = require('../services/adaptiveEngine');

// @desc    Submit an answer
// @route   POST /api/attempt
// @access  Private
const submitAnswer = async (req, res) => {
    try {
        const { base, exponent, studentAnswer } = req.body;

        // 1. Get student ID from token (not body)
        const studentId = req.student._id;

        // 2. Validate Input
        if (
            base === undefined ||
            exponent === undefined ||
            studentAnswer === undefined
        ) {
            return res.status(400).json({ message: 'Please provide base, exponent, and answer' });
        }

        // 3. Calculate Correct Answer
        const correctAnswer = Math.pow(base, exponent);

        // 4. Check if answer is correct
        const isCorrect = studentAnswer === correctAnswer;

        // 5. Save Attempt
        const attempt = await Attempt.create({
            studentId,
            base,
            exponent,
            studentAnswer,
            correctAnswer,
            isCorrect
        });

        // 6. Update Student Stats
        const student = await Student.findById(studentId);

        if (student) {
            student.totalAttempts += 1;
            if (isCorrect) {
                student.correctAnswers += 1;
            } else {
                student.wrongAnswers += 1;
            }
            await student.save();
        }

        // 7. Adjust Difficulty Level (Adaptive Engine)
        if (student) {
            const levelChanged = adjustDifficulty(student);
            if (levelChanged) {
                await student.save(); // Save the new level if changed
            }
        }

        // 7. Calculate Accuracy
        let accuracy = 0;
        if (student.totalAttempts > 0) {
            accuracy = (student.correctAnswers / student.totalAttempts) * 100;
        }

        res.status(201).json({
            isCorrect: attempt.isCorrect,
            correctAnswer: attempt.correctAnswer,
            accuracy: accuracy.toFixed(2), // 2 decimal places
            message: attempt.isCorrect ? 'Correct!' : 'Incorrect'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    submitAnswer
};
