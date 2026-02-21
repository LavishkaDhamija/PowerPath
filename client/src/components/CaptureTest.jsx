import React, { useState } from 'react';
import { ScreenCapture } from 'react-screen-capture';

const CaptureTest = () => {
    const [screenCapture, setScreenCapture] = useState('');

    const handleScreenCapture = (screenCapture) => {
        setScreenCapture(screenCapture);
        console.log('Capture Successful! Data URL length:', screenCapture.length);
    };

    const handleSave = () => {
        const link = document.createElement('a');
        link.download = 'capture_test.png';
        link.href = screenCapture;
        link.click();
    };

    return (
        <ScreenCapture onEndCapture={handleScreenCapture}>
            {({ onStartCapture }) => (
                <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', margin: '20px' }}>
                    <h2>Screen Capture Test</h2>
                    <p>This is a temporary component to verify the library works.</p>
                    <button onClick={onStartCapture} className="btn">Start Test Capture</button>

                    {screenCapture && (
                        <div style={{ marginTop: '20px' }}>
                            <p>Preview:</p>
                            <img src={screenCapture} alt="screen capture" style={{ width: '200px', border: '1px solid #ddd' }} />
                            <button onClick={handleSave} className="btn" style={{ marginLeft: '10px' }}>Save Image</button>
                        </div>
                    )}
                </div>
            )}
        </ScreenCapture>
    );
};

export default CaptureTest;
