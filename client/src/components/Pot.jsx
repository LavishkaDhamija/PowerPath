import React from 'react';

const Pot = ({ index, filled, isHovered, showPlants, showFlower }) => {
    return (
        <div
            className="pot-container"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                transition: 'all 0.3s ease',
                transform: (showPlants && filled) ? 'scale(1.08)' : 'scale(1)',
            }}
        >
            {/* Growing plant */}
            {filled && showPlants && (
                <div className="fade-in" style={{
                    position: 'absolute',
                    top: '-28px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '1.4rem',
                    zIndex: 3,
                }}>
                    🌿
                </div>
            )}

            {/* Pot Label */}
            <span style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                color: filled ? '#43a047' : '#a1887f',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '5px',
                transition: 'color 0.3s ease',
            }}>
                Pot {index + 1}
            </span>

            {/* Pot Body */}
            <div style={{
                width: '96px',
                height: '85px',
                borderRadius: '6px 6px 20px 20px',
                background: filled
                    ? 'linear-gradient(180deg, #795548, #5d4037)'
                    : isHovered
                        ? 'linear-gradient(180deg, #d7ccc8, #bcaaa4)'
                        : 'linear-gradient(180deg, #bcaaa4, #a1887f)',
                border: filled
                    ? '2px solid #43a047'
                    : isHovered
                        ? '2px solid #81c784'
                        : '2px solid rgba(109, 76, 65, 0.35)',
                boxShadow: isHovered && !filled
                    ? '0 0 16px rgba(129, 199, 132, 0.35)'
                    : '0 3px 10px rgba(0,0,0,0.1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                cursor: (isHovered && !filled) ? 'copy' : 'default',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Rim highlight */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '8px',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.2), transparent)',
                    borderRadius: '6px 6px 0 0',
                    pointerEvents: 'none',
                }} />

                {/* Inner zone */}
                <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: filled ? 'none' : '2px dashed rgba(109, 76, 65, 0.3)',
                    backgroundColor: filled ? 'transparent' : 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: filled ? '1.6rem' : '0.8rem',
                    color: filled ? '#e8f5e9' : '#6d4c41',
                    fontWeight: 600,
                    transition: 'all 0.4s ease',
                    opacity: filled ? 1 : 0.6,
                }}>
                    {filled ? '🌱' : (isHovered ? '?' : 'Drop')}
                </div>
            </div>
        </div>
    );
};

export default Pot;
