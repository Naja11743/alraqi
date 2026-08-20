'use client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/dashboard/Hero';
import { MarketOverview } from '@/components/dashboard/MarketOverview';
import { AdvancedChart } from '@/components/dashboard/AdvancedChart';
import { MarketPulse } from '@/components/dashboard/MarketPulse';
import { MarketHeatmap } from '@/components/dashboard/MarketHeatmap';
import { MetalsCompare } from '@/components/dashboard/MetalsCompare';
import { GoldBarVisual } from '@/components/dashboard/GoldBarVisual';
import { GlobalArbitrage } from '@/components/dashboard/GlobalArbitrage';
import { HistoricalSimulator } from '@/components/dashboard/HistoricalSimulator';
import { GoldPortfolio } from '@/components/dashboard/GoldPortfolio';
import { BillAnalyzer } from '@/components/dashboard/BillAnalyzer';
import { AlertManager } from '@/components/dashboard/AlertManager';
import { KnowledgeBase } from '@/components/dashboard/KnowledgeBase';
import { motion } from 'framer-motion';

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <Header />
      
      <main className="flex-1 w-full">
        <Hero />
        
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <MarketOverview />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <AdvancedChart />
          </motion.div>

          {/* Analytics Grid */}
          <motion.div
            id="analytics"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className="lg:col-span-1">
              <MarketPulse />
            </div>
            <div className="lg:col-span-2">
              <MarketHeatmap />
            </div>
          </motion.div>

          {/* Metals Compare & Arbitrage */}
          <motion.div
            id="compare"
            className="py-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MetalsCompare />
              <GlobalArbitrage />
            </div>
          </motion.div>

          {/* Investment Tools */}
          <motion.div
            id="investment"
            className="py-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GoldBarVisual />
              <HistoricalSimulator />
            </div>
          </motion.div>

          {/* Portfolio & Personal Finance */}
          <motion.div
            id="portfolio"
            className="py-8 mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <GoldPortfolio />
              </div>
              <div className="lg:col-span-1">
                <BillAnalyzer />
              </div>
              <div className="lg:col-span-1">
                <AlertManager />
              </div>
            </div>
          </motion.div>

          {/* Intelligence & Insights */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <KnowledgeBase />
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
