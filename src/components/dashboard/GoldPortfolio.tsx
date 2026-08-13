'use client';
import { useState } from 'react';
import { Plus, Wallet, Trash2 } from 'lucide-react';

interface Asset {
  id: number;
  karat: number;
  weight: number;
}

export function GoldPortfolio() {
  const [assets, setAssets] = useState<Asset[]>([
    { id: 1, karat: 24, weight: 50 },
    { id: 2, karat: 22, weight: 120 }
  ]);
  
  const [newKarat, setNewKarat] = useState(24);
  const [newWeight, setNewWeight] = useState('');

  const basePrice24k = 310.50; // mock per gram
  
  const calculateAssetValue = (asset: Asset) => {
    const pricePerGram = asset.karat === 24 ? basePrice24k : (basePrice24k * (asset.karat / 24));
    return pricePerGram * asset.weight;
  };

  const totalValue = assets.reduce((acc, asset) => acc + calculateAssetValue(asset), 0);
  const totalWeight = assets.reduce((acc, asset) => acc + asset.weight, 0);
  // Mock historical cost logic for visual purposes
  const estimatedProfit = totalValue * 0.18;

  const handleAdd = () => {
    if (!newWeight || isNaN(Number(newWeight))) return;
    setAssets([...assets, { id: Date.now(), karat: newKarat, weight: Number(newWeight) }]);
    setNewWeight('');
  };

  const handleDelete = (id: number) => {
    setAssets(assets.filter(a => a.id !== id));
  };

  return (
    <div className="bg-[var(--background)] border border-black/5 rounded-2xl p-6 md:p-8 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-white/5 rounded-lg border border-black/5">
          <Wallet className="w-5 h-5 text-[var(--color-gold-400)]" />
        </div>
        <h2 className="text-xl font-serif text-[var(--color-gold-300)] tracking-wide">
          MY GOLD HOLDINGS
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white/50 border border-black/5 p-4 rounded-xl">
          <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Total Estimated Value</div>
          <div className="text-2xl text-gray-900 font-mono font-semibold">AED {totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
          <div className="text-xs text-green-400 mt-2 font-mono">+AED {estimatedProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })} (All Time)</div>
        </div>
        <div className="bg-white/50 border border-black/5 p-4 rounded-xl">
          <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Total Physical Gold</div>
          <div className="text-2xl text-[var(--color-gold-400)] font-mono font-semibold">{totalWeight}g</div>
          <div className="text-xs text-gray-600 mt-2 font-mono">{assets.length} Active Positions</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3 mb-6">
        {assets.map(asset => (
          <div key={asset.id} className="flex items-center justify-between bg-white/5 border border-black/5 p-3 rounded-lg group">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-[var(--color-gold-500)] rounded-full" />
              <div>
                <div className="text-sm font-semibold text-gray-900">{asset.karat}K Gold Physical</div>
                <div className="text-xs text-gray-500 font-mono">{asset.weight}g</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-mono text-gray-900">AED {calculateAssetValue(asset).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              </div>
              <button onClick={() => handleDelete(asset.id)} className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        
        {assets.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm border border-dashed border-black/5 rounded-lg">
            No holdings added yet.
          </div>
        )}
      </div>

      {/* Add New Holding */}
      <div className="mt-auto pt-4 border-t border-black/5">
        <div className="text-xs text-gray-500 uppercase tracking-widest mb-3">Add New Position</div>
        <div className="flex gap-2">
          <select 
            value={newKarat}
            onChange={(e) => setNewKarat(parseInt(e.target.value))}
            className="w-24 bg-white/5 border border-black/5 rounded-lg p-2 text-sm text-gray-900 focus:outline-none focus:border-[var(--color-gold-500)]"
          >
            <option value={24} className="bg-white">24K</option>
            <option value={22} className="bg-white">22K</option>
            <option value={21} className="bg-white">21K</option>
            <option value={18} className="bg-white">18K</option>
          </select>
          <input 
            type="number"
            placeholder="Weight (g)"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            className="flex-1 bg-white/5 border border-black/5 rounded-lg p-2 text-sm text-gray-900 focus:outline-none focus:border-[var(--color-gold-500)] font-mono"
          />
          <button 
            onClick={handleAdd}
            className="bg-[var(--color-gold-600)] hover:bg-[var(--color-gold-500)] text-black p-2 rounded-lg transition-colors flex items-center justify-center"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
