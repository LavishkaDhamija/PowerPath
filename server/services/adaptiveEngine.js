/**
 * Adjusts the difficulty level for a student based on their performance.
 * @param {Object} student - The student document from the database
 * @returns {Boolean} - True if level was changed, False otherwise
 */
const adjustDifficulty = (student) => {
    // 1. Minimum Data Check
    // If student has fewer than 5 attempts, don't change difficulty yet.
    // This prevents one lucky guess or one typo from changing the level too fast.
    if (student.totalAttempts < 5) {
        return false;
    }

    // 2. Calculate Accuracy (0.0 to 1.0)
    const accuracy = student.correctAnswers / student.totalAttempts;
    let originalLevel = student.currentLevel;

    // 3. Adaptive Logic
    // If getting >80% right, increase difficulty
    if (accuracy > 0.8) {
        student.currentLevel += 1;
    }
    // If getting <50% right, decrease difficulty
    else if (accuracy < 0.5) {
        student.currentLevel -= 1;
    }

    // 4. Enforce Boundaries (1 to 5)
    if (student.currentLevel > 5) student.currentLevel = 5;
    if (student.currentLevel < 1) student.currentLevel = 1;

    // 5. Return true if level changed, false if stayed same
    return student.currentLevel !== originalLevel;
};

module.exports = {
    adjustDifficulty
};
