import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { eventsAPI } from '../services/api';
import './Home.css';

const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  const fetchUpcomingEvents = async () => {
    try {
      const response = await eventsAPI.getAll({ 
        limit: 100, 
        sortBy: 'date', 
        order: 'asc' 
      });
      
      // Filter to show only upcoming events (after current date)
      const now = new Date();
      const upcoming = response.data.events
        .filter(event => new Date(event.date) >= now)
        .slice(0, 6); // Take only first 6 upcoming events
      
      setUpcomingEvents(upcoming);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to LocalConnect</h1>
        <p>Discover and attend amazing local events in your area</p>
        <div className="hero-buttons">
          <Link to="/events" className="btn btn-primary">Browse All Events</Link>
          <Link to="/signup" className="btn btn-success">Get Started</Link>
        </div>
      </div>

      <div className="upcoming-section">
        <h2>🎉 Upcoming Events</h2>
        {loading ? (
          <div className="loading-events">Loading events...</div>
        ) : upcomingEvents.length > 0 ? (
          <div className="upcoming-events-grid">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="home-event-card" onClick={() => navigate('/events')}>
                {event.image && (
                  <div className="home-event-image">
                    <img src={event.image} alt={event.title} />
                  </div>
                )}
                <div className="home-event-content">
                  <div className="event-category-badge">{event.category}</div>
                  <h3>{event.title}</h3>
                  <p className="event-desc">{event.description.substring(0, 100)}...</p>
                  <div className="event-info">
                    <p>📍 {event.location}</p>
                    <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                    <p className="event-price">
                      {event.price === 0 ? '🎫 Free' : `💰 ₹${event.price}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-events-home">No upcoming events at the moment.</p>
        )}
        <div className="view-all-btn">
          <Link to="/events" className="btn btn-primary">View All Events →</Link>
        </div>
      </div>
      
      <div className="organizer-section">
        <div className="organizer-content">
          <div className="organizer-text">
            <h2>For Organizers</h2>
            <p className="organizer-subtitle">Create and manage your events effortlessly</p>
            <div className="organizer-features">
              <div className="organizer-feature">
                <span className="feature-icon-large">✨</span>
                <div>
                  <h4>Easy Event Creation</h4>
                  <p>Create events in minutes with our intuitive interface</p>
                </div>
              </div>
              <div className="organizer-feature">
                <span className="feature-icon-large">📊</span>
                <div>
                  <h4>Track Bookings</h4>
                  <p>Monitor RSVPs and manage attendees in real-time</p>
                </div>
              </div>
              <div className="organizer-feature">
                <span className="feature-icon-large">🎯</span>
                <div>
                  <h4>Reach Your Audience</h4>
                  <p>Connect with thousands of event enthusiasts</p>
                </div>
              </div>
              <div className="organizer-feature">
                <span className="feature-icon-large">💼</span>
                <div>
                  <h4>Professional Tools</h4>
                  <p>Everything you need to host successful events</p>
                </div>
              </div>
            </div>
            <Link to="/signup" className="btn btn-success btn-large-cta">
              Become an Organizer
            </Link>
          </div>
          <div className="organizer-image">
            <div className="organizer-card-demo">
              <div className="demo-header">
                <div className="demo-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="demo-content">
                <h3>Create Your Event</h3>
                <div className="demo-form">
                  <div className="demo-field">
                    <label className="demo-label">Event Title</label>
                    <div className="demo-input">
                      <span className="demo-text">Tech Meetup 2026</span>
                    </div>
                  </div>
                  <div className="demo-field">
                    <label className="demo-label">Category</label>
                    <div className="demo-input short">
                      <span className="demo-text">Tech</span>
                    </div>
                  </div>
                  <div className="demo-field">
                    <label className="demo-label">Location</label>
                    <div className="demo-input">
                      <span className="demo-text">📍 New Delhi</span>
                    </div>
                  </div>
                  <div className="demo-field">
                    <label className="demo-label">Date & Price</label>
                    <div className="demo-row">
                      <div className="demo-input short">
                        <span className="demo-text">📅 Jan 15</span>
                      </div>
                      <div className="demo-input short">
                        <span className="demo-text">₹500</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="demo-button">
                  <span className="demo-button-text">Create Event</span>
                </div>
                <div className="demo-stats">
                  <div className="demo-stat">
                    <span className="stat-number">1.2K+</span>
                    <span className="stat-label">Events Created</span>
                  </div>
                  <div className="demo-stat">
                    <span className="stat-number">50K+</span>
                    <span className="stat-label">Total Bookings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>🔍 Discover Events</h3>
          <p>Find workshops, concerts, meetups and more happening near you</p>
        </div>
        <div className="feature-card">
          <h3>📅 Easy Registration</h3>
          <p>RSVP to events with just a few clicks</p>
        </div>
        <div className="feature-card">
          <h3>🎯 For Organizers</h3>
          <p>Create and manage your events effortlessly</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
