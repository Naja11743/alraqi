'use client';
import React, { useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';

export function Calculator() {
  const [weight, setWeight] = useState<number>(10);
  const [karat, setKarat] = useState<string>('24K');
  const [makingCharge, setMakingCharge] = useState<number>(0);
  
  // Mock prices for client-side calc
  const rates = {
    '24K': 310.50,
    '22K': 287.50,
    '21K': 275.00,
    '18K': 236.00,
  };

  const currentRate = rates[karat as keyof typeof rates] || 0;
  const goldValue = weight * currentRate;
  const totalMakingCharge = weight * makingCharge;
  const totalValue = goldValue + totalMakingCharge;

  return (
    <GlassPanel className="max-w-md mx-auto w-full">
      <h3 className="text-2xl font-serif text-[var(--color-gold-300)] mb-6 text-center tracking-wide">
        Jewellery Calculator
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Select Karat</label>
          <select 
            value={karat}
            onChange={(e) => setKarat(e.target.value)}
            className="w-full bg-white/50 border border-[var(--panel-border)] rounded-lg p-2.5 text-gray-900 focus:outline-none focus:border-[var(--color-gold-500)]"
          >
            {Object.keys(rates).map(k => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Weight (Grams)</label>
          <input 
            type="number"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
            className="w-full bg-white/50 border border-[var(--panel-border)] rounded-lg p-2.5 text-gray-900 focus:outline-none focus:border-[var(--color-gold-500)]"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Making Charge per Gram (AED)</label>
          <input 
            type="number"
            value={makingCharge}
            onChange={(e) => setMakingCharge(parseFloat(e.target.value) || 0)}
            className="w-full bg-white/50 border border-[var(--panel-border)] rounded-lg p-2.5 text-gray-900 focus:outline-none focus:border-[var(--color-gold-500)]"
          />
        </div>

        <div className="pt-6 mt-6 border-t border-[var(--panel-border)]">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Gold Value:</span>
            <span>AED {goldValue.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Total Making Charge:</span>
            <span>AED {totalMakingCharge.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl text-[var(--color-gold-400)] font-semibold mt-4">
            <span>Total Estimated Price:</span>
            <span>AED {totalValue.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
