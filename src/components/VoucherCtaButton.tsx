interface VoucherCtaButtonProps {
  label?: string;
  variant?: 'yellow' | 'dark';
  className?: string;
  onClick?: () => void;
}

export function scrollToVoucherForm() {
  const target = document.getElementById('formulario-voucher');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function VoucherCtaButton({
  label = 'RETIRAR MEU VOUCHER',
  variant = 'yellow',
  className = '',
  onClick,
}: VoucherCtaButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else {
      scrollToVoucherForm();
    }
  };

  const variantClass =
    variant === 'dark' ? 'btn-filipe-cta-dark' : 'btn-filipe-cta';

  return (
    <a
      href="#formulario-voucher"
      onClick={handleClick}
      className={`${variantClass} inline-flex items-center justify-center w-[288px] max-w-full h-[42px] px-5 text-center whitespace-nowrap shrink-0 select-none ${className}`}
    >
      {label}
    </a>
  );
}
