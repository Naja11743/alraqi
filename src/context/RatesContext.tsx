'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Rates {
  gold: {
    '24K': number;
    '22K': number;
    '21K': number;
    '18K': number;
  };
  silver: {
    '999': number;
  };
  spotUsd?: {
    gold: {
      spot?: number;
    };
    silver: {
      spot?: number;
    }
  };
  timestamp: string;
  status: string;
}

interface RatesContextType {
  rates: Rates | null;
  isLoading: boolean;
  error: boolean;
}

const RatesContext = createContext<RatesContextType>({
  rates: null,
  isLoading: true,
  error: false,
});

export function RatesProvider({ children }: { children: React.ReactNode }) {
  const [rates, setRates] = useState<Rates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let timer: NodeJS.Timeout;

    const fetchRates = async () => {
      try {
        const res = await fetch('/api/rates');
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        
        if (isMounted) {
          setRates(data);
          setError(false);
        }
      } catch (err) {
        console.error('Failed to fetch rates', err);
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Fetch immediately on mount (page load / refresh)
    fetchRates();

    // Poll every 5 seconds for live updates
    timer = setInterval(fetchRates, 5000);

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, []); // Empty dependency array ensures this runs strictly once on mount

  return (
    <RatesContext.Provider value={{ rates, isLoading, error }}>
      {children}
    </RatesContext.Provider>
  );
}

export function useRates() {
  return useContext(RatesContext);
}
