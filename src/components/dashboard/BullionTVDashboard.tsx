'use client';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { FlashBox } from '@/components/ui/FlashBox';
import { AnalogClock } from '@/components/ui/AnalogClock';

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
  spotUsd?: {
    gold: {
      spot?: number;
      bid: number;
      ask: number;
      low: number;
      high: number;
    };
    silver: {
      spot?: number;
      bid: number;
      ask: number;
      low: number;
      high: number;
    }
  };
  timestamp: string;
  status: string;
}

export function BullionTVDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' })));
  const [rates, setRates] = useState<Rates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' })));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let ws: WebSocket;
    let pollInterval: NodeJS.Timeout;
    let baseSilver = 28.50; // Fallback if API fails
    let isInitialFetchDone = false;

    // 1. Initial REST fetch to seed all commodity prices
    const fetchInitialRates = async () => {
      const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' }));
      const isClosed = (now.getDay() === 6 && now.getHours() >= 1) || now.getDay() === 0 || (now.getDay() === 1 && now.getHours() < 2);
      if (isClosed && isInitialFetchDone) return; // Fetch once if closed, then skip polling

      try {
        const res = await fetch('/api/rates', { cache: 'no-store' });
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        setRates(data);
        if (data?.spotUsd?.silver?.spot) {
          baseSilver = data.spotUsd.silver.spot;
        }
        setError(false);
      } catch (err) {
        console.error('Failed to fetch rates', err);
        setError(true);
      } finally {
        setIsLoading(false);
        isInitialFetchDone = true;
      }
    };
    
    fetchInitialRates();
    pollInterval = setInterval(fetchInitialRates, 3000);

    // 2. Local simulation loop for guaranteed continuous flashing effect
    const simInterval = setInterval(() => {
      if (!isInitialFetchDone) return;
      
      const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' }));
      const isClosed = (now.getDay() === 6 && now.getHours() >= 1) || now.getDay() === 0 || (now.getDay() === 1 && now.getHours() < 2);
      if (isClosed) return; // Suspend flashing if market is closed
      
      const tickTime = new Date().toISOString() + Math.random().toString();
      
      setRates(prev => {
        if (!prev) return prev;
        
        const usdToAed = 3.6725;
        const gramsPerOz = 31.1034768;
        
        // Apply a micro fluctuation to simulate live ticking visually until the next REST poll
        const currentSpot = prev.spotUsd?.gold?.spot || 4381.03;
        const simulatedLiveGold = currentSpot + (Math.random() - 0.5) * 0.5;
        
        const currentSilverSpot = prev.spotUsd?.silver?.spot || 28.30;
        const simulatedLiveSilver = currentSilverSpot + (Math.random() - 0.5) * 0.05;
        
        const goldAedPerGram24K = (simulatedLiveGold / gramsPerOz) * usdToAed;
        const silverAedPerGram999 = (simulatedLiveSilver / gramsPerOz) * usdToAed;
        
        return {
          ...prev,
          gold: {
            '24K': goldAedPerGram24K,
            '22K': goldAedPerGram24K * (22 / 24),
            '21K': goldAedPerGram24K * (21 / 24),
            '18K': goldAedPerGram24K * (18 / 24),
          },
          silver: {
            '999': silverAedPerGram999,
          },
          spotUsd: {
            ...prev.spotUsd,
            gold: {
              spot: simulatedLiveGold,
              bid: simulatedLiveGold,
              ask: simulatedLiveGold,
              low: prev.spotUsd?.gold?.low || simulatedLiveGold - 10,
              high: prev.spotUsd?.gold?.high || simulatedLiveGold + 10
            },
            silver: {
              spot: simulatedLiveSilver,
              bid: simulatedLiveSilver,
              ask: simulatedLiveSilver,
              low: prev.spotUsd?.silver?.low || simulatedLiveSilver - 1,
              high: prev.spotUsd?.silver?.high || simulatedLiveSilver + 1
            }
          },
          timestamp: tickTime
        };
      });
    }, 1000); // Guaranteed tick every 1 second

    return () => {
      clearInterval(simInterval);
      clearInterval(pollInterval);
    };
  }, []);

  const ttbInGrams = 116.638;
  const fmt = (num: number, dec = 2) => num.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec, useGrouping: false });
  const fmtAed = (num: number, dec = 0) => num.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  const isMarketClosed = mounted && (
    (currentTime.getDay() === 6 && currentTime.getHours() >= 1) || 
    currentTime.getDay() === 0 || 
    (currentTime.getDay() === 1 && currentTime.getHours() < 2)
  );

  let countdownText = "";
  if (isMarketClosed) {
    const nextOpenTime = new Date(currentTime);
    if (currentTime.getDay() === 6) nextOpenTime.setDate(currentTime.getDate() + 2);
    else if (currentTime.getDay() === 0) nextOpenTime.setDate(currentTime.getDate() + 1);
    nextOpenTime.setHours(2, 0, 0, 0);

    const diffMs = nextOpenTime.getTime() - currentTime.getTime();
    if (diffMs > 0) {
      const d = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const h = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      countdownText = `Market closed. Opens in ${d > 0 ? d + 'd ' : ''}${h > 0 || d > 0 ? h + 'h ' : ''}${m}m`;
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-white overflow-hidden flex flex-col p-2 sm:p-4 gap-4 font-sans max-w-[100vw] relative">
      
      {isMarketClosed && (
        <div className="fixed top-12 -left-20 w-[350px] bg-red-600 text-white font-bold py-2 sm:py-3 transform -rotate-45 z-[100] shadow-[0_0_20px_rgba(220,38,38,0.5)] border-y-2 border-red-400/50 pointer-events-none overflow-hidden flex items-center">
          <div className="animate-marquee inline-block whitespace-nowrap tracking-widest text-xs sm:text-sm lg:text-base">
            <span className="px-8">{countdownText}</span>
            <span className="px-8">{countdownText}</span>
            <span className="px-8">{countdownText}</span>
          </div>
        </div>
      )}

      {/* TOP SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch gap-4 lg:min-h-[22vh] flex-shrink-0">
        {/* Top Left: World Clocks */}
        <div className="hidden sm:flex w-full lg:w-[45%] h-24 lg:h-auto border border-[var(--color-gold-500)]/40 bg-black/40 rounded-lg relative overflow-hidden items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-gold-900)]/20 to-transparent pointer-events-none"></div>
             <div className="z-10 flex w-full justify-evenly items-center gap-4 px-4 py-2">
               <AnalogClock timezone="Asia/Kolkata" label="INDIA" countryCode="in" />
               <AnalogClock timezone="Europe/London" label="ENGLAND" countryCode="gb" />
               <AnalogClock timezone="America/New_York" label="USA" countryCode="us" />
             </div>
        </div>

        {/* Top Right: Date & Logo */}
        <div className="flex-1 flex flex-col sm:flex-row justify-between items-center py-2 sm:py-4 px-4 sm:px-10 gap-4 sm:gap-2 border border-[var(--color-gold-500)]/40 bg-[#0f0f0f] rounded-lg shadow-[0_0_15px_rgba(212,160,28,0.05)] text-center sm:text-left">
          <div className="text-[var(--color-gold-400)] tracking-widest flex flex-col items-center sm:items-start order-2 sm:order-1">
            <div className="text-sm sm:text-xl font-light uppercase">{mounted ? format(currentTime, 'EEEE') : '\u00A0'}</div>
            <div className="text-lg sm:text-2xl font-medium">{mounted ? format(currentTime, 'dd MMM yyyy').toUpperCase() : '\u00A0'}</div>
          </div>
          
          <div className="flex flex-col items-center order-1 sm:order-2 mt-1 sm:mt-0 flex-shrink-0">
            <img src="/logo.png" alt="Al Raqi Logo" className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 object-contain mb-0 sm:mb-2 contrast-150 saturate-200 drop-shadow-[0_0_4px_rgba(212,160,28,0.8)]" />
            <div className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[var(--color-gold-500)] tracking-[0.15em] leading-none uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] whitespace-nowrap">AL RAQI</div>
            <div className="text-[10px] sm:text-sm text-[var(--color-gold-400)]/70 uppercase tracking-[0.2em] sm:tracking-[0.4em] mt-1 whitespace-nowrap">Professional Bullion</div>
          </div>

          <div className="text-[var(--color-gold-400)] text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide font-mono order-3 min-w-[120px] text-center">
            {mounted ? format(currentTime, 'HH:mm') : '--:--'}
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
        
        {/* Left: Spot Rate & Sentiment */}
        <div className="w-full lg:w-[45%] flex flex-col gap-4 h-full">
          <div className="flex-1 border border-[var(--color-gold-500)]/40 rounded-lg flex flex-col bg-[#0f0f0f] overflow-hidden min-h-[250px]">
            <div className="grid grid-cols-[30%_35%_35%] bg-gradient-to-r from-[#d97706] via-[#facc15] to-[#d97706] text-black font-black text-sm sm:text-base lg:text-lg py-2 sm:py-3 px-2 sm:px-4 items-center shadow-[0_4px_15px_rgba(250,204,21,0.4)] border-b-2 border-[#facc15]/60">
              <span className="text-left tracking-[0.2em] uppercase drop-shadow-md">SPOT RATE</span>
              <span className="text-center tracking-[0.2em] uppercase border-l-2 border-black/60 drop-shadow-md">BID</span>
              <span className="text-center tracking-[0.2em] uppercase border-l-2 border-black/60 drop-shadow-md">ASK</span>
            </div>
            
            <div className="flex-1 p-2 sm:p-4 flex flex-col justify-center gap-y-4 sm:gap-y-6 relative min-h-0">
              {isLoading && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0f0f0f]/80 backdrop-blur-sm">
                  <Loader2 className="w-8 h-8 text-[var(--color-gold-500)] animate-spin mb-4" />
                  <span className="text-[var(--color-gold-400)] font-mono tracking-widest text-xs uppercase text-center px-4">Fetching Live Market Data...</span>
                </div>
              )}
              {error && !isLoading && !rates && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0f0f0f]/90">
                  <span className="text-red-500 font-mono tracking-widest text-sm uppercase">Connection Lost</span>
                  <span className="text-gray-500 text-xs mt-2 text-center px-4">Attempting to reconnect...</span>
                </div>
              )}

              {/* Gold Row */}
              <div className="grid grid-cols-[30%_35%_35%] items-center">
                <div className="flex flex-col">
                  <span className="text-2xl lg:text-3xl xl:text-4xl font-serif font-bold text-[var(--color-gold-300)] leading-none">GOLD</span>
                  <span className="text-[10px] sm:text-xs lg:text-sm text-[var(--color-gold-500)]/60 font-sans tracking-widest uppercase mt-1">Oz</span>
                </div>
                <div className="flex flex-col items-center px-1 border-l-2 border-black h-full">
                  <FlashBox tick={rates?.timestamp} value={rates?.spotUsd?.gold.bid} className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white">
                    {rates?.spotUsd ? `$${fmt(rates.spotUsd.gold.bid)}` : '...'}
                  </FlashBox>
                  <div className="mt-1 sm:mt-2 flex flex-wrap items-center justify-center gap-x-1 sm:gap-x-2 text-[9px] sm:text-[10px] lg:text-xs w-full">
                    <span className="text-gray-500 font-bold uppercase tracking-wider">Low</span>
                    <span className="text-red-400 font-mono font-medium">{rates?.spotUsd ? `$${fmt(rates.spotUsd.gold.low)}` : '...'}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center px-1 border-l-2 border-black h-full">
                  <FlashBox tick={rates?.timestamp} value={rates?.spotUsd ? rates.spotUsd.gold.bid + 0.50 : undefined} className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white">
                    {rates?.spotUsd ? `$${fmt(rates.spotUsd.gold.bid + 0.50)}` : '...'}
                  </FlashBox>
                  <div className="mt-1 sm:mt-2 flex flex-wrap items-center justify-center gap-x-1 sm:gap-x-2 text-[9px] sm:text-[10px] lg:text-xs w-full">
                    <span className="text-gray-500 font-bold uppercase tracking-wider">High</span>
                    <span className="text-green-400 font-mono font-medium">{rates?.spotUsd ? `$${fmt(rates.spotUsd.gold.high)}` : '...'}</span>
                  </div>
                </div>
              </div>

              {/* Horizontal Divider */}
              <div className="w-full h-px bg-[var(--color-gold-500)]/20 my-1"></div>

              {/* Silver Row */}
              <div className="grid grid-cols-[30%_35%_35%] items-center">
                <div className="flex flex-col">
                  <span className="text-2xl lg:text-3xl xl:text-4xl font-serif font-bold text-[#c0c0c0] leading-none">SILVER</span>
                  <span className="text-[10px] sm:text-xs lg:text-sm text-gray-500/60 font-sans tracking-widest uppercase mt-1">Oz</span>
                </div>
                <div className="flex flex-col items-center px-1 border-l-2 border-black h-full">
                  <FlashBox value={rates?.spotUsd?.silver.bid} className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white">
                    {rates?.spotUsd ? `$${fmt(rates.spotUsd.silver.bid, 3)}` : '...'}
                  </FlashBox>
                  <div className="mt-1 sm:mt-2 flex flex-wrap items-center justify-center gap-x-1 sm:gap-x-2 text-[9px] sm:text-[10px] lg:text-xs w-full">
                    <span className="text-gray-500 font-bold uppercase tracking-wider">Low</span>
                    <span className="text-red-400 font-mono font-medium">{rates?.spotUsd ? `$${fmt(rates.spotUsd.silver.low, 3)}` : '...'}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center px-1 border-l-2 border-black h-full">
                  <FlashBox value={rates?.spotUsd ? rates.spotUsd.silver.bid + 0.030 : undefined} className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white">
                    {rates?.spotUsd ? `$${fmt(rates.spotUsd.silver.bid + 0.030, 3)}` : '...'}
                  </FlashBox>
                  <div className="mt-1 sm:mt-2 flex flex-wrap items-center justify-center gap-x-1 sm:gap-x-2 text-[9px] sm:text-[10px] lg:text-xs w-full">
                    <span className="text-gray-500 font-bold uppercase tracking-wider">High</span>
                    <span className="text-green-400 font-mono font-medium">{rates?.spotUsd ? `$${fmt(rates.spotUsd.silver.high, 3)}` : '...'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Buyers vs Sellers */}
          <div className="border border-[var(--color-gold-500)]/40 rounded-lg p-4 sm:p-6 h-auto sm:h-[140px] bg-[#0f0f0f] flex flex-col justify-center shadow-[0_0_15px_rgba(212,160,28,0.05)] flex-shrink-0">
            <div className="flex justify-between text-[10px] sm:text-xs text-[var(--color-gold-400)] mb-3 sm:mb-4 uppercase tracking-widest font-bold">
              <span>BUYERS</span>
              <span>SELLERS</span>
            </div>
            <div className="relative w-full h-2 bg-red-900/50 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all duration-1000" style={{ width: '62%' }}></div>
            </div>
            <div className="flex justify-between mt-3 sm:mt-4 text-xs sm:text-sm font-mono">
              <span className="text-green-400 font-medium tracking-wide">62.00%</span>
              <span className="text-green-400 font-medium tracking-wide hidden sm:inline">+14.00%</span>
              <span className="text-red-400 font-medium tracking-wide">38.00%</span>
            </div>
          </div>
        </div>

        {/* Right: Commodity */}
        <div className="flex-1 w-full border border-[var(--color-gold-500)]/40 rounded-lg flex flex-col bg-[#0f0f0f] overflow-hidden shadow-[0_0_15px_rgba(212,160,28,0.05)] h-full">
          <div className="flex bg-gradient-to-r from-[#d97706] via-[#facc15] to-[#d97706] text-black font-black text-xs sm:text-sm lg:text-base uppercase py-2 sm:py-3 px-2 sm:px-4 lg:px-8 shadow-[0_4px_15px_rgba(250,204,21,0.4)] border-b-2 border-[#facc15]/60">
            <span className="w-[30%] tracking-[0.2em] drop-shadow-md">COMMODITY</span>
            <span className="w-[20%] text-center tracking-[0.2em] border-l-2 border-black/60 drop-shadow-md">WEIGHT</span>
            <span className="w-[25%] text-center tracking-[0.2em] border-l-2 border-black/60 drop-shadow-md">BUY <span className="text-[9px] sm:text-[10px] lg:text-xs font-bold opacity-90 drop-shadow-sm">AED</span></span>
            <span className="w-[25%] text-right tracking-[0.2em] border-l-2 border-black/60 drop-shadow-md">SELL <span className="text-[9px] sm:text-[10px] lg:text-xs font-bold opacity-90 drop-shadow-sm">AED</span></span>
          </div>
          
          <div className="flex-1 flex flex-col py-1 sm:py-2 lg:py-4 overflow-hidden min-h-[300px]">
            {[
              { name: 'GOLD', detail: '9999', weight: '1 GM', 
                buy: rates ? (rates.gold['24K']) - 0.5 : 0, 
                sell: rates ? (rates.gold['24K']) + 0.5 : 0 },
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
              <div key={idx} className={`flex items-center px-2 sm:px-4 lg:px-8 flex-1 ${idx !== 4 ? 'border-b border-[var(--color-gold-500)]/10' : ''} hover:bg-white/5 transition-colors`}>
                <div className="w-[30%] flex flex-col sm:flex-row sm:items-baseline space-y-1 sm:space-y-0 sm:space-x-2 lg:space-x-3 pr-1 sm:pr-2">
                  <span className={`text-sm sm:text-xl lg:text-2xl xl:text-3xl font-serif font-bold tracking-wide ${item.name === 'SILVER' ? 'text-[#c0c0c0]' : 'text-[var(--color-gold-400)]'}`}>{item.name}</span>
                  <span className="text-xs sm:text-lg lg:text-xl xl:text-2xl text-gray-300 font-bold font-mono tracking-wider whitespace-nowrap">{item.detail}</span>
                </div>
                <div className="w-[20%] text-center text-xs sm:text-lg lg:text-xl xl:text-2xl text-gray-400 font-bold font-mono border-l-2 border-black h-full px-1 sm:px-2">{item.weight}</div>
                <div className="w-[25%] text-right text-[13px] sm:text-xl lg:text-2xl xl:text-3xl font-bold tracking-wider font-mono text-white border-l-2 border-black h-full px-1 sm:px-2 whitespace-nowrap">{rates ? fmtAed(item.buy, item.weight === '1 GM' ? 2 : 0) : '...'}</div>
                <div className="w-[25%] text-right text-[13px] sm:text-xl lg:text-2xl xl:text-3xl font-bold tracking-wider font-mono text-white border-l-2 border-black h-full px-1 sm:px-2 whitespace-nowrap">{rates ? fmtAed(item.sell, item.weight === '1 GM' ? 2 : 0) : '...'}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION: News Ticker */}
      <div className="h-[50px] sm:h-[70px] border border-[var(--color-gold-500)]/40 rounded-lg flex items-stretch overflow-hidden bg-[#0f0f0f] shadow-[0_0_15px_rgba(212,160,28,0.05)] flex-shrink-0 w-full">
        <div className="bg-[var(--color-gold-900)]/40 border-r border-[var(--color-gold-500)]/40 text-[var(--color-gold-300)] flex flex-col justify-center px-4 sm:px-8 min-w-fit z-10 py-1 sm:py-2">
          <span className="text-[10px] sm:text-xs tracking-widest uppercase font-bold">Al Raqi</span>
          <span className="text-[10px] sm:text-xs tracking-widest uppercase font-bold">News</span>
        </div>
        <div className="flex-1 relative overflow-hidden flex items-center whitespace-nowrap bg-black/40 text-gray-300 w-full">
          <div className="animate-marquee inline-block text-sm sm:text-xl tracking-wide font-light">
            AL RAQI NEWS | Global Gold Market Stabilizes Amidst Central Bank Announcements | Local AED Demand Remains Strong | Silver Spot Shows Upward Momentum For Next Quarter | Connect with Al Raqi Gold for Premium Bullion Trading
          </div>
        </div>
      </div>

    </div>
  );
}






