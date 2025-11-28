import { useState } from 'react';
import { UniqueImageModal } from './UniqueImageModal';
import { spawnImages } from '../data/uniques';

export const NormalUniqueGrid = ({ uniques }) => {
  const [selectedUnique, setSelectedUnique] = useState(null);

  return (
    <>
      <div className="grid">
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
