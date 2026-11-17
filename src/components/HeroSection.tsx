import { LockOpen } from 'lucide-react';
import { BRAND_ASSETS } from '../data/landingData';
import { ResilientImage } from './ResilientImage';
import { VoucherCtaButton } from './VoucherCtaButton';

function HeroVisualComposition() {
  return (
    <div className="relative w-full">
      <div className="rounded-2xl overflow-hidden border-2 border-[#111111] bg-[#111111] shadow-md aspect-[472/430]">
        <ResilientImage
          src={BRAND_ASSETS.heroEyewear}
          alt="Óculos de grau Óticas Filipe"
          width={472}
          height={430}
          className="w-full h-full object-cover object-center"
        />
      </div>
      {/* Floating brand badge matching Prevent composition */}
      <div className="absolute top-[7%] -right-1 sm:-right-2 w-[132px] md:w-[165px] pointer-events-none drop-shadow-lg rounded-xl overflow-hidden border-2 border-[#F5B800] bg-black p-1">
        <ResilientImage
          src={BRAND_ASSETS.logoOfficial}
          alt="Óticas Filipe — Aqui Você Vê a Diferença"
          width={1536}
          height={1024}
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="w-full bg-[#f8f8f8] pt-8 pb-9 md:py-12">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 md:items-center gap-6 md:gap-8">
          {/* Left / Top Text + Composition on Mobile */}
          <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="font-extrabold text-[30px] min-[390px]:text-[33px] md:text-[38px] leading-[1.08] text-[#111111] max-w-[330px] md:max-w-none">
              Óticas Filipe — Aqui Você Vê a Diferença.
            </h1>

            <h2 className="mt-3 font-normal text-[26px] min-[390px]:text-[30px] md:text-[32px] leading-[1.18] text-[#111111] max-w-[345px] md:max-w-none">
              Agora é a sua vez de{' '}
              <strong className="font-extrabold">retirar seu voucher!</strong>
            </h2>

            {/* Mobile Hero Visual Composition (matches reference flow order) */}
            <div className="w-full max-w-[350px] mx-auto my-5 md:hidden">
              <HeroVisualComposition />
            </div>

            {/* Black & Yellow Unlock Callout Box matching Prevent box */}
            <div className="mt-1 md:mt-6 w-full max-w-[340px] md:max-w-[420px] bg-[#111111] border border-[#F5B800] px-3 py-2.5 flex items-center gap-3 text-left">
              <div className="w-[34px] h-[34px] shrink-0 flex items-center justify-center rounded-lg bg-[#F5B800] text-[#111111]">
                <LockOpen className="w-5 h-5 stroke-[2.2]" aria-hidden="true" />
              </div>
              <p className="text-[15px] sm:text-[16px] leading-[1.35] text-white">
                Atendimento exclusivo nas 15 unidades com{' '}
                <strong className="font-bold text-[#F5B800]">
                  voucher oficial da Óticas Filipe
                </strong>
              </p>
            </div>

            {/* Subtext */}
            <p className="mt-4 text-[16px] leading-[1.4] text-[#111111] max-w-[335px] md:max-w-[420px]">
              Encontre os óculos ideais para você com consultoria especializada:
              <br />
              <strong className="font-bold">
                avaliação visual 100% gratuita e laboratório próprio.
              </strong>
            </p>

            {/* Primary CTA */}
            <div className="mt-5 flex justify-center md:justify-start w-full">
              <VoucherCtaButton />
            </div>

            {/* Official Brand Logo */}
            <div className="mt-7 md:mt-6 flex justify-center md:justify-start w-full">
              <div className="rounded-lg bg-black p-1.5 border border-black/15 inline-flex">
                <ResilientImage
                  src={BRAND_ASSETS.logoOfficial}
                  alt="Óticas Filipe"
                  width={1536}
                  height={1024}
                  className="w-[135px] md:w-[160px] h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Desktop Right Visual Composition */}
          <div className="hidden md:flex md:col-span-6 justify-center items-center">
            <div className="w-full max-w-[440px]">
              <HeroVisualComposition />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
