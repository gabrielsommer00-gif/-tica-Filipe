import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { PRODUCT_CATEGORIES, type CategoryItem } from '../data/landingData';
import { ResilientImage } from './ResilientImage';
import { VoucherCtaButton } from './VoucherCtaButton';

function CategoryCard({ category }: { category: CategoryItem }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const total = category.slides.length;

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => window.clearInterval(id);
  }, [isPaused, total]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = touchStartX.current - endX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  return (
    <article
      className="flex flex-col items-center text-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="relative w-full max-w-[360px] mx-auto overflow-hidden select-none rounded-2xl border border-[#e5e5e5] bg-[#f8f8f8]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-roledescription="carrossel"
        aria-label={category.title}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {category.slides.map((slide, idx) => (
            <div
              key={slide.src}
              className="w-full shrink-0 flex items-center justify-center"
            >
              <ResilientImage
                src={slide.src}
                alt={slide.alt}
                loading={idx === 0 ? 'eager' : 'lazy'}
                className="w-full h-[210px] sm:h-[225px] object-cover object-center"
              />
            </div>
          ))}
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label={`Modelo anterior de ${category.title}`}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/95 text-[#111111] border border-[#111111]/20 shadow-sm hover:bg-[#F5B800] hover:border-[#F5B800] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label={`Próximo modelo de ${category.title}`}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/95 text-[#111111] border border-[#111111]/20 shadow-sm hover:bg-[#F5B800] hover:border-[#F5B800] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Interactive slide controls */}
      {total > 1 && (
        <div
          className="mt-3 flex items-center justify-center gap-2"
          role="tablist"
          aria-label={`Slides de ${category.title}`}
        >
          {category.slides.map((slide, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Ver modelo ${idx + 1} de ${category.title}`}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  active
                    ? 'w-6 bg-[#111111]'
                    : 'w-2.5 bg-[#111111]/25 hover:bg-[#F5B800]'
                }`}
              />
            );
          })}
        </div>
      )}

      <h3 className="mt-3 font-extrabold text-[24px] sm:text-[26px] leading-[1.3] text-[#111111]">
        {category.title}
      </h3>
      <div className="mt-1 w-10 h-1 rounded-full bg-[#F5B800]" aria-hidden="true" />
      <p className="mt-2 text-[15px] sm:text-[16px] leading-[1.45] text-[#52525B] max-w-[320px]">
        {category.description}
      </p>
    </article>
  );
}

export function CategoriesSection() {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 flex flex-col items-center">
        <h2 className="font-extrabold text-[28px] min-[390px]:text-[32px] md:text-[36px] leading-[1.25] text-[#111111] text-center max-w-[340px] md:max-w-[680px]">
          Qualidade e variedade para transformar o seu visual!
        </h2>

        <div className="mt-10 w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 justify-items-center">
          {PRODUCT_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="w-full max-w-[380px] last:md:col-span-2 last:md:max-w-[380px]"
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-12">
          <VoucherCtaButton />
        </div>
      </div>
    </section>
  );
}
