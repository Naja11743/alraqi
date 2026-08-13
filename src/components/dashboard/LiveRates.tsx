import React, { useEffect, useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';

type RatesData = {
  gold: { [key: string]: number };
  timestamp: string;
};

type ExchangeData = {
  rates: { INR: number; EUR: number };
};

export function LiveRates() {
  const [rates, setRates] = useState<RatesData | null>(null);
  const [exchange, setExchange] = useState<ExchangeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/rates').then(res => res.json()),
      fetch('/api/exchange').then(res => res.json())
    ])
    .then(([ratesData, exchangeData]) => {
      setRates(ratesData);
      setExchange(exchangeData);
      setLoading(false);
    })
    .catch(err => {
      console.error("Failed to fetch data", err);
      setLoading(false);
    });
  }, []);

  // Filter to just the purities requested
  const displayPurities = ['24K', '22K', '21K', '18K'];

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-serif text-[var(--color-gold-300)] tracking-wide mb-2 uppercase">Current Gold Rates</h2>
          <div className="flex items-center gap-2 text-xs font-mono bg-white/5 border border-black/5 px-3 py-1.5 rounded-full w-fit">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-500 font-bold tracking-wider">LIVE</span>
            {rates && <span className="text-gray-600 ml-2 border-l border-black/10 pl-2">Updated: {new Date(rates.timestamp).toLocaleTimeString()}</span>}
          </div>
        </div>
      </div>

      {loading || !rates || !exchange ? (
        <div className="text-center text-gray-600 py-10 animate-pulse">Loading Live Rates...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayPurities.map(karat => {
            const aedPrice = rates.gold[karat];
            if (!aedPrice) return null;
            
            const inrPrice = aedPrice * exchange.rates.INR;
            const eurPrice = aedPrice * exchange.rates.EUR;

            return (
              <GlassPanel key={karat} className="flex flex-col p-6 hover:border-[var(--color-gold-500)] transition-colors duration-300">
                <div className="text-center border-b border-black/5 pb-4 mb-4">
                  <span className="text-lg text-[var(--color-gold-400)] font-bold tracking-widest">{karat} Gold</span>
                </div>
                
                <div className="space-y-4">
                  {/* AED - Primary */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl" title="UAE">🇦🇪</span>
                      <span className="text-sm font-semibold text-gray-900 tracking-widest">AED</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900 font-mono">{aedPrice.toFixed(2)}</span>
                  </div>

                  {/* INR */}
                  <div className="flex items-center justify-between opacity-80">
                    <div className="flex items-center gap-2">
                      <span className="text-lg" title="India">🇮🇳</span>
                      <span className="text-xs font-medium text-gray-700 tracking-widest">INR</span>
                    </div>
                    <span className="text-lg text-gray-700 font-mono">₹{inrPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>

                  {/* EUR */}
                  <div className="flex items-center justify-between opacity-80">
                    <div className="flex items-center gap-2">
                      <span className="text-lg" title="Europe">🇪🇺</span>
                      <span className="text-xs font-medium text-gray-700 tracking-widest">EUR</span>
                    </div>
                    <span className="text-lg text-gray-700 font-mono">€{eurPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </GlassPanel>
            );
          })}
        </div>
      )}
      
      <div className="mt-6 text-center md:text-right text-[10px] text-gray-500 uppercase tracking-widest">
        * INR and EUR values are converted equivalents based on live AED exchange rates.
      </div>
    </section>
  );
}
