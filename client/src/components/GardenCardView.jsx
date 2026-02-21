import React from 'react';

const GardenCardView = ({ base, exponent, result, feedbackMessage }) => {
    return (
        <div id="garden-card-capture-area" style={{
            width: '600px',
            padding: '40px',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '8px solid #f1f8e9',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            textAlign: 'center',
            margin: '20px auto',
            fontFamily: "'Outfit', 'Inter', sans-serif"
        }}>
            <h2 style={{ color: '#558b2f', marginBottom: '10px', fontSize: '1.8rem' }}>
                Power Garden Card 🌿
            </h2>

            <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#2d6a4f',
                margin: '20px 0',
                padding: '15px',
                backgroundColor: '#f9fbf9',
                borderRadius: '16px'
            }}>
                {base}<sup>{exponent}</sup> = {result?.correctAnswer || '?'}
            </div>

            <div style={{
                fontSize: '5rem',
                margin: '30px 0',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
            }}>
                {result?.isCorrect ? '🌻' : '🌱'}
            </div>

            <div style={{
                fontSize: '1.3rem',
                color: '#555',
                lineHeight: '1.6',
                fontStyle: 'italic',
                padding: '0 20px'
            }}>
                {feedbackMessage || "Keep growing your skills!"}
            </div>

            <div style={{
                marginTop: '30px',
                fontSize: '0.9rem',
                color: '#999',
                borderTop: '1px solid #eee',
                paddingTop: '15px'
            }}>
                Mastered at PowerPath Learning
            </div>
        </div>
    );
};

export default GardenCardView;
