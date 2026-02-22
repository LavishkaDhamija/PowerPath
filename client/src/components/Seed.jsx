import React from 'react';

const Seed = ({ value, onPointerDown, isDragging, style }) => {
    return (
        <div
            className="seed-item"
            onPointerDown={onPointerDown}
            style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#c5e1a5',
                border: '4px solid #aed581',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#33691e',
                cursor: 'grab',
                boxShadow: isDragging ? '0 8px 20px rgba(0,0,0,0.2)' : '0 4px 6px rgba(0,0,0,0.1)',
                // CRITICAL: No transition on transform during drag — it must follow cursor instantly
                transition: isDragging ? 'box-shadow 0.2s ease' : 'transform 0.1s ease, box-shadow 0.2s ease',
                userSelect: 'none',
                touchAction: 'none',
                willChange: isDragging ? 'transform' : 'auto',
                ...style
            }}
            onMouseOver={(e) => {
                if (!isDragging) e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
                if (!isDragging) e.currentTarget.style.transform = 'scale(1)';
            }}
        >
            {value}
        </div>
    );
};

export default Seed;
