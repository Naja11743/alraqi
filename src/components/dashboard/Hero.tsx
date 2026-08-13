import React from 'react';

export function Hero() {
  // We'll use static mock data for the ticker. In a real app, this would be updated via websockets or SWR polling.
  const tickerItems = [
    { label: '24K GOLD', price: 'AED 3,293', change: '+1.24%', up: true },
    { label: '22K GOLD', price: 'AED 3,019', change: '+0.92%', up: true },
    { label: '21K GOLD', price: 'AED 2,881', change: '+0.71%', up: true },
    { label: '18K GOLD', price: 'AED 2,470', change: '+0.45%', up: true },
    { label: '999 SILVER', price: 'AED 3.91', change: '-0.24%', up: false },
  ];

  return (
    <div className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden border-b border-black/5">
      {/* Background elements for that premium fintech feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--color-gold-300)] rounded-full blur-[120px] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-[var(--color-gold-200)] shadow-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-[var(--color-gold-500)] animate-pulse" />
          <span className="text-xs font-mono text-gray-700 tracking-widest">AL RAQI GOLD PLATFORM</span>
        </div>
        
        <h1 className="text-4xl md:text-7xl font-serif text-gray-900 mb-6 tracking-tight">
          THE GOLD MARKET, <span className="text-[var(--color-gold-400)] italic pr-2">SIMPLIFIED.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed mb-12">
          Track live gold prices, understand market trends, compare global prices, and explore historical investment performance.
        </p>
      </div>

      {/* Live Market Ticker */}
      <div className="w-full bg-[var(--background)]/80 backdrop-blur-md border-y border-black/5 py-3 mt-8 overflow-hidden flex transform-gpu">
        <div className="flex animate-marquee whitespace-nowrap will-change-transform">
          {/* Double the array for seamless looping */}
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} className="flex items-center gap-4 mx-8">
              <span className="font-semibold text-gray-700 font-mono">{item.label}</span>
              <span className="text-gray-900 font-mono">{item.price}/g</span>
              <span className={`text-sm font-mono flex items-center ${item.up ? 'text-green-600' : 'text-red-600'}`}>
                {item.up ? '↑' : '↓'}{item.change}
              </span>
              <span className="text-gray-900/20 ml-8">|</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
