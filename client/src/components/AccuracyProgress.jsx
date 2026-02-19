export default function AccuracyProgress({ accuracy }) {
    const val = parseFloat(accuracy) || 0;

    let color = '#ff4757'; // Default Red (< 50)
    if (val >= 80) color = '#2ed573'; // Green
    else if (val >= 50) color = '#ffa502'; // Orange/Yellow

    return (
        <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '5px',
                fontSize: '0.9rem',
                color: '#555'
            }}>
                <span>Accuracy</span>
                <span style={{ color: color, fontWeight: 'bold' }}>{val}%</span>
            </div>

            <div className="progress-bar-container" style={{
                background: '#e0e0e0',
                borderRadius: '5px',
                height: '10px',
                width: '100%',
                overflow: 'hidden'
            }}>
                <div style={{
                    width: `${val}%`,
                    background: color,
                    height: '100%',
                    borderRadius: '5px',
                    transition: 'width 0.5s ease-in-out'
                }}></div>
            </div>
        </div>
    );
}
