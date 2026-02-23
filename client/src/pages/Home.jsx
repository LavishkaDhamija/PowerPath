import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div style={{ background: '#ffffff', minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif" }}>

            {/* ───── Navbar ───── */}
            <nav style={{
                background: '#dce8f5',
                padding: '0 40px',
                height: '60px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                {/* Brand */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                }}>
                    <span style={{ fontSize: '1.4rem' }}>🧩</span>
                    <span style={{
                        fontSize: '1.1rem',
                        fontWeight: 800,
                        color: '#2c3e50',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                    }}>
                        Autism Learning Hub
                    </span>
                </div>

                {/* Nav Links */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '28px',
                }}>
                    <a href="#about" style={{
                        textDecoration: 'none',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: '#3a4a5c',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                    }}>About</a>
                    <a href="#labs" style={{
                        textDecoration: 'none',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: '#3a4a5c',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                    }}>Labs</a>
                    <a href="#resources" style={{
                        textDecoration: 'none',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: '#3a4a5c',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                    }}>Resources</a>
                </div>
            </nav>

            {/* ───── Hero Section ───── */}
            <section style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '60px 40px 40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '40px',
                flexWrap: 'wrap',
                position: 'relative',
            }}>
                {/* Left Content */}
                <div style={{ maxWidth: '520px', flex: '1 1 400px' }}>
                    <h1 style={{
                        fontSize: '3.2rem',
                        fontWeight: 800,
                        color: '#1a1a2e',
                        lineHeight: 1.15,
                        margin: '0 0 20px 0',
                        fontFamily: "'Georgia', serif",
                        fontStyle: 'italic',
                    }}>
                        The path to{' '}
                        <span style={{
                            backgroundImage: 'linear-gradient(to top, #fef08a 40%, transparent 40%)',
                            padding: '0 4px',
                        }}>brighter learning</span>
                        {' '}starts here.
                    </h1>

                    <p style={{
                        fontSize: '1.05rem',
                        lineHeight: 1.7,
                        color: '#555',
                        margin: '0 0 32px 0',
                        maxWidth: '420px',
                        fontStyle: 'italic',
                    }}>
                        A calm, structured space designed for children on the autism spectrum.
                        Learn at your own pace through interactive labs, gentle feedback,
                        and step-by-step mastery — no pressure, just progress.
                    </p>

                    <button
                        onClick={() => {
                            const el = document.getElementById('labs');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{
                            padding: '14px 36px',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: '#ffffff',
                            background: '#f4845f',
                            border: 'none',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: 'none',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(244,132,95,0.35)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        Explore Labs
                    </button>
                </div>

                {/* Right — Hero Image */}
                <div style={{
                    flex: '1 1 380px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                }}>
                    {/* Decorative sage asterisk */}
                    <div style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '40%',
                        fontSize: '2.5rem',
                        color: '#c5d5a0',
                        opacity: 0.7,
                        transform: 'rotate(15deg)',
                        pointerEvents: 'none',
                    }}>✻</div>

                    {/* Image with rounded container */}
                    <div style={{
                        width: '400px',
                        height: '400px',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        background: '#f9f9f9',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                    }}>
                        <img
                            src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=600&fit=crop&crop=face"
                            alt="Happy child with colorful painted hands"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>





                </div>

                {/* Decorative blue arc */}
                <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '60px',
                    width: '70px',
                    height: '35px',
                    borderRadius: '0 0 50px 50px',
                    border: '6px solid #b8d4f0',
                    borderTop: 'none',
                    opacity: 0.5,
                    pointerEvents: 'none',
                }} />
            </section>

            {/* ───── Mission & Philosophy Section ───── */}
            <section style={{
                background: '#eef2f7',
                padding: '80px 40px',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Wavy top edge */}
                <div style={{
                    position: 'absolute',
                    top: '-1px',
                    left: 0,
                    right: 0,
                    height: '40px',
                    overflow: 'hidden',
                }}>
                    <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
                        <path d="M0,40 C360,0 720,40 1080,10 C1260,0 1380,20 1440,40 L1440,0 L0,0 Z" fill="#ffffff" />
                    </svg>
                </div>

                <div style={{
                    maxWidth: '1100px',
                    margin: '0 auto',
                    textAlign: 'center',
                }}>
                    <span style={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: '#b0956e',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        marginBottom: '8px',
                        display: 'block',
                    }}>Our Approach</span>

                    <h2 style={{
                        fontSize: '2.2rem',
                        fontWeight: 800,
                        color: '#1a1a2e',
                        fontFamily: "'Georgia', serif",
                        margin: '0 0 12px 0',
                        lineHeight: 1.25,
                    }}>
                        We Meet Kids At Their Level,<br />Regardless Of Their Pace
                    </h2>

                    <p style={{
                        fontSize: '0.95rem',
                        color: '#777',
                        maxWidth: '560px',
                        margin: '0 auto 50px',
                        lineHeight: 1.7,
                    }}>
                        Every child on the autism spectrum learns differently. Our interactive labs adapt to
                        each child's unique needs with patience, structure, and joy.
                    </p>

                    {/* Cards Row */}
                    <div style={{
                        display: 'flex',
                        gap: '28px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}>
                        {/* Card 1 — Structured */}
                        <div style={{
                            flex: '1 1 260px',
                            maxWidth: '320px',
                            background: '#f8d7dc',
                            borderRadius: '32px 32px 48px 48px',
                            padding: '36px 28px 32px',
                            textAlign: 'center',
                            transition: 'transform 0.3s ease',
                        }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{
                                width: '130px',
                                height: '130px',
                                borderRadius: '50%',
                                background: '#ffffff',
                                margin: '0 auto 20px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                                border: '4px solid rgba(255,255,255,0.6)',
                                padding: '18px',
                            }}>
                                <svg viewBox="0 0 100 100" width="80" height="80">
                                    <path d="M10,10 L40,10 L40,20 C35,20 32,24 32,28 C32,32 35,36 40,36 L40,45 L10,45 Z" fill="#d4a0a0" stroke="#c29090" strokeWidth="1" />
                                    <path d="M45,10 L75,10 L75,45 L65,45 C65,40 61,37 57,37 C53,37 49,40 49,45 L45,45 L45,36 C50,36 53,32 53,28 C53,24 50,20 45,20 Z" fill="#9ab8d4" stroke="#8aa8c4" strokeWidth="1" />
                                    <path d="M45,50 L49,50 C49,55 53,58 57,58 C61,58 65,55 65,50 L75,50 L75,85 L45,85 Z" fill="#e0d4a0" stroke="#d0c490" strokeWidth="1" />
                                    <path d="M10,50 L40,50 L40,85 L10,85 Z" fill="#a0c4b8" stroke="#90b4a8" strokeWidth="1" />
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2c2c2c', margin: '0 0 6px 0', fontFamily: "'Georgia', serif" }}>
                                Structured & Predictable
                            </h3>
                            <p style={{ fontSize: '0.82rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                                Clear routines and consistent layouts that reduce anxiety and build confidence.
                            </p>
                        </div>

                        {/* Card 2 — Sensory */}
                        <div style={{
                            flex: '1 1 260px',
                            maxWidth: '320px',
                            background: '#d4eef7',
                            borderRadius: '32px 32px 48px 48px',
                            padding: '36px 28px 32px',
                            textAlign: 'center',
                            transition: 'transform 0.3s ease',
                        }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{
                                width: '130px',
                                height: '130px',
                                borderRadius: '50%',
                                background: '#ffffff',
                                margin: '0 auto 20px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                                border: '4px solid rgba(255,255,255,0.6)',
                                padding: '18px',
                            }}>
                                <svg viewBox="0 0 100 100" width="80" height="80">
                                    <ellipse cx="48" cy="52" rx="38" ry="32" fill="#c9a96e" stroke="#b8955a" strokeWidth="1.5" transform="rotate(-10, 48, 52)" />
                                    <ellipse cx="62" cy="62" rx="7" ry="6" fill="#faf9f6" transform="rotate(-10, 62, 62)" />
                                    <circle cx="28" cy="48" r="6" fill="#8fb0be" />
                                    <circle cx="36" cy="60" r="5.5" fill="#d4a0a0" />
                                    <circle cx="42" cy="42" r="5" fill="#a8c4a0" />
                                    <circle cx="52" cy="38" r="4.5" fill="#dcd0a0" />
                                    <circle cx="48" cy="66" r="4" fill="#f0ebe0" />
                                    <line x1="55" y1="25" x2="78" y2="8" stroke="#8b6f47" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="48" y1="28" x2="68" y2="5" stroke="#6b5035" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2c2c2c', margin: '0 0 6px 0', fontFamily: "'Georgia', serif" }}>
                                Sensory-Friendly Design
                            </h3>
                            <p style={{ fontSize: '0.82rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                                Calm colors, gentle animations, and distraction-free interfaces for sensory comfort.
                            </p>
                        </div>

                        {/* Card 3 — Growth */}
                        <div style={{
                            flex: '1 1 260px',
                            maxWidth: '320px',
                            background: '#dae8c8',
                            borderRadius: '32px 32px 48px 48px',
                            padding: '36px 28px 32px',
                            textAlign: 'center',
                            transition: 'transform 0.3s ease',
                        }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{
                                width: '130px',
                                height: '130px',
                                borderRadius: '50%',
                                background: '#ffffff',
                                margin: '0 auto 20px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                                border: '4px solid rgba(255,255,255,0.6)',
                                padding: '18px',
                            }}>
                                <svg viewBox="0 0 100 100" width="80" height="80">
                                    <path d="M30,25 C20,15 35,5 50,15 C65,5 80,15 70,30 C85,40 80,60 65,60 C65,75 45,80 35,65 C20,70 15,50 25,40 C15,35 20,25 30,25 Z" fill="#c5d5a0" opacity="0.6" />
                                    <path d="M50,85 C50,85 48,60 50,45" stroke="#2c3e2c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                                    <path d="M50,60 C45,55 38,52 32,55" stroke="#2c3e2c" strokeWidth="2" fill="none" strokeLinecap="round" />
                                    <path d="M50,50 C55,45 62,43 68,46" stroke="#2c3e2c" strokeWidth="2" fill="none" strokeLinecap="round" />
                                    <ellipse cx="28" cy="52" rx="10" ry="6" fill="none" stroke="#2c3e2c" strokeWidth="2" transform="rotate(-20, 28, 52)" />
                                    <ellipse cx="72" cy="42" rx="10" ry="6" fill="none" stroke="#2c3e2c" strokeWidth="2" transform="rotate(15, 72, 42)" />
                                    <ellipse cx="45" cy="38" rx="9" ry="5.5" fill="none" stroke="#2c3e2c" strokeWidth="2" transform="rotate(-30, 45, 38)" />
                                    <ellipse cx="56" cy="32" rx="9" ry="5.5" fill="none" stroke="#2c3e2c" strokeWidth="2" transform="rotate(20, 56, 32)" />
                                    <ellipse cx="50" cy="22" rx="8" ry="5" fill="none" stroke="#2c3e2c" strokeWidth="2" transform="rotate(-5, 50, 22)" />
                                    <path d="M50,45 C50,38 48,30 50,22" stroke="#2c3e2c" strokeWidth="2" fill="none" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2c2c2c', margin: '0 0 6px 0', fontFamily: "'Georgia', serif" }}>
                                Step-by-Step Growth
                            </h3>
                            <p style={{ fontSize: '0.82rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                                Learn at your own pace with gentle feedback — small wins that build into big growth.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Wavy bottom edge */}
                <div style={{
                    position: 'absolute',
                    bottom: '-1px',
                    left: 0,
                    right: 0,
                    height: '40px',
                    overflow: 'hidden',
                }}>
                    <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
                        <path d="M0,0 C240,40 480,0 720,30 C960,10 1200,40 1440,0 L1440,40 L0,40 Z" fill="#ffffff" />
                    </svg>
                </div>
            </section>

            <section id="labs" style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '80px 40px',
            }}>

                {/* Section Heading */}
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h2 style={{
                        fontSize: '2.2rem',
                        fontWeight: 800,
                        color: '#1a1a2e',
                        fontFamily: "'Georgia', serif",
                        fontStyle: 'italic',
                        margin: '0 0 12px 0',
                    }}>
                        Choose Your Lab
                    </h2>
                    <p style={{
                        fontSize: '1rem',
                        color: '#777',
                        maxWidth: '500px',
                        margin: '0 auto',
                        fontStyle: 'italic',
                    }}>
                        Two interactive learning experiences designed with care
                    </p>
                </div>

                {/* Lab Cards */}
                <div style={{
                    display: 'flex',
                    gap: '32px',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                }}>
                    {/* Lab 1 Card */}
                    <div
                        onClick={() => window.open("https://autism-project-three.vercel.app/", "_blank", "noopener,noreferrer")}
                        style={{
                            flex: '1 1 340px',
                            maxWidth: '420px',
                            background: '#fff',
                            borderRadius: '20px',
                            border: '2px solid #e8e8e8',
                            padding: '40px 32px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
                            e.currentTarget.style.borderColor = '#dce8f5';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderColor = '#e8e8e8';
                        }}
                    >
                        {/* Accent bar */}
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0,
                            height: '4px',
                            background: 'linear-gradient(90deg, #dce8f5, #b8d4f0)',
                        }} />

                        <div style={{
                            width: '56px', height: '56px',
                            borderRadius: '16px',
                            background: '#dce8f5',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '1.6rem',
                            marginBottom: '20px',
                        }}>
                            🎭
                        </div>

                        <h3 style={{
                            fontSize: '1.4rem',
                            fontWeight: 700,
                            color: '#1a1a2e',
                            margin: '0 0 8px 0',
                        }}>Lab 1 — Social Skills</h3>

                        <p style={{
                            fontSize: '0.92rem',
                            color: '#777',
                            lineHeight: 1.6,
                            margin: '0 0 24px 0',
                        }}>
                            Practice real-world social situations through interactive scenarios.
                            Build confidence in communication and understanding emotions.
                        </p>

                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: '#4a7ab5',
                            letterSpacing: '0.04em',
                        }}>
                            Open Lab 1 →
                        </span>
                    </div>

                    {/* Lab 2 Card */}
                    <div
                        onClick={() => navigate('/login')}
                        style={{
                            flex: '1 1 340px',
                            maxWidth: '420px',
                            background: '#fff',
                            borderRadius: '20px',
                            border: '2px solid #e8e8e8',
                            padding: '40px 32px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
                            e.currentTarget.style.borderColor = '#d4edda';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderColor = '#e8e8e8';
                        }}
                    >
                        {/* Accent bar */}
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0,
                            height: '4px',
                            background: 'linear-gradient(90deg, #d4edda, #a3d9a5)',
                        }} />

                        <div style={{
                            width: '56px', height: '56px',
                            borderRadius: '16px',
                            background: '#d4edda',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '1.6rem',
                            marginBottom: '20px',
                        }}>
                            🌱
                        </div>

                        <h3 style={{
                            fontSize: '1.4rem',
                            fontWeight: 700,
                            color: '#1a1a2e',
                            margin: '0 0 8px 0',
                        }}>Lab 2 — PowerGarden</h3>

                        <p style={{
                            fontSize: '0.92rem',
                            color: '#777',
                            lineHeight: 1.6,
                            margin: '0 0 24px 0',
                        }}>
                            Master exponents and powers through a hands-on garden experience.
                            Drag seeds, grow plants, and learn math visually.
                        </p>

                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: '#2e7d32',
                            letterSpacing: '0.04em',
                        }}>
                            Open Lab 2 →
                        </span>
                    </div>
                </div>
            </section>

            {/* ───── Footer ───── */}
            <footer style={{
                textAlign: 'center',
                padding: '60px 40px 40px',
                borderTop: '1px solid #f0f0f0',
                background: '#fafafa',
            }}>
                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                    <div style={{
                        textAlign: 'center',
                        color: '#666',
                        fontSize: '0.88rem',
                        lineHeight: '1.6'
                    }}>
                        <h4 style={{
                            fontSize: '0.9rem',
                            color: '#1a1a2e',
                            marginBottom: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em'
                        }}>Course Evaluation Details</h4>
                        <p style={{ margin: '2px 0' }}><strong>Course Code:</strong> 23CSE461 — Full Stack Evaluation 2</p>
                        <p style={{ margin: '2px 0' }}><strong>Course Teacher:</strong> Dr.T.Senthil Kumar, Professor</p>
                        <p style={{ margin: '2px 0' }}>Amrita School of Computing, Amrita Vishwa Vidyapeetham</p>
                        <p style={{ margin: '2px 0' }}>Coimbatore - 641112</p>
                        <p style={{ margin: '8px 0 0' }}>
                            <a href="mailto:t_senthilkumar@cb.amrita.edu" style={{
                                color: '#a8bfb0',
                                textDecoration: 'none',
                                fontWeight: 600
                            }}>t_senthilkumar@cb.amrita.edu</a>
                        </p>
                    </div>

                    <div style={{
                        color: '#bbb',
                        fontSize: '0.78rem',
                        marginTop: '20px',
                        letterSpacing: '0.02em'
                    }}>
                        Made with 💛 for every unique learner
                    </div>
                </div>
            </footer>
        </div >
    );
}
