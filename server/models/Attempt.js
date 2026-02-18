const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
    // Link to Student
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        index: true
    },

    // Question Details
    base: {
        type: Number,
        required: true
    },
    exponent: {
        type: Number,
        required: true
    },

    // User Input & Validation
    studentAnswer: {
        type: Number,
        required: true
    },
    correctAnswer: {
        type: Number,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    },

    // Metadata
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Attempt', attemptSchema);
