'use client';
import React, { useEffect, useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export function HistoricalChart() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/historical')
      .then(res => res.json())
      .then(resData => {
        // Reverse so chronological order is left to right
        setData(resData.history.reverse());
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch historical data", err);
        setLoading(false);
      });
  }, []);

  return (
    <GlassPanel className="w-full h-96">
      <h3 className="text-xl font-serif text-[var(--color-gold-300)] mb-6 tracking-wide">
        30-Day Gold Trend (24K)
      </h3>
      
      {loading ? (
        <div className="h-full flex items-center justify-center text-gray-500 animate-pulse">
          Loading chart data...
        </div>
      ) : (
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#666"
                tick={{fill: '#666', fontSize: 12}}
                tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
              />
              <YAxis 
                stroke="#666" 
                domain={['dataMin - 5', 'dataMax + 5']}
                tick={{fill: '#666', fontSize: 12}}
                tickFormatter={(val) => `AED ${val}`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(20,20,20,0.9)', borderColor: 'rgba(212,160,28,0.3)' }}
                itemStyle={{ color: '#d4a01c' }}
                labelStyle={{ color: '#aaa' }}
              />
              <Line 
                type="monotone" 
                dataKey="priceAED" 
                stroke="#d4a01c" 
                strokeWidth={2}
                dot={{ fill: '#d4a01c', r: 3 }}
                activeDot={{ r: 6, fill: '#f6efce' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </GlassPanel>
  );
}
