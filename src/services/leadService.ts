import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import type { StoreUnit } from '../data/landingData';
import { db, handleFirestoreError, OperationType } from '../firebase';
import {
  buildVoucherWhatsAppMessage,
  buildVoucherWhatsAppUrl,
  formatBrazilianDateTimeParts,
  resolveVoucherDestination,
  sanitizeBoundedString,
  type VoucherRoutingStatusCode,
  type VoucherRoutingStatusLabel,
} from './voucherRouting';

export {
  buildVoucherWhatsAppMessage,
  buildVoucherWhatsAppUrl,
  formatBrazilianDateTimeParts,
  resolveVoucherDestination,
  sanitizeBoundedString,
  type VoucherRoutingStatusCode,
  type VoucherRoutingStatusLabel,
};

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
  unitId: string;
  unidade: string;
  nomeCompleto: string;
  celularWhatsapp: string;
  email: string;
  tracking: LeadTrackingFields;
  submittedAt: string;
  pageUrl: string;
}

export interface VoucherRegistrationRecord {
  unitId: string;
  unitCode: string;
  unidade: string;
  nomeCompleto: string;
  email: string;
  celularWhatsapp: string;
  destinationWhatsapp: string;
  routingStatus: VoucherRoutingStatusCode;
  routingStatusLabel: VoucherRoutingStatusLabel;
  submittedDate: string;
  submittedTime: string;
  submittedAtIso: string;
  origin: string;
  pageUrl: string;
  leadId: string;
  utmSource: string;
  utmCampaign: string;
  utmMedium: string;
  utmContent: string;
  utmTerm: string;
  utmAdset: string;
  gclid: string;
  fbclid: string;
  canal: string;
  programa: string;
  webhookDispatched: boolean;
}

export type LeadSubmissionResult =
  | {
      status: 'routed';
      registrationId: string;
      unit: StoreUnit;
      destinationWhatsapp: string;
      whatsappUrl: string;
      whatsappMessage: string;
      routingStatus: 'ENCAMINHADO_WHATSAPP';
      routingStatusLabel: 'Encaminhado ao WhatsApp';
      submittedDate: string;
      submittedTime: string;
      message: string;
      payload: LeadPayload;
    }
  | {
      status: 'pending_contact';
      registrationId: string;
      unit: StoreUnit;
      destinationWhatsapp: null;
      whatsappUrl: null;
      routingStatus: 'PENDENTE_DE_CONTATO';
      routingStatusLabel: 'PENDENTE DE CONTATO';
      submittedDate: string;
      submittedTime: string;
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

export function generateRegistrationId(): string {
  const raw =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  return `vch_${raw.replace(/[^a-zA-Z0-9_-]/g, '')}`.slice(0, 128);
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
  const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
  return env?.VITE_LEAD_WEBHOOK_URL?.trim() || '';
}

async function tryDispatchOptionalWebhook(
  endpoint: string,
  webhookBody: Record<string, unknown>
): Promise<boolean> {
  if (!endpoint) return false;
  const controller = new AbortController();
  const timer = globalThis.setTimeout(() => controller.abort(), 3500);
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(webhookBody),
      signal: controller.signal,
    });
    return response.ok;
  } catch {
    return false;
  } finally {
    globalThis.clearTimeout(timer);
  }
}

