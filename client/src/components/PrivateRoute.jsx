import { Navigate } from 'react-router-dom';

// Higher Order Component (HOC) for Route Protection
export default function PrivateRoute({ children }) {
    const token = localStorage.getItem('token');

    // If no token, redirect to Login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the child component (Dashboard/Practice)
    return children;
}
