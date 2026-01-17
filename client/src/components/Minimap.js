import React from 'react';

// Scene ID to location mapping
function getLocationFromScene(sceneId) {
  if (!sceneId) return null;

  // Entrance/Corridor
  if (sceneId.startsWith('entrance')) return 'corridor';

  // Workshop
  if (sceneId.startsWith('workshop')) return 'workshop';

  // Yard
  if (sceneId.startsWith('yard')) return 'yard';

  // Solitary
  if (sceneId.startsWith('solitary')) return 'solitary';

  // Roof
  if (sceneId.startsWith('solo_partial_roof') || sceneId.startsWith('solo_roof')) return 'roof';

  // Basement
  if (sceneId === 'solo_partial_basement') return 'basement';

  // Sewer
  if (sceneId === 'solo_escape_sewer' || sceneId === 'ending_solo_success' || sceneId === 'sewer_escape') return 'sewer';

  // Duct (inside building, show as current building location)
  if (sceneId === 'solo_partial_duct') return 'duct';

  // Cell (default for most conversation/event scenes)
  if (sceneId.startsWith('cell') ||
      sceneId.startsWith('talk_') ||
      sceneId.startsWith('first_night') ||
      sceneId.startsWith('night_') ||
      sceneId.startsWith('day_two') ||
      sceneId.startsWith('conflict_') ||
      sceneId.startsWith('pedophile_') ||
      sceneId.startsWith('messiah_') ||
      sceneId.startsWith('fraudster_') ||
      sceneId.startsWith('political_') ||
      sceneId.startsWith('groper_') ||
      sceneId.startsWith('arsonist_') ||
      sceneId.startsWith('wifekiller_')) {
    return 'cell';
  }

  // Endings - map to their respective locations
  if (sceneId === 'ending_messiah_route' ||
      sceneId === 'ending_fraudster_route' ||
      sceneId === 'ending_arsonist_route') return 'yard';
  if (sceneId === 'ending_solo_lucky') return 'duct';
  if (sceneId === 'ending_solo_daring') return 'roof';
  if (sceneId === 'ending_solo_redemption' || sceneId === 'ending_solo_despair') return 'solitary';
  if (sceneId === 'ending_surrender') return 'cell';

  // Solo escape scenes
  if (sceneId.startsWith('solo_escape')) return 'corridor';

  // Default to cell
  return 'cell';
}

// Minimap layout (5 rows x 3 columns)
const mapLayout = [
  [null, 'roof', null],
  ['yard', 'corridor', 'workshop'],
  [null, 'cell', 'solitary'],
  [null, 'basement', null],
  [null, 'sewer', null],
];

const locationNames = {
  roof: '옥상',
  yard: '운동장',
  corridor: '복도',
  workshop: '작업장',
  cell: '감방',
  solitary: '독방',
  basement: '지하실',
  sewer: '하수도',
  duct: '환기덕트'
};

function Minimap({ sceneId }) {
  const currentLocation = getLocationFromScene(sceneId);

  // Special case for duct - it spans multiple areas
  const isDuct = currentLocation === 'duct';

  return (
    <div className="minimap">
      <div className="minimap-title">수용소 지도</div>
      <div className="minimap-grid">
        {mapLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="minimap-row">
            {row.map((location, colIndex) => {
              if (!location) {
                return <div key={colIndex} className="minimap-cell empty" />;
              }

              const isCurrentLocation = location === currentLocation;
              const isDuctOverlay = isDuct && ['corridor', 'cell', 'workshop'].includes(location);

              return (
                <div
                  key={colIndex}
                  className={`minimap-cell ${isCurrentLocation ? 'current' : ''} ${isDuctOverlay ? 'duct-overlay' : ''}`}
                  title={locationNames[location]}
                >
                  <span className="minimap-label">{locationNames[location]}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="minimap-current">
        현재: {locationNames[currentLocation] || '???'}
      </div>
    </div>
  );
}

export default Minimap;
