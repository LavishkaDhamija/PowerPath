import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link> |
            <Link to="/login">Logic</Link> |
            <Link to="/register">Register</Link> |
            <Link to="/dashboard">Dashboard</Link> |
            <Link to="/practice">Practice</Link>
        </nav>
    );
}
