'use client';
import { Activity, ArrowUpRight, TrendingUp, AlertTriangle } from 'lucide-react';

export function MarketPulse() {
  return (
    <div className="bg-[var(--background)] border border-black/5 rounded-2xl p-6 md:p-8 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-white/5 rounded-lg border border-black/5">
          <Activity className="w-5 h-5 text-[var(--color-gold-400)]" />
        </div>
        <h2 className="text-xl font-serif text-[var(--color-gold-300)] tracking-wide">
          AL RAQI MARKET PULSE
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 border border-black/5 p-4 rounded-xl">
          <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Current Trend</div>
          <div className="text-green-400 flex items-center gap-1 font-medium">
            <ArrowUpRight size={16} /> RISING
          </div>
        </div>
        
        <div className="bg-white/5 border border-black/5 p-4 rounded-xl">
          <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Volatility</div>
          <div className="text-yellow-400 flex items-center gap-1 font-medium">
            <AlertTriangle size={16} /> MEDIUM
          </div>
        </div>

        <div className="bg-white/5 border border-black/5 p-4 rounded-xl">
          <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">7-Day Momentum</div>
          <div className="text-green-400 font-mono font-medium">+1.24%</div>
        </div>

        <div className="bg-white/5 border border-black/5 p-4 rounded-xl">
          <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">30-Day Perf.</div>
          <div className="text-green-400 font-mono font-medium">+5.42%</div>
        </div>
      </div>

      <div className="mt-auto p-4 bg-gradient-to-br from-white/5 to-transparent border-l-2 border-[var(--color-gold-500)] rounded-r-xl">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-[var(--color-gold-500)] mt-0.5 shrink-0" />
          <p className="text-sm text-gray-700 leading-relaxed font-light">
            Gold has shown a positive movement over the last 30 days with moderate intraday volatility. The current market position remains strongly above the 50-day moving average, signaling continued bullish momentum in the short term.
          </p>
        </div>
      </div>
      
      <div className="text-[10px] text-gray-600 mt-4 text-center">
        * Algorithmic analysis. Not financial advice.
      </div>
    </div>
  );
}
