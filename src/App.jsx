import { useState } from 'react';
import { UniquesTracker } from './components/UniquesTracker';
import { EventScheduler } from './components/EventScheduler';
import { systemEvents } from './data/events';
import { usePersistentState } from './hooks/usePersistentState';

function App() {
  const [activeTab, setActiveTab] = useState('uniques');
  const [events, setEvents] = usePersistentState('events', systemEvents);

  return (
    <div className="app">
      <header className="header">
        <h1>Silkroad Unique & Event Tracker</h1>
        <p style={{ color: '#a0a0a0' }}>Garden Uniques, Spawn Points, ve Event Takvimi</p>
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
