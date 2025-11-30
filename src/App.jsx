import { useState, useEffect } from 'react';
import { UniquesTracker } from './components/UniquesTracker';
import { EventScheduler } from './components/EventScheduler';
import { systemEvents } from './data/events';
import { usePersistentState } from './hooks/usePersistentState';
import { format } from 'date-fns';

function App() {
  const [activeTab, setActiveTab] = useState('uniques');
  const [events, setEvents] = usePersistentState('events', systemEvents);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div style={{ fontSize: '2.5rem', color: '#8b5cf6', fontWeight: 'bold', marginBottom: '10px', fontFamily: 'monospace' }}>
          {format(currentTime, 'HH:mm:ss')}
        </div>
        <h1>Silkroad Unique & Event Tracker</h1>
        <p style={{ color: '#a0a0a0' }}>Garden Uniques, Flame Uniques, Spawn Points, ve Event Takvimi</p>
      </header>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'uniques' ? 'active' : ''}`}
          onClick={() => setActiveTab('uniques')}
        >
          Uniques Tracker
        </button>
        <button
          className={`tab-button ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Event Schedule
        </button>
      </div>

      <main>
        {activeTab === 'uniques' && <UniquesTracker events={events} />}
        {activeTab === 'events' && (
          <EventScheduler
            events={events}
            onUpdateEvents={setEvents}
          />
        )}
      </main>
    </div>
  );
}

export default App;
