export const AlarmModal = ({ event, onClose }) => {
  return (
    <>
      <div className="modal-overlay" style={{ background: 'rgba(0, 0, 0, 0.7)' }} onClick={onClose} />
      <div className="alarm-modal">
        <h3>⏰ EVENT ALARM</h3>
        <p><strong>{event.name}</strong></p>
        <p>2 dakika içinde başlıyor!</p>
        <button className="button" onClick={onClose} style={{ marginTop: '20px' }}>
          Tamam
        </button>
      </div>
    </>
  );
};
