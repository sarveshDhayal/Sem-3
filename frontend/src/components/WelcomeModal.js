import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './WelcomeModal.css';

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    if (user) {
      return;
    }

    // Check if modal has been shown before in this session
    const hasSeenModal = sessionStorage.getItem('hasSeenWelcomeModal');
    
    if (!hasSeenModal) {
      // Show modal after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenWelcomeModal', 'true');
      }, 1000); 

      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSignup = () => {
    setIsOpen(false);
    navigate('/signup');
  };

  const handleLogin = () => {
    setIsOpen(false);
    navigate('/login');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          ✕
        </button>
        
        <div className="modal-header">
          <div className="modal-icon">🎉</div>
          <h2>Welcome to LocalConnect!</h2>
          <p className="modal-subtitle">Discover Amazing Local Events</p>
        </div>

        <div className="modal-body">
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <span>Find events near you</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📅</span>
              <span>Easy RSVP & booking</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎨</span>
              <span>Music, Tech, Sports & more</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔔</span>
              <span>Get event reminders</span>
            </div>
          </div>

          <p className="modal-cta">Join thousands discovering local events!</p>
        </div>

        <div className="modal-footer">
          <button onClick={handleSignup} className="btn btn-primary btn-large">
            Sign Up Free
          </button>
          <button onClick={handleLogin} className="btn btn-secondary btn-large">
            Login
          </button>
          <button onClick={handleClose} className="btn-text">
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
