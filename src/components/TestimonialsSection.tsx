import { CheckCircle2, Eye, Microscope, ShieldCheck, Wrench } from 'lucide-react';
import { DIFFERENTIATORS } from '../data/landingData';
import { VoucherCtaButton } from './VoucherCtaButton';

const CARD_ICONS = [Eye, CheckCircle2, Microscope, ShieldCheck, Wrench];

export function TestimonialsSection() {
  const highlights = DIFFERENTIATORS.slice(0, 4);

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 flex flex-col items-center">
        <h2 className="font-extrabold text-[28px] min-[390px]:text-[32px] md:text-[36px] leading-[1.25] text-[#111111] text-center max-w-[340px] md:max-w-[740px]">
          Diferenciais reais que garantem confiança na sua escolha!
        </h2>

        <p className="mt-3 text-[17px] sm:text-[20px] leading-[1.45] text-[#3F3F46] text-center max-w-[340px] md:max-w-[700px]">
          Conheça os compromissos da rede Óticas Filipe para atender você com
          consultoria próxima, estrutura técnica e procedência certificada.
        </p>

        {/* Preserving Prevent's 2x2 rounded-[27px] card visual structure */}
        <div className="mt-12 w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-9">
          {highlights.map((item, idx) => {
            const Icon = CARD_ICONS[idx % CARD_ICONS.length];
            return (
              <article
                key={item.id}
                className="flex flex-col items-center text-center"
              >
                <div className="relative w-full bg-white border-2 border-[#111111] rounded-[27px] px-7 py-7 min-h-[152px] flex items-center justify-center">
                  <div className="absolute -top-4 left-5 w-[36px] h-[36px] bg-[#F5B800] border border-[#111111] rounded-full flex items-center justify-center text-[#111111]">
                    <Icon className="w-4 h-4 stroke-[2.3]" aria-hidden="true" />
                  </div>

                  <p className="text-[15px] sm:text-[16px] leading-[1.5] text-[#111111]">
                    {item.description}
                  </p>

                  <div className="absolute -bottom-4 right-5 w-[36px] h-[36px] bg-[#111111] text-[#F5B800] rounded-full flex items-center justify-center text-xs font-extrabold tabular-nums">
                    {item.number}
                  </div>
                </div>

                <div className="mt-6 flex flex-col items-center">
                  <div className="w-12 h-1 rounded-full bg-[#F5B800]" aria-hidden="true" />
                  <p className="mt-2 font-extrabold text-[16px] leading-[1.35] text-[#111111]">
                    {item.title}
                    <br />
                    <span className="font-normal text-[14px] text-[#71717A]">
                      Compromisso Oficial Óticas Filipe
                    </span>
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-11">
          <VoucherCtaButton />
        </div>
      </div>
    </section>
  );
}
