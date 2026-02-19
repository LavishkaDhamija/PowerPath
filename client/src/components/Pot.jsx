import React from 'react';

const Pot = ({ index, filled }) => {
    return (
        <div
            className="pot-container"
            style={{
                width: '100px',
                height: '100px',
                borderRadius: '10px 10px 25px 25px', // Flower pot shape
                backgroundColor: filled ? '#a1887f' : '#bcaaa4', // Darker when filled
                border: '3px solid #6d4c41',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                position: 'relative'
            }}
        >
            <span style={{
                position: 'absolute',
                top: '-25px',
                fontSize: '0.9rem',
                color: '#5d4037',
                fontWeight: 'bold'
            }}>
                Pot {index + 1}
            </span>

            {/* Drop Zone Visual */}
            <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                border: filled ? 'none' : '2px dashed #8d6e63',
                backgroundColor: filled ? 'transparent' : 'rgba(255,255,255,0.2)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#5d4037',
                fontSize: '0.8rem',
                textAlign: 'center'
            }}>
                {filled ? '🌱' : 'Drop seed here'}
            </div>
        </div>
    );
};

export default Pot;
