import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { bookingsAPI, eventsAPI } from '../services/api';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingEvents: 0,
    rsvpCount: 0,
    interestedCount: 0
  });
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventBookings, setEventBookings] = useState([]);
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    location: '',
    category: 'tech',
    date: '',
    price: 0,
    image: ''
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const bookingsResponse = await bookingsAPI.getMyBookings();
      const bookings = bookingsResponse.data;

      // Calculate stats
      const now = new Date();
      const upcoming = bookings.filter(b => new Date(b.event.date) > now);
      const rsvp = bookings.filter(b => b.status === 'RSVP');
      const interested = bookings.filter(b => b.status === 'INTERESTED');

      setStats({
        totalBookings: bookings.length,
        upcomingEvents: upcoming.length,
        rsvpCount: rsvp.length,
        interestedCount: interested.length
      });

      // If organizer, fetch their events with booking counts
      if (user.role === 'ORGANIZER' || user.role === 'ADMIN') {
        const eventsResponse = await eventsAPI.getAll({ limit: 100 });
        const userEvents = eventsResponse.data.events.filter(
          e => e.organizerId === user.id
        );
        
        // Fetch bookings for each event
        const eventsWithBookings = await Promise.all(
          userEvents.map(async (event) => {
            try {
              const bookingsRes = await bookingsAPI.getEventBookings(event.id);
              const bookings = bookingsRes.data;
              return {
                ...event,
                bookings: bookings,
                rsvpCount: bookings.filter(b => b.status === 'RSVP').length,
                interestedCount: bookings.filter(b => b.status === 'INTERESTED').length,
                totalBookings: bookings.length
              };
            } catch (error) {
              return {
                ...event,
                bookings: [],
                rsvpCount: 0,
                interestedCount: 0,
                totalBookings: 0
              };
            }
          })
        );
        
        setMyEvents(eventsWithBookings);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventForm(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    // Validation
    if (!eventForm.title || !eventForm.description || !eventForm.location || !eventForm.date) {
      setFormError('Please fill in all required fields');
      return;
    }

    // Check if date is in the future
    const eventDate = new Date(eventForm.date);
    const now = new Date();
    if (eventDate < now) {
      setFormError('Event date must be in the future');
      return;
    }

    try {
      await eventsAPI.create(eventForm);
      setFormSuccess('Event created successfully!');
      
      // Reset form
      setEventForm({
        title: '',
        description: '',
        location: '',
        category: 'tech',
        date: '',
        price: 0,
        image: ''
      });
      
      // Refresh events list
      fetchUserData();
      
      // Close form after 2 seconds
      setTimeout(() => {
        setShowAddEvent(false);
        setFormSuccess('');
      }, 2000);
    } catch (error) {
      setFormError(error.response?.data?.error || 'Failed to create event');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      await eventsAPI.delete(eventId);
      setFormSuccess('Event deleted successfully!');
      fetchUserData();
      setTimeout(() => setFormSuccess(''), 3000);
    } catch (error) {
      setFormError(error.response?.data?.error || 'Failed to delete event');
      setTimeout(() => setFormError(''), 3000);
    }
  };

  const handleViewBookings = (event) => {
    setSelectedEvent(event);
    setEventBookings(event.bookings || []);
  };

  const handleCloseBookings = () => {
    setSelectedEvent(null);
    setEventBookings([]);
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="profile-info">
          <h1>{user.name}</h1>
          <p className="profile-email">{user.email}</p>
          <span className={`role-badge role-${user.role.toLowerCase()}`}>
            {user.role}
          </span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🎫</div>
          <div className="stat-value">{stats.totalBookings}</div>
          <div className="stat-label">Total Bookings</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-value">{stats.upcomingEvents}</div>
          <div className="stat-label">Upcoming Events</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{stats.rsvpCount}</div>
          <div className="stat-label">RSVP'd</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{stats.interestedCount}</div>
          <div className="stat-label">Interested</div>
        </div>
      </div>

      {(user.role === 'ORGANIZER' || user.role === 'ADMIN') && (
        <div className="organizer-section">
          <div className="organizer-header">
            <h2>My Organized Events</h2>
            <button 
              onClick={() => setShowAddEvent(!showAddEvent)} 
              className="btn btn-success"
            >
              {showAddEvent ? '✕ Cancel' : '+ Add New Event'}
            </button>
          </div>

          {formError && <div className="alert alert-error">{formError}</div>}
          {formSuccess && <div className="alert alert-success">{formSuccess}</div>}

          {showAddEvent && (
            <div className="add-event-form">
              <h3>Create New Event</h3>
              <form onSubmit={handleSubmitEvent}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Event Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={eventForm.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Tech Meetup 2026"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      name="category"
                      value={eventForm.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="tech">Tech</option>
                      <option value="music">Music</option>
                      <option value="sports">Sports</option>
                      <option value="art">Art</option>
                      <option value="workshop">Workshop</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    name="description"
                    value={eventForm.description}
                    onChange={handleInputChange}
                    placeholder="Describe your event..."
                    rows="4"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={eventForm.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Mumbai, Maharashtra"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Date & Time *</label>
                    <input
                      type="datetime-local"
                      name="date"
                      value={eventForm.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Price (₹)</label>
                    <input
                      type="number"
                      name="price"
                      value={eventForm.price}
                      onChange={handleInputChange}
                      placeholder="0 for free events"
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input
                      type="url"
                      name="image"
                      value={eventForm.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-submit">
                  Create Event
                </button>
              </form>
            </div>
          )}

          <div className="my-events-list">
            {myEvents.length === 0 ? (
              <p className="no-events-text">You haven't created any events yet.</p>
            ) : (
              <>
                <div className="events-count">
                  <span className="count-badge">{myEvents.length}</span>
                  <span>Events Created</span>
                </div>
                <div className="events-grid-profile">
                  {myEvents.map(event => (
                    <div key={event.id} className="profile-event-card">
                      {event.image && (
                        <div className="profile-event-image">
                          <img src={event.image} alt={event.title} />
                        </div>
                      )}
                      <div className="profile-event-content">
                        <span className="event-category-small">{event.category}</span>
                        <h4>{event.title}</h4>
                        <p className="event-date-small">
                          📅 {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        <p className="event-location-small">📍 {event.location}</p>
                        <p className="event-price-small">
                          {event.price === 0 ? '🎫 Free' : `💰 ₹${event.price}`}
                        </p>
                        
                        <div className="booking-stats">
                          <div className="booking-stat">
                            <span className="stat-icon">✅</span>
                            <span className="stat-text">{event.rsvpCount || 0} RSVP</span>
                          </div>
                          <div className="booking-stat">
                            <span className="stat-icon">⭐</span>
                            <span className="stat-text">{event.interestedCount || 0} Interested</span>
                          </div>
                          <div className="booking-stat total">
                            <span className="stat-icon">👥</span>
                            <span className="stat-text">{event.totalBookings || 0} Total</span>
                          </div>
                        </div>

                        <div className="event-actions-profile">
                          <button 
                            onClick={() => handleViewBookings(event)}
                            className="btn btn-primary btn-sm"
                          >
                            View Bookings
                          </button>
                          <button 
                            onClick={() => handleDeleteEvent(event.id)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="profile-actions">
        <button onClick={() => navigate('/my-bookings')} className="btn btn-primary">
          View My Bookings
        </button>
        <button onClick={() => navigate('/events')} className="btn btn-secondary">
          Browse Events
        </button>
        <button onClick={handleLogout} className="btn btn-logout">
          Logout
        </button>
      </div>

      <div className="profile-details">
        <h3>Account Details</h3>
        <div className="detail-row">
          <span className="detail-label">Member Since:</span>
          <span className="detail-value">
            {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Account Type:</span>
          <span className="detail-value">{user.role}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{user.email}</span>
        </div>
      </div>

      {/* Bookings Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={handleCloseBookings}>
          <div className="modal-content bookings-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseBookings}>✕</button>
            
            <div className="modal-header">
              <h2>{selectedEvent.title}</h2>
              <p className="modal-subtitle">Event Bookings</p>
            </div>

            <div className="bookings-summary">
              <div className="summary-card">
                <span className="summary-icon">✅</span>
                <div>
                  <span className="summary-number">{selectedEvent.rsvpCount || 0}</span>
                  <span className="summary-label">RSVP</span>
                </div>
              </div>
              <div className="summary-card">
                <span className="summary-icon">⭐</span>
                <div>
                  <span className="summary-number">{selectedEvent.interestedCount || 0}</span>
                  <span className="summary-label">Interested</span>
                </div>
              </div>
              <div className="summary-card">
                <span className="summary-icon">👥</span>
                <div>
                  <span className="summary-number">{selectedEvent.totalBookings || 0}</span>
                  <span className="summary-label">Total</span>
                </div>
              </div>
            </div>

            <div className="bookings-list">
              {eventBookings.length === 0 ? (
                <p className="no-bookings-text">No bookings yet for this event.</p>
              ) : (
                <>
                  <h3>Attendees ({eventBookings.length})</h3>
                  <div className="attendees-list">
                    {eventBookings.map((booking) => (
                      <div key={booking.id} className="attendee-card">
                        <div className="attendee-avatar">
                          {booking.user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="attendee-info">
                          <h4>{booking.user.name}</h4>
                          <p>{booking.user.email}</p>
                          <span className="booking-date">
                            Booked on {new Date(booking.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <span className={`status-badge-modal status-${booking.status.toLowerCase()}`}>
                          {booking.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
