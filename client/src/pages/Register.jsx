import { useState } from 'react';
import axios from 'axios';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { name, email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            setError('');
            setSuccess('');

            await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password
            });

            setSuccess('Registration successful! You can now login.');
            setFormData({ name: '', email: '', password: '' });

        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className='container'>
            <div className='form-container'>
                <h1>Create Account</h1>
                <p>Start your learning journey today</p>

                {error && <div className='error-message'>{error}</div>}
                {success && <div className='success-message' style={{ color: 'green' }}>{success}</div>}

                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={name}
                            onChange={onChange}
                            placeholder='Enter your name'
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='email'>Email Address</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={email}
                            onChange={onChange}
                            placeholder='Enter your email'
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={password}
                            onChange={onChange}
                            placeholder='Create a password'
                        />
                    </div>

                    <button type='submit' className='btn-block'>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
