'use client';
import { useEffect, useState } from 'react';

export function AnalogClock({ timezone, label, countryCode }: { timezone: string; label: string; countryCode?: string }) {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Avoid hydration mismatch by not rendering the clock hands until mounted
  if (!mounted) {
    return (
      <div className="flex flex-col items-center gap-1.5 sm:gap-2">
        <svg className="w-14 h-14 sm:w-20 sm:h-20 drop-shadow-md" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="transparent" stroke="white" strokeWidth="2" strokeOpacity="0.8" />
        </svg>
        <div className="flex items-center gap-1.5 mt-1">
          {countryCode && (
            <img 
              src={`https://flagcdn.com/w20/${countryCode}.png`} 
              alt={`${label} flag`} 
              className="w-3.5 h-2.5 sm:w-4 sm:h-3 object-cover rounded-sm"
            />
          )}
          <span className="text-[9px] sm:text-xs text-white/80 tracking-widest uppercase font-mono text-center leading-tight">
            {label}
          </span>
        </div>
      </div>
    );
  }

  // Ensure robust timezone fallback
  let tzTimeStr;
  try {
    tzTimeStr = time.toLocaleString('en-US', { timeZone: timezone });
  } catch (e) {
    tzTimeStr = time.toLocaleString('en-US'); // Fallback if timezone is invalid
  }
  
  const tzTime = new Date(tzTimeStr);

  const hours = tzTime.getHours() % 12;
  const minutes = tzTime.getMinutes();
  const seconds = tzTime.getSeconds();

  const hourAngle = (hours * 30) + (minutes * 0.5);
  const minuteAngle = (minutes * 6) + (seconds * 0.1);
  const secondAngle = seconds * 6;

  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
      <svg className="w-14 h-14 sm:w-20 sm:h-20 drop-shadow-md" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="transparent" stroke="white" strokeWidth="2" strokeOpacity="0.8" />
        
        {/* Ticks */}
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1="50" y1="8" x2="50" y2={i % 3 === 0 ? "14" : "11"}
            stroke="white"
            strokeWidth={i % 3 === 0 ? "2" : "1"}
            strokeOpacity="0.6"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}

        {/* Hour Hand */}
        <line
          x1="50" y1="50" x2="50" y2="28"
          stroke="white" strokeWidth="3" strokeLinecap="round"
          transform={`rotate(${hourAngle} 50 50)`}
        />
        
        {/* Minute Hand */}
        <line
          x1="50" y1="50" x2="50" y2="18"
          stroke="white" strokeWidth="2" strokeOpacity="0.9" strokeLinecap="round"
          transform={`rotate(${minuteAngle} 50 50)`}
        />
        
        {/* Second Hand */}
        <line
          x1="50" y1="50" x2="50" y2="15"
          stroke="#ef4444" strokeWidth="1" strokeLinecap="round"
          transform={`rotate(${secondAngle} 50 50)`}
        />
        
        {/* Center dot */}
        <circle cx="50" cy="50" r="2.5" fill="white" />
      </svg>
      <div className="flex items-center gap-1.5 mt-1">
        {countryCode && (
          <img 
            src={`https://flagcdn.com/w20/${countryCode}.png`} 
            alt={`${label} flag`} 
            className="w-3.5 h-2.5 sm:w-4 sm:h-3 object-cover rounded-sm"
          />
        )}
        <span className="text-[9px] sm:text-xs text-white/80 tracking-widest uppercase font-mono text-center leading-tight">
          {label}
        </span>
      </div>
    </div>
  );
}
