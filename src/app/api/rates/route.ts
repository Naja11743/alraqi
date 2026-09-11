import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

let previousGoldPrice = 0;
let previousSilverPrice = 0;

export async function GET() {
  try {
    const [goldRes, silverRes] = await Promise.all([
      fetch('https://api.goldprice.dev/v1/prices?symbol=XAU-USD-SPOT', { cache: 'no-store' }),
      fetch('https://api.gold-api.com/price/XAG/USD', { cache: 'no-store' })
    ]);

    let goldPriceUsd = previousGoldPrice > 0 ? previousGoldPrice : 4381.50;
    let silverPriceUsd = previousSilverPrice > 0 ? previousSilverPrice : 28.30;
    let isSimulated = false;

    if (goldRes.ok) {
      try {
        const goldData = await goldRes.json();
        if (goldData.symbols && goldData.symbols.length > 0 && goldData.symbols[0].symbol === 'XAU' && goldData.symbols[0].quote_currency === 'USD') {
          const parsedPrice = parseFloat(goldData.symbols[0].price);
          // Validate that the price hasn't jumped abnormally (> 20% change)
          if (!(previousGoldPrice > 0 && Math.abs(parsedPrice - previousGoldPrice) / previousGoldPrice > 0.2)) {
            goldPriceUsd = parsedPrice;
          } else {
            console.warn(`Abnormal Gold price jump detected: ${previousGoldPrice} -> ${parsedPrice}`);
          }
        }
      } catch (e) {
        console.error("Gold parsing error:", e);
        isSimulated = true;
      }
    } else {
      console.error(`Gold API failed: ${goldRes.status}`);
      isSimulated = true;
    }

    if (silverRes.ok) {
      try {
        const silverData = await silverRes.json();
        if (silverData.currency === 'USD' && silverData.symbol === 'XAG') {
          const parsedPrice = silverData.price;
          if (!(previousSilverPrice > 0 && Math.abs(parsedPrice - previousSilverPrice) / previousSilverPrice > 0.2)) {
            silverPriceUsd = parsedPrice;
          } else {
            console.warn(`Abnormal Silver price jump detected: ${previousSilverPrice} -> ${parsedPrice}`);
          }
        }
      } catch (e) {
        console.error("Silver parsing error:", e);
        isSimulated = true;
      }
    } else {
      console.error(`Silver API failed: ${silverRes.status}`);
      isSimulated = true;
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
      status: isSimulated ? 'simulated_fallback' : 'success'
    };

    return NextResponse.json(liveRates);
  } catch (error) {
    console.error('Failed to fetch live rates (rate limit/error), falling back to simulated data:', error);
    
    // Simulate a slight fluctuation to keep the UI alive and show the flash effect
    // Removed random fluctuation
    
    const fallbackGold = previousGoldPrice > 0 ? previousGoldPrice : 4381.50;
    const fallbackSilver = previousSilverPrice > 0 ? previousSilverPrice : 28.30;
    
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

