import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);

            await api.post('/auth/register', {
                name,
                email,
                password
            });

            setSuccess('Registration successful! You can now login.');
            setFormData({ name: '', email: '', password: '' });

        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyle = {
        padding: '12px 16px',
        border: '1.5px solid #e0e0e0',
        borderRadius: '10px',
        fontSize: '0.95rem',
        width: '100%',
        background: '#fafafa',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        outline: 'none',
        boxSizing: 'border-box',
    };

    const handleFocus = (e) => {
        e.target.style.borderColor = '#43a047';
        e.target.style.boxShadow = '0 0 0 3px rgba(67,160,71,0.08)';
        e.target.style.background = '#fff';
    };

    const handleBlur = (e) => {
        e.target.style.borderColor = '#e0e0e0';
        e.target.style.boxShadow = 'none';
        e.target.style.background = '#fafafa';
    };

    return (
        <div style={{
            minHeight: 'calc(100vh - 80px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        background: '#e8f5e9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        fontSize: '1.5rem',
                    }}>
                        🌱
                    </div>
                    <h1 style={{
                        fontSize: '1.8rem',
                        fontWeight: 700,
                        color: '#1a1a1a',
                        margin: '0 0 6px 0',
                    }}>
                        Create Account
                    </h1>
                    <p style={{
                        fontSize: '0.95rem',
                        color: '#999',
                        margin: 0,
                    }}>
                        Start your learning journey today
                    </p>
                </div>

                {/* Card */}
                <div style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '32px',
                    border: '1px solid #e8e8e8',
                }}>
                    {error && (
                        <div style={{
                            background: '#ffebee',
                            color: '#c62828',
                            padding: '12px 16px',
                            borderRadius: '10px',
                            fontSize: '0.88rem',
                            fontWeight: 500,
                            marginBottom: '20px',
                            border: '1px solid rgba(198, 40, 40, 0.1)',
                        }}>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div style={{
                            background: '#e8f5e9',
                            color: '#2e7d32',
                            padding: '12px 16px',
                            borderRadius: '10px',
                            fontSize: '0.88rem',
                            fontWeight: 500,
                            marginBottom: '20px',
                            border: '1px solid rgba(46, 125, 50, 0.15)',
                        }}>
                            {success}
                        </div>
                    )}

                    <form onSubmit={onSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor='name' style={{
                                display: 'block',
                                fontSize: '0.82rem',
                                fontWeight: 600,
                                color: '#666',
                                marginBottom: '6px',
                            }}>
                                Full Name
                            </label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                value={name}
                                onChange={onChange}
                                placeholder='Enter your name'
                                style={inputStyle}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor='email' style={{
                                display: 'block',
                                fontSize: '0.82rem',
                                fontWeight: 600,
                                color: '#666',
                                marginBottom: '6px',
                            }}>
                                Email Address
                            </label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={email}
                                onChange={onChange}
                                placeholder='you@example.com'
                                style={inputStyle}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label htmlFor='password' style={{
                                display: 'block',
                                fontSize: '0.82rem',
                                fontWeight: 600,
                                color: '#666',
                                marginBottom: '6px',
                            }}>
                                Password
                            </label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                value={password}
                                onChange={onChange}
                                placeholder='Create a password'
                                style={inputStyle}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </div>

                        <button
                            type='submit'
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '13px',
                                background: isLoading ? '#a5d6a7' : '#2e7d32',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
                            }}
                            onMouseOver={(e) => {
                                if (!isLoading) {
                                    e.currentTarget.style.background = '#388e3c';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(46,125,50,0.25)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!isLoading) {
                                    e.currentTarget.style.background = '#2e7d32';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }
                            }}
                        >
                            {isLoading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>
                </div>

                {/* Footer link */}
                <p style={{
                    textAlign: 'center',
                    marginTop: '20px',
                    fontSize: '0.88rem',
                    color: '#999',
                }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{
                        color: '#2e7d32',
                        textDecoration: 'none',
                        fontWeight: 600,
                    }}>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
