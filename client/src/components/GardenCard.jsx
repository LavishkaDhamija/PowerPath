import React from 'react';

const GardenCard = ({ image, base, exponent, isCorrect, correctAnswer, createdAt, onClick, onDelete }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div
            className="garden-card"
            onClick={onClick}
            style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                border: '2px solid #f1f8e9',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                fontFamily: "'Outfit', sans-serif"
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.05)';
            }}
        >
            {/* Delete Button - Subtle and Calm */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 2,
                    fontSize: '1rem',
                    color: '#999',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.color = '#e57373';
                    e.currentTarget.style.backgroundColor = '#fff';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.color = '#999';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                }}
                title="Remove this card"
            >
                ✕
            </button>

            {/* Thumbnail Image */}
            <div style={{
                width: '100%',
                height: '160px',
                backgroundColor: '#f9fbf9',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid #e8f5e9'
            }}>
                <img
                    src={image}
                    alt={`Garden ${base}^${exponent}`}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </div>

            {/* Card Content */}
            <div style={{
                padding: '16px',
                backgroundColor: '#fdfdfd',
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'center'
            }}>
                <div>
                    <h3 style={{
                        margin: '0 0 4px 0',
                        color: '#2d6a4f',
                        fontSize: '1.4rem'
                    }}>
                        {base}<sup>{exponent}</sup> = {correctAnswer}
                    </h3>

                    {/* Reinforcement Badge */}
                    <div style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        marginTop: '5px',
                        marginBottom: '10px',
                        backgroundColor: isCorrect ? '#e8f5e9' : '#fff3e0',
                        color: isCorrect ? '#2d6a4f' : '#ef6c00',
                        border: `1px solid ${isCorrect ? '#c8e6c9' : '#ffe0b2'}`,
                        transition: 'all 0.3s ease'
                    }}>
                        {isCorrect ? 'Great Growth 🌿' : 'Learning Flower 🌸'}
                    </div>

                    <p style={{
                        margin: 0,
                        color: '#999',
                        fontSize: '0.85rem'
                    }}>
                        {formatDate(createdAt)}
                    </p>
                </div>

                <div style={{
                    marginTop: '12px',
                    fontSize: '1.2rem',
                    opacity: 0.8
                }}>
                    🌻
                </div>
            </div>
        </div>
    );
};

export default GardenCard;
