import { useState } from 'react';
import { UniqueImageModal } from './UniqueImageModal';
import { spawnImages } from '../data/uniques';
import { getNextOccurrence, formatTime, getTimeUntilEvent, formatDuration } from '../utils/dateUtils';

export const TitanUniqueSection = ({ uniques, titanEvent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUnique, setSelectedUnique] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useState(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const nextOccurrence = titanEvent ? getNextOccurrence(titanEvent, currentTime) : null;
  const timeUntil = nextOccurrence ? getTimeUntilEvent(nextOccurrence.time, currentTime) : 0;

  return (
    <>
      <div className="card">
        <div className="section-header">
          <h3>Titan Uniques</h3>
          <button
            className={`accordion-button ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'Kapat' : 'Titan Eventlerinden Aç'}
          </button>
        </div>

        {isOpen && (
          <>
            {titanEvent && nextOccurrence && (
              <div className="card" style={{ background: '#0f0f1a', marginTop: '15px' }}>
                <h4>{titanEvent.name}</h4>
                <p><strong>Sonraki Event:</strong> {formatTime(nextOccurrence.time)}</p>
                <p className="event-countdown">
                  Kalan Süre: {formatDuration(timeUntil)}
                </p>
                <p className="info-text">Event Saatleri: {titanEvent.times.join(', ')}</p>
              </div>
            )}

            <div className="grid" style={{ marginTop: '15px' }}>
              {uniques.map(unique => (
                <div
                  key={unique.id}
                  className="unique-item"
                  onClick={() => setSelectedUnique(unique)}
                >
                  <h4>{unique.displayName}</h4>
                  <p className="info-text">Spawn point göster</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {selectedUnique && (
        <UniqueImageModal
          unique={selectedUnique}
          imagePath={spawnImages[selectedUnique.id] || '/images/placeholder.png'}
          onClose={() => setSelectedUnique(null)}
        />
      )}
    </>
  );
};
