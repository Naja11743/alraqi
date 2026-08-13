'use client';
import { useState } from 'react';
import { BellRing, Check, Plus } from 'lucide-react';

export function AlertManager() {
  const [alerts, setAlerts] = useState([
    { id: 1, type: '24K Gold', condition: 'Drops Below', target: 'AED 3,000', active: true },
    { id: 2, type: '22K Gold', condition: 'Rises Above', target: 'AED 3,000', active: false },
    { id: 3, type: 'Daily Move', condition: 'Drops More Than', target: '2.0%', active: true },
  ]);

  const toggleAlert = (id: number) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  return (
    <div className="bg-[var(--background)] border border-black/5 rounded-2xl p-6 md:p-8 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-white/5 rounded-lg border border-black/5">
          <BellRing className="w-5 h-5 text-[var(--color-gold-400)]" />
        </div>
        <h2 className="text-xl font-serif text-[var(--color-gold-300)] tracking-wide">
          GOLD PRICE ALERTS
        </h2>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Set custom market thresholds to receive immediate notifications when conditions are met.
      </p>

      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2 mb-6">
        {alerts.map(alert => (
          <div key={alert.id} className="flex items-center justify-between bg-white/5 border border-black/5 p-4 rounded-xl">
            <div>
              <div className="text-sm font-semibold text-gray-900 mb-1">{alert.type}</div>
              <div className="text-xs text-gray-600 font-mono">
                {alert.condition} <span className="text-[var(--color-gold-400)]">{alert.target}</span>
              </div>
            </div>
            
            <button 
              onClick={() => toggleAlert(alert.id)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${alert.active ? 'bg-[var(--color-gold-500)]' : 'bg-gray-700'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${alert.active ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        ))}
      </div>

      <button className="w-full mt-auto bg-white/5 hover:bg-white/10 border border-black/5 border-dashed text-gray-700 p-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm font-medium">
        <Plus size={18} />
        CREATE NEW ALERT
      </button>
    </div>
  );
}
