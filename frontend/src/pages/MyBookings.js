import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingsAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { getEventUrgency, formatEventDate } from '../utils/dateUtils';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingsAPI.getMyBookings();
      console.log('Bookings:', response.data);
      setBookings(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (eventId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await bookingsAPI.cancel(eventId);
      setBookings(bookings.filter(b => b.eventId !== eventId));
    } catch (err) {
      setError('Failed to cancel booking');
    }
  };

  if (loading) {
    return <div className="loading">Loading your bookings...</div>;
  }

  return (
    <div className="bookings-container">
      <h1>My Bookings</h1>

      {error && <div className="alert alert-error">{error}</div>}

      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>You haven't booked any events yet.</p>
          <button onClick={() => navigate('/events')} className="btn btn-primary">
            Browse Events
          </button>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => {
            const urgency = getEventUrgency(booking.event.date);
            return (
              <div key={booking.id} className="booking-card">
                {booking.event.image && (
                  <div className="booking-image">
                    <img src={booking.event.image} alt={booking.event.title} />
                    {urgency.message && (
                      <div className={`urgency-badge urgency-${urgency.type}`}>
                        {urgency.message}
                      </div>
                    )}
                  </div>
                )}
                <div className="booking-content">
                  <div className="booking-status">
                    <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                    {urgency.type === 'today' && (
                      <span className="reminder-text">🔔 Event is TODAY!</span>
                    )}
                    {urgency.type === 'tomorrow' && (
                      <span className="reminder-text">⏰ Event is TOMORROW!</span>
                    )}
                  </div>
                  <h3>{booking.event.title}</h3>
                  <p className="booking-description">{booking.event.description}</p>
                  <div className="booking-details">
                    <p>📍 {booking.event.location}</p>
                    <p>📅 {formatEventDate(booking.event.date)}</p>
                    <p>💰 {booking.event.price === 0 ? 'Free' : `₹${booking.event.price}`}</p>
                    <p>👤 Organized by {booking.event.organizer.name}</p>
                  </div>
                  {urgency.type !== 'passed' && (
                    <div className="booking-actions">
                      <button
                        onClick={() => handleCancel(booking.eventId)}
                        className="btn btn-secondary"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
