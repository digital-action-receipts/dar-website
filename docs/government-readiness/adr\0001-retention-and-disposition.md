# ADR-0001: Immutability While Retained; Customer-Controlled Disposition

- Status: Proposed — founder approval required
- Date: 2026-07-30
- Owners: Founder/product owner; security, privacy, and records owners to be assigned

## Context

Government customers require records schedules, holds, export, contract-end return, and authorized disposition. “Immutable forever” conflicts with lawful deletion and minimization, while mutable records undermine integrity. No server-side receipt storage or records control exists in this repository; this ADR constrains future design and does not claim implementation.

## Decision

> Receipts are immutable while retained, but the customer controls retention, legal hold, archival, export, and authorized disposition.

1. The customer is records owner unless a contract explicitly assigns another role. DAR acts only on documented instructions.
2. Receipt content and integrity metadata cannot be edited in place while retained. Corrections are linked new receipts.
3. Each tenant/record class has a versioned policy identifying authority, duration/event trigger, archival needs, and disposition. Customer content has no silent “retain forever” default.
4. Authorized legal hold suspends ordinary disposition for an exact scope. Hold creation, change, release, conflicts, and authorization are audited. Release resumes policy evaluation; it does not itself delete.
5. Authorized export provides documented machine-readable JSON and accessible human-readable output, preserving schema/version, signatures/hashes, issuer/key references, relationships, and verification instructions.
6. When policy permits and no hold applies, all DAR-controlled copies are deleted or cryptographically erased. Backups have bounded expiry and disposed records are not returned to ordinary service after restore.
7. A disposition receipt retains only authority, opaque scope, policy/version, hold check, method, timestamp, actor/service identity, result, and aggregate count/hash commitment. It contains no deleted protected content and cannot reconstruct it.
8. Policy, hold, disposition authorization, execution, and evidence use least privilege and separation of duties appropriate to risk, with tamper-evident audit events.
9. Disposition of DAR-managed copies does not imply that independently exported or customer-held copies no longer exist or verify.

## Consequences

Immutability is bounded by authorized retention state, not perpetual existence. A records-control plane must be separate from immutable receipt content. Customer custody is the preferred minimal-data default; DAR-managed custody adds privacy, backup, residency, and disposition duties. Hashes, indexes, replicas, caches, exports, logs, and backups must be included in lifecycle design.

## Rejected alternatives

- Perpetual retention: incompatible with lawful disposition, minimization, customer authority, and termination.
- Mutable/deletable receipts without governance: enables silent alteration and weakens evidence.
- “Customer custody means no DAR responsibility”: ignores DAR telemetry, support copies, exports, and any managed-service option.

## Required evidence before `Implemented`

Approved records policy and roles; updated architecture/DFD; retention/hold authorization tests; immutable-storage configuration; export conformance/accessibility tests; deletion and backup-expiry tests; sample disposition receipt; audit/alert evidence; restoration test; termination procedure; and security/privacy review.

## Founder approval questions

- Is customer custody the default, with managed storage optional and future?
- What pilot retention minimum/maximum or default is acceptable?
- Which roles create/release holds and authorize disposition?
- When is cryptographic erasure acceptable?
- Which minimal disposition-receipt fields are retained, and for how long?
