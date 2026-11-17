import { useState } from 'react';
import { AdvantagesSection } from './components/AdvantagesSection';
import { CategoriesSection } from './components/CategoriesSection';
import { CountdownBanner } from './components/CountdownBanner';
import { FaqSection } from './components/FaqSection';
import { FooterSection } from './components/FooterSection';
import { HeroSection } from './components/HeroSection';
import { LensesSection } from './components/LensesSection';
import { MetricsSection } from './components/MetricsSection';
import { StoresSection } from './components/StoresSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { VoucherFormSection } from './components/VoucherFormSection';

export default function App() {
  const [selectedStore, setSelectedStore] = useState('');

  const handleSelectStoreForAppointment = (storeName: string) => {
    setSelectedStore(storeName);
    const target = document.getElementById('formulario-voucher');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-[#111111] flex flex-col">
      <CountdownBanner />
      <main className="flex-1 w-full">
        <HeroSection />
        <MetricsSection />
        <CategoriesSection />
        <LensesSection />
        <AdvantagesSection />
        <StoresSection
          onSelectStoreForAppointment={handleSelectStoreForAppointment}
        />
        <TestimonialsSection />
        <VoucherFormSection selectedStore={selectedStore} />
        <FaqSection />
      </main>
      <FooterSection />
    </div>
  );
}
