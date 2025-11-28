import { useState } from 'react';

export const NewEventForm = ({ onAddEvent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    times: '',
    category: 'Event'
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.times) {
      alert('Lütfen event adı ve saatleri girin');
      return;
    }

    const times = formData.times.split(',').map(t => t.trim()).filter(t => t);

    const newEvent = {
      id: `custom_${Date.now()}`,
      name: formData.name,
      type: 'daily',
      times,
      category: formData.category,
      enabled: true,
      isCustom: true
    };

    onAddEvent(newEvent);

    setFormData({ name: '', times: '', category: 'Event' });
    setIsOpen(false);
  };

  return (
    <div className="card">
      <div className="section-header">
        <h3>Custom Events</h3>
        <button
          className={`accordion-button ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Kapat' : '+ Yeni Event'}
        </button>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} style={{ marginTop: '15px' }}>
          <div className="input-group">
            <label>Event Adı</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Örn: Custom Boss Event"
            />
          </div>

          <div className="input-group">
            <label>Saatler (virgülle ayır, 24h format)</label>
            <input
              type="text"
              value={formData.times}
              onChange={(e) => setFormData({ ...formData, times: e.target.value })}
              placeholder="Örn: 10:00, 14:00, 18:00"
            />
          </div>

          <div className="input-group">
            <label>Kategori</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                background: '#0f0f1a',
                border: '1px solid #2a2a3e',
                borderRadius: '6px',
                color: '#e0e0e0'
              }}
            >
              <option value="Event">Event</option>
              <option value="PVP">PVP</option>
              <option value="Unique">Unique</option>
              <option value="Job">Job</option>
              <option value="Custom">Custom</option>
            </select>
          </div>

          <button type="submit" className="button">
            Event Ekle
          </button>
        </form>
      )}
    </div>
  );
};
