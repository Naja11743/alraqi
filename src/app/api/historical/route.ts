import { NextResponse } from 'next/server';

export async function GET() {
  // Generate mock historical data (past 30 days) for the charts
  const history = [];
  const now = new Date();
  
  let currentPrice = 310.50; // Starting 24K price

  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Random walk for mock prices
    const change = (Math.random() - 0.5) * 5; 
    currentPrice = currentPrice + change;

    history.push({
      date: date.toISOString().split('T')[0],
      priceAED: parseFloat(currentPrice.toFixed(2)),
    });
  }

  return NextResponse.json({
    type: 'GOLD_24K',
    history,
    status: 'success'
  });
}
