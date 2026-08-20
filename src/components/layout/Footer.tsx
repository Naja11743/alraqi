import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-[var(--panel-border)] bg-black/80 mt-20">
      <div className="container mx-auto px-4 py-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Al Raqi. All rights reserved.</p>
        <p className="mt-2 text-xs">Live rates are for informational purposes only.</p>
      </div>
    </footer>
  );
}
