'use client';
import React, { useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';

export function WhatIfGold() {
  const [yearsAgo, setYearsAgo] = useState(5);
  const [investment, setInvestment] = useState(10000);
  
  // Mock historical returns based on average 8% YoY gold growth
  const historicalRate = Math.pow(1.08, yearsAgo);
  const currentValue = investment * historicalRate;
  const profit = currentValue - investment;
  const profitPercent = ((currentValue / investment) - 1) * 100;

  return (
    <GlassPanel>
      <h3 className="text-xl font-serif text-[var(--color-gold-300)] mb-4 tracking-wide">
        "What If I Bought Gold?"
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Calculate the estimated value of a past gold investment based on historical trends.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Investment Amount (AED)</label>
          <input 
            type="number"
            value={investment}
            onChange={(e) => setInvestment(parseFloat(e.target.value) || 0)}
            className="w-full bg-white/50 border border-[var(--panel-border)] rounded-lg p-2.5 text-gray-900 focus:outline-none focus:border-[var(--color-gold-500)]"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-1">Years Ago</label>
          <input 
            type="range"
            min="1"
            max="20"
            value={yearsAgo}
            onChange={(e) => setYearsAgo(parseInt(e.target.value))}
            className="w-full accent-[var(--color-gold-500)]"
          />
          <div className="text-right text-[var(--color-gold-400)] font-medium mt-1">
            {yearsAgo} Years
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--panel-border)]">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/30 p-4 rounded-xl border border-[var(--panel-border)]">
              <div className="text-gray-600 text-xs uppercase tracking-wider mb-1">Current Value</div>
              <div className="text-xl font-semibold text-gray-900">
                AED {currentValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
            <div className="bg-white/30 p-4 rounded-xl border border-[var(--panel-border)]">
              <div className="text-gray-600 text-xs uppercase tracking-wider mb-1">Total Return</div>
              <div className="text-xl font-semibold text-green-400">
                +{profitPercent.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
