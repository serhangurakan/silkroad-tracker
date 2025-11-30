import { GardenUniqueCard } from './GardenUniqueCard';
import { FlameUniqueCard } from './FlameUniqueCard';
import { LogParserPanel } from './LogParserPanel';
import { NormalUniqueGrid } from './NormalUniqueGrid';
import { TitanUniqueSection } from './TitanUniqueSection';
import { ElementUniqueGrid } from './ElementUniqueGrid';
import { uniques, uniqueGroups, getUniquesByGroup } from '../data/uniques';
import { usePersistentState } from '../hooks/usePersistentState';

export const UniquesTracker = ({ events }) => {
  const [gardenKillTimes, setGardenKillTimes] = usePersistentState('gardenKillTimes', {});
  const [flameKillTimes, setFlameKillTimes] = usePersistentState('flameKillTimes', {});

  const gardenUniques = getUniquesByGroup(uniqueGroups.GARDEN);
  const flameUniques = getUniquesByGroup(uniqueGroups.FLAME);
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

  const handleUpdateFlameKillTime = (uniqueId, killTime) => {
    setFlameKillTimes(prev => ({
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

      <div className="card">
        <h2>Flame Uniques - 4 Saat Sabit Spawn</h2>
        {flameUniques.map(unique => (
          <FlameUniqueCard
            key={unique.id}
            unique={unique}
            lastKillTime={flameKillTimes[unique.id]}
            onUpdateKillTime={handleUpdateFlameKillTime}
          />
        ))}
      </div>

      <div className="card">
        <h2>Normal Uniques - Spawn Points</h2>
        <NormalUniqueGrid uniques={normalUniques} />
      </div>

      <TitanUniqueSection uniques={titanUniques} titanEvent={titanEvent} />

      <ElementUniqueGrid uniques={elementUniques} />

      <LogParserPanel onParsedData={handleParsedData} />
    </div>
  );
};
