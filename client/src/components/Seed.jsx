import React from 'react';

const Seed = ({ value, onPointerDown, style }) => {
    return (
        <div
            className="seed-item"
            onPointerDown={onPointerDown}
            style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#c5e1a5', // Soft organic green
                border: '4px solid #aed581',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#33691e', // Dark green text for contrast
                cursor: 'grab', // Suggests interactivity
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.1s ease',
                userSelect: 'none',
                touchAction: 'none', // Prevents scrolling on touch devices while dragging
                ...style // Allow style overrides (e.g., for absolute positioning during drag)
            }}
            onMouseOver={(e) => !style && (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => !style && (e.currentTarget.style.transform = 'scale(1)')}
        >
            {value}
        </div>
    );
};

export default Seed;
