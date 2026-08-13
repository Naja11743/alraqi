'use client';
import { useState } from 'react';

export function GoldBarVisual() {
  const [weight, setWeight] = useState(100);
  const [karat, setKarat] = useState(24);
  
  // Current price per gram logic (mock)
  const basePrice24k = 7525;
  const currentPrice = karat === 24 ? basePrice24k : (basePrice24k * (karat / 24));
  const totalValue = currentPrice * weight;

  return (
    <div className="bg-[var(--background)] border border-black/5 rounded-2xl p-6 md:p-8 h-full flex flex-col items-center justify-center relative overflow-hidden group">
      
      {/* 3D CSS Gold Bar */}
      <div className="relative w-64 h-32 md:w-80 md:h-40 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
        {/* Top Face */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-gold-600)] via-[var(--color-gold-300)] to-[var(--color-gold-500)] rounded-sm shadow-[inset_0_0_20px_rgba(255,255,255,0.4)] flex flex-col items-center justify-center border border-black/10 z-20">
          <div className="text-[var(--color-gold-900)] font-serif text-2xl md:text-3xl font-bold tracking-widest opacity-80 mix-blend-color-burn">
            AL RAQI
          </div>
          <div className="text-[var(--color-gold-900)] font-mono text-xs md:text-sm tracking-widest opacity-70 mt-2 mix-blend-color-burn">
            FINE GOLD {karat === 24 ? '999.9' : '916.0'}
          </div>
          <div className="text-[var(--color-gold-900)] font-mono text-xs md:text-sm tracking-widest opacity-70 mt-1 mix-blend-color-burn">
            {weight}g
          </div>
        </div>
        
        {/* Bottom Face (Shadow/Depth) */}
        <div className="absolute top-2 left-2 right-[-8px] bottom-[-8px] bg-gradient-to-br from-[var(--color-gold-900)] to-[#3a2205] rounded-sm z-10" />
        
        {/* Floor Shadow */}
        <div className="absolute -bottom-8 left-4 right-4 h-4 bg-[var(--color-gold-500)] blur-xl opacity-20" />
      </div>

      {/* Controls & Stats below the bar */}
      <div className="w-full mt-12 grid grid-cols-2 gap-4 text-center">
        <div className="bg-white/5 border border-black/5 p-4 rounded-xl relative">
          <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Adjust Weight (g)</label>
          <input 
            type="range"
            min="10"
            max="1000"
            step="10"
            value={weight}
            onChange={(e) => setWeight(parseInt(e.target.value))}
            className="w-full accent-[var(--color-gold-500)]"
          />
          <div className="text-gray-900 font-mono mt-1">{weight}g</div>
        </div>
        
        <div className="bg-white/5 border border-black/5 p-4 rounded-xl relative">
          <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Adjust Purity</label>
          <select 
            value={karat}
            onChange={(e) => setKarat(parseInt(e.target.value))}
            className="w-full bg-transparent border-none text-gray-900 focus:outline-none font-mono text-center cursor-pointer"
          >
            <option value={24} className="bg-white">24K (999.9)</option>
            <option value={22} className="bg-white">22K (916.0)</option>
          </select>
        </div>
      </div>
      
      <div className="w-full mt-4 bg-white/5 border border-black/5 p-4 rounded-xl flex items-center justify-between">
        <span className="text-sm text-gray-600 uppercase tracking-widest">Current Market Value</span>
        <span className="text-2xl font-mono text-[var(--color-gold-400)] font-semibold">
          ₹{totalValue.toLocaleString()}
        </span>
      </div>
      
    </div>
  );
}
