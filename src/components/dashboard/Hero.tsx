import React, { useState, useEffect } from 'react';

export function Hero() {
  const [rates, setRates] = useState<any>(null);

  useEffect(() => {
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

  const tickerData = rates ? [
    { label: '24K GOLD', price: `AED ${rates.gold['24K'].toLocaleString('en-US', {maximumFractionDigits:2})}`, change: '+0.00%', up: true },
    { label: '22K GOLD', price: `AED ${rates.gold['22K'].toLocaleString('en-US', {maximumFractionDigits:2})}`, change: '+0.00%', up: true },
    { label: '21K GOLD', price: `AED ${rates.gold['21K'].toLocaleString('en-US', {maximumFractionDigits:2})}`, change: '+0.00%', up: true },
    { label: '18K GOLD', price: `AED ${rates.gold['18K'].toLocaleString('en-US', {maximumFractionDigits:2})}`, change: '+0.00%', up: true },
    { label: '999 SILVER', price: `AED ${rates.silver['999'].toLocaleString('en-US', {maximumFractionDigits:2})}`, change: '+0.00%', up: true },
  ] : [
    { label: '24K GOLD', price: 'AED 0.00', change: '+0.00%', up: true },
    { label: '22K GOLD', price: 'AED 0.00', change: '+0.00%', up: true },
    { label: '21K GOLD', price: 'AED 0.00', change: '+0.00%', up: true },
    { label: '18K GOLD', price: 'AED 0.00', change: '+0.00%', up: true },
    { label: '999 SILVER', price: 'AED 0.00', change: '+0.00%', up: true },
  ];

  return (
    <div className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden border-b border-white/10">
      {/* Background elements for that premium fintech feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--color-gold-300)] rounded-full blur-[120px] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-[var(--color-gold-200)] shadow-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-[var(--color-gold-500)] animate-pulse" />
          <span className="text-xs font-mono text-gray-300 tracking-widest">AL RAQI GOLD PLATFORM</span>
        </div>
        
        <h1 className="text-4xl md:text-7xl font-serif text-white mb-6 tracking-tight">
          THE GOLD MARKET, <span className="text-[var(--color-gold-400)] italic pr-2">SIMPLIFIED.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
          Track live gold prices, understand market trends, compare global prices, and explore historical investment performance.
        </p>
      </div>

      {/* Live Market Ticker */}
      <div className="w-full bg-[#0a0a0a]/80 backdrop-blur-md border-y border-white/10 py-3 mt-8 overflow-hidden flex transform-gpu">
        <div className="flex animate-marquee whitespace-nowrap will-change-transform">
          {/* Double the array for seamless looping */}
          {[...tickerData, ...tickerData, ...tickerData].map((item, i) => (
            <div key={i} className="flex items-center gap-4 mx-8">
              <span className="font-semibold text-gray-300 font-mono">{item.label}</span>
              <span className="text-white font-mono">{item.price}/g</span>
              <span className={`text-sm font-mono flex items-center ${item.up ? 'text-green-600' : 'text-red-600'}`}>
                {item.up ? '↑' : '↓'}{item.change}
              </span>
              <span className="text-white/20 ml-8">|</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
