import { BullionTVDashboard } from '@/components/dashboard/BullionTVDashboard';

export const metadata = {
  title: 'Live Market Terminal | Al Raqi Gold',
  description: 'Live spot rates, commodity pricing, and professional gold market feed from Al Raqi Gold.',
};

export default function TerminalPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <BullionTVDashboard />
    </main>
  );
}
