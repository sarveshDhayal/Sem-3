// Calculate days until event
export const getDaysUntilEvent = (eventDate) => {
  const today = new Date();
  const event = new Date(eventDate);
  const diffTime = event - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Check if event is coming soon (within 7 days)
export const isEventSoon = (eventDate) => {
  const days = getDaysUntilEvent(eventDate);
  return days >= 0 && days <= 7;
};

// Check if event is today
export const isEventToday = (eventDate) => {
  const days = getDaysUntilEvent(eventDate);
  return days === 0;
};

// Check if event is tomorrow
export const isEventTomorrow = (eventDate) => {
  const days = getDaysUntilEvent(eventDate);
  return days === 1;
};

// Get event urgency message
export const getEventUrgency = (eventDate) => {
  const days = getDaysUntilEvent(eventDate);
  
  if (days < 0) return { message: '⏰ Event Ended', type: 'passed' };
  if (days === 0) return { message: '🔥 TODAY!', type: 'today' };
  if (days === 1) return { message: '⚡ Tomorrow!', type: 'tomorrow' };
  if (days <= 3) return { message: `🎯 In ${days} days`, type: 'soon' };
  if (days <= 7) return { message: `📅 In ${days} days`, type: 'upcoming' };
  
  return { message: '', type: 'normal' };
};

// Format date nicely
export const formatEventDate = (eventDate) => {
  const date = new Date(eventDate);
  const options = { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
};
