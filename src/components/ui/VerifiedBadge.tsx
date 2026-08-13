import React from 'react';

export function VerifiedBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold tracking-wide uppercase">
      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      Al Raqi Verified
    </div>
  );
}
