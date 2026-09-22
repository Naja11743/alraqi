import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

let previousGoldPrice = 0;
let previousSilverPrice = 0;

export async function GET() {
  try {
    const res = await fetch('https://xaus.com/api/v1/spot', { cache: 'no-store' });
    if (!res.ok) throw new Error('XAUS API Error');
    const data = await res.json();
    
    let goldPriceUsd = data.spot_usd_oz;
    let silverPriceUsd = data.silver_usd_oz;
    let isStale = data.stale === true || (data.data_state && data.data_state.status !== 'fresh');

    // Update previous prices for next validation
    previousGoldPrice = goldPriceUsd;
    previousSilverPrice = silverPriceUsd;

    // Calculate realistic AED per gram rates based on international Spot Price
    // 1 Troy Ounce = 31.1034768 grams, AED/USD pegged at 3.6725
    const usdToAed = 3.6725;
    const gramsPerOz = 31.1034768;
    const GOLD_PREMIUM_AED = 7; // Fixed premium for Dubai retail market

    const baseGoldAedPerGram24K = (goldPriceUsd / gramsPerOz) * usdToAed;
    const goldAedPerGram24K = baseGoldAedPerGram24K + GOLD_PREMIUM_AED;

    const liveRates = {
      gold: {
        '24K': goldAedPerGram24K,
        '22K': goldAedPerGram24K * (22 / 24),
        '21K': goldAedPerGram24K * (21 / 24),
        '18K': goldAedPerGram24K * (18 / 24),
      },
      silver: {
        '999': (silverPriceUsd / gramsPerOz) * usdToAed,
      },
      spotUsd: {
        gold: {
          spot: goldPriceUsd,
          bid: goldPriceUsd,
          ask: goldPriceUsd,
          low: goldPriceUsd,
          high: goldPriceUsd
        },
        silver: {
          spot: silverPriceUsd,
          bid: silverPriceUsd,
          ask: silverPriceUsd,
          low: silverPriceUsd,
          high: silverPriceUsd
        }
      },
      timestamp: data.updated_at || new Date().toISOString(),
      status: isStale ? 'stale' : 'fresh'
    };

    return NextResponse.json(liveRates);
  } catch (error) {
    console.error('Failed to fetch live rates (rate limit/error), falling back to simulated data:', error);
    
    // Simulate a slight fluctuation to keep the UI alive and show the flash effect
    // Removed random fluctuation
    
    const fallbackGold = previousGoldPrice > 0 ? previousGoldPrice : 4350.00;
    const fallbackSilver = previousSilverPrice > 0 ? previousSilverPrice : 66.00;
    
    previousGoldPrice = fallbackGold;
    previousSilverPrice = fallbackSilver;
    
    const usdToAed = 3.6725;
    const gramsPerOz = 31.1034768;
    const GOLD_PREMIUM_AED = 7;
    
    const baseGoldAedPerGram24K = (fallbackGold / gramsPerOz) * usdToAed;
    const goldAedPerGram24K = baseGoldAedPerGram24K + GOLD_PREMIUM_AED;

    return NextResponse.json({
      gold: {
        '24K': goldAedPerGram24K,
        '22K': goldAedPerGram24K * (22 / 24),
        '21K': goldAedPerGram24K * (21 / 24),
        '18K': goldAedPerGram24K * (18 / 24),
      },
      silver: {
        '999': (fallbackSilver / gramsPerOz) * usdToAed,
      },
      spotUsd: {
        gold: { spot: fallbackGold, bid: fallbackGold, ask: fallbackGold, low: fallbackGold - 10, high: fallbackGold + 10 },
        silver: { spot: fallbackSilver, bid: fallbackSilver, ask: fallbackSilver, low: fallbackSilver - 1, high: fallbackSilver + 1 }
      },
      timestamp: new Date().toISOString(),
      status: 'simulated_fallback'
    });
  }
}

