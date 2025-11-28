import { formatTime, formatDuration } from '../utils/dateUtils';

export const EventCard = ({ event, nextOccurrence, timeUntil, onToggle }) => {
  const isActive = timeUntil > 0 && timeUntil <= 120; // 2 dakika içinde
  const isUpcoming = timeUntil > 120 && timeUntil <= 3600; // 1 saat içinde

  return (
    <div className={`event-item ${isActive ? 'active' : isUpcoming ? 'upcoming' : ''}`}>
      <div className="event-info">
        <h4>{event.name}</h4>
        <p>
          {event.category && <span style={{ color: '#8b5cf6' }}>[{event.category}]</span>}
          {' '}
          {nextOccurrence && formatTime(nextOccurrence.time)}
          {nextOccurrence?.endTimeStr && ` - ${nextOccurrence.endTimeStr}`}
        </p>
      </div>

      {timeUntil > 0 && (
        <div className="event-countdown">
          {formatDuration(timeUntil)}
        </div>
      )}

      <div className="event-toggle">
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={event.enabled}
            onChange={() => onToggle(event.id)}
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
};
