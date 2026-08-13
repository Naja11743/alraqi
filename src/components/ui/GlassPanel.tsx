import React from 'react';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function GlassPanel({ children, className = '', ...props }: GlassPanelProps) {
  return (
    <div 
      className={`bg-[var(--panel)] backdrop-blur-md border border-[var(--panel-border)] rounded-2xl p-6 shadow-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
