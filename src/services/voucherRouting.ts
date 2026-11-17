import {
  OFFICIAL_STORES,
  VOUCHER_ROUTING_MAP,
  type StoreUnit,
} from '../data/landingData';

export type VoucherRoutingStatusCode =
  | 'ENCAMINHADO_WHATSAPP'
  | 'PENDENTE_DE_CONTATO';

export type VoucherRoutingStatusLabel =
  | 'Encaminhado ao WhatsApp'
  | 'PENDENTE DE CONTATO';

export interface ResolvedVoucherDestination {
  unit: StoreUnit;
  destinationWhatsapp: string | null;
  isRoutable: boolean;
  routingStatus: VoucherRoutingStatusCode;
  routingStatusLabel: VoucherRoutingStatusLabel;
}

export interface VoucherMessageFields {
  nomeCompleto: string;
  email: string;
  celularWhatsapp: string;
  unidade: string;
}

export function sanitizeBoundedString(value: string, maxLength: number): string {
  const normalized = value.trim();
  return normalized.length > maxLength
    ? normalized.slice(0, maxLength)
    : normalized;
}

export function resolveVoucherDestination(
  unitId: string
): ResolvedVoucherDestination {
  const normalizedId = unitId.trim();
  const unit = OFFICIAL_STORES.find((store) => store.id === normalizedId);

  if (!unit) {
    throw new Error(
      `Unidade inválida ou não cadastrada para o identificador "${unitId}".`
    );
  }

  const routeEntry = VOUCHER_ROUTING_MAP[unit.id];
  if (!routeEntry || routeEntry.unitId !== unit.id) {
    throw new Error(
      `Mapa de roteamento ausente ou inconsistente para a unidade "${unit.name}".`
    );
  }

  const isRoutable =
    routeEntry.status === 'VALIDADO' &&
    typeof routeEntry.whatsappNumber === 'string' &&
    /^55\d{10,11}$/.test(routeEntry.whatsappNumber);

  if (isRoutable && routeEntry.whatsappNumber) {
    return {
      unit,
      destinationWhatsapp: routeEntry.whatsappNumber,
      isRoutable: true,
      routingStatus: 'ENCAMINHADO_WHATSAPP',
      routingStatusLabel: 'Encaminhado ao WhatsApp',
    };
  }

  return {
    unit,
    destinationWhatsapp: null,
    isRoutable: false,
    routingStatus: 'PENDENTE_DE_CONTATO',
    routingStatusLabel: 'PENDENTE DE CONTATO',
  };
}

export function buildVoucherWhatsAppMessage({
  nomeCompleto,
  email,
  celularWhatsapp,
  unidade,
}: VoucherMessageFields): string {
  return [
    'NOVO CADASTRO — VOUCHER ÓTICAS FILIPE',
    '',
    'Olá! Recebemos um novo cadastro pelo site oficial.',
    '',
    `Nome: ${nomeCompleto}`,
    `E-mail: ${email}`,
    `WhatsApp do cliente: ${celularWhatsapp}`,
    `Unidade escolhida: ${unidade}`,
    '',
    'Origem: Campanha de Voucher.',
    '',
    'Por favor, entre em contato com o cliente para dar continuidade ao atendimento.',
  ].join('\n');
}

export function buildVoucherWhatsAppUrl(
  destinationWhatsapp: string,
  fields: VoucherMessageFields
): string {
  if (!/^55\d{10,11}$/.test(destinationWhatsapp)) {
    throw new Error(
      `Número de destino WhatsApp inválido: "${destinationWhatsapp}".`
    );
  }
  const message = buildVoucherWhatsAppMessage(fields);
  return `https://wa.me/${destinationWhatsapp}?text=${encodeURIComponent(
    message
  )}`;
}

export function formatBrazilianDateTimeParts(date: Date = new Date()): {
  submittedDate: string;
  submittedTime: string;
  submittedAtIso: string;
} {
  const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const timeFormatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return {
    submittedDate: dateFormatter.format(date),
    submittedTime: timeFormatter.format(date),
    submittedAtIso: date.toISOString(),
  };
}
