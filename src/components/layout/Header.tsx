'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { CommandPalette } from '@/components/ui/CommandPalette';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);

  const rates = {
    aed: { price: '2,934.50', up: true },
    inr: { price: '68,980.00', up: true },
    eur: { price: '2,201.35', up: true }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCmdOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-md border-[var(--panel-border)] py-4' 
            : 'bg-transparent border-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            {/* The user should place their logo image as logo.png in the public folder */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="Al Raqi Gold Logo" 
                width={48} 
                height={48} 
                className="object-contain"
                onError={(e) => {
                  // Fallback if logo not found
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 w-full h-full -z-10 rounded bg-gradient-to-tr from-[var(--color-gold-700)] to-[var(--color-gold-300)] opacity-20 blur-sm group-hover:opacity-40 transition-opacity" />
            </div>
            <h1 className="text-xl font-serif tracking-widest text-[var(--color-gold-300)] hidden sm:block">
              AL RAQI GOLD
            </h1>
          </Link>

          {/* Navigation - Hidden on mobile for simplicity */}
          <nav className="hidden xl:flex items-center gap-6 text-sm tracking-wide text-gray-600">
            <a href="#market" className="hover:text-gray-900 transition-colors">Market</a>
            <a href="#analytics" className="hover:text-gray-900 transition-colors">Analytics</a>
            <a href="#compare" className="hover:text-gray-900 transition-colors">Compare</a>
            <a href="#portfolio" className="hover:text-gray-900 transition-colors">Portfolio</a>
          </nav>

          {/* Currency Rates & Actions */}
          <div className="flex items-center gap-6">
            {/* Currency Rates */}
            <div className="hidden lg:flex items-center gap-4 text-sm font-mono border-r border-black/5 pr-6">
              <div className="flex items-center gap-2">
                <span className="text-lg" title="United Arab Emirates">🇦🇪</span>
                <div className="flex flex-col">
                  <span className="text-gray-600 text-[10px] leading-none">AED/10G</span>
                  <span className={rates.aed.up ? 'text-green-400' : 'text-red-400'}>
                    AED {rates.aed.price}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg" title="India">🇮🇳</span>
                <div className="flex flex-col">
                  <span className="text-gray-600 text-[10px] leading-none">INR/10G</span>
                  <span className={rates.inr.up ? 'text-green-400' : 'text-red-400'}>
                    ₹ {rates.inr.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCmdOpen(true)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm bg-white/5 border border-black/5 px-3 py-1.5 rounded-md"
              >
                <Search size={16} />
                <span className="hidden sm:inline">Search...</span>
                <kbd className="hidden sm:inline-block bg-white/10 px-1.5 rounded text-xs ml-2 border border-black/5 font-mono">
                  ⌘K
                </kbd>
              </button>
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono shrink-0">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-500 hidden md:inline">LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Global Command Palette */}
      <CommandPalette isOpen={isCmdOpen} setIsOpen={setIsCmdOpen} />
    </>
  );
}
