import React, { useEffect } from 'react';

const ImageModal = ({ image, isOpen, onClose }) => {
    // Handle Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            // Prevent scrolling on body when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.8)',
                backdropFilter: 'blur(5px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2000,
                animation: 'modalFadeIn 0.3s ease-out'
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
                style={{
                    position: 'relative',
                    maxWidth: '90%',
                    maxHeight: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    animation: 'imageZoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '-50px',
                        right: '0',
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        fontSize: '2.5rem',
                        cursor: 'pointer',
                        padding: '10px',
                        lineHeight: 1
                    }}
                    aria-label="Close image"
                >
                    &times;
                </button>

                {/* Actual Image */}
                <img
                    src={image}
                    alt="Enlarged Garden Card"
                    style={{
                        maxWidth: '100%',
                        maxHeight: '80vh',
                        borderRadius: '24px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                        backgroundColor: '#fff',
                        border: '8px solid white'
                    }}
                />

                {/* Optional: Prompt to click outside */}
                <p style={{ color: '#ccc', marginTop: '20px', fontSize: '1rem' }}>
                    Click anywhere outside to go back
                </p>
            </div>

            <style>{`
                @keyframes modalFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes imageZoomIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default ImageModal;
