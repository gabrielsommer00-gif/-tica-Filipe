import { Component, type ErrorInfo, type ReactNode, useState } from 'react';
import { AdminVouchersPage } from './components/AdminVouchersPage';
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

interface ErrorBoundaryState {
  hasError: boolean;
}

class AppErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Application ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white text-[#111111] p-6 text-center">
          <div className="max-w-md space-y-3">
            <h1 className="text-xl font-extrabold">
              Não foi possível concluir a operação
            </h1>
            <p className="text-sm text-[#3F3F46]">
              Recarregue a página e tente novamente.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-full bg-[#F5B800] text-[#111111] text-sm font-extrabold cursor-pointer"
            >
              Recarregar página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [selectedStore, setSelectedStore] = useState('');

  const isAdminRoute =
    typeof window !== 'undefined' &&
    (window.location.pathname === '/admin' ||
      new URLSearchParams(window.location.search).get('admin') === '1');

  const handleSelectStoreForAppointment = (storeId: string) => {
    setSelectedStore(storeId);
    const target = document.getElementById('formulario-voucher');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (isAdminRoute) {
    return (
      <AppErrorBoundary>
        <AdminVouchersPage />
      </AppErrorBoundary>
    );
  }

  return (
    <AppErrorBoundary>
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
    </AppErrorBoundary>
  );
}
