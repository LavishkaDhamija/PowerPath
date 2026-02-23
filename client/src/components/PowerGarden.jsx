import React, { useState, useRef, useEffect, useCallback } from 'react';
import Seed from './Seed';
import Pot from './Pot';

const PowerGarden = ({ base, exponent, onAllPotsFilled, showPlants, showFlower, isSubmitting, screenWidth }) => {
    const pots = Array.from({ length: exponent }, (_, i) => i + 1);

    // --- State Management ---
    const [filledPots, setFilledPots] = useState(new Array(exponent).fill(false));
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [hoveredPotIndex, setHoveredPotIndex] = useState(null);
    const [feedback, setFeedback] = useState("");

    // --- Refs ---
    const seedRef = useRef(null);
    const potRefs = useRef([]);
    const gardenRef = useRef(null);
    const hasTriggeredRef = useRef(false);
    const completionTimeoutRef = useRef(null);

    const hoveredPotIndexRef = useRef(null);
    const filledPotsRef = useRef(filledPots);
    const isDraggingRef = useRef(false);

    useEffect(() => { hoveredPotIndexRef.current = hoveredPotIndex; }, [hoveredPotIndex]);
    useEffect(() => { filledPotsRef.current = filledPots; }, [filledPots]);
    useEffect(() => { isDraggingRef.current = isDragging; }, [isDragging]);

    const isMobile = screenWidth < 600;
    const filledCount = filledPots.filter(Boolean).length;
    const totalPots = pots.length;

    // Reset when question changes
    useEffect(() => {
        setFilledPots(new Array(exponent).fill(false));
        setIsDragging(false);
        setHoveredPotIndex(null);
        hasTriggeredRef.current = false;
        if (completionTimeoutRef.current) clearTimeout(completionTimeoutRef.current);
    }, [base, exponent]);

    useEffect(() => {
        return () => {
            if (completionTimeoutRef.current) clearTimeout(completionTimeoutRef.current);
        };
    }, []);

    useEffect(() => {
        if (isDragging) {
            setIsDragging(false);
            setHoveredPotIndex(null);
            document.body.style.userSelect = 'auto';
            document.body.style.touchAction = 'auto';
            setFeedback("Layout adjusted. Try again!");
            setTimeout(() => setFeedback(""), 2000);
        }
    }, [screenWidth]);

    useEffect(() => {
        if (!hasTriggeredRef.current && filledPots.length > 0 && filledPots.every(Boolean)) {
            hasTriggeredRef.current = true;
            if (onAllPotsFilled) {
                completionTimeoutRef.current = setTimeout(() => onAllPotsFilled(), 500);
            }
        }
    }, [filledPots, onAllPotsFilled]);

    // --- Drag Logic ---
    const handlePointerDown = (e) => {
        if (filledPotsRef.current.every(Boolean) || isSubmitting) return;
        e.preventDefault();
        e.stopPropagation();

        document.body.style.userSelect = 'none';
        document.body.style.touchAction = 'none';

        const rect = e.currentTarget.getBoundingClientRect();
        setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setPosition({ x: e.clientX, y: e.clientY });
        setIsDragging(true);
    };

    const handlePointerMove = useCallback((e) => {
        if (!isDraggingRef.current) return;
        setPosition({ x: e.clientX, y: e.clientY });

        let foundHover = null;
        potRefs.current.forEach((potEl, index) => {
            if (!potEl) return;
            const rect = potEl.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                foundHover = index;
            }
        });
        setHoveredPotIndex(foundHover);
    }, []);

    const handlePointerUp = useCallback((e) => {
        if (!isDraggingRef.current) return;
        setIsDragging(false);
        document.body.style.userSelect = 'auto';
        document.body.style.touchAction = 'auto';

        const currentHovered = hoveredPotIndexRef.current;
        const currentFilled = filledPotsRef.current;
        setHoveredPotIndex(null);

        if (currentHovered !== null) {
            if (currentFilled[currentHovered]) {
                setFeedback("This pot already has a seed!");
                setTimeout(() => setFeedback(""), 2000);
            } else {
                const newFilled = [...currentFilled];
                newFilled[currentHovered] = true;
                setFilledPots(newFilled);
                setFeedback("");
            }
        }
    }, []);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('pointerup', handlePointerUp);
        }
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [isDragging, handlePointerMove, handlePointerUp]);

    const allFilled = filledPots.every(Boolean);

    return (
        <div className="power-garden-container" style={{
            width: '100%',
            minHeight: '75vh',
            background: '#ffffff',
            touchAction: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: "'Inter', system-ui, sans-serif",
            position: 'relative',
            overflowX: 'hidden',
        }}>
            {/* Header Section */}
            <div style={{
                width: '100%',
                textAlign: 'center',
                padding: isMobile ? '24px 16px 16px' : '36px 24px 20px',
                background: '#ffffff',
            }}>
                <h2 style={{
                    color: '#2e7d32',
                    fontSize: isMobile ? '1.8rem' : '2.4rem',
                    fontWeight: 800,
                    margin: '0 0 6px 0',
                    letterSpacing: '-0.03em',
                    fontStyle: 'italic',
                }}>
                    Growing {base}<sup style={{ fontSize: '0.55em', color: '#558b2f', fontStyle: 'normal' }}>{exponent}</sup>
                </h2>
                <p style={{
                    color: '#6d6d6d',
                    fontSize: isMobile ? '0.95rem' : '1.05rem',
                    margin: '0 0 16px 0',
                    fontWeight: 400,
                }}>
                    Drag the <strong style={{ color: '#33691e' }}>{base}</strong>-seed into each of the <strong style={{ color: '#33691e' }}>{exponent}</strong> pots below
                </p>

                {/* Progress Dots */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                }}>
                    {pots.map((_, i) => (
                        <div key={i} style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: filledPots[i]
                                ? '#43a047'
                                : '#e0e0e0',
                            transition: 'all 0.3s ease',
                            transform: filledPots[i] ? 'scale(1.3)' : 'scale(1)',
                        }} />
                    ))}
                    <span style={{
                        marginLeft: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: '#888',
                    }}>
                        {filledCount}/{totalPots}
                    </span>
                </div>
            </div>

            {/* Thin green divider */}
            <div style={{
                width: '80px',
                height: '3px',
                background: 'linear-gradient(90deg, #81c784, #43a047)',
                borderRadius: '2px',
                margin: '0 0 20px 0',
            }} />

            {/* Seed Supply */}
            <div style={{
                textAlign: 'center',
                marginBottom: '20px',
                position: 'relative',
                zIndex: 10,
            }}>
                <span style={{
                    display: 'block',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: '#a1887f',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                }}>
                    Seed Supply
                </span>

                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '14px',
                    background: '#fafafa',
                    borderRadius: '16px',
                    border: '2px dashed #e0e0e0',
                }}>
                    <div style={{ position: 'relative', width: '84px', height: '84px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* Ghost ring */}
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0,
                            width: '100%', height: '100%',
                            borderRadius: '50%',
                            border: '2px dashed #d0d0d0',
                            pointerEvents: 'none',
                            zIndex: 1,
                        }} />

                        {!allFilled ? (
                            <Seed
                                value={base}
                                onPointerDown={handlePointerDown}
                                isDragging={isDragging}
                                style={isDragging ? {
                                    position: 'fixed',
                                    left: 0, top: 0,
                                    transform: `translate(${position.x - offset.x}px, ${position.y - offset.y}px)`,
                                    zIndex: 9999,
                                    cursor: 'grabbing',
                                    pointerEvents: 'none',
                                } : {
                                    position: 'relative',
                                    zIndex: 2,
                                    cursor: 'grab',
                                    touchAction: 'none',
                                }}
                            />
                        ) : (
                            <div style={{
                                width: '100%', height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#43a047" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            </div>
                        )}
                    </div>
                </div>

                {feedback && (
                    <div style={{
                        marginTop: '8px',
                        color: '#c62828',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        animation: 'fadeIn 0.3s ease',
                    }}>
                        {feedback}
                    </div>
                )}
            </div>

            {/* Arrow */}
            {!allFilled && (
                <div style={{ marginBottom: '16px' }}>
                    <svg width="20" height="36" viewBox="0 0 20 36" fill="none">
                        <path d="M10 0 L10 28 M3 21 L10 30 L17 21" stroke="#bdbdbd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            )}

            {allFilled && !showFlower && (
                <div className="fade-in" style={{
                    color: '#2e7d32',
                    fontWeight: 600,
                    fontSize: '1rem',
                    margin: '0 0 16px',
                    background: '#e8f5e9',
                    padding: '8px 20px',
                    borderRadius: '20px',
                }}>
                    All pots planted — garden is growing!
                </div>
            )}

            {/* Garden Ground */}
            <div ref={gardenRef} style={{
                width: '100%',
                flex: 1,
                minHeight: isMobile ? '200px' : '260px',
                background: 'linear-gradient(180deg, #f1f8e9 0%, #dcedc8 50%, #c5e1a5 100%)',
                borderRadius: '24px 24px 0 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                padding: isMobile ? '30px 10px' : '40px 20px',
                boxSizing: 'border-box',
            }}>
                {/* Decorative fence line */}
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '10%',
                    right: '10%',
                    height: '3px',
                    background: 'linear-gradient(90deg, transparent, rgba(141, 110, 99, 0.25), rgba(141, 110, 99, 0.4), rgba(141, 110, 99, 0.25), transparent)',
                    borderRadius: '2px',
                }} />

                {/* Pots Row */}
                <div style={{
                    position: 'relative',
                    zIndex: 4,
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: isMobile ? 'center' : 'flex-end',
                    gap: isMobile ? '24px' : '32px',
                    transition: 'opacity 0.6s ease-in-out',
                    opacity: showFlower ? 0 : 1,
                    pointerEvents: showFlower ? 'none' : 'auto',
                }}>
                    {pots.map((potId, index) => (
                        <div key={potId} ref={el => potRefs.current[index] = el}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Pot
                                index={index}
                                filled={filledPots[index]}
                                isHovered={hoveredPotIndex === index}
                                showPlants={showPlants}
                                showFlower={showFlower}
                            />
                            {/* Soil shadow */}
                            <div style={{
                                width: '110px',
                                height: '14px',
                                background: 'radial-gradient(ellipse at center, rgba(93,64,55,0.18) 0%, transparent 70%)',
                                borderRadius: '50%',
                                marginTop: '-4px',
                            }} />
                        </div>
                    ))}
                </div>

                {/* Blooming Flower */}
                {showFlower && (
                    <div className="fade-in" style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        zIndex: 5,
                    }}>
                        <span style={{
                            fontSize: isMobile ? '5rem' : '7rem',
                            filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.08))',
                        }}>
                            🌻
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PowerGarden;
