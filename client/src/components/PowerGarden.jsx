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

    return (
        <div className="power-garden-container" style={{
            padding: '30px',
            backgroundColor: '#f1f8e9', // Light pale green background
            borderRadius: '20px',
            border: '2px solid #c5e1a5',
            boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
            textAlign: 'center',
            maxWidth: '100%',
            margin: '0 auto'
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
                    alignItems: 'center'
                }}>
                    <strong style={{ color: '#f57f17', marginBottom: '10px' }}>Seed Supply</strong>

                    {/* The Seed Representation */}
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: '#ffeb3b', // Seed bright yellow
                        border: '4px solid #fbc02d',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: '#f57f17',
                        background: 'radial-gradient(circle at 30% 30%, #fff9c4, #ffeb3b)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                    }}>
                        {base}
                    </div>
                </div>

                {/* Arrow pointing down */}
                <div style={{ fontSize: '2rem', color: '#8d6e63' }}>⬇</div>

                {/* Pots Area */}
                <div className="pots-container" style={{
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
                    {pots.map((potId) => (
                        <div key={potId} className="garden-pot" style={{
                            width: '100px',
                            height: '100px',
                            backgroundColor: '#8d6e63', // Pot brown
                            borderRadius: '5px 5px 25px 25px', // Pot shape
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            paddingTop: '10px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                            borderTop: '5px solid #6d4c41'
                        }}>
                            {/* Empty Place Indicator */}
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                border: '2px dashed rgba(255,255,255,0.4)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'rgba(255,255,255,0.6)',
                                fontSize: '0.8rem'
                            }}>
                                Empty
                            </div>

                            {/* Pot Number Label */}
                            <span style={{
                                position: 'absolute',
                                bottom: '5px',
                                color: 'white',
                                fontSize: '0.8rem',
                                fontWeight: 'bold'
                            }}>
                                Pot {potId}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PowerGarden;
