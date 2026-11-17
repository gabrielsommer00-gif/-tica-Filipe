# Security Specification — Óticas Filipe Voucher Registrations

## 1. Data Invariants
1. Every document in `/voucher_registrations/{registrationId}` MUST have a valid alphanumeric/underscore/hyphen ID (`^[a-zA-Z0-9_\-]+$`, max 128 chars).
2. Every registration MUST contain all 27 schema-defined keys and ONLY those keys (no shadow/ghost fields).
3. `unitId` MUST match `^filipe-[0-9]{2}-[a-z0-9-]+$` and `unitCode` MUST match `^FILIPE-[0-9]{2}$`.
4. `routingStatus` MUST be `'ENCAMINHADO_WHATSAPP'` (with valid `destinationWhatsapp` matching `^55[0-9]{10,11}$`) OR `'PENDENTE_DE_CONTATO'` (with empty `destinationWhatsapp == ''`).
5. Pending units (`filipe-05-tiradentes`, `filipe-06-guaianases`, `filipe-07-sao-mateus`, `filipe-08-jardim-santo-andre`, `filipe-09-rodolfo-pirani`) MUST ALWAYS be recorded as `'PENDENTE_DE_CONTATO'` with `destinationWhatsapp == ''`.
6. `createdAt` MUST equal `request.time` (server timestamp) and is immutable after creation.
7. Customer PII (`nomeCompleto`, `email`, `celularWhatsapp`) can NEVER be read (`get`/`list`), updated, or deleted by unauthenticated users or non-admin users. Only verified admins (`isAdmin()`) may read or update status.

## 2. "Dirty Dozen" Adversarial Payloads (Expected: PERMISSION_DENIED)
1. **Shadow Field Injection**: Create payload containing extra `isAdmin: true` or `isVerified: true` field -> rejected by `keys().hasOnly(...)`.
2. **Client Timestamp Forgery**: Create payload with client-forged `createdAt` != `request.time` -> rejected by `incoming().createdAt == request.time`.
3. **Invalid ID Poisoning**: Document ID > 128 chars or containing `$` / `.` -> rejected by `isValidId(registrationId)`.
4. **Pending Unit Bypass**: Payload with `unitId: 'filipe-05-tiradentes'` and `routingStatus: 'ENCAMINHADO_WHATSAPP'` or non-empty `destinationWhatsapp` -> rejected by unit-routing invariant.
5. **Valid Unit Empty WhatsApp Spoof**: Payload with `routingStatus: 'ENCAMINHADO_WHATSAPP'` and `destinationWhatsapp: ''` -> rejected.
6. **Oversized String DoW Attack**: Payload with 50KB `nomeCompleto` or `pageUrl` -> rejected by `.size()` upper bounds.
7. **Invalid Type Poisoning**: `webhookDispatched: "true"` (string instead of bool) or `nomeCompleto: 123` -> rejected by type assertions.
8. **Public PII Read (`get`)**: Unauthenticated or non-admin client attempting `getDoc` on `/voucher_registrations/{id}` -> rejected by `isAdmin()`.
9. **Public PII Query (`list`)**: Unauthenticated or non-admin client attempting `getDocs` on `/voucher_registrations` -> rejected by `isAdmin()`.
10. **Unverified Admin Email Spoof**: User with `email: 'gabrielsommer00@gmail.com'` and `email_verified: false` -> rejected by `request.auth.token.email_verified == true`.
11. **Self-Assigned Admin Escalation**: Non-admin user attempting `create` in `/admins/{uid}` -> rejected by `allow write: if false`.
12. **Immutable Field Tampering**: Admin or user trying to alter `createdAt` or `unitId` on update -> rejected by immutability checks and `affectedKeys().hasOnly(...)`.
