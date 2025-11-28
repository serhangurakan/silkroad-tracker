import { useState, useEffect, useRef } from 'react';
import { TimeBar } from './TimeBar';
import { UpcomingEventsList } from './UpcomingEventsList';
import { NewEventForm } from './NewEventForm';
import { AlarmModal } from './AlarmModal';
import { getNextOccurrence, getTimeUntilEvent } from '../utils/dateUtils';

export const EventScheduler = ({ events, onUpdateEvents }) => {
  const [notifiedEvents, setNotifiedEvents] = useState(new Set());
  const [alarmEvent, setAlarmEvent] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // 5 saniyede bir alarm kontrolü
    const checkAlarms = () => {
      const now = new Date();
      const activeEvents = events.filter(e => e.enabled);

      activeEvents.forEach(event => {
        const nextOccurrence = getNextOccurrence(event, now);
        if (!nextOccurrence) return;

        const timeUntil = getTimeUntilEvent(nextOccurrence.time, now);
        const eventKey = `${event.id}-${nextOccurrence.time.getTime()}`;

        // 2 dakika içinde ve daha önce notify edilmemişse
        if (timeUntil > 0 && timeUntil <= 120 && !notifiedEvents.has(eventKey)) {
          // Ses çal
          if (audioRef.current) {
            audioRef.current.play().catch(err => console.log('Audio play failed:', err));
          }

          // Modal göster
          setAlarmEvent(event);

          // Bu occurrence için işaretle
          setNotifiedEvents(prev => new Set([...prev, eventKey]));
        }
      });
    };

    const interval = setInterval(checkAlarms, 5000);
    checkAlarms(); // İlk kontrolü hemen yap

    return () => clearInterval(interval);
  }, [events, notifiedEvents]);

  const handleToggleEvent = (eventId) => {
    const updated = events.map(e =>
      e.id === eventId ? { ...e, enabled: !e.enabled } : e
    );
    onUpdateEvents(updated);
  };

  const handleAddEvent = (newEvent) => {
    onUpdateEvents([...events, newEvent]);
  };

  const handleDeleteEvent = (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (event && event.isCustom) {
      const confirmed = window.confirm(`"${event.name}" eventini silmek istediğinize emin misiniz?`);
      if (confirmed) {
        onUpdateEvents(events.filter(e => e.id !== eventId));
      }
    }
  };

  return (
    <div>
      {/* Placeholder ses dosyası - kendi beep.mp3 dosyanı public klasörüne ekleyebilirsin */}
      <audio ref={audioRef} src="/beep.mp3" preload="auto" />

      <TimeBar events={events} />

      <UpcomingEventsList
        events={events}
        onToggleEvent={handleToggleEvent}
        onDeleteEvent={handleDeleteEvent}
      />

      <NewEventForm onAddEvent={handleAddEvent} />

      {alarmEvent && (
        <AlarmModal
          event={alarmEvent}
          onClose={() => setAlarmEvent(null)}
        />
      )}
    </div>
  );
};
