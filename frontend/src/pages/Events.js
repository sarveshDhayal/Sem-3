import React, { useState, useEffect, useContext } from 'react';
import { eventsAPI, bookingsAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { getEventUrgency, formatEventDate } from '../utils/dateUtils';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [eventFilter, setEventFilter] = useState('upcoming'); // 'upcoming', 'past', 'all'
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, page, eventFilter]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // Fetch more events to ensure we have enough after filtering
      const response = await eventsAPI.getAll({ search, category, page: 1, limit: 100 });
      console.log('API Response:', response.data);
      
      let filteredEvents = response.data.events || [];
      const now = new Date();
      
      // Filter based on event status
      if (eventFilter === 'upcoming') {
        filteredEvents = filteredEvents.filter(event => new Date(event.date) >= now);
      } else if (eventFilter === 'past') {
        filteredEvents = filteredEvents.filter(event => new Date(event.date) < now);
      }
      
      // Apply pagination on filtered results
      const startIndex = (page - 1) * 10;
      const endIndex = startIndex + 10;
      const paginatedEvents = filteredEvents.slice(startIndex, endIndex);
      
      setEvents(paginatedEvents);
      setPagination({
        page: page,
        limit: 10,
        total: filteredEvents.length,
        totalPages: Math.ceil(filteredEvents.length / 10)
      });
      setError('');
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (eventId, status) => {
    if (!user) {
      setError('Please login to book events');
      return;
    }

    try {
      await bookingsAPI.create({ eventId, status });
      setSuccess(`Successfully marked as ${status}!`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to book event');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="events-container">
      <div className="events-header">
        <h1>Discover Local Events</h1>
        
        <div className="event-tabs">
          <button
            className={`tab-button ${eventFilter === 'upcoming' ? 'active' : ''}`}
            onClick={() => setEventFilter('upcoming')}
          >
            🎉 Upcoming Events
          </button>
          <button
            className={`tab-button ${eventFilter === 'past' ? 'active' : ''}`}
            onClick={() => setEventFilter('past')}
          >
            ⏰ Past Events
          </button>
          <button
            className={`tab-button ${eventFilter === 'all' ? 'active' : ''}`}
            onClick={() => setEventFilter('all')}
          >
            📅 All Events
          </button>
        </div>
        
        <div className="events-filters">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="music">Music</option>
            <option value="workshop">Workshop</option>
            <option value="sports">Sports</option>
            <option value="tech">Tech</option>
            <option value="art">Art</option>
          </select>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {loading ? (
        <div className="loading">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="no-events">
          <p>No {eventFilter === 'upcoming' ? 'upcoming' : eventFilter === 'past' ? 'past' : ''} events found</p>
          {eventFilter !== 'all' && (
            <button onClick={() => setEventFilter('all')} className="btn btn-primary">
              View All Events
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="events-grid">
            {events.map((event) => {
              const urgency = getEventUrgency(event.date);
              const isPassed = urgency.type === 'passed';
              return (
                <div key={event.id} className={`event-card ${isPassed ? 'event-passed' : ''}`}>
                  {event.image && (
                    <div className="event-image">
                      <img src={event.image} alt={event.title} />
                      {urgency.message && (
                        <div className={`urgency-badge urgency-${urgency.type}`}>
                          {urgency.message}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="event-content">
                    <div className="event-category">{event.category}</div>
                    <h3>{event.title}</h3>
                    <p className="event-description">{event.description}</p>
                    <div className="event-details">
                      <p>📍 {event.location}</p>
                      <p>📅 {formatEventDate(event.date)}</p>
                      <p>💰 {event.price === 0 ? 'Free' : `₹${event.price}`}</p>
                      <p>👤 By {event.organizer.name}</p>
                    </div>
                    {user && !isPassed && (
                      <div className="event-actions">
                        <button
                          onClick={() => handleBooking(event.id, 'RSVP')}
                          className="btn btn-primary btn-sm"
                        >
                          RSVP
                        </button>
                        <button
                          onClick={() => handleBooking(event.id, 'INTERESTED')}
                          className="btn btn-secondary btn-sm"
                        >
                          Interested
                        </button>
                      </div>
                    )}
                    {isPassed && (
                      <div className="event-ended-notice">
                        <p>This event has ended</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="btn btn-secondary"
              >
                Previous
              </button>
              <span>Page {page} of {pagination.totalPages}</span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.totalPages}
                className="btn btn-secondary"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Events;
