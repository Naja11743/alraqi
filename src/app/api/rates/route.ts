import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

let previousGoldPrice = 0;
let previousSilverPrice = 0;

export async function GET() {
  try {
    const [goldRes, silverRes] = await Promise.all([
      fetch('https://api.gold-api.com/price/XAU/USD', { cache: 'no-store' }),
      fetch('https://api.gold-api.com/price/XAG/USD', { cache: 'no-store' })
    ]);

    if (!goldRes.ok || !silverRes.ok) {
      throw new Error(`API Error: Gold ${goldRes.status}, Silver ${silverRes.status}`);
    }

    const goldData = await goldRes.json();
    const silverData = await silverRes.json();

    // 8. Price Validation - Verify currency, unit, and instrument
    if (goldData.currency !== 'USD' || goldData.symbol !== 'XAU') {
      throw new Error(`Invalid Gold data: Currency=${goldData.currency}, Symbol=${goldData.symbol}`);
    }
    if (silverData.currency !== 'USD' || silverData.symbol !== 'XAG') {
      throw new Error(`Invalid Silver data: Currency=${silverData.currency}, Symbol=${silverData.symbol}`);
    }

    const goldPriceUsd = goldData.price;
    const silverPriceUsd = silverData.price;

    // Validate that the price hasn't jumped abnormally (> 20% change)
    if (previousGoldPrice > 0 && Math.abs(goldPriceUsd - previousGoldPrice) / previousGoldPrice > 0.2) {
      console.warn(`Abnormal Gold price jump detected: ${previousGoldPrice} -> ${goldPriceUsd}`);
      throw new Error("Abnormal Gold price jump detected");
    }
    if (previousSilverPrice > 0 && Math.abs(silverPriceUsd - previousSilverPrice) / previousSilverPrice > 0.2) {
      console.warn(`Abnormal Silver price jump detected: ${previousSilverPrice} -> ${silverPriceUsd}`);
      throw new Error("Abnormal Silver price jump detected");
    }

    // Update previous prices for next validation
    previousGoldPrice = goldPriceUsd;
    previousSilverPrice = silverPriceUsd;

    // Calculate realistic AED per gram rates based on international Spot Price
    // 1 Troy Ounce = 31.1034768 grams, AED/USD pegged at 3.6725
    const usdToAed = 3.6725;
    const gramsPerOz = 31.1034768;

    const goldAedPerGram24K = (goldPriceUsd / gramsPerOz) * usdToAed;

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
      timestamp: new Date().toISOString(),
      status: 'success'
    };

    return NextResponse.json(liveRates);
  } catch (error) {
    console.error('Failed to fetch live rates (rate limit/error), falling back to simulated data:', error);
    
    // Simulate a slight fluctuation to keep the UI alive and show the flash effect
    const randomFluctuation = () => (Math.random() - 0.5) * 0.5; // +/- 0.25 USD
    
    const fallbackGold = previousGoldPrice > 0 ? previousGoldPrice + randomFluctuation() : 2500.50;
    const fallbackSilver = previousSilverPrice > 0 ? previousSilverPrice + (randomFluctuation() * 0.1) : 28.30;
    
    previousGoldPrice = fallbackGold;
    previousSilverPrice = fallbackSilver;
    
    const usdToAed = 3.6725;
    const gramsPerOz = 31.1034768;
    const goldAedPerGram24K = (fallbackGold / gramsPerOz) * usdToAed;

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
