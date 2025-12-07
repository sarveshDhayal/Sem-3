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
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          LocalConnect
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/events">Events</Link></li>
          {user && (
            <li>
              <Link to="/my-bookings" className="bookings-link">
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
                <Link to="/profile" className="profile-link">
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
              <li><Link to="/login" className="btn btn-primary">Login</Link></li>
              <li><Link to="/signup" className="btn btn-success">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
