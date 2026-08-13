'use client';
import { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

// Generate mock progressive timeline data
const generateTimelineData = (startYear: number, endYear: number, initialInvestment: number) => {
  const data = [];
  let currentValue = initialInvestment;
  const totalYears = endYear - startYear;
  
  for (let i = 0; i <= totalYears; i++) {
    const year = startYear + i;
    // Average 8% YoY growth with some randomness
    const growth = 1.08 + (Math.random() - 0.4) * 0.1;
    if (i > 0) currentValue *= growth;
    
    data.push({
      year,
      value: Math.round(currentValue)
    });
  }
  return data;
};

export function HistoricalSimulator() {
  const [isMounted, setIsMounted] = useState(false);
  const [startYear, setStartYear] = useState(2015);
  const [investment, setInvestment] = useState(2000);
  const currentYear = 2026;
  
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return <div className="h-full min-h-[400px]"></div>;

  const data = generateTimelineData(startYear, currentYear, investment);
  const finalValue = data[data.length - 1].value;
  const profit = finalValue - investment;
  const roi = ((finalValue - investment) / investment) * 100;

  // Assuming 24K was around 150 AED/g in 2015 for calculation mock
  const historicalPricePerGram = 150 * Math.pow(1.08, (startYear - 2015));
  const goldPurchased = investment / historicalPricePerGram;

  return (
    <div className="bg-[var(--background)] border border-black/5 rounded-2xl p-6 md:p-8 h-full flex flex-col">
      <h2 className="text-xl font-serif text-[var(--color-gold-300)] tracking-wide mb-6">
        WHAT IF I BOUGHT GOLD?
      </h2>

      {/* Controls */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Initial Investment (AED)</label>
          <input 
            type="number"
            value={investment}
            onChange={(e) => setInvestment(parseFloat(e.target.value) || 0)}
            className="w-full bg-white/5 border border-black/5 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:border-[var(--color-gold-500)] font-mono"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">From Year</label>
          <select 
            value={startYear}
            onChange={(e) => setStartYear(parseInt(e.target.value))}
            className="w-full bg-white/5 border border-black/5 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:border-[var(--color-gold-500)] font-mono appearance-none"
          >
            {[2010, 2012, 2015, 2018, 2020].map(y => (
              <option key={y} value={y} className="bg-white">{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="border-l-2 border-gray-600 pl-3">
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Gold Acquired</div>
          <div className="text-gray-900 font-mono">{goldPurchased.toFixed(2)}g</div>
        </div>
        <div className="border-l-2 border-gray-600 pl-3">
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Value ({currentYear})</div>
          <div className="text-[var(--color-gold-400)] font-mono font-semibold">AED {finalValue.toLocaleString()}</div>
        </div>
        <div className="border-l-2 border-green-500/50 pl-3">
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Profit</div>
          <div className="text-green-400 font-mono">+AED {profit.toLocaleString()}</div>
        </div>
        <div className="border-l-2 border-green-500/50 pl-3">
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">ROI</div>
          <div className="text-green-400 font-mono">+{roi.toFixed(1)}%</div>
        </div>
      </div>

      {/* Progressive Chart */}
      <div className="h-[200px] w-full mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorInvest" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <YAxis domain={['dataMin', 'dataMax']} hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderColor: 'rgba(0,0,0,0.1)', borderRadius: '8px' }}
              itemStyle={{ color: '#10b981', fontFamily: 'monospace' }}
              labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
              formatter={(value: any) => [`AED ${value.toLocaleString()}`, 'Value']}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#10b981" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorInvest)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="text-[10px] text-gray-600 mt-4 text-center">
        * Hypothetical historical calculation based on average spot prices. Does not include past premiums or taxes.
      </div>
    </div>
  );
}
