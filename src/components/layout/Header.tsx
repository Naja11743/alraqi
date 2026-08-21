'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, X } from 'lucide-react';
import { CommandPalette } from '@/components/ui/CommandPalette';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            ? 'bg-black/90 backdrop-blur-md border-[var(--panel-border)] py-2' 
            : 'bg-transparent border-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="Al Raqi Gold Logo" 
                width={48} 
                height={48} 
                className="object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 w-full h-full -z-10 rounded bg-gradient-to-tr from-[var(--color-gold-700)] to-[var(--color-gold-300)] opacity-20 blur-sm group-hover:opacity-40 transition-opacity" />
            </div>
            <h1 className="text-lg md:text-xl font-serif tracking-widest text-[var(--color-gold-300)]">
              AL RAQI GOLD
            </h1>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden xl:flex items-center gap-8 text-sm tracking-wide text-gray-400">
            <Link href="/terminal" className="hover:text-white transition-colors py-2 text-[var(--color-gold-400)] font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Live Market
            </Link>
            <a href="#market" className="hover:text-white transition-colors py-2">Market</a>
            <a href="#analytics" className="hover:text-white transition-colors py-2">Analytics</a>
            <a href="#compare" className="hover:text-white transition-colors py-2">Compare</a>
            <a href="#portfolio" className="hover:text-white transition-colors py-2">Portfolio</a>
          </nav>

          {/* Currency Rates & Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Currency Rates (Hidden on smaller screens) */}
            <div className="hidden lg:flex items-center gap-4 text-sm font-mono border-r border-white/10 pr-6">
              <div className="flex items-center gap-2">
                <span className="text-lg" title="United Arab Emirates">🇦🇪</span>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-[10px] leading-none">AED/10G</span>
                  <span className={rates.aed.up ? 'text-green-400' : 'text-red-400'}>
                    AED {rates.aed.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={() => setIsCmdOpen(true)}
                className="flex items-center justify-center min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 md:px-3 md:py-2 md:bg-black/20 text-gray-400 hover:text-white transition-colors text-sm border border-transparent md:border-white/10 rounded-lg"
                aria-label="Search"
              >
                <Search size={20} className="md:w-4 md:h-4" />
                <span className="hidden md:inline ml-2">Search...</span>
                <kbd className="hidden md:inline-block bg-white/10 px-1.5 rounded text-[10px] ml-2 font-mono">
                  ⌘K
                </kbd>
              </button>
              
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono shrink-0 px-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-500 hidden md:inline">LIVE</span>
              </div>

              {/* Hamburger Toggle */}
              <button 
                className="xl:hidden p-2 text-gray-400 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <nav className="xl:hidden absolute top-full left-0 right-0 bg-[#0a0a0a] border-b border-white/10 shadow-2xl flex flex-col p-4">
            <Link href="/terminal" className="p-4 text-base tracking-wide text-[var(--color-gold-400)] hover:text-white hover:bg-white/5 rounded-xl transition-colors font-bold flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live Market
            </Link>
            <a href="#market" className="p-4 text-base tracking-wide text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>Market</a>
            <a href="#analytics" className="p-4 text-base tracking-wide text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>Analytics</a>
            <a href="#compare" className="p-4 text-base tracking-wide text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>Compare</a>
            <a href="#portfolio" className="p-4 text-base tracking-wide text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>Portfolio</a>
            
            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center px-4">
               <div className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-500">LIVE CONNECTION</span>
              </div>
              <span className="text-sm font-mono text-gray-400">🇦🇪 AED {rates.aed.price}</span>
            </div>
          </nav>
        )}
      </header>

      {/* Global Command Palette */}
      <CommandPalette isOpen={isCmdOpen} setIsOpen={setIsCmdOpen} />
    </>
  );
}
