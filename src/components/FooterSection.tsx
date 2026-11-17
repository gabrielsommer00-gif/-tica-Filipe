import { ArrowUp } from 'lucide-react';
import { BRAND_ASSETS } from '../data/landingData';
import { ResilientImage } from './ResilientImage';

export function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="w-full bg-[#111111] text-white py-10 md:py-12 border-t border-[#F5B800]/30">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-6">
        {/* Retornar ao topo matching Prevent */}
        <button
          type="button"
          onClick={scrollToTop}
          className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800] rounded-lg p-1"
        >
          <div className="w-[41px] h-[41px] rounded-full bg-[#F5B800] text-[#111111] flex items-center justify-center transition-transform duration-200 group-hover:-translate-y-0.5">
            <ArrowUp className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
          </div>
          <span className="font-bold text-[11px] tracking-wide text-white">
            Retornar ao topo!
          </span>
        </button>

        {/* Clean Institutional / Navigation Links */}
        <nav
          aria-label="Links institucionais"
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-[11px] text-neutral-300"
        >
          <a
            href="#unidades"
            onClick={(e) => scrollToSection(e, 'unidades')}
            className="hover:text-[#F5B800] hover:underline"
          >
            Nossas 15 Unidades
          </a>
          <a
            href="#formulario-voucher"
            onClick={(e) => scrollToSection(e, 'formulario-voucher')}
            className="hover:text-[#F5B800] hover:underline"
          >
            Retirar Voucher
          </a>
          <a
            href={BRAND_ASSETS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F5B800] hover:underline"
          >
            Instagram {BRAND_ASSETS.instagramHandle}
          </a>
        </nav>

        {/* Official Óticas Filipe Brand Logo */}
        <div className="pt-1">
          <div className="rounded-lg bg-black p-1.5 border border-white/10 inline-flex">
            <ResilientImage
              src={BRAND_ASSETS.logoOfficial}
              alt="Óticas Filipe — Aqui Você Vê a Diferença"
              width={1536}
              height={1024}
              className="w-[140px] md:w-[165px] h-auto object-contain mx-auto"
            />
          </div>
        </div>

        {/* Copyright */}
        <p className="text-[10px] sm:text-[11px] text-white/90">
          © {new Date().getFullYear()} Óticas Filipe. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
