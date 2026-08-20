'use client';
import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const generateRatioData = () => {
  let ratio = 82.5;
  const data = [];
  for (let i = 30; i >= 0; i--) {
    ratio = ratio + (Math.random() - 0.5) * 1.5;
    data.push({
      day: `Day -${i}`,
      ratio: Number(ratio.toFixed(2))
    });
  }
  return data;
};

const ratioData = generateRatioData();

export function MetalsCompare() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return <div className="h-full min-h-[400px]"></div>;

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 h-full flex flex-col">
      <h2 className="text-xl font-serif text-[var(--color-gold-300)] tracking-wide mb-6">
        PRECIOUS METALS COMPARE
      </h2>

      {/* Comparison Table */}
      <div className="overflow-x-auto custom-scrollbar mb-8">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-white/10 text-gray-500 font-medium">
              <th className="pb-3 font-normal uppercase tracking-wider text-xs">Asset</th>
              <th className="pb-3 font-normal uppercase tracking-wider text-xs">Price</th>
              <th className="pb-3 font-normal uppercase tracking-wider text-xs">30D Return</th>
              <th className="pb-3 font-normal uppercase tracking-wider text-xs">1Y Return</th>
              <th className="pb-3 font-normal uppercase tracking-wider text-xs">Volatility</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr className="border-b border-white/10">
              <td className="py-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-gold-500)]" />
                24K Gold
              </td>
              <td className="py-4 font-mono">AED 3,105</td>
              <td className="py-4 text-green-400 font-medium">+5.4%</td>
              <td className="py-4 text-green-400 font-medium">+18.2%</td>
              <td className="py-4">Medium</td>
            </tr>
            <tr>
              <td className="py-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-400" />
                999 Silver
              </td>
              <td className="py-4 font-mono">AED 3.69</td>
              <td className="py-4 text-red-400 font-medium">-1.2%</td>
              <td className="py-4 text-green-400 font-medium">+12.4%</td>
              <td className="py-4">High</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Gold / Silver Ratio */}
      <div className="flex-1 mt-auto bg-black/40 border border-white/10 rounded-xl p-4 md:p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-sm text-gray-400 font-medium mb-1 uppercase tracking-widest">Gold/Silver Ratio</h3>
            <div className="text-2xl font-mono text-white">83.45</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">30D Avg</div>
            <div className="text-sm font-mono text-gray-300">82.10</div>
          </div>
        </div>

        <div className="h-[120px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ratioData}>
              <defs>
                <linearGradient id="colorRatio" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <YAxis domain={['dataMin - 2', 'dataMax + 2']} hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderColor: 'rgba(0,0,0,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#60a5fa', fontFamily: 'monospace' }}
                labelStyle={{ display: 'none' }}
                formatter={(value: any) => [value, 'Ratio']}
              />
              <Area 
                type="monotone" 
                dataKey="ratio" 
                stroke="#60a5fa" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorRatio)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <p className="text-xs text-gray-500 mt-4 leading-relaxed">
          The Gold/Silver ratio represents how many ounces of silver it takes to buy one ounce of gold. A higher ratio typically indicates silver is undervalued relative to gold.
        </p>
      </div>
    </div>
  );
}
