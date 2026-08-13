import { NextResponse } from 'next/server';

export async function GET() {
  // Mock exchange rates from AED
  // 1 AED = 22.85 INR
  // 1 AED = 0.25 EUR
  
  return NextResponse.json({
    base: 'AED',
    rates: {
      INR: 22.85,
      EUR: 0.25
    },
    timestamp: new Date().toISOString(),
    status: 'success'
  });
}
