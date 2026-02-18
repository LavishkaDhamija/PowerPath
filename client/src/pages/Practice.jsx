import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PowerVisualizer from '../components/PowerVisualizer';

export default function Practice() {
    const navigate = useNavigate();
    const [answer, setAnswer] = useState('');
    const [question, setQuestion] = useState({
        base: 2,
        exponent: 2,
        level: 1
    });
    const [loading, setLoading] = useState(true);

    const fetchQuestion = async () => {
        try {
            const savedUser = localStorage.getItem('user');
            const token = localStorage.getItem('token');

            if (!savedUser || !token) {
                navigate('/login');
                return;
            }

            const parsedUser = JSON.parse(savedUser);
            setLoading(true);

            const response = await axios.get(`http://localhost:5000/api/question/${parsedUser.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setQuestion(response.data);
            setAnswer(''); // Clear previous answer
        } catch (error) {
            console.error('Error fetching question:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestion();
    }, [navigate]);

    const [error, setError] = useState('');
    const [showExplain, setShowExplain] = useState(false);
    const [result, setResult] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!answer || isSubmitting) {
            if (!answer) setError('Please enter a number');
            return;
        }

        try {
            setIsSubmitting(true);
            setError('');
            const savedUser = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            const parsedUser = JSON.parse(savedUser);

            const response = await axios.post('http://localhost:5000/api/attempt/submit', {
                studentId: parsedUser.id,
                base: question.base,
                exponent: question.exponent,
                studentAnswer: answer
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('Submission Result:', response.data);
            setResult(response.data);

        } catch (err) {
            console.error('Submission error:', err);
            setError('Failed to submit answer. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className='container'><h2>Loading question...</h2></div>;
    }

    return (
        <div className='container'>
            <div className='practice-header'>
                <h1>Practice Mode (Level {question.level})</h1>
                <p>Solve the power problem below:</p>
            </div>

            <div className='question-card'>
                <div className='question-display' style={{
                    fontSize: '4rem',
                    margin: '30px 0',
                    fontFamily: "'Courier New', monospace",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    animation: 'fadeIn 1s ease-in'
                }}>
                    <span style={{ fontWeight: 'bold' }}>{question.base}</span>
                    <sup style={{
                        color: '#ff4757',
                        fontSize: '2.5rem',
                        top: '-1.5em'
                    }}>{question.exponent}</sup>
                    <span> = ?</span>
                </div>

                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <button
                        onClick={() => setShowExplain(!showExplain)}
                        className="btn"
                        style={{
                            background: showExplain ? '#e0e0e0' : '#4a90e2',
                            color: showExplain ? '#333' : 'white',
                            fontSize: '0.9rem',
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer'
                        }}
                    >
                        {showExplain ? 'Hide Explanation' : '👀 Show Visual Explanation'}
                    </button>
                </div>

                {showExplain && (
                    <PowerVisualizer base={question.base} exponent={question.exponent} />
                )}

                <div key={question.base + '-' + question.exponent} style={{ animation: 'fadeIn 0.8s ease-in-out' }}>
                    {result ? (
                        <div className={`feedback-card ${result.isCorrect ? 'success' : 'error'}`} style={{
                            marginTop: '20px',
                            padding: '20px',
                            borderRadius: '10px',
                            backgroundColor: result.isCorrect ? '#d4edda' : '#f8d7da',
                            color: result.isCorrect ? '#155724' : '#721c24',
                            textAlign: 'center',
                            animation: 'fadeIn 0.5s ease-out'
                        }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>
                                {result.isCorrect ? 'Great job! 🌟' : 'Not quite right'}
                            </h2>
                            {result.isCorrect && (
                                <p style={{ fontSize: '1.2rem', color: '#155724' }}>You're improving! Keep it up!</p>
                            )}

                            {!result.isCorrect && (
                                <div style={{ marginTop: '10px' }}>
                                    <p style={{ marginBottom: '10px', fontSize: '1.1rem' }}>Let's try to understand it step by step.</p>
                                    <div style={{
                                        backgroundColor: 'rgba(255,255,255,0.6)',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        display: 'inline-block',
                                        marginTop: '5px'
                                    }}>
                                        The correct answer is: <strong style={{ fontSize: '1.4rem' }}>{result.correctAnswer}</strong>
                                    </div>
                                    <div style={{ marginTop: '15px' }}>
                                        <PowerVisualizer base={question.base} exponent={question.exponent} />
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={() => {
                                    setResult(null); // Clear result
                                    fetchQuestion();  // Get next question
                                }}
                                className='btn btn-primary'
                                style={{ marginTop: '15px' }}
                            >
                                Next Question
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={onSubmit} className='answer-form'>
                            {error && <div className='error-message' style={{ marginBottom: '10px' }}>{error}</div>}
                            <input
                                type='number'
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder='Enter your answer'
                                autoFocus
                            />
                            <button
                                type='submit'
                                className='btn btn-primary'
                                disabled={isSubmitting}
                                style={{ opacity: isSubmitting ? 0.7 : 1 }}
                            >
                                {isSubmitting ? 'Checking...' : 'Submit Answer'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
