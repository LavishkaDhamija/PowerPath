import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '15px' }}>
                <Link to="/">Home</Link> |
                <Link to="/login">Login</Link> |
                <Link to="/register">Register</Link> |
                <Link to="/dashboard">Dashboard</Link> |
                <Link to="/practice">Practice</Link> |
                <Link to="/gallery">Gallery</Link>
            </div>

            <button
                onClick={() => setDarkMode(!darkMode)}
                style={{
                    padding: '5px 10px',
                    fontSize: '0.9rem',
                    background: 'transparent',
                    border: '1px solid #aaa',
                    color: 'inherit'
                }}
                aria-label="Toggle Dark Mode"
            >
                {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
        </nav>
    );
}
