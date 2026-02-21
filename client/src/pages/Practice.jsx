import { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import PowerVisualizer from '../components/PowerVisualizer';
import PowerGarden from '../components/PowerGarden';

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

            if (!savedUser) {
                navigate('/login');
                return;
            }

            const parsedUser = JSON.parse(savedUser);
            setLoading(true);

            const response = await api.get(`/question/${parsedUser.id}`);

            setQuestion(response.data);
            setAnswer(''); // Clear previous answer
            setGardenComplete(false); // Reset garden state
            setShowExpression(false); // Reset expression state
            setShowPlants(false);
            setShowFlower(false);
            setShowResult(false);
        } catch (error) {
            console.error('Error fetching question:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestion();
    }, [navigate]);

    // Robust State Reset: Clears all garden-related UI whenever the question parameters change.
    // This prevents "flashing" of old results on new questions.
    useEffect(() => {
        setGardenComplete(false);
        setShowExpression(false);
        setShowPlants(false);
        setShowFlower(false);
        setShowResult(false);
        setAnswer('');
        setError('');
    }, [question.base, question.exponent]);

    const [error, setError] = useState('');
    const [showExplain, setShowExplain] = useState(false);
    const [result, setResult] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [slowMode, setSlowMode] = useState(true);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [gardenComplete, setGardenComplete] = useState(false);
    const [showExpression, setShowExpression] = useState(false);
    const [showPlants, setShowPlants] = useState(false);
    const [showFlower, setShowFlower] = useState(false);
    const [showResult, setShowResult] = useState(false);

    // Unified Animation Sequence: Manages the structured reveal lifecycle
    useEffect(() => {
        if (!gardenComplete) return;

        const timers = [];

        // 1. Show Expression (300ms pause for task boundary)
        timers.push(setTimeout(() => setShowExpression(true), 300));

        // 2. Grow Plants (800ms = 300 + 500ms pause)
        timers.push(setTimeout(() => setShowPlants(true), 800));

        // 3. Bloom Flower (1500ms = 800 + 700ms pause)
        timers.push(setTimeout(() => setShowFlower(true), 1500));

        // 4. Reveal Result (2000ms = 1500 + 500ms pause)
        timers.push(setTimeout(() => setShowResult(true), 2000));

        return () => {
            timers.forEach(t => clearTimeout(t));
        };
    }, [gardenComplete]);

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
            const parsedUser = JSON.parse(savedUser);

            const response = await api.post('/attempt/submit', {
                studentId: parsedUser.id,
                base: question.base,
                exponent: question.exponent,
                studentAnswer: answer
            });

            console.log('Submission Result:', response.data);

            // Generate Micro-Feedback
            if (response.data.isCorrect) {
                const msgs = ["Great effort! 🌟", "Nice work!", "You're doing great!", "Spot on!"];
                setFeedbackMessage(msgs[Math.floor(Math.random() * msgs.length)]);
            } else {
                const msgs = ["Let's understand it together.", "Take your time.", "You'll get it next time.", "Let's review the steps."];
                setFeedbackMessage(msgs[Math.floor(Math.random() * msgs.length)]);
            }

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
            <div className='practice-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1>Practice Mode (Level {question.level})</h1>
                    <p>Solve the power problem below:</p>
                </div>
                <button
                    onClick={() => setSlowMode(!slowMode)}
                    className='btn'
                    style={{
                        background: slowMode ? '#a0c4ff' : '#eee',
                        color: slowMode ? '#000' : '#444',
                        fontSize: '0.9rem',
                        padding: '6px 12px'
                    }}
                >
                    🐢 Slow Mode: {slowMode ? 'ON' : 'OFF'}
                </button>
            </div>

            <div className='question-card'>
                <div className='question-display' style={{
                    fontSize: '4rem',
                    margin: '30px 0',
                    fontFamily: "'Courier New', monospace",
                    display: 'flex',
                    alignItems: 'flex-start', // improved alignment
                    justifyContent: 'center',
                    gap: '2px', // closer gap
                    animation: 'fadeIn 1s ease-in',
                    lineHeight: '1'
                }}>
                    <span style={{ fontWeight: 'bold' }}>{question.base}</span>
                    <sup style={{
                        color: '#ff4757',
                        fontSize: '2rem',
                        top: '-0.2em', // Adjusted relative position
                        position: 'relative'
                    }}>{question.exponent}</sup>
                    <span style={{ marginLeft: '10px' }}> = ?</span>
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
                    <PowerVisualizer base={question.base} exponent={question.exponent} slowMode={slowMode} />
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
                                {result.isCorrect ? 'Great job!' : 'Not quite right'}
                            </h2>
                            <p style={{ fontSize: '1.2rem', marginBottom: '15px', color: result.isCorrect ? '#155724' : '#555' }}>
                                {feedbackMessage}
                            </p>

                            {!result.isCorrect && (
                                <div style={{ marginTop: '10px' }}>
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
                                        <PowerVisualizer base={question.base} exponent={question.exponent} slowMode={slowMode} />
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
                        /* POWER GARDEN LAYOUT - PHASE 3 */
                        <div style={{ textAlign: 'center' }}>
                            <PowerGarden
                                base={question.base}
                                exponent={question.exponent}
                                onAllPotsFilled={() => setGardenComplete(true)}
                                showPlants={showPlants}
                                showFlower={showFlower}
                            />

                            {/* Stable container for feedback and expression to prevent jumping */}
                            <div style={{ minHeight: '160px', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {gardenComplete && (
                                    <div style={{
                                        color: '#2e7d32',
                                        fontSize: '1.3rem',
                                        fontWeight: 'bold',
                                        animation: 'fadeIn 0.5s ease-in',
                                        marginBottom: '20px'
                                    }}>
                                        Great! All pots are planted 🌱
                                    </div>
                                )}

                                {showExpression && (
                                    <div
                                        className="fade-in"
                                        style={{
                                            fontSize: '3.8rem',
                                            fontFamily: "'Courier New', monospace",
                                            fontWeight: 'bold',
                                            color: '#2d6a4f', // Soft dark green
                                            backgroundColor: '#ffffff',
                                            padding: '20px 60px',
                                            borderRadius: '24px',
                                            boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                                            border: '3px solid #c8e6c9',
                                            letterSpacing: '0.15em',
                                            lineHeight: '1',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.5s ease-in-out'
                                        }}
                                    >
                                        {Array(question.exponent).fill(question.base).join(" \u00d7 ")}
                                        {showResult && (
                                            <span className="fade-in" style={{ marginLeft: '20px', color: '#1b5e20' }}>
                                                = {Math.pow(question.base, question.exponent)}
                                            </span>
                                        )}
                                    </div>
                                )}

                                {showResult && (
                                    <div
                                        className="fade-in"
                                        style={{
                                            marginTop: '20px',
                                            color: '#2d6a4f', // Soft dark green
                                            fontSize: '1.4rem',
                                            fontWeight: '600',
                                            fontStyle: 'italic'
                                        }}
                                    >
                                        You grew the answer 🌸
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
