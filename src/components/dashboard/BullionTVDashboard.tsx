'use client';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface Rates {
  gold: {
    '24K': number;
    '22K': number;
    '21K': number;
    '18K': number;
  };
  silver: {
    '999': number;
  };
  timestamp: string;
  status: string;
}

export function BullionTVDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [rates, setRates] = useState<Rates | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch('/api/rates');
        const data = await res.json();
        setRates(data);
      } catch (err) {
        console.error('Failed to fetch rates', err);
      }
    };
    
    fetchRates();
    const rateTimer = setInterval(fetchRates, 30000); // Fetch every 30s
    return () => clearInterval(rateTimer);
  }, []);

  // Calculations
  const aedToUsd = 1 / 3.6725;
  const ozInGrams = 31.1034768;
  const ttbInGrams = 116.638;

  // Spot USD/Oz Calculations
  const goldSpotUsd = rates ? (rates.gold['24K'] * ozInGrams * aedToUsd) : 0;
  const silverSpotUsd = rates ? (rates.silver['999'] * ozInGrams * aedToUsd) : 0;

  // Formatting helpers
  const fmt = (num: number, dec = 2) => num.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  const fmtAed = (num: number) => num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div className="w-full h-screen bg-[#0a0a0a] text-white overflow-hidden flex flex-col p-4 space-y-4 font-sans">
      
      {/* TOP SECTION */}
      <div className="flex justify-between items-stretch h-[25vh]">
        {/* Top Left: Video/Chart Placeholder */}
        <div className="w-[45%] border border-[var(--color-gold-500)]/40 bg-black/40 rounded-lg relative overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-gold-900)]/20 to-transparent"></div>
             <span className="text-[var(--color-gold-700)]/50 tracking-widest uppercase text-sm font-mono z-10">AL RAQI MARKET FEED</span>
        </div>

        {/* Top Right: Date & Logo */}
        <div className="flex-1 flex justify-between items-center px-10 border border-[var(--color-gold-500)]/40 bg-[#0f0f0f] ml-4 rounded-lg shadow-[0_0_15px_rgba(212,160,28,0.05)]">
          <div className="text-center text-[var(--color-gold-400)] tracking-widest">
            <div className="text-xl font-light uppercase">{format(currentTime, 'EEEE')}</div>
            <div className="text-2xl font-medium">{format(currentTime, 'dd MMM yyyy').toUpperCase()}</div>
          </div>
          
          <div className="text-center">
            <div className="text-6xl font-serif text-[var(--color-gold-500)] tracking-widest leading-none">AL RAQI</div>
            <div className="text-sm text-[var(--color-gold-400)]/70 uppercase tracking-[0.4em] mt-2">Professional Bullion</div>
          </div>

          <div className="text-[var(--color-gold-400)] text-5xl font-light tracking-wide font-mono">
            {format(currentTime, 'HH:mm')}
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION */}
      <div className="flex-1 flex space-x-4 h-[60vh]">
        
        {/* Left: Spot Rate & Sentiment */}
        <div className="w-[45%] flex flex-col space-y-4">
          <div className="flex-1 border border-[var(--color-gold-500)]/40 rounded-lg flex flex-col bg-[#0f0f0f] overflow-hidden">
            <div className="flex bg-[var(--color-gold-600)] text-black font-bold text-sm py-3 px-6 justify-between items-center shadow-md">
              <span className="w-1/3 text-left tracking-widest uppercase">SPOT RATE</span>
              <span className="w-1/3 text-center tracking-widest uppercase">BUY / OZ</span>
              <span className="w-1/3 text-center tracking-widest uppercase">SELL / OZ</span>
            </div>
            
            <div className="flex-1 p-6 flex flex-col justify-around">
              {/* Gold Row */}
              <div className="flex items-start justify-between border-b border-[var(--color-gold-500)]/20 pb-6">
                <span className="text-4xl font-serif text-[var(--color-gold-300)] w-1/3 mt-2">GOLD</span>
                <div className="w-1/3 flex flex-col items-center">
                  <div className="text-4xl text-white bg-black/60 px-2 py-3 border border-gray-700 w-full text-center tracking-wider font-mono rounded-md shadow-inner">{rates ? fmt(goldSpotUsd - 0.5) : '...'}</div>
                  <div className="mt-3 flex items-center space-x-2 text-xs">
                    <span className="bg-red-900/80 text-red-200 px-2 py-0.5 rounded font-mono uppercase tracking-wider">Low</span>
                    <span className="text-gray-400 font-mono">{rates ? fmt(goldSpotUsd - 12.5) : '...'}</span>
                  </div>
                </div>
                <div className="w-1/3 flex flex-col items-center pl-4">
                  <div className="text-4xl text-white bg-black/60 px-2 py-3 border border-gray-700 w-full text-center tracking-wider font-mono rounded-md shadow-inner">{rates ? fmt(goldSpotUsd + 0.5) : '...'}</div>
                  <div className="mt-3 flex items-center space-x-2 text-xs">
                    <span className="bg-green-900/80 text-green-200 px-2 py-0.5 rounded font-mono uppercase tracking-wider">High</span>
                    <span className="text-gray-400 font-mono">{rates ? fmt(goldSpotUsd + 15.2) : '...'}</span>
                  </div>
                </div>
              </div>

              {/* Silver Row */}
              <div className="flex items-start justify-between pt-6">
                <span className="text-4xl font-serif text-gray-300 w-1/3 mt-2">SILVER</span>
                <div className="w-1/3 flex flex-col items-center">
                  <div className="text-4xl text-white bg-black/60 px-2 py-3 border border-gray-700 w-full text-center tracking-wider font-mono rounded-md shadow-inner">{rates ? fmt(silverSpotUsd - 0.05, 3) : '...'}</div>
                  <div className="mt-3 flex items-center space-x-2 text-xs">
                    <span className="bg-red-900/80 text-red-200 px-2 py-0.5 rounded font-mono uppercase tracking-wider">Low</span>
                    <span className="text-gray-400 font-mono">{rates ? fmt(silverSpotUsd - 0.8, 3) : '...'}</span>
                  </div>
                </div>
                <div className="w-1/3 flex flex-col items-center pl-4">
                  <div className="text-4xl text-white bg-black/60 px-2 py-3 border border-gray-700 w-full text-center tracking-wider font-mono rounded-md shadow-inner">{rates ? fmt(silverSpotUsd + 0.05, 3) : '...'}</div>
                  <div className="mt-3 flex items-center space-x-2 text-xs">
                    <span className="bg-green-900/80 text-green-200 px-2 py-0.5 rounded font-mono uppercase tracking-wider">High</span>
                    <span className="text-gray-400 font-mono">{rates ? fmt(silverSpotUsd + 1.2, 3) : '...'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Buyers vs Sellers */}
          <div className="border border-[var(--color-gold-500)]/40 rounded-lg p-6 h-[140px] bg-[#0f0f0f] flex flex-col justify-center shadow-[0_0_15px_rgba(212,160,28,0.05)]">
            <div className="flex justify-between text-xs text-[var(--color-gold-400)] mb-4 uppercase tracking-widest font-bold">
              <span>BUYERS</span>
              <span>SELLERS</span>
            </div>
            <div className="relative w-full h-2 bg-red-900/50 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all duration-1000" style={{ width: '42%' }}></div>
            </div>
            <div className="flex justify-between mt-4 text-sm font-mono">
              <span className="text-green-400 font-medium tracking-wide">42.00%</span>
              <span className="text-red-400 font-medium tracking-wide">-16.00%</span>
              <span className="text-red-400 font-medium tracking-wide">58.00%</span>
            </div>
          </div>
        </div>

        {/* Right: Commodity */}
        <div className="flex-1 border border-[var(--color-gold-500)]/40 rounded-lg flex flex-col bg-[#0f0f0f] overflow-hidden shadow-[0_0_15px_rgba(212,160,28,0.05)]">
          <div className="flex bg-[var(--color-gold-600)] text-black font-bold text-sm uppercase py-3 px-8 shadow-md">
            <span className="w-1/4 tracking-widest">COMMODITY</span>
            <span className="w-1/4 text-center tracking-widest">WEIGHT</span>
            <span className="w-1/4 text-right tracking-widest">BUY <span className="text-[10px] font-semibold opacity-80">AED</span></span>
            <span className="w-1/4 text-right tracking-widest">SELL <span className="text-[10px] font-semibold opacity-80">AED</span></span>
          </div>
          
          <div className="flex-1 flex flex-col justify-around py-4">
            {[
              { name: 'GOLD', detail: '9999', weight: '1 KG', 
                buy: rates ? (rates.gold['24K'] * 1000) - 50 : 0, 
                sell: rates ? (rates.gold['24K'] * 1000) + 50 : 0 },
              { name: 'GOLD', detail: '999', weight: '1 KG', 
                buy: rates ? (rates.gold['24K'] * 0.999 * 1000) - 50 : 0, 
                sell: rates ? (rates.gold['24K'] * 0.999 * 1000) + 50 : 0 },
              { name: 'GOLD', detail: '995', weight: '1 KG', 
                buy: rates ? (rates.gold['24K'] * 0.995 * 1000) - 50 : 0, 
                sell: rates ? (rates.gold['24K'] * 0.995 * 1000) + 50 : 0 },
              { name: 'GOLD', detail: 'TTB', weight: '1 TTB', 
                buy: rates ? (rates.gold['24K'] * 0.995 * ttbInGrams) - 10 : 0, 
                sell: rates ? (rates.gold['24K'] * 0.995 * ttbInGrams) + 10 : 0 },
              { name: 'SILVER', detail: '1 KG', weight: '1 KG', 
                buy: rates ? (rates.silver['999'] * 1000) - 20 : 0, 
                sell: rates ? (rates.silver['999'] * 1000) + 20 : 0 }
            ].map((item, idx) => (
              <div key={idx} className={`flex items-center px-8 py-5 ${idx !== 4 ? 'border-b border-[var(--color-gold-500)]/10' : ''} hover:bg-white/5 transition-colors`}>
                <div className="w-1/4 flex items-baseline space-x-3">
                  <span className={`text-3xl font-bold tracking-wide ${item.name === 'SILVER' ? 'text-gray-300' : 'text-[var(--color-gold-400)]'}`}>{item.name}</span>
                  <span className="text-sm text-gray-500 font-mono tracking-wider">{item.detail}</span>
                </div>
                <div className="w-1/4 text-center text-xl text-gray-400 font-mono">{item.weight}</div>
                <div className="w-1/4 text-right text-4xl font-light tracking-wider font-mono text-white">{rates ? fmtAed(item.buy) : '...'}</div>
                <div className="w-1/4 text-right text-4xl font-light tracking-wider font-mono text-white">{rates ? fmtAed(item.sell) : '...'}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION: News Ticker */}
      <div className="h-[70px] border border-[var(--color-gold-500)]/40 rounded-lg flex items-stretch overflow-hidden bg-[#0f0f0f] shadow-[0_0_15px_rgba(212,160,28,0.05)]">
        <div className="bg-[var(--color-gold-900)]/40 border-r border-[var(--color-gold-500)]/40 text-[var(--color-gold-300)] flex flex-col justify-center px-8 min-w-fit z-10 py-2">
          <span className="text-xs tracking-widest uppercase font-bold">Al Raqi</span>
          <span className="text-xs tracking-widest uppercase font-bold">News</span>
        </div>
        <div className="flex-1 relative overflow-hidden flex items-center whitespace-nowrap bg-black/40 text-gray-300">
          <div className="animate-marquee inline-block text-xl tracking-wide font-light">
            AL RAQI NEWS | Global Gold Market Stabilizes Amidst Central Bank Announcements | Local AED Demand Remains Strong | Silver Spot Shows Upward Momentum For Next Quarter | Connect with Al Raqi Gold for Premium Bullion Trading
          </div>
        </div>
      </div>

    </div>
  );
}
