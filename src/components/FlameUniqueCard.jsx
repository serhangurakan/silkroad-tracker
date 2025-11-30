import { useState, useEffect } from 'react';
import { getElapsedTime, formatDuration } from '../utils/dateUtils';
import { UniqueImageModal } from './UniqueImageModal';
import { spawnImages } from '../data/uniques';

export const FlameUniqueCard = ({ unique, lastKillTime, onUpdateKillTime }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (lastKillTime) {
      const date = new Date(lastKillTime);
      setDateInput(date.toISOString().split('T')[0]);
      setTimeInput(date.toTimeString().slice(0, 5));
    }
  }, [lastKillTime]);

  const handleUpdate = () => {
    if (dateInput && timeInput) {
      const dateTime = new Date(`${dateInput}T${timeInput}:00`);
      onUpdateKillTime(unique.id, dateTime.toISOString());
    }
  };

  // 4 saat sabit - Hell's INT kesildikten 4 saat sonra spawn olur
  const elapsedSeconds = lastKillTime ? getElapsedTime(lastKillTime) : 0;
  const fourHoursInSeconds = 4 * 3600;
  const remainingSeconds = fourHoursInSeconds - elapsedSeconds;
  const isReady = elapsedSeconds >= fourHoursInSeconds;

  return (
    <>
      <div className="card">
        <h3>{unique.displayName}</h3>
        <p className="info-text">Kesildikten 4 saat sonra spawn olur</p>

        <div className="input-group">
          <label>Son Kesilme Tarihi</label>
          <div className="form-row">
            <input
              type="date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
            />
            <input
              type="time"
              value={timeInput}
              onChange={(e) => setTimeInput(e.target.value)}
            />
            <button className="button" onClick={handleUpdate}>
              Güncelle
            </button>
          </div>
        </div>

        {lastKillTime && (
          <>
            <div className="time-info">
              <strong>Geçen Süre:</strong> {formatDuration(elapsedSeconds)}
            </div>

            {isReady ? (
              <div className="time-info" style={{ background: '#10b981', color: 'white', padding: '15px' }}>
                <strong>✓ SPAWN OLDU!</strong> 4 saat geçti.
              </div>
            ) : (
              <div className="time-info">
                <strong>Kalan Süre:</strong> {formatDuration(remainingSeconds)}
              </div>
            )}

            <button
              className="button"
              style={{ marginTop: '10px', width: '100%' }}
              onClick={() => setShowModal(true)}
            >
              Spawn Noktasını Göster
            </button>
          </>
        )}
      </div>

      {showModal && (
        <UniqueImageModal
          unique={unique}
          imagePath={spawnImages[unique.id] || '/images/placeholder.png'}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};
