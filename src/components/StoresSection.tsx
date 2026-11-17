import {
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Images,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  OFFICIAL_STORES,
  STORES_GALLERY_HIGHLIGHTS,
  type StoreUnit,
} from '../data/landingData';
import { ResilientImage } from './ResilientImage';
import { VoucherCtaButton } from './VoucherCtaButton';

interface StoresSectionProps {
  onSelectStoreForAppointment: (storeName: string) => void;
}

export function StoresSection({
  onSelectStoreForAppointment,
}: StoresSectionProps) {
  const slides = STORES_GALLERY_HIGHLIGHTS;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [galleryModalStore, setGalleryModalStore] = useState<StoreUnit | null>(
    null
  );
  const [galleryPhotoIndex, setGalleryPhotoIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [isPaused, slides.length]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const filteredStores = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return OFFICIAL_STORES;
    return OFFICIAL_STORES.filter(
      (store) =>
        store.name.toLowerCase().includes(q) ||
        store.neighborhood.toLowerCase().includes(q) ||
        store.city.toLowerCase().includes(q) ||
        store.addressDisplay.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const openStoreGallery = (store: StoreUnit) => {
    if (store.galleryPhotos.length === 0) return;
    setGalleryPhotoIndex(0);
    setGalleryModalStore(store);
  };

  return (
    <section id="unidades" className="w-full bg-white py-12 md:py-16">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        <h2 className="font-extrabold text-[28px] min-[390px]:text-[32px] md:text-[36px] leading-[1.25] text-[#111111] max-w-[340px] md:max-w-[740px]">
          Conheça nossas lojas: conforto e atendimento de excelência perto de
          você!
        </h2>

        <p className="mt-3 text-[17px] sm:text-[20px] leading-[1.45] text-[#3F3F46] max-w-[340px] md:max-w-[680px]">
          Explore nossas 15 unidades oficiais e descubra espaços modernos,
          pensados para oferecer a melhor experiência em atendimento.
        </p>

        {/* Main Storefront Photo matching Prevent layout */}
        <div className="mt-8 w-full max-w-[935px] rounded-xl overflow-hidden shadow-sm border border-[#e5e5e5]">
          <ResilientImage
            src="/assets/stores/filipe-10-metro-belem/01-fachada-esquina-unnamed-41.jpg"
            alt="Fachada da unidade Óticas Filipe — Metrô Belém"
            width={935}
            height={402}
            className="w-full h-[230px] sm:h-[360px] md:h-[402px] object-cover object-center"
          />
        </div>

        {/* Store Gallery Carousel matching Prevent layout */}
        <div
          className="mt-6 relative w-full max-w-[935px] overflow-hidden select-none rounded-xl border border-[#e5e5e5] bg-[#111111]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
            const delta = touchStartX.current - endX;
            if (Math.abs(delta) > 40) {
              if (delta > 0) goNext();
              else goPrev();
            }
            touchStartX.current = null;
          }}
          role="region"
          aria-roledescription="carrossel"
          aria-label="Galeria de unidades Óticas Filipe"
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.src} className="relative w-full shrink-0">
                <ResilientImage
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-[220px] sm:h-[320px] object-cover object-center mx-auto"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"
                />
                <p className="absolute bottom-3 left-4 right-4 text-left text-xs sm:text-sm font-bold text-[#F5B800]">
                  {slide.label}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={goPrev}
            aria-label="Galeria anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/95 text-[#111111] border border-[#111111]/20 shadow-sm hover:bg-[#F5B800] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Próxima galeria"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/95 text-[#111111] border border-[#111111]/20 shadow-sm hover:bg-[#F5B800] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2.5">
          {slides.map((slide, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={slide.src}
                type="button"
                aria-label={`Ver destaque de loja ${idx + 1}`}
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

        {/* 15 Official Units Directory */}
        <div className="mt-10 w-full max-w-[935px] text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h3 className="text-xl font-extrabold text-[#111111]">
                Nossas 15 Unidades Oficiais
              </h3>
              <p className="text-xs sm:text-sm text-[#71717A]">
                Selecione uma loja para falar pelo WhatsApp ou retirar seu voucher.
              </p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search
                aria-hidden="true"
                className="w-4 h-4 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar bairro ou rua..."
                aria-label="Buscar unidade"
                className="w-full h-10 pl-9 pr-3 rounded-[27px] border border-[#111111]/30 bg-[#f8f8f8] text-xs sm:text-sm text-[#111111] placeholder:text-[#71717A] focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStores.map((store) => {
              const hasConfirmedWhatsApp =
                Boolean(store.whatsapp) && store.whatsappStatus === 'confirmado';
              const hasPhone =
                Boolean(store.phone) && store.phoneStatus !== 'pendente';
              const mapsUrl = store.mapsQuery
                ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    store.mapsQuery
                  )}`
                : store.coordinates
                ? `https://www.google.com/maps/search/?api=1&query=${store.coordinates.latitude},${store.coordinates.longitude}`
                : null;
              const whatsappUrl =
                hasConfirmedWhatsApp && store.whatsapp
                  ? `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(
                      `Olá! Gostaria de informações e agendar avaliação na ${store.name}.`
                    )}`
                  : null;

              return (
                <article
                  key={store.id}
                  className="flex flex-col rounded-2xl border border-[#e5e5e5] bg-white overflow-hidden hover:border-[#F5B800] transition-colors"
                >
                  <div className="relative h-40 bg-[#18181B] overflow-hidden">
                    {store.photoUrl ? (
                      <ResilientImage
                        src={store.photoUrl}
                        alt={`Foto da unidade ${store.name}`}
                        loading="lazy"
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-white">
                        <MapPin
                          className="w-5 h-5 text-[#F5B800] mb-1.5"
                          aria-hidden="true"
                        />
                        <p className="text-xs font-bold">{store.shortName}</p>
                        <p className="mt-0.5 text-[11px] text-neutral-300">
                          Fotografia oficial em atualização
                        </p>
                      </div>
                    )}

                    {store.galleryPhotos.length > 1 && (
                      <button
                        type="button"
                        onClick={() => openStoreGallery(store)}
                        className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-[#111111]/85 text-white hover:bg-[#F5B800] hover:text-[#111111] text-[11px] font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Images className="w-3 h-3" aria-hidden="true" />
                        <span>{store.galleryPhotos.length} fotos</span>
                      </button>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-bold text-[#71717A] tabular-nums">
                        {store.unitCode} · {store.city}/{store.state}
                      </p>
                      <h4 className="text-[15px] font-extrabold text-[#111111] leading-snug">
                        {store.name}
                      </h4>
                      <p className="text-xs text-[#3F3F46] flex items-start gap-1.5">
                        <MapPin
                          className="w-3.5 h-3.5 text-[#E5A800] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{store.addressDisplay}</span>
                      </p>
                      <p className="text-[11px] text-[#71717A] flex items-start gap-1.5 tabular-nums">
                        <Clock
                          className="w-3.5 h-3.5 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>Seg-Sex: {store.hoursWeekdays}</span>
                      </p>
                      <p className="text-xs flex items-start gap-1.5">
                        <Phone
                          className="w-3.5 h-3.5 text-[#111111] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        {hasPhone ? (
                          <span className="font-bold text-[#111111] tabular-nums">
                            {store.phone}
                            {store.phoneStatus === 'provisorio' && (
                              <span className="ml-1 font-normal text-[11px] text-[#71717A]">
                                (Provisório)
                              </span>
                            )}
                          </span>
                        ) : (
                          <span className="text-[11px] text-[#71717A]">
                            Contato em validação cadastral
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#e5e5e5] flex flex-col gap-2">
                      {(whatsappUrl || mapsUrl) && (
                        <div className="flex gap-2">
                          {whatsappUrl && (
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 h-9 px-3 rounded-[100px] bg-[#F5B800] hover:bg-[#E5A800] text-[#111111] text-xs font-extrabold inline-flex items-center justify-center gap-1.5 transition-colors"
                            >
                              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>WhatsApp</span>
                            </a>
                          )}
                          {mapsUrl && (
                            <a
                              href={mapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="h-9 px-3 rounded-[100px] border border-[#111111]/30 hover:border-[#111111] text-[#111111] text-xs font-bold inline-flex items-center justify-center gap-1 transition-colors"
                            >
                              <span>Mapa</span>
                              <ExternalLink className="w-3 h-3" aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => onSelectStoreForAppointment(store.name)}
                        className="w-full h-9 px-3 rounded-[100px] bg-[#111111] hover:bg-[#18181B] text-[#F5B800] text-xs font-extrabold transition-colors cursor-pointer"
                      >
                        Selecionar esta loja
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-9">
          <VoucherCtaButton />
        </div>
      </div>

      {/* Store Gallery Modal */}
      {galleryModalStore && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria de fotos — ${galleryModalStore.name}`}
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setGalleryModalStore(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#111111] rounded-2xl border border-white/15 overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between gap-3">
              <div className="min-w-0 text-left">
                <p className="text-sm font-bold truncate">
                  {galleryModalStore.name}
                </p>
                <p className="text-xs text-neutral-400 truncate">
                  {galleryModalStore.galleryPhotos[galleryPhotoIndex]?.caption}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setGalleryModalStore(null)}
                aria-label="Fechar galeria"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative bg-black h-[300px] sm:h-[420px] flex items-center justify-center">
              <ResilientImage
                src={
                  galleryModalStore.galleryPhotos[galleryPhotoIndex]?.url ?? ''
                }
                alt={
                  galleryModalStore.galleryPhotos[galleryPhotoIndex]?.caption ??
                  galleryModalStore.name
                }
                className="w-full h-full object-contain"
              />

              {galleryModalStore.galleryPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Foto anterior"
                    onClick={() =>
                      setGalleryPhotoIndex(
                        (prev) =>
                          (prev - 1 + galleryModalStore.galleryPhotos.length) %
                          galleryModalStore.galleryPhotos.length
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-[#F5B800] hover:text-[#111111] flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Próxima foto"
                    onClick={() =>
                      setGalleryPhotoIndex(
                        (prev) =>
                          (prev + 1) % galleryModalStore.galleryPhotos.length
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-[#F5B800] hover:text-[#111111] flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
