import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        totalAttempts: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        accuracy: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get user from localStorage
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (savedUser && token) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);

            // Fetch stats
            const fetchStats = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/progress/${parsedUser.id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setStats(response.data);
                } catch (error) {
                    console.error('Error fetching stats:', error);
                    // Provide robust error handling later
                } finally {
                    setLoading(false);
                }
            };

            fetchStats();
        } else {
            // If no user/token, redirect to login
            navigate('/login');
        }
    }, [navigate]);

    const onLogout = () => {
        // 1. Remove token and user data
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // 2. Redirect to login
        navigate('/login');
    };

    if (loading) {
        return <div className='container'><h2>Loading dashboard...</h2></div>;
    }

    const getAccuracyColor = (accuracy) => {
        const val = parseFloat(accuracy);
        if (val >= 80) return '#2ed573'; // Green
        if (val >= 50) return '#ffa502'; // Orange/Yellow
        return '#ff4757'; // Red
    };

    const accuracyVal = stats.accuracy || 0;
    const accuracyColor = getAccuracyColor(accuracyVal);

    return (
        <div className='container'>
            <header className='dashboard-header'>
                <div>
                    <h1>Welcome, {user ? user.name : 'Student'}!</h1>
                    <p>Track your progress and improve your skills.</p>
                </div>
                <button onClick={onLogout} className='btn btn-logout'>
                    Logout
                </button>
            </header>

            <div className='stats-grid'>
                <div className='stat-card'>
                    <h3>Total Attempts</h3>
                    <p className='stat-value'>{stats.totalAttempts || 0}</p>
                </div>
                <div className='stat-card'>
                    <h3>Correct Answers</h3>
                    <p className='stat-value success'>{stats.correctAnswers || 0}</p>
                </div>
                <div className='stat-card'>
                    <h3>Wrong Answers</h3>
                    <p className='stat-value error'>{stats.wrongAnswers || 0}</p>
                </div>
                <div className='stat-card'>
                    <h3>Accuracy</h3>
                    <p className='stat-value' style={{ color: accuracyColor }}>{accuracyVal}%</p>
                    <div className="progress-bar-container" style={{
                        marginTop: '10px',
                        background: '#e0e0e0',
                        borderRadius: '5px',
                        height: '10px',
                        width: '100%',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: `${accuracyVal}%`,
                            background: accuracyColor,
                            height: '100%',
                            transition: 'width 0.5s ease-in-out'
                        }}></div>
                    </div>
                </div>
            </div>

            <div className='dashboard-actions'>
                <button
                    onClick={() => navigate('/practice')}
                    className='btn btn-primary btn-large'
                >
                    Start Practice Session
                </button>
            </div>
        </div>
    );
}
