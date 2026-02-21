import React, { useState, useRef, useEffect } from 'react';
import Seed from './Seed';
import Pot from './Pot';

const PowerGarden = ({ base, exponent, onAllPotsFilled, showPlants, showFlower, isSubmitting, screenWidth }) => {
    // Generate an array for pots based on the exponent
    const pots = Array.from({ length: exponent }, (_, i) => i + 1);

    // --- State Management ---
    const [filledPots, setFilledPots] = useState(new Array(exponent).fill(false)); // Track which pots have seeds
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 }); // Current cursor/seed position
    const [offset, setOffset] = useState({ x: 0, y: 0 });     // Offset to keep seed under cursor
    const [hoveredPotIndex, setHoveredPotIndex] = useState(null); // Which pot is currently being hovered
    const [feedback, setFeedback] = useState(""); // Feedback message for user

    // --- Refs for Collision Detection & Logic ---
    const seedRef = useRef(null);
    const potRefs = useRef([]); // Check collision against these
    const gardenRef = useRef(null); // Container reference
    const hasTriggeredRef = useRef(false); // Prevent duplicate triggers
    const completionTimeoutRef = useRef(null); // Ref to clear timeout

    // Determine layout based on screen width
    const isMobile = screenWidth < 600;

    // Reset when question changes
    useEffect(() => {
        setFilledPots(new Array(exponent).fill(false));
        setIsDragging(false); // Reset drag state
        hasTriggeredRef.current = false; // Allow trigger for new question
        if (completionTimeoutRef.current) clearTimeout(completionTimeoutRef.current);
    }, [base, exponent]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (completionTimeoutRef.current) clearTimeout(completionTimeoutRef.current);
        };
    }, []);

    // Resize Safety: If the screen resizes while dragging, cancel the drag
    // to prevent the seed from snapping to an old layout position.
    useEffect(() => {
        if (isDragging) {
            setIsDragging(false);
            setHoveredPotIndex(null);
            document.body.style.userSelect = 'auto';
            document.body.style.touchAction = 'auto';
            setFeedback("Layout adjusted. Please try again 🌱");
            setTimeout(() => setFeedback(""), 2000);
        }
    }, [screenWidth]);

    // Completion Trigger
    useEffect(() => {
        if (!hasTriggeredRef.current && filledPots.length > 0 && filledPots.every(Boolean)) {
            hasTriggeredRef.current = true;
            if (onAllPotsFilled) {
                // Small delay for visual "planting" satisfaction
                completionTimeoutRef.current = setTimeout(() => onAllPotsFilled(), 500);
            }
        }
    }, [filledPots, onAllPotsFilled]);

    // --- Drag Logic ---
    const handlePointerDown = (e) => {
        if (filledPots.every(Boolean) || isSubmitting) return; // Lock interactions if completed
        e.preventDefault();

        // Disable text selection and touch scrolling during drag
        document.body.style.userSelect = 'none';
        document.body.style.touchAction = 'none';

        const rect = e.currentTarget.getBoundingClientRect();
        setIsDragging(true);
        setOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setPosition({
            x: e.clientX,
            y: e.clientY
        });
    };

    const handlePointerMove = (e) => {
        if (!isDragging) return;

        // Update seed position
        setPosition({
            x: e.clientX,
            y: e.clientY
        });

        // Hover Detection using "Live" Bounding Rects
        // We recalculate these on every move to ensure absolute accuracy 
        // during transitions or layout shifts.
        let foundHover = null;
        potRefs.current.forEach((potEl, index) => {
            if (!potEl) return;
            const rect = potEl.getBoundingClientRect();
            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {
                foundHover = index;
            }
        });
        setHoveredPotIndex(foundHover);
    };

    const handlePointerUp = (e) => {
        if (!isDragging) return;

        setIsDragging(false);
        setHoveredPotIndex(null);

        // Restore interaction defaults
        document.body.style.userSelect = 'auto';
        document.body.style.touchAction = 'auto';

        if (hoveredPotIndex !== null) {
            if (filledPots[hoveredPotIndex]) {
                setFeedback("This pot already has a seed!");
                setTimeout(() => setFeedback(""), 2000);
            } else {
                const newFilled = [...filledPots];
                newFilled[hoveredPotIndex] = true;
                setFilledPots(newFilled);
                setFeedback(""); // Clear any old feedback
            }
        }
    };

    // Attach global listeners for move/up to ensure we catch events even if cursor leaves the element
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('pointerup', handlePointerUp);
        }
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [isDragging, hoveredPotIndex, filledPots]);

    const allFilled = filledPots.every(Boolean);

    return (
        <div className="power-garden-container" style={{
            padding: '30px',
            backgroundColor: '#f1f8e9', // Light pale green background
            borderRadius: '20px',
            border: '2px solid #c5e1a5',
            boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
            textAlign: 'center',
            maxWidth: '100%',
            margin: '0 auto',
            position: 'relative', // for absolute positioning context if needed
            touchAction: 'none' // Prevent scrolling on container
        }}>
            {/* Title */}
            <h2 style={{
                color: '#558b2f',
                marginBottom: '20px',
                fontSize: '2rem'
            }}>
                Grow: {base} <sup>{exponent}</sup>
            </h2>

            <p style={{ color: '#666', marginBottom: '40px', fontSize: '1.2rem' }}>
                Plant the <b>{base}</b> seeds into <b>{exponent}</b> pots!
            </p>

            {/* Main Garden Layout: Flex column for Seed Supply -> Pots */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
                alignItems: 'center'
            }}>

                {/* Seed Supply Area */}
                <div className="seed-supply" style={{
                    padding: '15px',
                    backgroundColor: '#fff9c4', // Light yellow container
                    borderRadius: '15px',
                    border: '2px dashed #fbc02d',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 10
                }}>
                    <strong style={{ color: '#f57f17', marginBottom: '10px' }}>Seed Supply</strong>

                    {/* Draggable Seed (rendered conditionally or overlay) */}
                    {/* We keep a 'ghost' static seed to show where it comes from */}
                    <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                        {/* Static Placeholder (Ghost) */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            border: '4px dashed #fbc02d',
                            opacity: 0.5
                        }}></div>

                        {/* The Draggable Seed */}
                        {/* If dragging, we use fixed position to float above everything. 
                            If not dragging, it sits static in the supply. */}
                        {!allFilled ? (
                            <Seed
                                value={base}
                                onPointerDown={handlePointerDown}
                                style={isDragging ? {
                                    position: 'fixed',
                                    left: 0,
                                    top: 0,
                                    transform: `translate(${position.x - offset.x}px, ${position.y - offset.y}px)`,
                                    zIndex: 9999,
                                    cursor: 'grabbing',
                                    pointerEvents: 'none' // let events pass through to document for move handler
                                } : {
                                    cursor: 'grab'
                                }}
                            />
                        ) : (
                            /* All Filled - Show Success Message or Static Seed */
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '2.5rem'
                            }}>
                                ✅
                            </div>
                        )}
                    </div>
                </div>

                {feedback && (
                    <div style={{
                        color: '#c62828', // Material Red 800
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        marginBottom: '10px'
                    }}>
                        {feedback}
                    </div>
                )}

                {allFilled && (
                    <div style={{
                        marginTop: '-20px',
                        color: '#2e7d32',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        animation: 'fadeIn 0.5s ease-in'
                    }}>
                        All pots are planted! 🌱
                    </div>
                )}

                {/* Arrow pointing down */}
                <div style={{ fontSize: '2rem', color: '#8d6e63' }}>⬇</div>

                {/* Pots Area - Wrapped for stable positioning during flower merge */}
                <div className="pots-container" ref={gardenRef} style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '40px 20px',
                    backgroundColor: '#dcedc8', // Stable grass background
                    borderRadius: '15px',
                    width: '100%',
                    minHeight: '200px', // Ensure height stability
                    boxSizing: 'border-box',
                    transition: 'flex-direction 0.5s ease-in-out'
                }}>
                    {/* Individual Pots - Fade Out when blooming */}
                    <div style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '20px',
                        width: '100%',
                        transition: 'opacity 0.6s ease-in-out, flex-direction 0.5s ease-in-out',
                        opacity: showFlower ? 0 : 1,
                        pointerEvents: showFlower ? 'none' : 'auto'
                    }}>
                        {pots.map((potId, index) => (
                            <div key={potId} ref={el => potRefs.current[index] = el}>
                                <Pot
                                    index={index}
                                    filled={filledPots[index]}
                                    isHovered={hoveredPotIndex === index}
                                    showPlants={showPlants}
                                    showFlower={showFlower}
                                />
                            </div>
                        ))}
                    </div>

                    {/* The Big Blooming Flower Reveal */}
                    {showFlower && (
                        <div
                            className="fade-in"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontSize: '6rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                zIndex: 5
                            }}
                        >
                            <span style={{
                                animation: 'fadeIn 0.8s ease-out',
                                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                            }}>
                                🌻
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PowerGarden;
