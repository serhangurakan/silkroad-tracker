import { useState, useEffect } from 'react';
import { getNextOccurrence, getTimeUntilEvent, formatTime, formatDuration } from '../utils/dateUtils';

export const UpcomingEventsList = ({ events, onToggleEvent, onDeleteEvent }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Her event için sonraki occurrence hesapla
  const allEventsWithTime = events
    .map(event => {
      const nextOccurrence = getNextOccurrence(event, currentTime);
      const timeUntil = nextOccurrence ? getTimeUntilEvent(nextOccurrence.time, currentTime) : 0;
      return {
        event,
        nextOccurrence,
        timeUntil
      };
    })
    .sort((a, b) => a.timeUntil - b.timeUntil);

  return (
    <div className="card">
      <h2>Tüm Eventler</h2>
      <div className="event-list">
        {allEventsWithTime.map(({ event, nextOccurrence, timeUntil }, index) => {
          const isNext = index === 0 && timeUntil > 0;
          const isActive = timeUntil > 0 && timeUntil <= 120;
          const isUpcoming = timeUntil > 120 && timeUntil <= 3600;

          return (
            <div
              key={event.id}
              className={`event-item ${isActive ? 'active' : isUpcoming ? 'upcoming' : ''}`}
              style={{
                borderColor: isNext ? '#8b5cf6' : undefined,
                borderWidth: isNext ? '2px' : undefined,
                marginBottom: '5px'
              }}
            >
              <div className="event-info">
                <h4>
                  {event.name}
                  {isNext && <span style={{ color: '#8b5cf6', marginLeft: '10px' }}>← Sıradaki</span>}
                </h4>
                <p className="info-text">
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

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                {event.isCustom && (
                  <button
                    className="button danger"
                    onClick={() => onDeleteEvent(event.id)}
                    style={{ padding: '5px 15px', fontSize: '0.85rem' }}
                  >
                    Sil
                  </button>
                )}
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={event.enabled}
                    onChange={() => onToggleEvent(event.id)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
