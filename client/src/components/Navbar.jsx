import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    // Check login state
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try { setUser(JSON.parse(savedUser)); } catch { setUser(null); }
        } else {
            setUser(null);
        }
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setMenuOpen(false);
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    // Logged-in center links
    const navLinks = [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/practice', label: 'Practice' },
        { to: '/gallery', label: 'Gallery' },
    ];

    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            padding: '10px 20px',
            background: '#ffffff',
        }}>
            {/* Main bar inside a rounded container */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                background: '#ffffff',
                border: '2.5px solid #a3b899',
                borderRadius: '20px',
                padding: '0 24px',
                height: '56px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                {/* Left — Brand */}
                <Link
                    to={user ? '/dashboard' : '/'}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        textDecoration: 'none',
                    }}
                    onClick={() => setMenuOpen(false)}
                >
                    <span style={{
                        fontSize: '1.5rem',
                        lineHeight: 1,
                    }}>
                        🌿
                    </span>
                    <span style={{
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: '#2e7d32',
                        letterSpacing: '-0.02em',
                    }}>
                        PowerGarden
                    </span>
                </Link>

                {/* Center — Nav links (only when logged in, desktop) */}
                {user && (
                    <div className="nav-desktop" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                    }}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                style={{
                                    textDecoration: 'none',
                                    padding: '7px 16px',
                                    borderRadius: '10px',
                                    fontSize: '0.88rem',
                                    fontWeight: 600,
                                    color: isActive(link.to) ? '#2e7d32' : '#777',
                                    background: isActive(link.to)
                                        ? '#e8f5e9'
                                        : 'transparent',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseOver={(e) => {
                                    if (!isActive(link.to)) {
                                        e.currentTarget.style.color = '#2e7d32';
                                        e.currentTarget.style.background = '#f5f5f5';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (!isActive(link.to)) {
                                        e.currentTarget.style.color = '#777';
                                        e.currentTarget.style.background = 'transparent';
                                    }
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Right — Auth actions (desktop) */}
                <div className="nav-desktop" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    {!user ? (
                        <>
                            <Link
                                to="/login"
                                style={{
                                    textDecoration: 'none',
                                    fontSize: '0.88rem',
                                    fontWeight: 600,
                                    color: '#555',
                                    padding: '7px 16px',
                                    borderRadius: '10px',
                                    transition: 'color 0.2s',
                                }}
                                onMouseOver={(e) => e.currentTarget.style.color = '#2e7d32'}
                                onMouseOut={(e) => e.currentTarget.style.color = '#555'}
                            >
                                Log in
                            </Link>
                            <Link
                                to="/register"
                                style={{
                                    textDecoration: 'none',
                                    fontSize: '0.88rem',
                                    fontWeight: 600,
                                    color: '#333',
                                    padding: '7px 18px',
                                    borderRadius: '10px',
                                    border: '1.5px solid #333',
                                    transition: 'all 0.2s',
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.background = '#2e7d32';
                                    e.currentTarget.style.color = '#fff';
                                    e.currentTarget.style.borderColor = '#2e7d32';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = '#333';
                                    e.currentTarget.style.borderColor = '#333';
                                }}
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            {/* User name */}
                            <span style={{
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                color: '#666',
                                marginRight: '4px',
                            }}>
                                {user.name || 'Student'}
                            </span>
                            <button
                                onClick={handleLogout}
                                style={{
                                    padding: '7px 16px',
                                    borderRadius: '10px',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    color: '#c62828',
                                    background: 'transparent',
                                    border: '1.5px solid rgba(198, 40, 40, 0.25)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: 'none',
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.background = '#ffebee';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                }}
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="nav-hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        padding: '8px',
                        cursor: 'pointer',
                        flexDirection: 'column',
                        gap: '5px',
                        boxShadow: 'none',
                    }}
                    aria-label="Toggle menu"
                >
                    <span style={{
                        display: 'block', width: '20px', height: '2px',
                        background: '#333', borderRadius: '2px',
                        transition: 'all 0.3s ease',
                        transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
                    }} />
                    <span style={{
                        display: 'block', width: '20px', height: '2px',
                        background: '#333', borderRadius: '2px',
                        transition: 'all 0.3s ease',
                        opacity: menuOpen ? 0 : 1,
                    }} />
                    <span style={{
                        display: 'block', width: '20px', height: '2px',
                        background: '#333', borderRadius: '2px',
                        transition: 'all 0.3s ease',
                        transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
                    }} />
                </button>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div
                    className="nav-mobile-menu"
                    style={{
                        maxWidth: '1200px',
                        margin: '8px auto 0',
                        background: '#ffffff',
                        border: '1.5px solid #e0e0e0',
                        borderRadius: '14px',
                        padding: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        animation: 'slideDown 0.2s ease-out',
                    }}
                >
                    {!user ? (
                        <>
                            <Link to="/login" onClick={() => setMenuOpen(false)}
                                style={{
                                    textDecoration: 'none', padding: '12px 16px',
                                    borderRadius: '10px', fontSize: '0.95rem',
                                    fontWeight: 600, color: '#555',
                                }}>
                                Log in
                            </Link>
                            <Link to="/register" onClick={() => setMenuOpen(false)}
                                style={{
                                    textDecoration: 'none', padding: '12px 16px',
                                    borderRadius: '10px', fontSize: '0.95rem',
                                    fontWeight: 600, color: '#2e7d32',
                                }}>
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setMenuOpen(false)}
                                    style={{
                                        textDecoration: 'none',
                                        padding: '12px 16px',
                                        borderRadius: '10px',
                                        fontSize: '0.95rem',
                                        fontWeight: 600,
                                        color: isActive(link.to) ? '#2e7d32' : '#666',
                                        background: isActive(link.to) ? '#e8f5e9' : 'transparent',
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <button
                                onClick={handleLogout}
                                style={{
                                    marginTop: '4px',
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    fontSize: '0.95rem',
                                    fontWeight: 600,
                                    color: '#c62828',
                                    background: '#ffebee',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    boxShadow: 'none',
                                }}
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
