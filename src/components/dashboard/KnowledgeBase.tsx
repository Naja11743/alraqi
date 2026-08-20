'use client';
import { BookOpen, DollarSign, Globe, Shield, Coins, TrendingUp } from 'lucide-react';

const knowledgeItems = [
  {
    icon: <DollarSign className="w-5 h-5 text-[var(--color-gold-400)]" />,
    title: 'Gold vs. US Dollar (DXY)',
    description: 'Gold is traditionally priced in US Dollars. When the Dollar strengthens, gold typically becomes more expensive for foreign buyers, potentially lowering demand and price. Conversely, a weaker Dollar often boosts gold prices.'
  },
  {
    icon: <Shield className="w-5 h-5 text-[var(--color-gold-400)]" />,
    title: 'Inflation Hedge',
    description: 'Gold is widely viewed as a safe-haven asset and a hedge against inflation. As the cost of living increases (fiat currency loses purchasing power), the value of gold historically tends to rise.'
  },
  {
    icon: <Globe className="w-5 h-5 text-[var(--color-gold-400)]" />,
    title: 'Geopolitical Tensions',
    description: 'During times of global uncertainty, war, or economic instability, investors flock to gold for capital preservation, often driving significant short-term price spikes.'
  },
  {
    icon: <Coins className="w-5 h-5 text-[var(--color-gold-400)]" />,
    title: '24K vs. 22K Purity',
    description: '24K is 99.9% pure gold, ideal for investment (bars/coins). 22K is 91.6% pure, mixed with alloys for durability, making it the standard for high-end jewellery.'
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-[var(--color-gold-400)]" />,
    title: 'Interest Rates',
    description: 'Gold yields no interest. Therefore, when central banks raise interest rates, yield-bearing assets (like bonds) become more attractive, often putting downward pressure on gold.'
  },
  {
    icon: <BookOpen className="w-5 h-5 text-[var(--color-gold-400)]" />,
    title: 'Global Pricing vs Local',
    description: 'The international spot price is universal, but local prices (e.g., in India) factor in currency exchange rates, import duties, and local taxes, causing significant geographical price disparities.'
  }
];

export function KnowledgeBase() {
  return (
    <div id="insights" className="py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-serif text-[var(--color-gold-300)] tracking-wide">
          GOLD INTELLIGENCE
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Essential macroeconomic drivers and market fundamentals every investor should know.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {knowledgeItems.map((item, index) => (
          <div 
            key={index} 
            className="group bg-[#0a0a0a] border border-white/10 hover:border-[var(--color-gold-500)] rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_15px_rgba(212,160,28,0.05)] cursor-default"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-black/5 rounded-lg border border-white/10 group-hover:bg-[var(--color-gold-900)]/30 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-sm font-semibold text-white tracking-wide uppercase">{item.title}</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
