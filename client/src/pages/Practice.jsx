import { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import PowerVisualizer from '../components/PowerVisualizer';
import PowerGarden from '../components/PowerGarden';
import { ScreenCapture } from 'react-screen-capture';
import GardenCardView from '../components/GardenCardView';
import html2canvas from 'html2canvas';

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
        setShowSummary(false); // Reset summary state
        setAnswer('');
        setError('');
        hasCapturedRef.current = false; // Allow new capture for new question
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
    const [showSummary, setShowSummary] = useState(false); // New state to delay feedback card
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [fullScreenNotice, setFullScreenNotice] = useState('');
    const [isPaused, setIsPaused] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [lastCaptureImage, setLastCaptureImage] = useState('');
    const [isAutoSaving, setIsAutoSaving] = useState(false);
    const [gardenGallery, setGardenGallery] = useState(() => {
        const saved = localStorage.getItem('gardenGallery');
        return saved ? JSON.parse(saved) : [];
    });
    const hasCapturedRef = useRef(false);
    const cardRef = useRef(null);

    // Unified Animation Sequence: Manages the structured reveal lifecycle
    useEffect(() => {
        if (!gardenComplete || isPaused) return;

        const timers = [];

        // 1. Show Expression (300ms pause for task boundary)
        timers.push(setTimeout(() => setShowExpression(true), 300));

        // 2. Grow Plants (800ms = 300 + 500ms pause)
        timers.push(setTimeout(() => setShowPlants(true), 800));

        // 3. Bloom Flower (1500ms = 800 + 700ms pause)
        timers.push(setTimeout(() => setShowFlower(true), 1500));

        // NOTE: Result and Summary are NOT auto-revealed anymore.
        // They will be shown only AFTER the student submits their answer.

        return () => {
            timers.forEach(t => clearTimeout(t));
        };
    }, [gardenComplete, isPaused]);

    // Fullscreen Toggle Logic
    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            } else {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                }
            }
        } catch (err) {
            console.error("Error attempting to enable full-screen mode:", err);
            setError("Fullscreen mode not supported on this browser.");
        }
    };

    // Monitor Fullscreen changes (handles ESC key exit)
    useEffect(() => {
        const handleFullscreenChange = () => {
            const isNowFull = !!document.fullscreenElement;

            // If we were in focus mode and just exited
            if (isFullscreen && !isNowFull) {
                setFullScreenNotice("Focus mode paused.");
                setTimeout(() => setFullScreenNotice(''), 3000);
            }

            setIsFullscreen(isNowFull);
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsPaused(true);
            } else {
                setIsPaused(false);
                setFullScreenNotice("Welcome back to your garden 🌱");
                setTimeout(() => setFullScreenNotice(''), 3000);
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isFullscreen]);

    // Handle Window Resize: Monitors screen dimensions for layout calibration
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Persist Gallery to localStorage
    useEffect(() => {
        localStorage.setItem('gardenGallery', JSON.stringify(gardenGallery));
    }, [gardenGallery]);

    const handleSubmission = async (currentAnswer) => {
        if (!currentAnswer || isSubmitting) return;

        try {
            setIsSubmitting(true);
            setError('');

            const savedUser = localStorage.getItem('user');
            const parsedUser = JSON.parse(savedUser);

            const response = await api.post('/attempt/submit', {
                studentId: parsedUser.id,
                base: question.base,
                exponent: question.exponent,
                studentAnswer: currentAnswer
            });

            console.log('Backend Validation Result:', response.data);

            // Generate Micro-Feedback based on backend response
            if (response.data.isCorrect) {
                const msgs = ["Great effort! 🌟", "Nice work!", "You're doing great!", "Spot on!"];
                setFeedbackMessage(msgs[Math.floor(Math.random() * msgs.length)]);
            } else {
                const msgs = ["Let's understand it together.", "Take your time.", "You'll get it next time.", "Let's review the steps."];
                setFeedbackMessage(msgs[Math.floor(Math.random() * msgs.length)]);
            }

            setResult(response.data);

            // If backend returns a new level, update the question state immediately
            if (response.data.level) {
                setQuestion(prev => ({
                    ...prev,
                    level: response.data.level
                }));
                console.log('Level synchronized from backend:', response.data.level);
            }

        } catch (err) {
            console.error('Submission error:', err);
            setError('Failed to validate answer. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await handleSubmission(answer);
    };

    const addToGallery = (base64Image) => {
        const newItem = {
            id: Date.now(),
            base: question.base,
            exponent: question.exponent,
            isCorrect: result?.isCorrect,
            correctAnswer: result?.correctAnswer,
            image: base64Image,
            createdAt: new Date().toISOString()
        };
        setGardenGallery(prev => {
            const updated = [newItem, ...prev];
            return updated.slice(0, 12); // Keep only the last 12 entries (Oldest removed automatically)
        });
        setLastCaptureImage(base64Image);
        console.log('Garden Card added to Gallery (Limited to 12 items):', newItem.id);
    };

    const handleScreenCapture = (base64Image) => {
        addToGallery(base64Image);
    };

    // Automatic Capture Logic
    useEffect(() => {
        if (showResult && result?.isCorrect && !hasCapturedRef.current && cardRef.current) {
            hasCapturedRef.current = true;
            setIsAutoSaving(true);

            // Short delay to ensure the UI has finished its transition
            const timer = setTimeout(async () => {
                try {
                    const canvas = await html2canvas(cardRef.current, {
                        backgroundColor: null,
                        scale: 2, // Higher quality
                        logging: false
                    });
                    const base64Image = canvas.toDataURL('image/png');
                    addToGallery(base64Image);
                    console.log('Automatic Garden Card Saved!');
                } catch (err) {
                    console.error('Auto-capture failed:', err);
                } finally {
                    setIsAutoSaving(false);
                }
            }, 600); // 600ms delay for visual stability

            return () => clearTimeout(timer);
        }
    }, [showResult, result]);

    if (loading) {
        return <div className='container'><h2>Loading question...</h2></div>;
    }

    return (
        <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 20px',
            overflowX: 'hidden',
        }}>
            {/* Clean Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '24px 0 16px',
                borderBottom: '1px solid #e8e8e8',
                marginBottom: '24px',
            }}>
                <div>
                    <h1 style={{
                        fontSize: '1.6rem',
                        fontWeight: 700,
                        color: '#2e7d32',
                        margin: '0 0 4px 0',
                    }}>Practice Mode</h1>
                    <p style={{
                        fontSize: '0.9rem',
                        color: '#999',
                        margin: 0,
                    }}>Level {question.level} — Solve the power problem below</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={toggleFullscreen}
                        style={{
                            background: isFullscreen ? '#ffebee' : '#fafafa',
                            color: isFullscreen ? '#c62828' : '#666',
                            fontSize: '0.82rem',
                            padding: '7px 14px',
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            fontWeight: 500,
                            cursor: 'pointer',
                        }}
                    >
                        {isFullscreen ? 'Exit Focus' : 'Focus Mode'}
                    </button>
                    <button
                        onClick={() => setSlowMode(!slowMode)}
                        style={{
                            background: slowMode ? '#e8f5e9' : '#fafafa',
                            color: slowMode ? '#2e7d32' : '#666',
                            fontSize: '0.82rem',
                            padding: '7px 14px',
                            border: `1px solid ${slowMode ? '#c8e6c9' : '#e0e0e0'}`,
                            borderRadius: '8px',
                            fontWeight: 500,
                            cursor: 'pointer',
                        }}
                    >
                        Slow Mode: {slowMode ? 'ON' : 'OFF'}
                    </button>
                    <button
                        onClick={() => navigate('/gallery')}
                        style={{
                            background: '#fafafa',
                            color: '#666',
                            fontSize: '0.82rem',
                            padding: '7px 14px',
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            fontWeight: 500,
                            cursor: 'pointer',
                        }}
                    >
                        Gallery
                    </button>
                </div>
            </div>

            {fullScreenNotice && (
                <div
                    className="fade-in"
                    style={{
                        textAlign: 'center',
                        padding: '10px',
                        backgroundColor: '#fafafa',
                        color: '#888',
                        borderRadius: '8px',
                        marginBottom: '16px',
                        fontSize: '0.85rem',
                        fontStyle: 'italic',
                        border: '1px solid #eee'
                    }}
                >
                    {fullScreenNotice}
                </div>
            )}

            {/* Main content block — single bordered container */}
            <div style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '0',
                border: '2.5px solid #a3b899',
                overflow: 'hidden',
                marginBottom: '30px',
            }}>
                {/* Question display */}
                <div style={{
                    padding: '28px 20px 20px',
                    textAlign: 'center',
                    borderBottom: '1px solid #f0f0f0',
                }}>
                    <div style={{
                        fontSize: '3.2rem',
                        fontFamily: "'Courier New', monospace",
                        fontWeight: 'bold',
                        color: '#333',
                        display: 'inline-flex',
                        alignItems: 'flex-start',
                        gap: '2px',
                        lineHeight: '1',
                    }}>
                        <span>{question.base}</span>
                        <sup style={{
                            color: '#43a047',
                            fontSize: '1.6rem',
                            position: 'relative',
                            top: '-0.15em',
                            fontWeight: 700,
                        }}>{question.exponent}</sup>
                        <span style={{ marginLeft: '12px', color: '#bbb' }}> = ?</span>
                    </div>

                    <div style={{ marginTop: '14px' }}>
                        <button
                            onClick={() => setShowExplain(!showExplain)}
                            style={{
                                background: showExplain ? '#f5f5f5' : '#2e7d32',
                                color: showExplain ? '#666' : 'white',
                                fontSize: '0.82rem',
                                padding: '7px 18px',
                                border: showExplain ? '1px solid #e0e0e0' : 'none',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                fontWeight: 500,
                            }}
                        >
                            {showExplain ? 'Hide Explanation' : 'Show Visual Explanation'}
                        </button>
                    </div>
                </div>

                {showExplain && (
                    <PowerVisualizer
                        base={question.base}
                        exponent={question.exponent}
                        slowMode={slowMode}
                        providedResult={result?.correctAnswer}
                    />
                )}

                <div key={question.base + '-' + question.exponent} style={{ animation: 'fadeIn 0.8s ease-in-out' }}>
                    {(result && showSummary) ? (
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

                            <div style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                                <b>New Accuracy:</b> {result.accuracy}%
                            </div>

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
                                        <PowerVisualizer
                                            base={question.base}
                                            exponent={question.exponent}
                                            slowMode={slowMode}
                                            providedResult={result.correctAnswer}
                                        />
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
                        /* POWER GARDEN LAYOUT - PHASE 6 */
                        <div style={{ textAlign: 'center' }}>
                            <PowerGarden
                                base={question.base}
                                exponent={question.exponent}
                                onAllPotsFilled={() => {
                                    if (isSubmitting) return;
                                    setGardenComplete(true);
                                    // Do NOT auto-submit — let the student enter their answer
                                }}
                                showPlants={showPlants}
                                showFlower={showFlower && (result ? result.isCorrect : true)}
                                isSubmitting={isSubmitting}
                                screenWidth={screenWidth}
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
                                            color: result && showResult && !result.isCorrect ? '#c62828' : '#2d6a4f',
                                            backgroundColor: '#ffffff',
                                            padding: '20px 60px',
                                            borderRadius: '24px',
                                            boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                                            border: result && showResult ? `3px solid ${result.isCorrect ? '#c8e6c9' : '#ffcdd2'}` : '3px solid #c8e6c9',
                                            letterSpacing: '0.15em',
                                            lineHeight: '1',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.5s ease-in-out'
                                        }}
                                    >
                                        {Array(question.exponent).fill(question.base).join(" \u00d7 ")}
                                        {showResult && result ? (
                                            <span className="fade-in" style={{
                                                marginLeft: '20px',
                                                color: result.isCorrect ? '#1b5e20' : '#d32f2f'
                                            }}>
                                                = {result.correctAnswer}
                                            </span>
                                        ) : (
                                            <span style={{ marginLeft: '20px', color: '#999' }}>
                                                = ?
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Student Answer Input - shown after expression, before result */}
                                {showExpression && !showResult && (
                                    <form
                                        onSubmit={async (e) => {
                                            e.preventDefault();
                                            if (!answer.trim()) return;
                                            await handleSubmission(answer);
                                            // After submission completes, reveal result and summary
                                            setShowResult(true);
                                            setTimeout(() => setShowSummary(true), 2000);
                                        }}
                                        className="fade-in"
                                        style={{
                                            marginTop: '25px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '15px'
                                        }}
                                    >
                                        <label style={{
                                            color: '#2d6a4f',
                                            fontSize: '1.2rem',
                                            fontWeight: '600'
                                        }}>
                                            What is the answer? 🌻
                                        </label>
                                        <input
                                            type="number"
                                            value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            placeholder=""
                                            autoFocus
                                            style={{
                                                fontSize: '2rem',
                                                fontFamily: "'Courier New', monospace",
                                                textAlign: 'center',
                                                padding: '12px 24px',
                                                borderRadius: '16px',
                                                border: '3px solid #c8e6c9',
                                                backgroundColor: '#fafff5',
                                                color: '#2d6a4f',
                                                width: '200px',
                                                outline: 'none',
                                                boxShadow: '0 4px 10px rgba(0,0,0,0.04)',
                                                transition: 'border-color 0.3s ease'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#66bb6a'}
                                            onBlur={(e) => e.target.style.borderColor = '#c8e6c9'}
                                        />
                                        <button
                                            type="submit"
                                            className="btn"
                                            disabled={isSubmitting || !answer.trim()}
                                            style={{
                                                background: isSubmitting ? '#ccc' : '#2d6a4f',
                                                color: 'white',
                                                padding: '12px 40px',
                                                borderRadius: '30px',
                                                fontSize: '1.1rem',
                                                fontWeight: 'bold',
                                                border: 'none',
                                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                                boxShadow: '0 4px 12px rgba(45, 106, 79, 0.3)',
                                                transition: 'transform 0.2s, background 0.3s'
                                            }}
                                            onMouseOver={(e) => { if (!isSubmitting) e.currentTarget.style.transform = 'scale(1.03)'; }}
                                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                        >
                                            {isSubmitting ? 'Checking...' : '🌿 Check My Answer'}
                                        </button>
                                    </form>
                                )}

                                {showResult && (
                                    <div
                                        className="fade-in"
                                        style={{
                                            marginTop: '20px',
                                            color: result && !result.isCorrect ? '#d32f2f' : '#2d6a4f',
                                            fontSize: '1.4rem',
                                            fontWeight: '600',
                                            fontStyle: 'italic'
                                        }}
                                    >
                                        {result && !result.isCorrect ? "Let's look at the correct answer 🌸" : "You grew the answer 🌸"}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Garden Card Capture Section - Only shown when results are ready */}
                    {showSummary && result?.isCorrect && (
                        <div style={{ marginTop: '40px', borderTop: '2px solid #eee', paddingTop: '40px' }}>
                            <ScreenCapture onEndCapture={handleScreenCapture}>
                                {({ onStartCapture }) => (
                                    <div style={{ textAlign: 'center' }}>
                                        {isAutoSaving && (
                                            <div style={{
                                                fontSize: '0.9rem',
                                                color: '#558b2f',
                                                marginBottom: '10px',
                                                fontStyle: 'italic'
                                            }}>
                                                Saving your Garden Card... 📸
                                            </div>
                                        )}
                                        <div ref={cardRef}>
                                            <GardenCardView
                                                base={question.base}
                                                exponent={question.exponent}
                                                result={result}
                                                feedbackMessage={feedbackMessage}
                                            />
                                        </div>
                                        <button
                                            onClick={onStartCapture}
                                            className="btn"
                                            style={{
                                                marginTop: '20px',
                                                background: '#689f38',
                                                color: 'white',
                                                padding: '12px 30px',
                                                borderRadius: '30px',
                                                fontSize: '1.1rem',
                                                fontWeight: 'bold',
                                                boxShadow: '0 4px 12px rgba(104, 159, 56, 0.3)',
                                                border: 'none',
                                                cursor: 'pointer',
                                                transition: 'transform 0.2s'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                        >
                                            💾 Save Garden Card
                                        </button>

                                        {lastCaptureImage && (
                                            <div style={{ marginTop: '30px', animation: 'fadeIn 0.8s ease-out', padding: '20px', backgroundColor: '#f9fbf9', borderRadius: '15px', border: '1px solid #e8f5e9' }}>
                                                <p style={{ color: '#558b2f', fontWeight: 'bold', marginBottom: '15px' }}>Your Captured Card:</p>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                                                    <img
                                                        src={lastCaptureImage}
                                                        alt="capture preview"
                                                        style={{ width: '200px', borderRadius: '12px', border: '3px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                                                    />
                                                    <div style={{ display: 'flex', gap: '10px' }}>
                                                        <a
                                                            href={lastCaptureImage}
                                                            download={`my_power_garden_${question.base}_${question.exponent}.png`}
                                                            className="btn"
                                                            style={{
                                                                background: '#2d6a4f',
                                                                color: 'white',
                                                                padding: '8px 20px',
                                                                borderRadius: '20px',
                                                                textDecoration: 'none',
                                                                fontSize: '0.9rem'
                                                            }}
                                                        >
                                                            ⬇️ Download
                                                        </a>
                                                        <button
                                                            onClick={() => navigate('/gallery')}
                                                            className="btn"
                                                            style={{
                                                                background: '#dcedc8',
                                                                color: '#2d6a4f',
                                                                padding: '8px 20px',
                                                                borderRadius: '20px',
                                                                fontSize: '0.9rem',
                                                                border: '1px solid #c8e6c9',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            🖼️ View Gallery
                                                        </button>
                                                        <button
                                                            onClick={() => setLastCaptureImage('')}
                                                            className="btn"
                                                            style={{
                                                                background: '#ef5350',
                                                                color: 'white',
                                                                padding: '8px 20px',
                                                                borderRadius: '20px',
                                                                fontSize: '0.9rem',
                                                                border: 'none'
                                                            }}
                                                        >
                                                            🗑️ Clear
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </ScreenCapture>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
