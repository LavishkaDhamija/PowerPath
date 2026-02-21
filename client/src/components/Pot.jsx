import React from 'react';

const Pot = ({ index, filled, isHovered, showPlants, showFlower }) => {
    // Define calm, organic colors
    const colors = {
        defaultPot: '#bcaaa4',
        hoverPot: '#d7ccc8',
        filledPot: '#8d6e63',
        defaultBorder: '#6d4c41',
        hoverBorder: '#81c784', // Soft green for guidance
        filledBorder: '#4caf50'  // Stronger green for success
    };

    return (
        <div
            className="pot-container"
            style={{
                width: '100px',
                height: '100px',
                borderRadius: '10px 10px 25px 25px',
                backgroundColor: filled ? colors.filledPot : (isHovered ? colors.hoverPot : colors.defaultPot),
                border: filled ? `3px solid ${colors.filledBorder}` : (isHovered ? `3px solid ${colors.hoverBorder}` : `3px solid ${colors.defaultBorder}`),
                boxShadow: (isHovered && !filled) ? '0 0 15px rgba(129, 199, 132, 0.4)' : '0 4px 6px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s ease-in-out',
                position: 'relative',
                cursor: (isHovered && !filled) ? 'copy' : 'default',
                transform: (showPlants && filled) ? 'scale(1.05)' : 'scale(1)',
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
            <div
                className="plant-visual"
                style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    border: filled ? 'none' : '2px dashed #8d6e63',
                    backgroundColor: filled ? 'transparent' : 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#5d4037',
                    fontSize: showPlants ? '2rem' : '1.5rem',
                    textAlign: 'center',
                    transition: 'all 0.5s ease-in-out',
                    opacity: filled ? 1 : 0.5
                }}
            >
                {filled ? (showPlants ? '🌿' : '🌱') : (isHovered ? '?' : 'Drop')}
            </div>
        </div>
    );
};

export default Pot;
