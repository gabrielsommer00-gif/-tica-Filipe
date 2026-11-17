export interface LeadTrackingFields {
  utm_source: string;
  utm_campaign: string;
  utm_adset: string;
  utm_content: string;
  utm_medium: string;
  utm_term: string;
  gclid: string;
  fbclid: string;
  Canal: string;
  Programa: string;
  lead_id: string;
  _fbp: string;
  _fbc: string;
  user_agent: string;
}

export interface LeadPayload {
  unidade: string;
  nomeCompleto: string;
  celularWhatsapp: string;
  email: string;
  tracking: LeadTrackingFields;
  submittedAt: string;
  pageUrl: string;
}

export type LeadSubmissionResult =
  | {
      status: 'sent';
      message: string;
      endpoint: string;
      payload: LeadPayload;
    }
  | {
      status: 'unconfigured';
      message: string;
      payload: LeadPayload;
    }
  | {
      status: 'error';
      message: string;
      payload: LeadPayload;
    };

function readCookie(name: string): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=').slice(1).join('=')) : '';
}

function getOrCreateLeadId(): string {
  if (typeof window === 'undefined') return '';
  try {
    const storageKey = 'oticas_filipe_lead_id';
    const existing = window.sessionStorage.getItem(storageKey);
    if (existing) return existing;
    const generated =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    window.sessionStorage.setItem(storageKey, generated);
    return generated;
  } catch {
    return `lead_${Date.now()}`;
  }
}

export function collectTrackingFields(): LeadTrackingFields {
  if (typeof window === 'undefined') {
    return {
      utm_source: '',
      utm_campaign: '',
      utm_adset: '',
      utm_content: '',
      utm_medium: '',
      utm_term: '',
      gclid: '',
      fbclid: '',
      Canal: '',
      Programa: '',
      lead_id: '',
      _fbp: '',
      _fbc: '',
      user_agent: '',
    };
  }

  const params = new URLSearchParams(window.location.search);
  const paramOrStored = (key: string): string => {
    const fromUrl = params.get(key);
    if (fromUrl) {
      try {
        window.sessionStorage.setItem(`of_trk_${key}`, fromUrl);
      } catch {
        // Ignore storage errors in restricted contexts
      }
      return fromUrl;
    }
    try {
      return window.sessionStorage.getItem(`of_trk_${key}`) ?? '';
    } catch {
      return '';
    }
  };

  return {
    utm_source: paramOrStored('utm_source'),
    utm_campaign: paramOrStored('utm_campaign'),
    utm_adset: paramOrStored('utm_adset'),
    utm_content: paramOrStored('utm_content'),
    utm_medium: paramOrStored('utm_medium'),
    utm_term: paramOrStored('utm_term'),
    gclid: paramOrStored('gclid'),
    fbclid: paramOrStored('fbclid'),
    Canal: paramOrStored('Canal'),
    Programa: paramOrStored('Programa'),
    lead_id: paramOrStored('lead_id') || getOrCreateLeadId(),
    _fbp: readCookie('_fbp'),
    _fbc: readCookie('_fbc'),
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
  };
}

export function formatBrazilianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)}.${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
}

export function isValidBrazilianPhone(formatted: string): boolean {
  const digits = formatted.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 11) return false;
  if (/^(\d)\1+$/.test(digits)) return false;
  return true;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export function isValidFullName(name: string): boolean {
  const cleaned = name.trim().replace(/\s+/g, ' ');
  return cleaned.length >= 3 && cleaned.includes(' ');
}

export function getConfiguredWebhookUrl(): string {
  return (import.meta.env.VITE_LEAD_WEBHOOK_URL as string | undefined)?.trim() || '';
}

export async function dispatchLeadSubmission(
  payload: LeadPayload
): Promise<LeadSubmissionResult> {
  const endpoint = getConfiguredWebhookUrl();

  if (!endpoint) {
    return {
      status: 'unconfigured',
      message:
        'Integração externa pendente: os dados e parâmetros de rastreamento foram validados, mas nenhum endpoint real de destino (VITE_LEAD_WEBHOOK_URL) está configurado neste ambiente. Nenhum envio foi simulado.',
      payload,
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        status: 'error',
        message: `O servidor de destino respondeu com status ${response.status}. Verifique o endpoint configurado e tente novamente.`,
        payload,
      };
    }

    return {
      status: 'sent',
      message:
        'Solicitação enviada com sucesso! Nossa equipe na unidade escolhida entrará em contato para confirmar o seu atendimento.',
      endpoint,
      payload,
    };
  } catch (err) {
    const detail = err instanceof Error ? err.message : 'Erro de conexão';
    return {
      status: 'error',
      message: `Não foi possível enviar os dados ao endpoint configurado (${detail}).`,
      payload,
    };
  }
}
