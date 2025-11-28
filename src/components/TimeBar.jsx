import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { getNextOccurrence } from '../utils/dateUtils';

export const TimeBar = ({ events }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentPositionPercent = ((currentHour + currentMinute / 60) / 24) * 100;

  // Bugünkü eventleri topla
  const todayEvents = [];
  events.filter(e => e.enabled).forEach(event => {
    const times = event.type === 'range' ? event.startTimes : event.times;
    if (times) {
      times.forEach(timeStr => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const positionPercent = ((hours + minutes / 60) / 24) * 100;
        todayEvents.push({
          name: event.name,
          time: timeStr,
          position: positionPercent,
          category: event.category
        });
      });
    }
  });

  return (
    <div className="time-bar">
      <div className="time-bar-display">
        {format(currentTime, 'HH:mm:ss')} - {format(currentTime, 'dd MMMM yyyy')}
      </div>

      <div className="timeline">
        <div className="timeline-marker" style={{ left: `${currentPositionPercent}%` }} />
        {todayEvents.map((event, idx) => (
          <div
            key={idx}
            className="timeline-event"
            style={{ left: `${event.position}%` }}
            title={`${event.name} - ${event.time}`}
          />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.85rem', color: '#a0a0a0' }}>
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>24:00</span>
      </div>
    </div>
  );
};
