const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

// @desc    Register a new student
// @route   POST /api/register
// @access  Public
const registerStudent = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Validate Input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // 2. Check if student already exists
        const studentExists = await Student.findOne({ email });
        if (studentExists) {
            return res.status(400).json({ message: 'User already exists' });
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
            res.status(400).json({ message: 'Invalid user data' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Authenticate student & get token
// @route   POST /api/auth/login
// @access  Public
const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate Input
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
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
            res.status(401).json({ message: 'Invalid credentials' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    registerStudent,
    loginStudent
};
