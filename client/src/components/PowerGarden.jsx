import React, { useState, useRef, useEffect } from 'react';
import Seed from './Seed';
import Pot from './Pot';

const PowerGarden = ({ base, exponent }) => {
    // Generate an array for pots based on the exponent
    const pots = Array.from({ length: exponent }, (_, i) => i + 1);

    // --- State Management ---
    const [filledPots, setFilledPots] = useState(new Array(exponent).fill(false)); // Track which pots have seeds
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 }); // Current cursor/seed position
    const [offset, setOffset] = useState({ x: 0, y: 0 });     // Offset to keep seed under cursor

    // --- Refs for Collision Detection ---
    const seedRef = useRef(null);
    const potRefs = useRef([]); // Check collision against these
    const gardenRef = useRef(null); // Container reference

    // Reset when question changes
    useEffect(() => {
        setFilledPots(new Array(exponent).fill(false));
        setIsDragging(false); // Reset drag state
    }, [base, exponent]);

    // --- Drag Logic ---
    const handlePointerDown = (e) => {
        e.preventDefault();

        // Disable text selection and touch scrolling during drag
        e.currentTarget.setPointerCapture(e.pointerId);

        const elem = e.currentTarget;
        const rect = elem.getBoundingClientRect();

        // Calculate offset so the seed stays under the cursor exactly where grabbed
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        setOffset({ x: offsetX, y: offsetY });
        setPosition({ x: e.clientX - offsetX, y: e.clientY - offsetY });
        setIsDragging(true);
    };

    const handlePointerMove = (e) => {
        if (!isDragging) return;

        e.preventDefault();

        // Update position based on pointer minus offset
        const newX = e.clientX - offset.x;
        const newY = e.clientY - offset.y;

        setPosition({ x: newX, y: newY });
    };

    const handlePointerUp = (e) => {
        if (!isDragging) return;

        e.preventDefault();
        setIsDragging(false);

        // --- Collision Detection Logic ---
        // 1. Get current seed center (using the last known cursor position and offset)
        // Note: The cursor position IS the transformation origin because we used offset.
        // position.x = clientX - offset.x
        // We want the center of the 80x80 seed (so +40, +40)
        // But actually, checking the Pointer coordinates (e.clientX, e.clientY) is simpler and usually sufficient.

        const dropX = e.clientX;
        const dropY = e.clientY;

        // 2. Loop through all pots to see if we dropped inside one
        let droppedInPotIndex = -1;

        potRefs.current.forEach((potElem, index) => {
            if (!potElem || filledPots[index]) return; // Skip if pot invalid or already full

            const rect = potElem.getBoundingClientRect();

            // Simple rectangle collision check
            if (
                dropX >= rect.left &&
                dropX <= rect.right &&
                dropY >= rect.top &&
                dropY <= rect.bottom
            ) {
                droppedInPotIndex = index;
            }
        });

        // 3. Handle Drop
        if (droppedInPotIndex !== -1) {
            // Valid Drop! Snap into pot.
            const newFilled = [...filledPots];
            newFilled[droppedInPotIndex] = true;
            setFilledPots(newFilled);

            // Visual feedback (optional console log for now)
            console.log(`Planted in Pot ${droppedInPotIndex + 1}!`);
        } else {
            // Invalid Drop - logic resets automatically because isDragging becomes false 
            // and the component re-renders the Seed back in the supply header.
            console.log("Returned to supply");
        }
    };

    // Attach global listeners for move/up to ensure we catch events even if cursor leaves the element
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('pointerup', handlePointerUp);
        } else {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        }
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [isDragging, offset]);

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
                                    transform: `translate(${position.x}px, ${position.y}px)`,
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

                {/* Pots Area */}
                <div className="pots-container" ref={gardenRef} style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '20px',
                    padding: '20px',
                    backgroundColor: '#dcedc8', // Slightly darker green "grass"
                    borderRadius: '15px',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    {pots.map((potId, index) => (
                        <div key={potId} ref={el => potRefs.current[index] = el}>
                            <Pot index={index} filled={filledPots[index]} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PowerGarden;
