import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Info,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BRAND_ASSETS, OFFICIAL_STORES } from '../data/landingData';
import {
  collectTrackingFields,
  dispatchLeadSubmission,
  formatBrazilianPhone,
  generateRegistrationId,
  isValidBrazilianPhone,
  isValidEmail,
  isValidFullName,
  type LeadSubmissionResult,
} from '../services/leadService';

interface FormErrors {
  unidade?: string;
  nomeCompleto?: string;
  celularWhatsapp?: string;
  email?: string;
}

interface VoucherFormSectionProps {
  selectedStore?: string;
}

function openWhatsAppInNewTab(url: string) {
  if (typeof document === 'undefined') return;
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

export function VoucherFormSection({
  selectedStore = '',
}: VoucherFormSectionProps) {
  const tracking = useMemo(() => collectTrackingFields(), []);

  const [unitId, setUnitId] = useState(selectedStore);
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [celularWhatsapp, setCelularWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<LeadSubmissionResult | null>(null);
  const [showPayloadDetails, setShowPayloadDetails] = useState(false);

  const submissionLockRef = useRef(false);
  const lastSubmittedRef = useRef<{
    fingerprint: string;
    result: LeadSubmissionResult;
  } | null>(null);

  useEffect(() => {
    if (!selectedStore) return;
    const matchedById = OFFICIAL_STORES.find(
      (store) => store.id === selectedStore || store.name === selectedStore
    );
    if (matchedById) {
      setUnitId(matchedById.id);
      setErrors((prev) => ({ ...prev, unidade: undefined }));
    }
  }, [selectedStore]);

  const selectedStoreObj = useMemo(
    () => OFFICIAL_STORES.find((store) => store.id === unitId) ?? null,
    [unitId]
  );

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!unitId || !selectedStoreObj) {
      nextErrors.unidade = 'Selecione uma de nossas 15 unidades.';
    }
    if (!isValidFullName(nomeCompleto)) {
      nextErrors.nomeCompleto = 'Informe seu nome e sobrenome completos.';
    }
    if (!isValidBrazilianPhone(celularWhatsapp)) {
      nextErrors.celularWhatsapp =
        'Informe um WhatsApp válido com DDD: (99) 9.9999-9999.';
    }
    if (!isValidEmail(email)) {
      nextErrors.email = 'Informe um endereço de e-mail válido.';
    }
    return nextErrors;
  };

  const handlePhoneChange = (value: string) => {
    setCelularWhatsapp(formatBrazilianPhone(value));
    if (errors.celularWhatsapp) {
      setErrors((prev) => ({ ...prev, celularWhatsapp: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submissionLockRef.current) {
      return;
    }

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0 || !selectedStoreObj) {
      return;
    }

    const cleanName = nomeCompleto.trim().replace(/\s+/g, ' ');
    const cleanEmail = email.trim();
    const fingerprint = `${selectedStoreObj.id}|${cleanName.toLowerCase()}|${celularWhatsapp}|${cleanEmail.toLowerCase()}`;

    if (
      lastSubmittedRef.current &&
      lastSubmittedRef.current.fingerprint === fingerprint
    ) {
      const previousResult = lastSubmittedRef.current.result;
      setResult(previousResult);
      if (previousResult.status === 'routed' && previousResult.whatsappUrl) {
        openWhatsAppInNewTab(previousResult.whatsappUrl);
      }
      return;
    }

    submissionLockRef.current = true;
    setIsSubmitting(true);
    setResult(null);

    try {
      const payload = {
        unitId: selectedStoreObj.id,
        unidade: selectedStoreObj.name,
        nomeCompleto: cleanName,
        celularWhatsapp,
        email: cleanEmail,
        tracking,
        submittedAt: new Date().toISOString(),
        pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      };

      const registrationId = generateRegistrationId();
      const response = await dispatchLeadSubmission(payload, { registrationId });
      setResult(response);

      if (response.status === 'routed' || response.status === 'pending_contact') {
        lastSubmittedRef.current = {
          fingerprint,
          result: response,
        };
      }

      if (response.status === 'routed' && response.whatsappUrl) {
        openWhatsAppInNewTab(response.whatsappUrl);
      }
    } finally {
      submissionLockRef.current = false;
      setIsSubmitting(false);
    }
  };

  const inputBaseClass =
    'w-full h-[48px] bg-white rounded-[27px] border px-4 text-[14px] text-[#111111] placeholder:text-[#111111]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800] transition-colors';

  return (
    <section
      id="formulario-voucher"
      className="relative w-full bg-[#fcfcfc] py-12 md:py-16 overflow-hidden"
    >
      {/* Desktop decorative background photo matching original Prevent layout */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-0 bg-no-repeat bg-cover opacity-90 pointer-events-none"
        style={{
          backgroundImage: `url("${BRAND_ASSETS.storeExperience}")`,
          backgroundPosition: '78% 35%',
        }}
      />
      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#fcfcfc] via-[#fcfcfc]/94 to-[#fcfcfc]/25 pointer-events-none"
      />

      <div className="relative z-10 max-w-[960px] mx-auto px-4 sm:px-6">
        <div className="max-w-[440px] mx-auto md:mx-0 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="font-extrabold text-[27px] min-[390px]:text-[31px] leading-[1.3] text-[#111111]">
            Retire agora seu voucher de atendimento na Óticas Filipe!
          </h2>

          <p className="mt-3 text-[16px] sm:text-[17px] leading-[1.45] text-[#3F3F46]">
            Complete o cadastro abaixo para retirar seu voucher e agendar sua
            avaliação visual gratuita em uma de nossas 15 unidades.
            <br />
            <strong className="font-bold text-[#111111]">
              Simples, rápido e sem custo!
            </strong>
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-6 w-full max-w-[360px] md:max-w-[390px] flex flex-col gap-3 text-left"
          >
            {/* Unidade */}
            <div>
              <label htmlFor="unidade-select" className="sr-only">
                Escolha uma de nossas unidades
              </label>
              <div className="relative">
                <select
                  id="unidade-select"
                  name="escolha-uma-de-nossas-unidades"
                  value={unitId}
                  onChange={(e) => {
                    setUnitId(e.target.value);
                    if (errors.unidade) {
                      setErrors((prev) => ({ ...prev, unidade: undefined }));
                    }
                  }}
                  aria-invalid={Boolean(errors.unidade)}
                  className={`${inputBaseClass} appearance-none pr-10 cursor-pointer ${
                    !unitId ? 'text-[#111111]/65' : 'text-[#111111]'
                  } ${errors.unidade ? 'border-[#ef4444]' : 'border-[#111111]'}`}
                >
                  <option value="" disabled>
                    * Escolha uma de nossas unidades
                  </option>
                  {OFFICIAL_STORES.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="w-4 h-4 text-[#111111] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
              {errors.unidade && (
                <p className="mt-1 px-3 text-[12px] text-[#ef4444] flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.unidade}</span>
                </p>
              )}
            </div>

            {/* Nome e sobrenome */}
            <div>
              <label htmlFor="nome-sobrenome" className="sr-only">
                Nome e sobrenome
              </label>
              <input
                id="nome-sobrenome"
                name="nome-e-sobrenome"
                type="text"
                autoComplete="name"
                placeholder="* Nome e sobrenome:"
                value={nomeCompleto}
                onChange={(e) => {
                  setNomeCompleto(e.target.value);
                  if (errors.nomeCompleto) {
                    setErrors((prev) => ({ ...prev, nomeCompleto: undefined }));
                  }
                }}
                aria-invalid={Boolean(errors.nomeCompleto)}
                className={`${inputBaseClass} ${
                  errors.nomeCompleto ? 'border-[#ef4444]' : 'border-[#111111]'
                }`}
              />
              {errors.nomeCompleto && (
                <p className="mt-1 px-3 text-[12px] text-[#ef4444] flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.nomeCompleto}</span>
                </p>
              )}
            </div>

            {/* Celular / WhatsApp */}
            <div>
              <label htmlFor="celular-whatsapp" className="sr-only">
                Celular/Whatsapp (99) 9.9999-9999
              </label>
              <div className="relative flex items-center">
                <span
                  aria-hidden="true"
                  className="absolute left-3.5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#111111]/85 bg-[#f0f3f5] px-2 py-1 rounded-full select-none"
                >
                  <svg
                    viewBox="0 0 20 14"
                    className="w-4 h-3 rounded-[2px] shrink-0"
                    aria-hidden="true"
                  >
                    <rect width="20" height="14" fill="#009b3a" />
                    <polygon points="10,1.5 18.5,7 10,12.5 1.5,7" fill="#fedf00" />
                    <circle cx="10" cy="7" r="3" fill="#002776" />
                  </svg>
                  <span>+55</span>
                </span>
                <input
                  id="celular-whatsapp"
                  name="celularwhatsapp-99-99999-9999"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="* Celular/Whatsapp (99) 9.9999-9999"
                  value={celularWhatsapp}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  aria-invalid={Boolean(errors.celularWhatsapp)}
                  className={`${inputBaseClass} pl-[74px] ${
                    errors.celularWhatsapp
                      ? 'border-[#ef4444]'
                      : 'border-[#111111]'
                  }`}
                />
              </div>
              {errors.celularWhatsapp && (
                <p className="mt-1 px-3 text-[12px] text-[#ef4444] flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.celularWhatsapp}</span>
                </p>
              )}
            </div>

            {/* E-mail */}
            <div>
              <label htmlFor="email-voucher" className="sr-only">
                E-mail
              </label>
              <input
                id="email-voucher"
                name="e-mail"
                type="email"
                autoComplete="email"
                placeholder="* E-mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }
                }}
                aria-invalid={Boolean(errors.email)}
                className={`${inputBaseClass} ${
                  errors.email ? 'border-[#ef4444]' : 'border-[#111111]'
                }`}
              />
              {errors.email && (
                <p className="mt-1 px-3 text-[12px] text-[#ef4444] flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Hidden campaign tracking fields preserved from reference */}
            <input type="hidden" name="utm_source" value={tracking.utm_source} />
            <input type="hidden" name="utm_campaign" value={tracking.utm_campaign} />
            <input type="hidden" name="utm_adset" value={tracking.utm_adset} />
            <input type="hidden" name="utm_content" value={tracking.utm_content} />
            <input type="hidden" name="utm_medium" value={tracking.utm_medium} />
            <input type="hidden" name="utm_term" value={tracking.utm_term} />
            <input type="hidden" name="gclid" value={tracking.gclid} />
            <input type="hidden" name="fbclid" value={tracking.fbclid} />
            <input type="hidden" name="Canal" value={tracking.Canal} />
            <input type="hidden" name="Programa" value={tracking.Programa} />
            <input type="hidden" name="lead_id" value={tracking.lead_id} />
            <input type="hidden" name="_fbp" value={tracking._fbp} />
            <input type="hidden" name="_fbc" value={tracking._fbc} />
            <input type="hidden" name="user_agent" value={tracking.user_agent} />

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-filipe-cta mt-2 w-full h-[48px] cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Registrando...' : 'RETIRAR MEU VOUCHER'}
            </button>
          </form>

          {/* Visual feedback after submission */}
          {result && (
            <div
              role="status"
              aria-live="polite"
              className={`mt-4 w-full max-w-[390px] rounded-2xl border p-4 text-left text-[13px] leading-[1.45] ${
                result.status === 'routed'
                  ? 'bg-[#f0fdf4] border-[#22c55e] text-[#14532d]'
                  : result.status === 'pending_contact'
                  ? 'bg-[#FEF9E7] border-[#F5B800] text-[#111111]'
                  : 'bg-[#fef2f2] border-[#ef4444] text-[#7f1d1d]'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {result.status === 'routed' ? (
                  <CheckCircle2 className="w-5 h-5 text-[#16a34a] shrink-0 mt-0.5" />
                ) : result.status === 'pending_contact' ? (
                  <Info className="w-5 h-5 text-[#E5A800] shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-[#ef4444] shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">
                    {result.status === 'routed'
                      ? 'Cadastro registrado — confirme no WhatsApp'
                      : result.status === 'pending_contact'
                      ? 'Cadastro recebido — PENDENTE DE CONTATO'
                      : 'Falha no registro'}
                  </p>
                  <p className="mt-1">{result.message}</p>

                  {result.status === 'routed' && result.whatsappUrl && (
                    <a
                      href={result.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center justify-center gap-1.5 w-full h-10 px-4 rounded-[100px] bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-[13px] transition-colors"
                    >
                      <span>Abrir WhatsApp da unidade</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowPayloadDetails((prev) => !prev)}
                    className="mt-2.5 text-[12px] font-semibold underline cursor-pointer"
                  >
                    {showPayloadDetails
                      ? 'Ocultar resumo do registro'
                      : 'Ver resumo do registro'}
                  </button>

                  {showPayloadDetails && (
                    <pre className="mt-2 max-h-48 overflow-auto rounded-lg bg-white/80 p-2.5 text-[11px] font-mono text-[#111111] border border-black/10">
                      {JSON.stringify(
                        result.status === 'error'
                          ? result.payload
                          : {
                              registrationId: result.registrationId,
                              unitId: result.unit.id,
                              unidade: result.unit.name,
                              routingStatus: result.routingStatusLabel,
                              destinationWhatsapp: result.destinationWhatsapp,
                              data: result.submittedDate,
                              horario: result.submittedTime,
                              cliente: result.payload.nomeCompleto,
                            },
                        null,
                        2
                      )}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
