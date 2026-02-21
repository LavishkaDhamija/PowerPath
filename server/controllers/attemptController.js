const Attempt = require('../models/Attempt');
const Student = require('../models/Student');
const { adjustDifficulty } = require('../services/adaptiveEngine');

const AppError = require('../utils/AppError');

// @desc    Submit an answer
// @route   POST /api/attempt
// @access  Private
const submitAnswer = async (req, res, next) => {
    try {
        const { base, exponent, studentAnswer } = req.body;

        // 1. Get student ID from token (not body)
        const studentId = req.user._id;

        // 2. Validate Input
        if (
            base === undefined ||
            exponent === undefined ||
            studentAnswer === undefined
        ) {
            return next(new AppError('Please provide base, exponent, and answer', 400));
        }

        // 3. Convert to Numbers Explicitly
        const baseNum = Number(base);
        const exponentNum = Number(exponent);
        const studentAnswerNum = Number(studentAnswer);

        if (isNaN(baseNum) || isNaN(exponentNum) || isNaN(studentAnswerNum)) {
            return next(new AppError('Invalid input numbers', 400));
        }

        // 4. Calculate Correct Answer
        const correctAnswer = Math.pow(baseNum, exponentNum);

        // 5. Check if answer is correct
        const isCorrect = studentAnswerNum === correctAnswer;

        // 6. Save Attempt
        const attempt = await Attempt.create({
            studentId: studentId, // Correctly matches schema field 'studentId'
            base: baseNum,
            exponent: exponentNum,
            studentAnswer: studentAnswerNum,
            correctAnswer,
            isCorrect
        });

        // 7. Update Student Stats (Find Student)
        const studentDoc = await Student.findById(studentId);

        if (studentDoc) {
            studentDoc.totalAttempts += 1;
            if (isCorrect) {
                studentDoc.correctAnswers += 1;
            } else {
                studentDoc.wrongAnswers += 1;
            }
            await studentDoc.save();

            // 8. Adjust Difficulty Level (Adaptive Engine)
            // adjustDifficulty expects the student document
            const levelChanged = adjustDifficulty(studentDoc);
            // adjustDifficulty implicitly modifies the student object if needed
            // But we already saved above?
            // Actually, adjustDifficulty modifies the object in memory. 
            // We should save it again if changed, or save once at the end.
            // Let's save once at the end to be safe and efficient.
            await studentDoc.save();
        }

        // 9. Calculate Accuracy
        let accuracy = 0;
        if (studentDoc && studentDoc.totalAttempts > 0) {
            accuracy = (studentDoc.correctAnswers / studentDoc.totalAttempts) * 100;
        }

        res.status(201).json({
            isCorrect: attempt.isCorrect,
            correctAnswer: attempt.correctAnswer,
            accuracy: accuracy.toFixed(2), // 2 decimal places
            level: studentDoc ? studentDoc.currentLevel : 1,
            message: attempt.isCorrect ? 'Correct!' : 'Incorrect'
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    submitAnswer
};
