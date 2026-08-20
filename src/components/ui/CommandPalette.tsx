'use client';
import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { Search, TrendingUp, LineChart, Globe, DollarSign, BookOpen, Bell, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CommandPalette({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsOpen]);

  const handleSelect = (href: string) => {
    window.location.href = href;
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-[20vh] px-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
          >
            <Command className="w-full">
              <div className="flex items-center border-b border-white/10 px-4">
                <Search className="w-5 h-5 text-gray-400" />
                <Command.Input 
                  placeholder="Search market data, tools, or analytics..." 
                  className="w-full bg-transparent border-none text-white p-4 focus:outline-none focus:ring-0 placeholder-gray-500 text-lg"
                  autoFocus
                />
              </div>

              <Command.List className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
                <Command.Empty className="p-8 text-center text-gray-400">
                  No results found. Try "24K Gold" or "Analytics".
                </Command.Empty>

                <Command.Group heading="Market Data" className="p-2 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  <Command.Item onSelect={() => handleSelect('#market')} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-gray-200 hover:bg-black/5 cursor-pointer aria-selected:bg-black/10">
                    <TrendingUp className="w-4 h-4 text-[var(--color-gold-400)]" />
                    Live Gold Prices
                  </Command.Item>
                  <Command.Item onSelect={() => handleSelect('#analytics')} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-gray-200 hover:bg-black/5 cursor-pointer aria-selected:bg-black/10">
                    <LineChart className="w-4 h-4 text-[var(--color-gold-400)]" />
                    Gold Price Performance Chart
                  </Command.Item>
                  <Command.Item onSelect={() => handleSelect('#analytics')} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-gray-200 hover:bg-black/5 cursor-pointer aria-selected:bg-black/10">
                    <BookOpen className="w-4 h-4 text-[var(--color-gold-400)]" />
                    Market Pulse & Heatmap
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Investment Tools" className="p-2 text-xs text-gray-500 font-semibold uppercase tracking-wider mt-2">
                  <Command.Item onSelect={() => handleSelect('#compare')} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-gray-200 hover:bg-black/5 cursor-pointer aria-selected:bg-black/10">
                    <Globe className="w-4 h-4 text-blue-400" />
                    UAE vs India Arbitrage
                  </Command.Item>
                  <Command.Item onSelect={() => handleSelect('#investment')} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-gray-200 hover:bg-black/5 cursor-pointer aria-selected:bg-black/10">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    Historical Investment Simulator
                  </Command.Item>
                  <Command.Item onSelect={() => handleSelect('#portfolio')} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-gray-200 hover:bg-black/5 cursor-pointer aria-selected:bg-black/10">
                    <Wallet className="w-4 h-4 text-purple-400" />
                    My Gold Holdings Portfolio
                  </Command.Item>
                  <Command.Item onSelect={() => handleSelect('#portfolio')} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-gray-200 hover:bg-black/5 cursor-pointer aria-selected:bg-black/10">
                    <Bell className="w-4 h-4 text-orange-400" />
                    Gold Price Alerts
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
