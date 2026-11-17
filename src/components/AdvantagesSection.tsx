import { Ticket } from 'lucide-react';
import { scrollToVoucherForm } from './VoucherCtaButton';

export function AdvantagesSection() {
  return (
    <section className="w-full bg-[#F5B800] text-[#111111] py-12 md:py-16">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        <h2 className="font-extrabold text-[28px] min-[390px]:text-[32px] md:text-[36px] leading-[1.25] text-[#111111] max-w-[330px] md:max-w-[640px]">
          Vantagens imperdíveis esperam por você!
        </h2>

        <p className="mt-4 text-[17px] sm:text-[20px] leading-[1.45] text-[#111111] max-w-[336px] md:max-w-[660px]">
          Não perca a chance de garantir atendimento exclusivo: preencha nosso
          formulário, escolha sua unidade e retire seu voucher em minutos. Tudo
          rápido e fácil!
        </p>

        {/* Clickable Voucher Ticket matching original Prevent sticker dimensions & interaction */}
        <button
          type="button"
          onClick={scrollToVoucherForm}
          aria-label="Ir para o formulário de retirada do voucher"
          className="mt-7 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-2xl transition-transform duration-200 hover:scale-[1.03] active:scale-[0.99]"
        >
          <div className="w-[290px] min-[390px]:w-[320px] sm:w-[360px] min-h-[104px] rounded-2xl bg-[#111111] text-white border-2 border-dashed border-[#FEF9E7] px-5 py-4 shadow-lg flex items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-[#F5B800] text-[#111111] flex items-center justify-center shrink-0">
                <Ticket className="w-6 h-6 stroke-[2.2]" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#F5B800]">
                  Óticas Filipe · Voucher Oficial
                </p>
                <p className="text-base sm:text-lg font-extrabold leading-tight text-white">
                  RETIRAR MEU VOUCHER
                </p>
                <p className="text-[11px] text-neutral-300 mt-0.5">
                  Avaliação visual 100% gratuita
                </p>
              </div>
            </div>
            <span className="text-lg font-extrabold text-[#F5B800] shrink-0">
              →
            </span>
          </div>
        </button>
      </div>
    </section>
  );
}
