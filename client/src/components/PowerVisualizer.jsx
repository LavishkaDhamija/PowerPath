import { useEffect, useState } from 'react';

export default function PowerVisualizer({ base, exponent, slowMode = true }) {
    const [elements, setElements] = useState([]);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        // Reset result when base/exponent changes
        setShowResult(false);

        // Calculate total items (e.g., 2^3 = 8 items)
        const total = Math.pow(base, exponent);
        const newElements = Array.from({ length: total }, (_, i) => i);
        setElements(newElements);

        // Calculate Delay based on Mode
        // Standard: 200ms per block
        // Slow: 500ms per block
        const perBlockDelay = slowMode ? 500 : 200;

        // Total animation time = (total blocks * perBlockDelay) + buffer
        // Note: We use 'exponent' for the multiplication view, but 'total' was for grid view.
        // For the multiplication view loop:
        const delay = (exponent * perBlockDelay) + 500;

        const timer = setTimeout(() => {
            setShowResult(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [base, exponent, slowMode]);

    return (
        <div className="visualizer-container" style={{
            margin: '20px auto',
            padding: '20px',
            border: '2px dashed #ddd',
            borderRadius: '10px',
            backgroundColor: '#fafafa',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h3 style={{ marginBottom: '15px', color: '#555' }}>
                Visualizing: {base} to the power of {exponent}
            </h3>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '15px'
            }}>
                {Array.from({ length: exponent }).map((_, i) => (
                    <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        animation: `fadeInUp 0.5s ease forwards`,
                        // Dynamic Delay
                        animationDelay: `${i * (slowMode ? 0.5 : 0.2)}s`,
                        opacity: 0,
                        transform: 'translateY(10px)'
                    }}>
                        <style>
                            {`
                                @keyframes fadeInUp {
                                    from { opacity: 0; transform: translateY(10px); }
                                    to { opacity: 1; transform: translateY(0); }
                                }
                            `}
                        </style>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            backgroundColor: '#e3f2fd',
                            border: '2px solid #90caf9',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            color: '#1565c0'
                        }}>
                            {base}
                        </div>
                        {i < exponent - 1 && (
                            <span style={{ fontSize: '1.5rem', color: '#888' }}>×</span>
                        )}
                    </div>
                ))}
            </div>

            <div style={{
                marginTop: '20px',
                height: '40px', // Reserve space to avoid layout jump
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {showResult && (
                    <div style={{
                        fontSize: '1.8rem',
                        fontWeight: 'bold',
                        color: '#2e7d32',
                        animation: 'fadeIn 0.5s ease-in'
                    }}>
                        = {Math.pow(base, exponent)}
                    </div>
                )}
            </div>

            <p style={{ marginTop: '15px', color: '#888' }}>
                Total Items: {elements.length}
            </p>
        </div>
    );
}
