const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    // Basic Info
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    // Learning Stats
    totalAttempts: {
        type: Number,
        default: 0
    },
    correctAnswers: {
        type: Number,
        default: 0
    },
    wrongAnswers: {
        type: Number,
        default: 0
    },
    currentLevel: {
        type: Number,
        default: 1
    },

    // Metadata
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Student', studentSchema);
