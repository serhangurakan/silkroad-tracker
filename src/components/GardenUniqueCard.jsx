import { useState, useEffect } from 'react';
import { getGardenProgress, getElapsedTime, formatDuration } from '../utils/dateUtils';

export const GardenUniqueCard = ({ unique, lastKillTime, onUpdateKillTime }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');

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

  const progressData = getGardenProgress(lastKillTime);
  const elapsedSeconds = lastKillTime ? getElapsedTime(lastKillTime) : 0;

  return (
    <div className="card">
      <h3>{unique.displayName}</h3>

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

          <div className="progress-bar-container">
            <div
              className={`progress-bar ${progressData.status === 'overdue' ? 'overdue' : ''}`}
              style={{ width: `${progressData.progress}%` }}
            >
              {progressData.progress.toFixed(1)}%
            </div>
          </div>

          <div className="time-info">
            {progressData.message}
            <span className={`status-badge ${progressData.status}`}>
              {progressData.status === 'not-ready' && 'Hazır Değil'}
              {progressData.status === 'ready' && 'Spawn Penceresi'}
              {progressData.status === 'overdue' && 'Maksimum İhtimal'}
            </span>
          </div>

          <div className="info-text">
            Muhtemel spawn aralığı: 4–8 saat
          </div>
        </>
      )}
    </div>
  );
};
