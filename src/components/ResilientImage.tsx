import { Glasses } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ResilientImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  fallbackSrc,
  alt,
  className = '',
  width,
  height,
  loading = 'eager',
}: ResilientImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failedAll, setFailedAll] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setFailedAll(false);
  }, [src]);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }
    setFailedAll(true);
  };

  if (failedAll) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-[#FEF9E7] border border-[#F5B800]/40 text-[#111111] text-xs font-semibold p-4 text-center ${className}`}
      >
        <Glasses className="w-6 h-6 text-[#111111]/70 shrink-0" aria-hidden="true" />
        <span className="line-clamp-2 max-w-[220px]">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={handleError}
      className={className}
    />
  );
}
