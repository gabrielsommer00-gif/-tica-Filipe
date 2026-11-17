import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { FAQ_ITEMS } from '../data/landingData';
import { VoucherCtaButton } from './VoucherCtaButton';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 flex flex-col items-center">
        <h2 className="font-extrabold text-[28px] min-[390px]:text-[32px] md:text-[36px] leading-[1.25] text-[#111111] text-center max-w-[340px] md:max-w-none">
          Tire todas as suas dúvidas!
        </h2>

        <div className="mt-9 w-full max-w-[780px] flex flex-col gap-2.5">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-[8px] overflow-hidden border border-transparent"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${item.id}`}
                  className={`w-full px-4 py-3.5 flex items-center justify-between gap-3 text-left font-bold text-[15px] sm:text-[16px] leading-[1.35] transition-colors duration-150 cursor-pointer ${
                    isOpen
                      ? 'bg-[#F5B800] text-[#111111]'
                      : 'bg-[#111111] text-white hover:bg-[#F5B800] hover:text-[#111111]'
                  }`}
                >
                  <span className="flex-1">{item.question}</span>
                  <ChevronRight
                    aria-hidden="true"
                    className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`panel-${item.id}`}
                    className="bg-[#f5f5f5] text-[#111111] px-4 pb-4 pt-3 text-[14px] sm:text-[15px] leading-[1.55]"
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <VoucherCtaButton />
        </div>
      </div>
    </section>
  );
}
