import React from 'react';

// Moral Trajectory Chart Component
export const MoralTrajectoryChart = ({ storyChoices, darkMode }) => {
  if (storyChoices.length === 0) return null;

  // Calculate cumulative scores
  const cumulativeData = [];
  let cumulative = 0;
  storyChoices.forEach((choice, index) => {
    cumulative += choice.moral;
    cumulativeData.push({ x: index + 1, y: cumulative });
  });

  const maxY = Math.max(...cumulativeData.map(d => d.y), 5);
  const minY = Math.min(...cumulativeData.map(d => d.y), -5);
  const rangeY = maxY - minY;
  const padding = 40;
  const width = 600;
  const height = 300;

  const scaleX = (x) => padding + ((x - 1) / (storyChoices.length - 1 || 1)) * (width - 2 * padding);
  const scaleY = (y) => height - padding - ((y - minY) / rangeY) * (height - 2 * padding);

  const pathData = cumulativeData.map((d, i) =>
    `${i === 0 ? 'M' : 'L'} ${scaleX(d.x)} ${scaleY(d.y)}`
  ).join(' ');

  return (
    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border-2 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
      <h4 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4 text-center`}>
        Your Moral Trajectory
      </h4>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Zero line */}
        <line
          x1={padding}
          y1={scaleY(0)}
          x2={width - padding}
          y2={scaleY(0)}
          stroke={darkMode ? '#4B5563' : '#D1D5DB'}
          strokeWidth="2"
          strokeDasharray="5,5"
        />

        {/* Trajectory line */}
        <path
          d={pathData}
          fill="none"
          stroke={cumulative >= 0 ? '#10B981' : '#EF4444'}
          strokeWidth="3"
        />

        {/* Data points */}
        {cumulativeData.map((d, i) => (
          <circle
            key={i}
            cx={scaleX(d.x)}
            cy={scaleY(d.y)}
            r="5"
            fill={d.y >= 0 ? '#10B981' : '#EF4444'}
          />
        ))}

        {/* Y-axis labels */}
        <text x={padding - 10} y={scaleY(maxY)} textAnchor="end" fill={darkMode ? '#D1D5DB' : '#6B7280'} fontSize="12">
          {maxY > 0 ? '+' : ''}{maxY}
        </text>
        <text x={padding - 10} y={scaleY(0) + 5} textAnchor="end" fill={darkMode ? '#D1D5DB' : '#6B7280'} fontSize="12">
          0
        </text>
        <text x={padding - 10} y={scaleY(minY)} textAnchor="end" fill={darkMode ? '#D1D5DB' : '#6B7280'} fontSize="12">
          {minY}
        </text>

        {/* X-axis label */}
        <text x={width / 2} y={height - 10} textAnchor="middle" fill={darkMode ? '#D1D5DB' : '#6B7280'} fontSize="14">
          Decision Points
        </text>
      </svg>

      {/* Legend */}
      <div className="mt-4 flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Altruxan Path (Positive)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Malidoxian Path (Negative)</span>
        </div>
      </div>
    </div>
  );
};
