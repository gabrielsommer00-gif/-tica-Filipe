import { useEffect, useState } from 'react';

const DURATION_SECONDS = 15 * 60;
const STORAGE_KEY = 'oticas_filipe_countdown_end';

function getInitialRemaining(): number {
  if (typeof window === 'undefined') return DURATION_SECONDS;
  try {
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    const now = Date.now();
    if (saved) {
      const endTs = Number(saved);
      const diff = Math.floor((endTs - now) / 1000);
      if (diff > 0 && diff <= DURATION_SECONDS) {
        return diff;
      }
    }
    const newEnd = now + DURATION_SECONDS * 1000;
    window.sessionStorage.setItem(STORAGE_KEY, String(newEnd));
    return DURATION_SECONDS;
  } catch {
    return DURATION_SECONDS;
  }
}

export function CountdownBanner() {
  const [secondsLeft, setSecondsLeft] = useState<number>(getInitialRemaining);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  return (
    <header className="w-full bg-[#111111] text-white border-b border-[#F5B800]/30">
      <div className="max-w-[960px] mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between md:justify-center gap-3 md:gap-8 min-h-[84px]">
        <p className="font-bold text-[17px] min-[390px]:text-[19px] sm:text-[22px] leading-tight tracking-normal text-[#F5B800] text-left whitespace-nowrap">
          ATENDIMENTO EXCLUSIVO
        </p>

        <div
          className="flex items-start gap-2.5 shrink-0"
          aria-label={`Janela de atendimento prioritário: ${minutes} minutos e ${seconds} segundos`}
        >
          <div className="flex flex-col items-center">
            <div className="w-[52px] h-[42px] bg-[#F5B800] rounded-[7px] flex items-center justify-center">
              <span className="font-extrabold text-[30px] leading-none text-[#111111] tabular-nums">
                {minutes}
              </span>
            </div>
            <span className="mt-1 text-[11px] font-medium text-white leading-none">
              Minutos
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-[52px] h-[42px] bg-[#F5B800] rounded-[7px] flex items-center justify-center">
              <span className="font-extrabold text-[30px] leading-none text-[#111111] tabular-nums">
                {seconds}
              </span>
            </div>
            <span className="mt-1 text-[11px] font-medium text-white leading-none">
              Segundos
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
