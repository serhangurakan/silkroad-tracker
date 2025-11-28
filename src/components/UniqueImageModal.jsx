export const UniqueImageModal = ({ unique, imagePath, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h3>{unique.displayName} - Spawn Points</h3>
        <img src={imagePath} alt={`${unique.displayName} spawn points`} />
      </div>
    </div>
  );
};
