import { type ReactNode, useEffect, useRef, useState } from 'react';
import { VoucherCtaButton } from './VoucherCtaButton';

interface MetricCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  label: ReactNode;
  formatNumber: (n: number) => string;
}

function MetricCounter({
  target,
  prefix = '',
  suffix = '',
  label,
  formatNumber,
}: MetricCounterProps) {
  const [displayValue, setDisplayValue] = useState(target);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasAnimated(true);
          const duration = 900;
          const start = performance.now();

          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.round(target * eased));
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center text-[#111111]">
      <div className="flex items-baseline justify-center gap-1 font-extrabold leading-none">
        {prefix && (
          <span className="text-[40px] sm:text-[44px] leading-none">{prefix}</span>
        )}
        <span className="text-[58px] min-[390px]:text-[66px] md:text-[70px] leading-none tabular-nums">
          {formatNumber(displayValue)}
        </span>
        {suffix && (
          <span className="text-[40px] sm:text-[44px] leading-none">{suffix}</span>
        )}
      </div>
      <p className="mt-2 font-bold text-[12px] sm:text-[13px] leading-[1.4] text-[#111111] max-w-[190px]">
        {label}
      </p>
    </div>
  );
}

export function MetricsSection() {
  const formatPtBr = (n: number) => n.toLocaleString('pt-BR');

  return (
    <section className="w-full bg-[#F5B800] text-[#111111] py-12 md:py-14">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        <h2 className="font-extrabold text-[28px] min-[390px]:text-[32px] md:text-[36px] leading-[1.25] text-[#111111] max-w-[330px] md:max-w-[680px]">
          Óticas Filipe: estrutura completa para cuidar da sua visão!
        </h2>

        <div className="mt-10 md:mt-12 w-full grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">
          <MetricCounter
            target={15}
            label="unidades oficiais para atender você"
            formatNumber={formatPtBr}
          />
          <MetricCounter
            target={100}
            suffix="%"
            label={
              <>
                avaliação visual
                <br />
                gratuita nas lojas
              </>
            }
            formatNumber={formatPtBr}
          />
          <div className="flex flex-col items-center text-center text-[#111111]">
            <div className="flex items-baseline justify-center font-extrabold leading-none">
              <span className="text-[46px] min-[390px]:text-[52px] md:text-[56px] leading-none pt-2">
                Próprio
              </span>
            </div>
            <p className="mt-3 font-bold text-[12px] sm:text-[13px] leading-[1.4] text-[#111111] max-w-[200px]">
              laboratório de montagem e garantia certificada
            </p>
          </div>
        </div>

        <div className="mt-10 md:mt-12">
          <VoucherCtaButton variant="dark" />
        </div>
      </div>
    </section>
  );
}
