import { Eye, Focus, Layers, Monitor } from 'lucide-react';
import { LENS_TYPES } from '../data/landingData';
import { VoucherCtaButton } from './VoucherCtaButton';

const LENS_ICONS = {
  monofocais: Eye,
  multifocais: Layers,
  ocupacionais: Monitor,
  bifocais: Focus,
} as const;

export function LensesSection() {
  return (
    <section className="w-full bg-white py-10 md:py-14">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 flex flex-col items-center">
        <h2 className="font-extrabold text-[28px] min-[390px]:text-[32px] md:text-[36px] leading-[1.25] text-[#111111] text-center max-w-[340px] md:max-w-[680px]">
          Soluções em lentes feitas sob medida para você!
        </h2>

        <div className="mt-9 w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {LENS_TYPES.map((lens) => {
            const Icon =
              LENS_ICONS[lens.id as keyof typeof LENS_ICONS] ?? Eye;
            return (
              <article
                key={lens.id}
                className="bg-white border border-[#111111] rounded-[16px] px-6 py-7 flex flex-col items-center text-center"
              >
                <div className="w-[54px] h-[44px] rounded-xl bg-[#FEF9E7] border border-[#F5B800] flex items-center justify-center mb-3 text-[#111111]">
                  <Icon className="w-6 h-6 stroke-[2.2]" aria-hidden="true" />
                </div>
                <h3 className="font-extrabold text-[22px] sm:text-[24px] leading-[1.3] text-[#111111]">
                  {lens.title}
                </h3>
                <div className="mt-1 w-9 h-1 rounded-full bg-[#F5B800]" aria-hidden="true" />
                <p className="mt-2.5 text-[16px] leading-[1.45] text-[#3F3F46] max-w-[300px] md:max-w-[360px]">
                  {lens.description}
                </p>
              </article>
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
