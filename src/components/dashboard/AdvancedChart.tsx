'use client';
import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// API fetches will replace local mock generation

export function AdvancedChart() {
  const [isMounted, setIsMounted] = useState(false);
  const [timeframe, setTimeframe] = useState('30D');
  const [karat, setKarat] = useState('24K');

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/historical?timeframe=${timeframe}&karat=${karat}`);
        if (res.ok) {
          const json = await res.json();
          // Map to match component format
          if (json.history) {
            setData(json.history.map((item: any) => ({
              date: item.date,
              price: item.priceAED
            })));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [timeframe, karat]);

  if (!isMounted) return <div className="py-16 min-h-[500px]"></div>;

  const currentPrice = data.length > 0 ? data[data.length - 1].price : 0;
  const high = data.length > 0 ? Math.max(...data.map((d: any) => d.price)) : 0;
  const low = data.length > 0 ? Math.min(...data.map((d: any) => d.price)) : 0;
  const avg = data.length > 0 ? Math.round(data.reduce((a: any, b: any) => a + b.price, 0) / data.length) : 0;
  const percentChange = data.length > 0 ? (((currentPrice - data[0].price) / data[0].price) * 100).toFixed(2) : '0.00';

  return (
    <div id="analytics" className="py-16">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-serif text-[var(--color-gold-300)] tracking-wide mb-2">
              GOLD PRICE PERFORMANCE
            </h2>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-mono text-white">AED {currentPrice.toLocaleString()}</span>
              <span className={`text-lg font-medium mb-1 ${parseFloat(percentChange) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {parseFloat(percentChange) >= 0 ? '+' : ''}{percentChange}%
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Karat Selector */}
            <div className="flex bg-black/5 p-1 rounded-lg border border-white/10">
              {['24K', '22K', '21K', '18K'].map(k => (
                <button
                  key={k}
                  onClick={() => setKarat(k)}
                  className={`px-4 py-1.5 rounded-md text-sm transition-colors ${karat === k ? 'bg-[var(--color-gold-600)] text-black font-semibold shadow-md' : 'text-gray-400 hover:text-white'}`}
                >
                  {k}
                </button>
              ))}
            </div>

            {/* Timeframe Selector */}
            <div className="flex bg-black/5 p-1 rounded-lg border border-white/10 overflow-x-auto custom-scrollbar">
              {['1D', '7D', '30D', '6M', '1Y', '5Y'].map(t => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors whitespace-nowrap ${timeframe === t ? 'bg-black/10 text-white font-medium' : 'text-gray-400 hover:text-white'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-black/50 p-4 rounded-xl border border-white/10">
            <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Highest</div>
            <div className="text-white font-mono">AED {high.toLocaleString()}</div>
          </div>
          <div className="bg-black/50 p-4 rounded-xl border border-white/10">
            <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Lowest</div>
            <div className="text-white font-mono">AED {low.toLocaleString()}</div>
          </div>
          <div className="bg-black/50 p-4 rounded-xl border border-white/10">
            <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Average</div>
            <div className="text-white font-mono">AED {avg.toLocaleString()}</div>
          </div>
          <div className="bg-black/50 p-4 rounded-xl border border-white/10">
            <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Volatility</div>
            <div className="text-white font-mono">Medium</div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[400px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-gold-500)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--color-gold-500)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickMargin={10}
                minTickGap={30}
              />
              <YAxis 
                domain={['dataMin - 1000', 'dataMax + 1000']} 
                stroke="#6b7280"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickFormatter={(val) => `AED ${val}`}
                orientation="right"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderColor: 'rgba(212,160,28,0.2)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--color-gold-400)', fontFamily: 'monospace' }}
                labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
                formatter={(value: any) => [`AED ${value.toLocaleString()}`, 'Price']}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="var(--color-gold-500)" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorPrice)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
