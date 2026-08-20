'use client';
import React, { useState, useEffect } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';

export function UaeVsIndia() {
  const [exchangeRate, setExchangeRate] = useState(22.85); // Default mock
  const [weight, setWeight] = useState(10);
  
  // Mock prices for simplicity (AED and INR per gram 24K)
  const uaePriceAed = 310.50; 
  const indiaPriceInr = 7500; // Mock INR price
  
  const customsDutyPercent = 15; // India import duty on gold
  
  useEffect(() => {
    fetch('/api/exchange')
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates.INR))
      .catch(console.error);
  }, []);

  const uaePriceTotalAed = uaePriceAed * weight;
  const indiaPriceTotalAed = ((indiaPriceInr / exchangeRate) * weight) * (1 + customsDutyPercent / 100);
  const savingsAed = indiaPriceTotalAed - uaePriceTotalAed;

  return (
    <GlassPanel>
      <h3 className="text-xl font-serif text-[var(--color-gold-300)] mb-4 tracking-wide">
        UAE vs India Comparison
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        See how much you save buying {weight}g of 24K gold in the UAE compared to India (including {customsDutyPercent}% customs duty).
      </p>

      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-1">Weight (Grams)</label>
        <input 
          type="number"
          value={weight}
          onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
          className="w-full bg-black/50 border border-[var(--panel-border)] rounded-lg p-2.5 text-white focus:outline-none focus:border-[var(--color-gold-500)]"
        />
      </div>

      <div className="space-y-4 pt-4 border-t border-[var(--panel-border)]">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Price in UAE:</span>
          <span className="font-medium text-white">AED {uaePriceTotalAed.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Price in India (incl. Duty):</span>
          <span className="font-medium text-white">AED {indiaPriceTotalAed.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
        </div>
        
        <div className={`mt-4 p-3 rounded-lg text-center font-semibold ${savingsAed > 0 ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          {savingsAed > 0 ? `You Save: AED ${savingsAed.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : `You Lose: AED ${Math.abs(savingsAed).toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
        </div>
      </div>
      
      <div className="text-xs text-gray-500 mt-4 text-center">
        Exchange Rate: 1 AED = {exchangeRate} INR
      </div>
    </GlassPanel>
  );
}
