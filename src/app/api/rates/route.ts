import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data for Al Raqi Dashboard
  // In production, fetch this from GoldAPI.io or similar and cache it in the database
  
  const mockRates = {
    gold: {
      '24K': 310.50, // AED per gram
      '22K': 287.50,
      '21K': 275.00,
      '18K': 236.00,
    },
    silver: {
      '999': 3.45,
    },
    timestamp: new Date().toISOString(),
    status: 'success'
  };

  return NextResponse.json(mockRates);
}
