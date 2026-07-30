# ADR-0001: Immutability While Retained; Customer-Controlled Disposition

- Status: Accepted
- Date: 2026-07-30
- Accepted by: Founder, 2026-07-30, PR #3 comment `5131759208`
- Owners: Founder/product owner; security, privacy, and records owners to be assigned

## Context

Government customers require records schedules, holds, export, contract-end return, and authorized disposition. “Immutable forever” conflicts with lawful deletion and minimization, while mutable records undermine integrity. No server-side receipt storage or records control exists in this repository; this ADR constrains future design and does not claim implementation.

## Decision

> Receipts are immutable while retained, but the customer controls retention, legal hold, archival, export, and authorized disposition.

1. Customer-controlled receipt custody is the default. The customer is records owner unless a contract explicitly assigns another role. DAR-managed storage is deferred and may be introduced later only as an optional deployment model. DAR acts only on documented customer instructions and does not retain customer receipt content by default.
2. Receipt content and integrity metadata cannot be edited in place while retained. Corrections are linked new receipts.
3. Each tenant/record class has a versioned policy identifying authority, duration/event trigger, archival needs, and disposition. Customer content has no silent “retain forever” default. Any temporary demonstration storage expires within 30 days or less unless a documented, approved exception applies.
4. Authorized legal hold suspends ordinary disposition for an exact scope. Customer-authorized records roles control creation and release. DAR operators must not unilaterally release a customer hold. Hold creation, change, release, conflicts, and authorization are audited. Release resumes policy evaluation; it does not itself delete.
5. Authorized export provides documented machine-readable JSON and accessible human-readable output, preserving schema/version, signatures/hashes, issuer/key references, relationships, and verification instructions.
6. Authorized disposition requires an applicable policy, confirmation that no hold applies, and auditable authorization. All DAR-controlled copies are then deleted or cryptographically erased. Higher-risk disposition supports separation of duties.
7. Cryptographic erasure is acceptable only when encryption and key separation, all applicable copies, replicas, caches, and the backup lifecycle are demonstrably covered and tested. Backups have bounded expiry, and disposed records are not returned to ordinary service after restore.
8. A disposition receipt retains only minimal authority, opaque scope, policy/version, hold check, method, timestamp, actor/service identity, result, count, and an appropriate cryptographic commitment. It contains no deleted protected content and cannot reconstruct it.
9. Policy, hold, disposition authorization, execution, and evidence use least privilege and separation of duties appropriate to risk, with tamper-evident audit events.
10. Disposition of DAR-managed copies does not imply that independently exported or customer-held copies no longer exist or verify.

## Consequences

Immutability is bounded by authorized retention state, not perpetual existence. A records-control plane must be separate from immutable receipt content. Customer custody is the approved default; DAR-managed custody is deferred and optional and adds privacy, backup, residency, and disposition duties. Hashes, indexes, replicas, caches, exports, logs, and backups must be included in lifecycle design.

## Rejected alternatives

- Perpetual retention: incompatible with lawful disposition, minimization, customer authority, and termination.
- Mutable/deletable receipts without governance: enables silent alteration and weakens evidence.
- “Customer custody means no DAR responsibility”: ignores DAR telemetry, support copies, exports, and any managed-service option.

## Required evidence before `Implemented`

Approved records policy and roles; updated architecture/DFD; retention/hold authorization tests; immutable-storage configuration; export conformance/accessibility tests; deletion and backup-expiry tests; sample disposition receipt; audit/alert evidence; restoration test; termination procedure; and security/privacy review.

## Approval record

The founder accepted this decision on 2026-07-30. The acceptance establishes customer custody as the default, a maximum 30-day temporary demonstration retention absent approved exception, customer control of holds, governed disposition, conditional cryptographic erasure, and minimal disposition receipts. Acceptance approves the architecture direction; it does not mark any technical control implemented.
