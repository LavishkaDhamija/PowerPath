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

    const [result, setResult] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!answer) {
            setError('Please enter a number');
            return;
        }

        try {
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

                {/* Visualizer Placeholder */}
                <PowerVisualizer base={question.base} exponent={question.exponent} />

                <form onSubmit={onSubmit} className='answer-form'>
                    {error && <div className='error-message' style={{ marginBottom: '10px' }}>{error}</div>}
                    <input
                        type='number'
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder='Enter your answer'
                        autoFocus
                    />
                    <button type='submit' className='btn btn-primary'>
                        Submit Answer
                    </button>
                </form>
            </div>
        </div>
    );
}