export async function dispatchLeadSubmission(
  payload: LeadPayload,
  options?: { registrationId?: string }
): Promise<LeadSubmissionResult> {
  let resolved;
  try {
    resolved = resolveVoucherDestination(payload.unitId);
  } catch (err) {
    return {
      status: 'error',
      message:
        err instanceof Error
          ? err.message
          : 'Unidade selecionada inválida. Escolha uma de nossas 15 unidades.',
      payload,
    };
  }

  const registrationId =
    options?.registrationId && /^[a-zA-Z0-9_-]{1,128}$/.test(options.registrationId)
      ? options.registrationId
      : generateRegistrationId();

  const { submittedDate, submittedTime, submittedAtIso } =
    formatBrazilianDateTimeParts(new Date(payload.submittedAt || Date.now()));

  const normalizedPayload: LeadPayload = {
    ...payload,
    unitId: resolved.unit.id,
    unidade: resolved.unit.name,
    nomeCompleto: sanitizeBoundedString(
      payload.nomeCompleto.replace(/\s+/g, ' '),
      160
    ),
    email: sanitizeBoundedString(payload.email, 160),
    celularWhatsapp: sanitizeBoundedString(payload.celularWhatsapp, 32),
    submittedAt: submittedAtIso,
  };

  const endpoint = getConfiguredWebhookUrl();
  const webhookDispatched = await tryDispatchOptionalWebhook(endpoint, {
    ...normalizedPayload,
    registrationId,
    unitCode: resolved.unit.unitCode,
    destinationWhatsapp: resolved.destinationWhatsapp,
    routingStatus: resolved.routingStatus,
    routingStatusLabel: resolved.routingStatusLabel,
    submittedDate,
    submittedTime,
    origin: 'Campanha de Voucher',
  });

  const firestoreRecord: VoucherRegistrationRecord = {
    unitId: resolved.unit.id,
    unitCode: resolved.unit.unitCode,
    unidade: sanitizeBoundedString(resolved.unit.name, 120),
    nomeCompleto: normalizedPayload.nomeCompleto,
    email: normalizedPayload.email,
    celularWhatsapp: normalizedPayload.celularWhatsapp,
    destinationWhatsapp: resolved.destinationWhatsapp ?? '',
    routingStatus: resolved.routingStatus,
    routingStatusLabel: resolved.routingStatusLabel,
    submittedDate: sanitizeBoundedString(submittedDate, 20),
    submittedTime: sanitizeBoundedString(submittedTime, 20),
    submittedAtIso: sanitizeBoundedString(submittedAtIso, 40),
    origin: 'Campanha de Voucher',
    pageUrl: sanitizeBoundedString(normalizedPayload.pageUrl || '', 500),
    leadId: sanitizeBoundedString(normalizedPayload.tracking.lead_id || '', 100),
    utmSource: sanitizeBoundedString(normalizedPayload.tracking.utm_source || '', 120),
    utmCampaign: sanitizeBoundedString(
      normalizedPayload.tracking.utm_campaign || '',
      120
    ),
    utmMedium: sanitizeBoundedString(normalizedPayload.tracking.utm_medium || '', 120),
    utmContent: sanitizeBoundedString(
      normalizedPayload.tracking.utm_content || '',
      120
    ),
    utmTerm: sanitizeBoundedString(normalizedPayload.tracking.utm_term || '', 120),
    utmAdset: sanitizeBoundedString(normalizedPayload.tracking.utm_adset || '', 120),
    gclid: sanitizeBoundedString(normalizedPayload.tracking.gclid || '', 200),
    fbclid: sanitizeBoundedString(normalizedPayload.tracking.fbclid || '', 200),
    canal: sanitizeBoundedString(normalizedPayload.tracking.Canal || '', 100),
    programa: sanitizeBoundedString(normalizedPayload.tracking.Programa || '', 100),
    webhookDispatched,
  };

  const docPath = `voucher_registrations/${registrationId}`;
  try {
    await setDoc(doc(db, 'voucher_registrations', registrationId), {
      ...firestoreRecord,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    try {
      handleFirestoreError(error, OperationType.CREATE, docPath);
    } catch {
      return {
        status: 'error',
        message:
          'Não foi possível registrar o seu cadastro no banco de dados neste momento. Nenhum encaminhamento foi iniciado. Por favor, tente novamente.',
        payload: normalizedPayload,
      };
    }
  }

  if (resolved.isRoutable && resolved.destinationWhatsapp) {
    const messageFields = {
      nomeCompleto: normalizedPayload.nomeCompleto,
      email: normalizedPayload.email,
      celularWhatsapp: normalizedPayload.celularWhatsapp,
      unidade: resolved.unit.name,
    };
    const whatsappMessage = buildVoucherWhatsAppMessage(messageFields);
    const whatsappUrl = buildVoucherWhatsAppUrl(
      resolved.destinationWhatsapp,
      messageFields
    );

    return {
      status: 'routed',
      registrationId,
      unit: resolved.unit,
      destinationWhatsapp: resolved.destinationWhatsapp,
      whatsappUrl,
      whatsappMessage,
      routingStatus: 'ENCAMINHADO_WHATSAPP',
      routingStatusLabel: 'Encaminhado ao WhatsApp',
      submittedDate,
      submittedTime,
      message: `Cadastro registrado para ${resolved.unit.name}! O WhatsApp da unidade foi preparado com sua mensagem preenchida para você confirmar o envio.`,
      payload: normalizedPayload,
    };
  }

  return {
    status: 'pending_contact',
    registrationId,
    unit: resolved.unit,
    destinationWhatsapp: null,
    whatsappUrl: null,
    routingStatus: 'PENDENTE_DE_CONTATO',
    routingStatusLabel: 'PENDENTE DE CONTATO',
    submittedDate,
    submittedTime,
    message: `Cadastro recebido e registrado para ${resolved.unit.name}! Esta unidade está com o encaminhamento direto via WhatsApp em validação cadastral (status: PENDENTE DE CONTATO). Nossa equipe direcionará seu atendimento.`,
    payload: normalizedPayload,
  };
}
