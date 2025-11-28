import { GardenUniqueCard } from './GardenUniqueCard';
import { LogParserPanel } from './LogParserPanel';
import { NormalUniqueGrid } from './NormalUniqueGrid';
import { TitanUniqueSection } from './TitanUniqueSection';
import { ElementUniqueGrid } from './ElementUniqueGrid';
import { uniques, uniqueGroups, getUniquesByGroup } from '../data/uniques';
import { usePersistentState } from '../hooks/usePersistentState';

export const UniquesTracker = ({ events }) => {
  const [gardenKillTimes, setGardenKillTimes] = usePersistentState('gardenKillTimes', {});

  const gardenUniques = getUniquesByGroup(uniqueGroups.GARDEN);
  const normalUniques = getUniquesByGroup(uniqueGroups.NORMAL);
  const titanUniques = getUniquesByGroup(uniqueGroups.TITAN);
  const elementUniques = getUniquesByGroup(uniqueGroups.ELEMENT);

  const titanEvent = events.find(e => e.id === 'titan_unique_invasion');

  const handleUpdateKillTime = (uniqueId, killTime) => {
    setGardenKillTimes(prev => ({
      ...prev,
      [uniqueId]: killTime
    }));
  };

  const handleParsedData = (parsedData) => {
    setGardenKillTimes(prev => ({
      ...prev,
      ...parsedData
    }));
  };

  return (
    <div>
      <div className="card">
        <h2>Garden Uniques - Respawn Tracker</h2>
        {gardenUniques.map(unique => (
          <GardenUniqueCard
            key={unique.id}
            unique={unique}
            lastKillTime={gardenKillTimes[unique.id]}
            onUpdateKillTime={handleUpdateKillTime}
          />
        ))}
      </div>

      <LogParserPanel onParsedData={handleParsedData} />

      <div className="card">
        <h2>Normal Uniques - Spawn Points</h2>
        <NormalUniqueGrid uniques={normalUniques} />
      </div>

      <TitanUniqueSection uniques={titanUniques} titanEvent={titanEvent} />

      <ElementUniqueGrid uniques={elementUniques} />
    </div>
  );
};
