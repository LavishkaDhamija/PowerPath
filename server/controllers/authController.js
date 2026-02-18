const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

const AppError = require('../utils/AppError');

// @desc    Register a new student
// @route   POST /api/register
// @access  Public
const registerStudent = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // 1. Validate Input
        if (!name || !email || !password) {
            return next(new AppError('Please provide all required fields', 400));
        }

        // 2. Check if student already exists
        const studentExists = await Student.findOne({ email });
        if (studentExists) {
            return next(new AppError('User already exists', 400));
        }

        // 3. Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create Student
        const student = await Student.create({
            name,
            email,
            password: hashedPassword
        });

        // 5. Respond (Success)
        if (student) {
            res.status(201).json({
                _id: student.id,
                name: student.name,
                email: student.email,
                message: 'Student registered successfully'
            });
        } else {
            return next(new AppError('Invalid user data', 400));
        }

    } catch (error) {
        next(error);
    }
};

// @desc    Authenticate student & get token
// @route   POST /api/auth/login
// @access  Public
const loginStudent = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1. Validate Input
        if (!email || !password) {
            return next(new AppError('Please provide email and password', 400));
        }

        // 2. Check for student
        const student = await Student.findOne({ email });

        // 3. Check password
        if (student && (await bcrypt.compare(password, student.password))) {
            // 4. Generate Token
            const token = jwt.sign(
                { id: student._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            // 5. Respond (Success)
            res.json({
                _id: student.id,
                name: student.name,
                email: student.email,
                token: token
            });
        } else {
            return next(new AppError('Invalid credentials', 401));
        }

    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerStudent,
    loginStudent
};
