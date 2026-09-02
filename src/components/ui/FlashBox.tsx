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
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (value === undefined || value === null || isNaN(value)) return;

    if (prevValueRef.current !== null && prevValueRef.current !== value) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      if (value > prevValueRef.current) {
        setFlash('up');
      } else if (value < prevValueRef.current) {
        setFlash('down');
      }

      timeoutRef.current = setTimeout(() => {
        setFlash(null);
      }, 1500);
    } else if (prevValueRef.current !== null && prevValueRef.current === value) {
        setFlash(null);
    }

    prevValueRef.current = value;

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, tick]); // Added tick to ensure it runs every time new data arrives

  const getBgClass = () => {
    if (flash === 'up') return 'bg-green-400/90 border-green-300 shadow-[0_0_15px_rgba(74,222,128,0.5)]';
    if (flash === 'down') return 'bg-red-600/90 border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]';
    return 'bg-green-700/90 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)]';
  };

  return (
    <div className={`transition-all duration-500 border-2 py-1.5 sm:py-2 lg:py-3 w-full text-center tracking-wider font-mono rounded whitespace-nowrap px-1 ${getBgClass()} ${className}`}>
      {children}
    </div>
  );
}
