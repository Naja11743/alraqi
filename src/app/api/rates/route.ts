import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate live dynamic fluctuations for a realistic feed
  const fluctuation = (Math.random() * 2 - 1); // Random value between -1 and 1

  const baseGoldUsd = 2629.22;
  const baseSilverUsd = 31.42;

  const goldBid = baseGoldUsd + (fluctuation * 1.5);
  const silverBid = baseSilverUsd + (fluctuation * 0.1);

  const mockRates = {
    // Legacy AED rates for other components
    gold: {
      '24K': 310.50, // AED per gram
      '22K': 287.50,
      '21K': 275.00,
      '18K': 236.00,
    },
    silver: {
      '999': 3.45,
    },
    // New USD Spot Rate feeds
    spotUsd: {
      gold: {
        bid: goldBid,
        ask: goldBid + 0.94, // Simulate a $0.94 spread
        low: baseGoldUsd - 12.5,
        high: baseGoldUsd + 18.2,
      },
      silver: {
        bid: silverBid,
        ask: silverBid + 0.021, // Simulate a small spread
        low: baseSilverUsd - 0.45,
        high: baseSilverUsd + 0.82,
      }
    },
    timestamp: new Date().toISOString(),
    status: 'success'
  };

  return NextResponse.json(mockRates);
}
