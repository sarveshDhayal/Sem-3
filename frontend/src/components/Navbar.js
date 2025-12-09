import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { bookingsAPI } from '../services/api';
import { isEventSoon } from '../utils/dateUtils';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUpcomingEvents();
    }
  }, [user]);

  const fetchUpcomingEvents = async () => {
    try {
      const response = await bookingsAPI.getMyBookings();
      const upcoming = response.data.filter(booking => 
        isEventSoon(booking.event.date)
      );
      setUpcomingCount(upcoming.length);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          LocalConnect
        </Link>
        <button className="navbar-toggle" onClick={toggleMenu}>
          {menuOpen ? '✕' : '☰'}
        </button>
        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/events" onClick={closeMenu}>Events</Link></li>
          {user && (
            <li>
              <Link to="/my-bookings" className="bookings-link" onClick={closeMenu}>
                My Bookings
                {upcomingCount > 0 && (
                  <span className="notification-badge">{upcomingCount}</span>
                )}
              </Link>
            </li>
          )}
          {user ? (
            <>
              <li>
                <Link to="/profile" className="profile-link" onClick={closeMenu}>
                  <div className="user-avatar-small">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="user-name-nav">{user.name}</span>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="btn btn-primary" onClick={closeMenu}>Login</Link></li>
              <li><Link to="/signup" className="btn btn-success" onClick={closeMenu}>Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
