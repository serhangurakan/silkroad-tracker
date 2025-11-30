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
                marginBottom: '5px',
                padding: '10px 14px',
                flexWrap: 'wrap'
              }}
            >
              <div className="event-info" style={{ flex: '1 1 auto', minWidth: '180px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: '500', display: 'inline' }}>
                    {event.name}
                  </h4>
                  {isNext && <span style={{ color: '#8b5cf6', marginLeft: '6px', fontSize: '0.75rem', fontWeight: '600' }}>← Sıradaki</span>}
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '2px' }}>
                    {event.category && <span style={{ color: '#8b5cf6' }}>[{event.category}]</span>}
                    {' '}
                    {nextOccurrence && formatTime(nextOccurrence.time)}
                    {nextOccurrence?.endTimeStr && ` - ${nextOccurrence.endTimeStr}`}
                  </div>
                </div>
              </div>

              {timeUntil > 0 && (
                <div className="event-countdown" style={{ fontSize: '0.875rem', minWidth: '70px', textAlign: 'right', fontWeight: '600', color: '#f59e0b' }}>
                  {formatDuration(timeUntil)}
                </div>
              )}

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {event.isCustom && (
                  <button
                    className="button danger"
                    onClick={(e) => { e.stopPropagation(); onDeleteEvent(event.id); }}
                    style={{ padding: '4px 12px', fontSize: '0.8rem' }}
                  >
                    Sil
                  </button>
                )}
                <label className="toggle-switch" onClick={(e) => e.stopPropagation()}>
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
