import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
    const navigate = useNavigate();
    const [gallery, setGallery] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    // Load gallery from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('gardenGallery');
        if (saved) {
            setGallery(JSON.parse(saved));
        }
    }, []);

    const handleClearGallery = () => {
        if (window.confirm("Are you sure you want to clear your garden gallery? This will remove all your beautiful cards.")) {
            localStorage.removeItem('gardenGallery');
            setGallery([]);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="container" style={{ padding: '40px 20px', minHeight: '100vh', backgroundColor: '#fdfcf0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ color: '#2d6a4f', fontSize: '2.5rem', marginBottom: '10px' }}>My Garden Gallery 🌻</h1>
                    <p style={{ color: '#666', fontSize: '1.2rem' }}>A collection of the powers you've grown.</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button
                        onClick={() => navigate('/practice')}
                        className="btn"
                        style={{ background: '#e8f5e9', color: '#2d6a4f', border: '2px solid #2d6a4f' }}
                    >
                        🌱 Back to Garden
                    </button>
                    {gallery.length > 0 && (
                        <button
                            onClick={handleClearGallery}
                            className="btn"
                            style={{ background: '#ffebee', color: '#c62828', border: '2px solid #c62828' }}
                        >
                            🗑️ Clear Gallery
                        </button>
                    )}
                </div>
            </div>

            {gallery.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '100px 20px',
                    backgroundColor: 'white',
                    borderRadius: '24px',
                    border: '2px dashed #ccc'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🧺</div>
                    <h2 style={{ color: '#888' }}>Your gallery is empty right now.</h2>
                    <p style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: '30px' }}>Complete practice problems to grow your first Garden Card!</p>
                    <button
                        onClick={() => navigate('/practice')}
                        className="btn btn-primary"
                        style={{ padding: '12px 40px', fontSize: '1.1rem' }}
                    >
                        Go to Garden
                    </button>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '25px'
                }}>
                    {gallery.map((card) => (
                        <div
                            key={card.id}
                            onClick={() => setSelectedCard(card)}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                                border: '1px solid #eee'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.1)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.05)';
                            }}
                        >
                            <img
                                src={card.image}
                                alt={`Garden Card ${card.base}^${card.exponent}`}
                                style={{ width: '100%', height: '180px', objectFit: 'cover', borderBottom: '1px solid #f0f0f0' }}
                            />
                            <div style={{ padding: '15px', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#2d6a4f', marginBottom: '5px' }}>
                                    {card.base}<sup>{card.exponent}</sup> = {card.correctAnswer}
                                </div>
                                <div style={{ fontSize: '0.85rem', color: '#999' }}>
                                    {formatDate(card.createdAt)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Lightbox / Modal */}
            {selectedCard && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.85)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                        padding: '20px',
                        animation: 'fadeIn 0.3s ease-out'
                    }}
                    onClick={() => setSelectedCard(null)}
                >
                    <div
                        style={{ position: 'relative', maxWidth: '900px', width: '100%' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedCard(null)}
                            style={{
                                position: 'absolute',
                                top: '-50px',
                                right: '0',
                                background: 'none',
                                border: 'none',
                                color: 'white',
                                fontSize: '2.5rem',
                                cursor: 'pointer'
                            }}
                        >
                            &times;
                        </button>
                        <img
                            src={selectedCard.image}
                            alt="Full Garden Card"
                            style={{
                                width: '100%',
                                borderRadius: '24px',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                                backgroundColor: 'white'
                            }}
                        />
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <a
                                href={selectedCard.image}
                                download={`my_garden_card_${selectedCard.base}_${selectedCard.exponent}.png`}
                                className="btn"
                                style={{ background: '#2d6a4f', color: 'white', padding: '12px 40px', fontSize: '1.1rem' }}
                            >
                                ⬇️ Download My Card
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default Gallery;
