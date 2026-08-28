'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';

const mockSparkline = [
  { val: 10 }, { val: 12 }, { val: 11 }, { val: 14 }, 
  { val: 13 }, { val: 16 }, { val: 15 }, { val: 18 }
];
const mockSparklineDown = [
  { val: 18 }, { val: 15 }, { val: 16 }, { val: 13 }, 
  { val: 14 }, { val: 11 }, { val: 12 }, { val: 10 }
];

const marketData = [
  { id: '24k', title: '24K GOLD', price: '310.50', change: '+1.24%', isUp: true, data: mockSparkline },
  { id: '22k', title: '22K GOLD', price: '284.60', change: '+0.92%', isUp: true, data: mockSparkline },
  { id: '21k', title: '21K GOLD', price: '271.70', change: '+0.71%', isUp: true, data: mockSparkline },
  { id: '18k', title: '18K GOLD', price: '232.90', change: '+0.45%', isUp: true, data: mockSparkline },
  { id: 'silver', title: '999 SILVER', price: '3.69', change: '-0.24%', isUp: false, data: mockSparklineDown },
];

export function MarketOverview() {
  const [isMounted, setIsMounted] = useState(false);
  const [rates, setRates] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
    const fetchRates = async () => {
      try {
        const res = await fetch('/api/rates');
        if (res.ok) {
          const data = await res.json();
          setRates(data);
        }
      } catch (err) {
        console.error('Failed to fetch rates', err);
      }
    };
    fetchRates();
    const interval = setInterval(fetchRates, 10000);
    return () => clearInterval(interval);
  }, []);

  const currentData = rates ? [
    { id: '24k', title: '24K GOLD', price: rates.gold['24K'].toLocaleString('en-US', {maximumFractionDigits:2}), change: '+0.00%', isUp: true, data: mockSparkline },
    { id: '22k', title: '22K GOLD', price: rates.gold['22K'].toLocaleString('en-US', {maximumFractionDigits:2}), change: '+0.00%', isUp: true, data: mockSparkline },
    { id: '21k', title: '21K GOLD', price: rates.gold['21K'].toLocaleString('en-US', {maximumFractionDigits:2}), change: '+0.00%', isUp: true, data: mockSparkline },
    { id: '18k', title: '18K GOLD', price: rates.gold['18K'].toLocaleString('en-US', {maximumFractionDigits:2}), change: '+0.00%', isUp: true, data: mockSparkline },
    { id: 'silver', title: '999 SILVER', price: rates.silver['999'].toLocaleString('en-US', {maximumFractionDigits:2}), change: '+0.00%', isUp: true, data: mockSparkline },
  ] : marketData;

  if (!isMounted) return <div className="py-16 min-h-[300px]"></div>;

  return (
    <div id="market" className="py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-serif text-[var(--color-gold-300)] tracking-wide">
            GOLD MARKET OVERVIEW
          </h2>
          <p className="text-sm text-gray-400 mt-1">Live spot prices and intraday momentum.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 bg-black/5 px-3 py-1.5 rounded-full border border-white/10">
          <Clock size={14} />
          <span>Last Updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {currentData.map((item) => (
          <div 
            key={item.id}
            className="group relative bg-[#0a0a0a] border border-white/10 rounded-xl p-5 hover:border-[var(--color-gold-500)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,160,28,0.1)] cursor-pointer overflow-hidden flex flex-col min-h-[180px]"
          >
            {/* Sparkline Background */}
            <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity z-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={item.data}>
                  <YAxis domain={['dataMin - 2', 'dataMax + 2']} hide />
                  <Line 
                    type="monotone" 
                    dataKey="val" 
                    stroke={item.isUp ? '#4ade80' : '#f87171'} 
                    strokeWidth={2} 
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="relative z-10 flex-1">
              <div className="text-gray-300 text-xs font-semibold tracking-widest mb-2 whitespace-nowrap">{item.title}</div>
              <div className="text-2xl font-mono text-white">AED {item.price}<span className="text-sm text-gray-400">/g</span></div>
              <div className="text-sm font-mono text-gray-300 mb-2">₹{(parseFloat(item.price.replace(',', '')) * 22.85).toLocaleString(undefined, { maximumFractionDigits: 0 })}<span className="text-xs text-gray-500">/g</span></div>

              <div className={`flex items-center gap-1 text-sm font-medium ${item.isUp ? 'text-green-400' : 'text-red-400'}`}>
                {item.isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {item.change}
              </div>
            </div>

            {/* Hover Details - Absolute Drawer */}
            <div className="absolute inset-x-0 bottom-0 bg-[#0a0a0a]/95 backdrop-blur-md p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-white/10 text-xs space-y-2 z-20">
              <div className="flex justify-between text-gray-300">
                <span>7-Day:</span>
                <span className={item.isUp ? 'text-green-400' : 'text-red-400'}>{item.isUp ? '+3.1%' : '-1.2%'}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>30-Day:</span>
                <span className={item.isUp ? 'text-green-400' : 'text-red-400'}>{item.isUp ? '+5.4%' : '-2.8%'}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Per 10g (AED):</span>
                <span className="text-white font-mono font-bold">AED {(parseFloat(item.price.replace(',','')) * 10).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Per 10g (INR):</span>
                <span className="text-white font-mono font-bold">₹{((parseFloat(item.price.replace(',','')) * 10) * 22.85).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
