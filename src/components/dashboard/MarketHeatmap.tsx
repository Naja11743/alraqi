'use client';
import { useState, useEffect } from 'react';
import { format, subDays } from 'date-fns';

// Generate 90 days of heatmap data
const generateHeatmapData = () => {
  const data = [];
  for (let i = 89; i >= 0; i--) {
    const date = subDays(new Date(), i);
    // Random movement (-2% to +2%)
    const movement = (Math.random() - 0.45) * 4;
    data.push({
      date,
      movement: Number(movement.toFixed(2))
    });
  }
  return data;
};

const heatmapData = generateHeatmapData();

export function MarketHeatmap() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedDay, setSelectedDay] = useState(heatmapData[heatmapData.length - 1]);

  useEffect(() => setIsMounted(true), []);

  const getColor = (movement: number) => {
    if (movement > 1) return 'bg-green-500';
    if (movement > 0) return 'bg-green-500/50';
    if (movement > -1) return 'bg-red-500/50';
    return 'bg-red-500';
  };

  if (!isMounted) return <div className="h-full min-h-[300px]"></div>;

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-serif text-[var(--color-gold-300)] tracking-wide">
          MARKET HEATMAP (90D)
        </h2>
        
        {/* Selected Day Info */}
        <div className="text-right bg-black/5 border border-white/10 p-3 rounded-lg min-w-[140px]">
          <div className="text-xs text-gray-400 mb-1">
            {format(selectedDay.date, 'MMM dd, yyyy')}
          </div>
          <div className={`font-mono font-semibold ${selectedDay.movement >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {selectedDay.movement > 0 ? '+' : ''}{selectedDay.movement}%
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-10 sm:grid-cols-15 gap-1.5 mb-4">
          {heatmapData.map((day, i) => (
            <div
              key={i}
              onMouseEnter={() => setSelectedDay(day)}
              className={`aspect-square rounded-sm cursor-pointer border hover:border-white transition-colors duration-200 ${
                selectedDay === day ? 'border-white' : 'border-transparent'
              } ${getColor(day.movement)}`}
            />
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
          <span>Decrease</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-red-500" />
            <div className="w-3 h-3 rounded-sm bg-red-500/50" />
            <div className="w-3 h-3 rounded-sm bg-green-500/50" />
            <div className="w-3 h-3 rounded-sm bg-green-500" />
          </div>
          <span>Increase</span>
        </div>
      </div>
    </div>
  );
}
