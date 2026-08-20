'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
        >
          {/* Shimmering Gold Background Glow */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-[var(--color-gold-900)] via-transparent to-[var(--color-gold-700)] opacity-20"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{ duration: 5, ease: "linear", repeat: Infinity }}
          />
          
          {/* Golden Object (Logo) */}
          <motion.div
            initial={{ scale: 0.5, rotateY: 90, opacity: 0 }}
            animate={{ scale: 1, rotateY: 0, opacity: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: "easeOut",
              type: "spring",
              bounce: 0.4
            }}
            className="relative w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-yellow-600 via-yellow-200 to-yellow-600 flex items-center justify-center shadow-[0_0_80px_rgba(212,160,28,0.5)] border-4 border-yellow-100"
          >
            {/* Shimmer line passing through the gold coin */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white to-transparent opacity-50"
              initial={{ x: '-100%', y: '-100%' }}
              animate={{ x: '100%', y: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}
            />
            <span className="text-4xl md:text-6xl font-serif text-black tracking-tighter drop-shadow-md">
              AR
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
