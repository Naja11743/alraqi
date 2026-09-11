'use client';
import React, { useEffect, useRef, useState } from 'react';

interface FlashBoxProps {
  value: number | undefined | null;
  tick?: string | number; // Added to force update logic on every new tick
  children: React.ReactNode;
  className?: string;
}

export function FlashBox({ value, tick, children, className = '' }: FlashBoxProps) {
  const prevValueRef = useRef<number | null>(null);
  const [trend, setTrend] = useState<'up' | 'down'>('up');

  useEffect(() => {
    if (value === undefined || value === null || isNaN(value)) return;

    if (prevValueRef.current !== null && prevValueRef.current !== value) {
      if (value > prevValueRef.current) {
        setTrend('up');
      } else if (value < prevValueRef.current) {
        setTrend('down');
      }
    }

    prevValueRef.current = value;
  }, [value, tick]);

  const getBgClass = () => {
    if (trend === 'up') return 'bg-green-600/90 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]';
    if (trend === 'down') return 'bg-red-600/90 border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)]';
    return 'bg-green-600/90 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]';
  };

  return (
    <div className={`transition-colors duration-300 border-2 py-1.5 sm:py-2 lg:py-3 w-full text-center tracking-wider font-mono rounded whitespace-nowrap px-1 ${getBgClass()} ${className}`}>
      {children}
    </div>
  );
}
