# Government Readiness — Phase A Baseline

Status: **current-state assessment; not a certification or production-readiness claim**

Assessment date: 2026-07-30

Repository baseline: `9429920`

This package records the evidence visible in `digital-action-receipts/dar-website` for Phase A of issue #2. It does not infer controls from an unobserved hosting account, vendor capability, or intended future architecture. Where repository evidence is absent, the control is marked `Not implemented`, `Not evidenced`, or `Unknown`.

## Executive finding

The repository is an early static-site prototype and conceptual reference implementation. It contains standalone HTML pages, inline CSS/JavaScript, a browser-only DAR signing/verifying demonstration, and a separate verifier page whose verification routine is explicitly a placeholder. No backend application, authentication system, database, server-side receipt store, deployment manifest, infrastructure-as-code, CI workflow, dependency manifest, automated test suite, operational logging, backup configuration, or retention enforcement is present.

Accordingly, the current system boundary is limited to source in this repository and code executing in a visitor's browser. Production hosting, DNS, repository administration, and GitHub account controls are external/unknown until evidence is collected from their owners.

## Package contents

- [System boundary and service inventory](system-boundary.md)
- [Data inventory and classification](data-inventory.md)
- [Current-state data flow and trust boundaries](data-flow.md)
- [Government-readiness control matrix](control-matrix.md)
- [Early-pilot limitations and prohibited data](pilot-boundaries.md)
- [Initial threat model](threat-model.md)
- [ADR-0001: retention and disposition](adr/0001-retention-and-disposition.md)
- [Validation record](validation.md)
- Editable diagrams in [`diagrams/`](diagrams/) with rendered SVG counterparts

## Evidence method and scope

The assessment inspected all tracked files, recent Git history, repository configuration files visible in the checkout, inline browser code, and available test/deployment metadata. Statements about an actual deployed site or external services require separate infrastructure evidence and are not represented as implemented controls here.

## Required follow-up evidence

Before any government pilot, obtain and review: hosting provider and account configuration; DNS/TLS ownership; environments and deployment process; repository protections and administrator/MFA posture; subprocessors; secrets and key-management approach; incident and support contacts; logging/monitoring; backup/recovery; and the intended server-side receipt lifecycle.

## Accepted founder decisions

The founder approved the Phase A findings and ADR-0001 on 2026-07-30. Authoritative direction is: customer-controlled custody by default; no default DAR retention of receipt content; synthetic or explicitly approved non-sensitive demonstration data; temporary demonstration retention of 30 days or less absent approved exception; customer-controlled legal holds; policy-, hold-, and authorization-gated disposition; conditional and tested cryptographic erasure; minimal non-content-bearing disposition receipts; registered issuers with trusted keys; cryptographic validity kept distinct from issuer recognition and key status; no “Verified” result until all required cryptographic and trust checks pass; and a strict, versioned, minimal receipt schema that rejects unknown fields and excludes unrestricted free-form content.

These are approved requirements, not implemented-control claims.
