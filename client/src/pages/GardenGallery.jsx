import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GardenCard from '../components/GardenCard';
import ImageModal from '../components/ImageModal';

const GardenGallery = () => {
    const navigate = useNavigate();
    const [gallery, setGallery] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    // Hydrate from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('gardenGallery');
        if (saved) {
            setGallery(JSON.parse(saved));
        }
    }, []);

    const handleDeleteCard = (id) => {
        if (window.confirm("Would you like to remove this specific garden card?")) {
            const updated = gallery.filter(item => item.id !== id);
            setGallery(updated);
            localStorage.setItem('gardenGallery', JSON.stringify(updated));
        }
    };

    const handleClearGallery = () => {
        if (window.confirm("Would you like to clear your gallery? This will remove all your collected cards.")) {
            localStorage.removeItem('gardenGallery');
            setGallery([]);
        }
    };

    return (
        <div className="garden-gallery-container" style={{
            padding: '40px 20px',
            minHeight: '80vh',
            backgroundColor: '#f9fbf9',
            fontFamily: "'Outfit', sans-serif"
        }}>
            {/* Header Section */}
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '50px',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <div>
                    <h1 style={{ color: '#2d6a4f', fontSize: '2.4rem', margin: '0 0 10px 0' }}>
                        My Garden Gallery 🌻
                    </h1>
                    <p style={{ color: '#666', fontSize: '1.2rem', margin: 0 }}>
                        A beautiful history of your power progress.
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <button
                        onClick={() => navigate('/practice')}
                        className="btn"
                        style={{
                            background: '#ffffff',
                            color: '#2d6a4f',
                            border: '2px solid #2d6a4f',
                            borderRadius: '12px',
                            fontWeight: '600',
                            padding: '10px 20px'
                        }}
                    >
                        🌱 Plant More
                    </button>
                    {gallery.length > 0 && (
                        <button
                            onClick={handleClearGallery}
                            className="btn"
                            style={{
                                background: 'transparent',
                                color: '#999',
                                border: 'none',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            Reset Gallery
                        </button>
                    )}
                </div>
            </header>

            {/* Gallery Grid or Empty State */}
            {gallery.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '80px 20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '30px',
                    border: '3px dashed #e8f5e9',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <div style={{ fontSize: '5rem', marginBottom: '20px', opacity: 0.6 }}>🌸</div>
                    <h2 style={{ color: '#558b2f', marginBottom: '15px' }}>Your garden is growing.</h2>
                    <p style={{ color: '#888', fontSize: '1.3rem', lineHeight: '1.6' }}>
                        Solve powers to see flowers here. Every correct answer creates a new card for your collection!
                    </p>
                    <button
                        onClick={() => navigate('/practice')}
                        className="btn btn-primary"
                        style={{ marginTop: '30px', padding: '15px 40px', fontSize: '1.1rem' }}
                    >
                        Grow My First Flower
                    </button>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '30px',
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {gallery.map((card) => (
                        <GardenCard
                            key={card.id}
                            image={card.image}
                            base={card.base}
                            exponent={card.exponent}
                            isCorrect={card.isCorrect}
                            correctAnswer={card.correctAnswer}
                            createdAt={card.createdAt}
                            onClick={() => setSelectedImage(card.image)}
                            onDelete={() => handleDeleteCard(card.id)}
                        />
                    ))}
                </div>
            )}

            {/* Lightbox Modal */}
            <ImageModal
                image={selectedImage}
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </div>
    );
};

export default GardenGallery;
