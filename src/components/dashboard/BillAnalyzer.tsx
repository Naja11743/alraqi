'use client';
import { useState } from 'react';
import { SearchCode } from 'lucide-react';

export function BillAnalyzer() {
  const [weight, setWeight] = useState(20);
  const [karat, setKarat] = useState(22);
  const [billTotal, setBillTotal] = useState(7000);

  // Mock Market logic
  const basePrice24k = 310.50; 
  const marketPricePerGram = karat === 24 ? basePrice24k : (basePrice24k * (karat / 24));
  const rawMaterialValue = marketPricePerGram * weight;
  
  // Standard acceptable industry ranges (Mock)
  const standardMakingCharge = rawMaterialValue * 0.15; // 15%
  const standardTax = (rawMaterialValue + standardMakingCharge) * 0.05; // 5% VAT
  const estimatedFairPrice = rawMaterialValue + standardMakingCharge + standardTax;

  const difference = billTotal - estimatedFairPrice;
  const premiumPercent = ((billTotal - rawMaterialValue) / rawMaterialValue) * 100;

  const getStatus = () => {
    if (premiumPercent < 18) return { label: 'WITHIN EXPECTED RANGE', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' };
    if (premiumPercent < 25) return { label: 'HIGHER PREMIUM', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' };
    return { label: 'SIGNIFICANTLY HIGHER', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' };
  };

  const status = getStatus();

  return (
    <div className="bg-[var(--background)] border border-black/5 rounded-2xl p-6 md:p-8 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-white/5 rounded-lg border border-black/5">
          <SearchCode className="w-5 h-5 text-[var(--color-gold-400)]" />
        </div>
        <h2 className="text-xl font-serif text-[var(--color-gold-300)] tracking-wide">
          GOLD PURCHASE ANALYZER
        </h2>
      </div>
      
      <p className="text-sm text-gray-600 mb-6">
        Audit your purchase bill against live market rates to understand the premiums you paid.
      </p>

      {/* Input Form */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div>
          <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Karat</label>
          <select 
            value={karat}
            onChange={(e) => setKarat(parseInt(e.target.value))}
            className="w-full bg-white/5 border border-black/5 rounded-lg p-2 text-sm text-gray-900 focus:outline-none focus:border-[var(--color-gold-500)]"
          >
            <option value={24} className="bg-white">24K</option>
            <option value={22} className="bg-white">22K</option>
            <option value={18} className="bg-white">18K</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Weight (g)</label>
          <input 
            type="number"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
            className="w-full bg-white/5 border border-black/5 rounded-lg p-2 text-sm text-gray-900 focus:outline-none focus:border-[var(--color-gold-500)] font-mono"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Total Bill (AED)</label>
          <input 
            type="number"
            value={billTotal}
            onChange={(e) => setBillTotal(parseFloat(e.target.value) || 0)}
            className="w-full bg-white/5 border border-black/5 rounded-lg p-2 text-sm text-gray-900 focus:outline-none focus:border-[var(--color-gold-500)] font-mono"
          />
        </div>
      </div>

      {/* Analysis Results */}
      <div className="bg-white/60 border border-black/5 rounded-xl p-5 mb-6">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-black/5">
          <span className="text-gray-600 text-sm">Raw Gold Market Value</span>
          <span className="text-gray-900 font-mono font-medium">AED {rawMaterialValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
        </div>
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-black/5">
          <span className="text-gray-600 text-sm">Estimated Fair Retail (incl. charges/tax)</span>
          <span className="text-gray-900 font-mono font-medium">AED {estimatedFairPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Actual Bill Amount</span>
          <span className="text-[var(--color-gold-400)] font-mono font-bold text-lg">AED {billTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
        </div>
      </div>

      <div className={`mt-auto border rounded-xl p-4 flex items-center justify-between ${status.bg}`}>
        <div>
          <div className="text-xs uppercase tracking-widest mb-1 opacity-80">Premium Over Raw Gold</div>
          <div className={`text-xl font-bold font-mono ${status.color}`}>
            {premiumPercent.toFixed(1)}%
          </div>
        </div>
        <div className={`text-xs font-semibold px-3 py-1.5 rounded-full bg-white/50 ${status.color}`}>
          {status.label}
        </div>
      </div>

      <div className="text-[10px] text-gray-600 mt-4 text-center">
        * This is an algorithmic estimate based on industry averages (15% making charge, 5% tax). It does not authenticate the physical gold.
      </div>
    </div>
  );
}
