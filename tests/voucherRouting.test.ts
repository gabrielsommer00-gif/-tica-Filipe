import assert from 'node:assert/strict';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { OFFICIAL_STORES } from '../src/data/landingData';
import { db } from '../src/firebase';
import {
  buildVoucherWhatsAppMessage,
  buildVoucherWhatsAppUrl,
  dispatchLeadSubmission,
  resolveVoucherDestination,
} from '../src/services/leadService';

async function main() {
  console.log('1. Verificando total de unidades...');
  assert.equal(OFFICIAL_STORES.length, 15, 'Devem existir exatamente 15 unidades');

  const expectedValidated: Record<string, string> = {
    'filipe-01-heliopolis': '551122191336',
    'filipe-03-sitio-piqueri': '5511933572711',
    'filipe-02-jardim-fontalis': '5511951902675',
    'filipe-04-sao-caetano': '5511983488643',
    'filipe-10-metro-belem': '5511915272450',
    'filipe-11-vila-alpina': '5511945360698',
    'filipe-12-sapopemba': '5511952095485',
    'filipe-14-pq-santa-madalena': '5511999997301',
    'filipe-15-pq-sao-lucas': '5511982827634',
    'filipe-13-vila-industrial': '5511989465440',
  };

  const expectedPending = [
    'filipe-05-tiradentes',
    'filipe-06-guaianases',
    'filipe-07-sao-mateus',
    'filipe-08-jardim-santo-andre',
    'filipe-09-rodolfo-pirani',
  ];

  console.log('2. Testando 10 unidades validadas...');
  for (const [unitId, expectedNumber] of Object.entries(expectedValidated)) {
    const resolved = resolveVoucherDestination(unitId);
    assert.equal(resolved.isRoutable, true, `${unitId} deve ser roteável`);
    assert.equal(
      resolved.destinationWhatsapp,
      expectedNumber,
      `Número incorreto para ${unitId}`
    );
    assert.equal(resolved.routingStatus, 'ENCAMINHADO_WHATSAPP');
  }

  console.log('3. Testando 5 unidades pendentes (PENDENTE DE CONTATO)...');
  for (const unitId of expectedPending) {
    const resolved = resolveVoucherDestination(unitId);
    assert.equal(resolved.isRoutable, false, `${unitId} NÃO deve rotear WhatsApp`);
    assert.equal(resolved.destinationWhatsapp, null, `${unitId} deve ter destino null`);
    assert.equal(resolved.routingStatus, 'PENDENTE_DE_CONTATO');
    assert.equal(resolved.routingStatusLabel, 'PENDENTE DE CONTATO');
  }

  console.log('4. Testando unidade inexistente...');
  assert.throws(() => resolveVoucherDestination('filipe-99-inexistente'));

  console.log('5. Testando template e encodeURIComponent com acentos...');
  const sampleFields = {
    nomeCompleto: 'João Gonçalves da Silva',
    email: 'joao.goncalves+teste@exemplo.com.br',
    celularWhatsapp: '(11) 9.8765-4321',
    unidade: 'Óticas Filipe — São Caetano',
  };
  const msg = buildVoucherWhatsAppMessage(sampleFields);
  const waUrl = buildVoucherWhatsAppUrl('5511983488643', sampleFields);
  assert.ok(waUrl.startsWith('https://wa.me/5511983488643?text='));
  const encodedPart = waUrl.split('?text=')[1];
  assert.equal(decodeURIComponent(encodedPart), msg);
  assert.ok(msg.includes('NOVO CADASTRO — VOUCHER ÓTICAS FILIPE'));
  assert.ok(msg.includes('Nome: João Gonçalves da Silva'));
  assert.ok(msg.includes('E-mail: joao.goncalves+teste@exemplo.com.br'));
  assert.ok(msg.includes('WhatsApp do cliente: (11) 9.8765-4321'));
  assert.ok(msg.includes('Unidade escolhida: Óticas Filipe — São Caetano'));
  assert.ok(msg.includes('Origem: Campanha de Voucher.'));

  const baseTracking = {
    utm_source: 'test_suite',
    utm_campaign: 'voucher_2026',
    utm_adset: '',
    utm_content: '',
    utm_medium: 'cpc',
    utm_term: '',
    gclid: '',
    fbclid: '',
    Canal: 'site',
    Programa: 'voucher',
    lead_id: 'test-lead-001',
    _fbp: '',
    _fbc: '',
    user_agent: 'tsx-test-runner',
  };

  console.log('6. Testando persistência real no Firestore (unidade validada: Heliópolis)...');
  const routedRes = await dispatchLeadSubmission({
    unitId: 'filipe-01-heliopolis',
    unidade: 'Óticas Filipe — Heliópolis',
    nomeCompleto: 'Maria Clara Oliveira',
    celularWhatsapp: '(11) 9.9123-4567',
    email: 'maria.oliveira@teste.com.br',
    tracking: baseTracking,
    submittedAt: new Date().toISOString(),
    pageUrl: 'https://oticasfilipe.test/',
  });
  assert.equal(
    routedRes.status,
    'routed',
    `Esperado routed, obtido: ${JSON.stringify(routedRes)}`
  );
  assert.equal(routedRes.destinationWhatsapp, '551122191336');
  assert.ok(routedRes.whatsappUrl.startsWith('https://wa.me/551122191336?text='));
  console.log('   OK -> registrationId:', routedRes.registrationId);

  console.log('7. Testando persistência real no Firestore (unidade pendente: Tiradentes)...');
  const pendingRes = await dispatchLeadSubmission({
    unitId: 'filipe-05-tiradentes',
    unidade: 'Óticas Filipe — Tiradentes',
    nomeCompleto: 'Carlos Eduardo Souza',
    celularWhatsapp: '(11) 9.9888-7766',
    email: 'carlos.souza@teste.com.br',
    tracking: baseTracking,
    submittedAt: new Date().toISOString(),
    pageUrl: 'https://oticasfilipe.test/',
  });
  assert.equal(
    pendingRes.status,
    'pending_contact',
    `Esperado pending_contact, obtido: ${JSON.stringify(pendingRes)}`
  );
  assert.equal(pendingRes.whatsappUrl, null);
  assert.equal(pendingRes.routingStatus, 'PENDENTE_DE_CONTATO');
  console.log('   OK -> registrationId:', pendingRes.registrationId);

  console.log('8. Testando bloqueio de leitura PII pública (deve negar permissão)...');
  let readDenied = false;
  try {
    await getDoc(doc(db, 'voucher_registrations', routedRes.registrationId));
  } catch (err) {
    readDenied = true;
    console.log('   OK -> Leitura pública bloqueada:', (err as Error).message);
  }
  assert.equal(
    readDenied,
    true,
    'Leitura pública de PII deve ser negada pelas regras do Firestore'
  );

  console.log('9. Testando bloqueio de bypass em unidade pendente...');
  let bypassDenied = false;
  try {
    await setDoc(doc(db, 'voucher_registrations', 'vch_malicious_bypass_test'), {
      unitId: 'filipe-05-tiradentes',
      unitCode: 'FILIPE-05',
      unidade: 'Óticas Filipe — Tiradentes',
      nomeCompleto: 'Atacante Teste',
      email: 'atacante@teste.com',
      celularWhatsapp: '(11) 9.9999-0000',
      destinationWhatsapp: '5511999990000',
      routingStatus: 'ENCAMINHADO_WHATSAPP',
      routingStatusLabel: 'Encaminhado ao WhatsApp',
      submittedDate: '17/11/2026',
      submittedTime: '10:00:00',
      submittedAtIso: new Date().toISOString(),
      createdAt: serverTimestamp(),
      origin: 'Campanha de Voucher',
      pageUrl: '',
      leadId: '',
      utmSource: '',
      utmCampaign: '',
      utmMedium: '',
      utmContent: '',
      utmTerm: '',
      utmAdset: '',
      gclid: '',
      fbclid: '',
      canal: '',
      programa: '',
      webhookDispatched: false,
    });
  } catch (err) {
    bypassDenied = true;
    console.log('   OK -> Bypass em unidade pendente bloqueado:', (err as Error).message);
  }
  assert.equal(
    bypassDenied,
    true,
    'Bypass de roteamento em unidade pendente deve ser negado'
  );

  console.log('\nTODOS OS TESTES PASSARAM COM SUCESSO!');
  process.exit(0);
}

main().catch((err) => {
  console.error('TESTE FALHOU:', err);
  process.exit(1);
});
