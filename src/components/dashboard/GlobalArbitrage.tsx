'use client';
import { useState } from 'react';
import { ArrowRightLeft, Globe } from 'lucide-react';

export function GlobalArbitrage() {
  const [weight, setWeight] = useState(100); // g
  const [karat, setKarat] = useState(24);
  
  // Mock exchange rate and prices
  const exchangeRate = 22.85; // 1 AED = 22.85 INR
  const uaePriceAed = 310.50; // Per gram 24k
  const indiaPriceInr = 7500; // Per gram 24k
  
  const customsDutyPercent = 15; // India import duty on gold
  
  const uaePriceInr = (uaePriceAed * weight) * exchangeRate;
  const indiaPriceTotalInr = (indiaPriceInr * weight) * (1 + customsDutyPercent / 100);
  const priceDifference = indiaPriceTotalInr - uaePriceInr;
  const percentDifference = (priceDifference / uaePriceInr) * 100;

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 h-full flex flex-col relative overflow-hidden">
      {/* Background Graphic */}
      <Globe className="absolute -bottom-10 -right-10 w-64 h-64 text-white/[0.02] pointer-events-none" strokeWidth={1} />

      <h2 className="text-xl font-serif text-[var(--color-gold-300)] tracking-wide mb-2">
        🇦🇪 UAE vs 🇮🇳 INDIA
      </h2>
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-8">
        Cross-Border Gold Price Analysis
      </p>

      {/* Controls */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Weight (g)</label>
          <input 
            type="number"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
            className="w-full bg-black/5 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-[var(--color-gold-500)] font-mono"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Karat</label>
          <select 
            value={karat}
            onChange={(e) => setKarat(parseInt(e.target.value))}
            className="w-full bg-black/5 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-[var(--color-gold-500)] font-mono appearance-none"
          >
            <option value={24} className="bg-black">24K</option>
            <option value={22} className="bg-black">22K</option>
          </select>
        </div>
      </div>

      {/* Comparison Tables */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-black/50 border border-white/10 rounded-xl p-4">
          <div className="text-gray-400 text-xs font-semibold tracking-widest mb-4">UAE MARKET</div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Gold Price</span>
              <span className="text-white font-mono">{uaePriceAed} AED</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Exchange Rate</span>
              <span className="text-white font-mono">{exchangeRate}</span>
            </div>
            <div className="pt-3 border-t border-white/10 flex justify-between font-medium">
              <span className="text-gray-400">Adjusted Cost</span>
              <span className="text-white font-mono">₹{uaePriceInr.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </div>

        <div className="bg-black/50 border border-white/10 rounded-xl p-4">
          <div className="text-gray-400 text-xs font-semibold tracking-widest mb-4">INDIA MARKET</div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Gold Price</span>
              <span className="text-white font-mono">₹{indiaPriceInr.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Customs Duty</span>
              <span className="text-red-400 font-mono">+{customsDutyPercent}%</span>
            </div>
            <div className="pt-3 border-t border-white/10 flex justify-between font-medium">
              <span className="text-gray-400">Adjusted Cost</span>
              <span className="text-white font-mono">₹{indiaPriceTotalInr.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Result */}
      <div className="mt-auto border border-white/10 bg-black/5 rounded-xl p-5 flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Price Difference</div>
          <div className="text-2xl font-mono text-white">
            ₹{Math.abs(priceDifference).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1 rounded border text-sm font-medium ${priceDifference > 0 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
            {percentDifference.toFixed(2)}%
          </div>
          <ArrowRightLeft className="text-gray-500 w-5 h-5" />
        </div>
      </div>

      <div className="text-[10px] text-gray-400 mt-4 text-center leading-relaxed">
        * Applicable customs duties and taxes depend on current regulations and individual circumstances (e.g. residency status).
      </div>
    </div>
  );
}
