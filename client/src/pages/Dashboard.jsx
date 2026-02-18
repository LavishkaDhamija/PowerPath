import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get user from localStorage
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
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

    return (
        <div className='container'>
            <h1>Welcome to Dashboard</h1>
            {user && <h2>Hello, {user.name}!</h2>}

            <p>This is your protected student area.</p>

            <button onClick={onLogout} className='btn'>
                Logout
            </button>
        </div>
    );
}
