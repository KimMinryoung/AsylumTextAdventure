import React from 'react';

// Minimap layout (5 rows x 3 columns)
const mapLayout = [
  [null, 'roof', null],
  ['yard', 'corridor', 'workshop'],
  ['cafeteria', 'cell', null],
  [null, 'basement', 'solitary'],
  ['sewer1', 'sewer2', 'sewer3'],
];

const locationNames = {
  roof: '옥상',
  yard: '운동장',
  corridor: '복도',
  workshop: '작업장',
  cell: '감방',
  cafeteria: '식당',
  solitary: '독방',
  basement: '지하실',
  sewer1: '하수도',
  sewer2: '하수도',
  sewer3: '하수도',
  duct: '환기덕트'
};

function Minimap({ location }) {
  if (!location) return null;

  // Special case for duct - it spans multiple areas
  const isDuct = location === 'duct';

  return (
    <div className="minimap">
      <div className="minimap-title">수용소 지도</div>
      <div className="minimap-grid">
        {mapLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="minimap-row">
            {row.map((loc, colIndex) => {
              if (!loc) {
                return <div key={colIndex} className="minimap-cell empty" />;
              }

              const isCurrentLocation = loc === location;
              const isDuctOverlay = isDuct && ['corridor', 'cell', 'workshop'].includes(loc);

              return (
                <div
                  key={colIndex}
                  className={`minimap-cell ${isCurrentLocation ? 'current' : ''} ${isDuctOverlay ? 'duct-overlay' : ''}`}
                  title={locationNames[loc]}
                >
                  <span className="minimap-label">{locationNames[loc]}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="minimap-current">
        현재: {locationNames[location] || '???'}
      </div>
    </div>
  );
}

export default Minimap;
