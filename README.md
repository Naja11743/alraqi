# Al Raqi Gold Dashboard

A premium, interactive gold market dashboard built with **Next.js**, **React**, and **Tailwind CSS**. This platform provides real-time market overviews, global arbitrage analysis, historical simulations, and gold purchase analysis in a clean, luxurious cream-and-gold aesthetic.

## Features

- **Live Market Rates:** Real-time spot prices for 24K, 22K, 21K, and 18K gold. Features a clean three-currency display (AED, INR, EUR) powered by live exchange rate conversions.
- **Global Arbitrage Analysis:** Instantly compare gold prices between the UAE and India (including customs duty) to determine cross-border savings.
- **Gold Purchase Analyzer (Bill Analyzer):** Audit retail gold purchase bills against live raw material rates to understand making charges, taxes, and exact premiums paid.
- **Historical Simulator:** Backtest gold investments by simulating historical purchases over various timeframes (e.g., 1 Year, 5 Years) to see estimated profits and value growth.
- **Gold Portfolio Manager:** Track physical gold holdings (coins, bars, jewelry) and monitor their live estimated market value.
- **Interactive Market Charts:** Visualize gold momentum, moving averages, and 30-day trends using `recharts`.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS v4
- **Charts:** Recharts
- **Icons:** Lucide React

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard.

## Environment Variables

Check the `.env.example` file for any environment variables you may need to configure. Simply copy it to `.env` and fill in your keys if you integrate external live rate APIs in the future.

## License

This project is licensed under the MIT License.
