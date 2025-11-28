import { useState } from 'react';
import { findLastKillTime } from '../utils/dateUtils';
import { uniques, uniqueGroups } from '../data/uniques';

export const LogParserPanel = ({ onParsedData }) => {
  const [logText, setLogText] = useState('');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [parseResult, setParseResult] = useState(null);

  const handleParse = () => {
    const gardenUniques = uniques.filter(u => u.group === uniqueGroups.GARDEN);
    const parsedData = {};
    const results = [];

    gardenUniques.forEach(unique => {
      const killTime = findLastKillTime(logText, unique.displayName, selectedDate);
      if (killTime) {
        parsedData[unique.id] = killTime;
        results.push(`${unique.displayName}: ${new Date(killTime).toLocaleString()}`);
      }
    });

    if (Object.keys(parsedData).length > 0) {
      onParsedData(parsedData);
      setParseResult(`Başarıyla parse edildi:\n${results.join('\n')}`);
    } else {
      setParseResult('Logda Garden Unique kill bilgisi bulunamadı.');
    }

    setTimeout(() => setParseResult(null), 5000);
  };

  return (
    <div className="card">
      <h3>Log Parser (Garden Uniques)</h3>

      <div className="input-group">
        <label>Kill Tarihi (Log içinde tarih yok, manuel seç)</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Game Log (Kopyala/Yapıştır)</label>
        <textarea
          value={logText}
          onChange={(e) => setLogText(e.target.value)}
          placeholder="[04:40:26] PickaChuuuu killed Yuno&#10;[04:43:36] EXFS killed Captain Ivy&#10;..."
        />
      </div>

      <button className="button" onClick={handleParse}>
        Logu Tara ve Garden Uniques Güncelle
      </button>

      {parseResult && (
        <div className="time-info" style={{ marginTop: '10px', whiteSpace: 'pre-line' }}>
          {parseResult}
        </div>
      )}
    </div>
  );
};
