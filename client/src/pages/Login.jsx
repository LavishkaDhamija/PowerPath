import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            setError('');

            const response = await api.post('/auth/login', {
                email,
                password
            });

            // Store token in localStorage
            localStorage.setItem('token', response.data.token);
            // Store user info (optional, helpful for UI)
            localStorage.setItem('user', JSON.stringify({
                name: response.data.name,
                id: response.data._id
            }));

            console.log('Login successful:', response.data);
            navigate('/dashboard');

        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className='container'>
            <div className='form-container'>
                <h1>Login</h1>
                <p>Sign in to continue your progress</p>

                {error && <div className='error-message'>{error}</div>}

                <form onSubmit={onSubmit}>
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
                            placeholder='Enter your password'
                        />
                    </div>

                    <button type='submit' className='btn-block'>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
