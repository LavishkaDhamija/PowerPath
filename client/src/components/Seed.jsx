import React from 'react';

const Seed = ({ value }) => {
    return (
        <div
            className="seed-item"
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
                cursor: 'pointer', // Suggests interactivity
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s ease',
                userSelect: 'none'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            {value}
        </div>
    );
};

export default Seed;
