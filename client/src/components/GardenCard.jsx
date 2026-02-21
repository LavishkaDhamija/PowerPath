import React from 'react';

const GardenCard = ({ image, base, exponent, correctAnswer, createdAt, onClick }) => {
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
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
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
                    <p style={{
                        margin: 0,
                        color: '#999',
                        fontSize: '0.85rem'
                    }}>
                        Captured on {formatDate(createdAt)}
                    </p>
                </div>

                {/* Small indicator decoration */}
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
