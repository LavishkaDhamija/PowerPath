import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="container" style={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            animation: 'fadeIn 1.5s ease-in-out'
        }}>
            {/* 1) Big Heading */}
            <h1 style={{
                fontSize: '3.5rem',
                marginBottom: '20px',
                color: 'var(--primary-dark)',
                textShadow: '2px 2px 4px rgba(0,0,0,0.05)'
            }}>
                Empowering Every Unique Mind
            </h1>

            {/* 2) Short empowering paragraph */}
            <p style={{
                fontSize: '1.4rem',
                maxWidth: '600px',
                marginBottom: '50px',
                lineHeight: '1.8'
            }}>
                A calm, predictable space where learning happens at your own pace.
                Build confidence through clear steps, gentle feedback, and mastery without pressure.
            </p>

            {/* 3) Two Large Buttons */}
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
                <button
                    onClick={() => window.open("https://autism-project-three.vercel.app/", "_blank", "noopener,noreferrer")}
                    aria-label="Open Lab 1 in a new tab"
                    style={{
                        padding: '20px 50px',
                        fontSize: '1.5rem',
                        borderRadius: '15px',
                        background: 'var(--success-soft)',
                        color: 'var(--success-text)',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                    }}
                >
                    LAB 1
                </button>

                <button
                    onClick={() => navigate('/login')}
                    aria-label="Start Lab 2 Power Path Learning"
                    style={{
                        padding: '20px 50px',
                        fontSize: '1.5rem',
                        borderRadius: '15px',
                        background: 'var(--primary-soft)',
                        color: '#1a3b5c',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                    }}
                >
                    LAB 2 (PowerPath)
                </button>
            </div>

            {/* 4) Calm Learning Preview */}
            <div style={{
                marginTop: '20px',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '12px',
                maxWidth: '500px'
            }}>
                <h3 style={{ color: '#444', marginBottom: '10px', fontSize: '1.2rem' }}>In LAB 2, you will practice:</h3>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem', color: '#555' }}>
                    <li style={{ marginBottom: '8px' }}>✨ Understanding Powers and Exponents</li>
                    <li>🌱 Growing your skills step-by-step</li>
                </ul>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
