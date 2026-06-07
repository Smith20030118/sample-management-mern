import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <h1>📦 Sample Management System</h1>
      </Link>
      <div className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/samples">Samples</Link>
        {user?.role === 'admin' && <Link to="/users">Users</Link>}
        <span>{user?.name}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;