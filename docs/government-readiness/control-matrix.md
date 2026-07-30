# Government Readiness Control Matrix

## Status rules

- `Evidenced`: repository evidence demonstrates the stated, narrow control.
- `Partial`: some relevant behavior exists but the control is incomplete.
- `Not implemented`: repository evidence shows no implementation.
- `Not evidenced`: the control may exist externally, but no repository/infrastructure evidence was available.
- `Not applicable (current boundary)`: no applicable component exists; reassess when scope changes.

Documentation alone is policy/specification evidence, not implementation evidence. Owners are provisional until assigned.

| ID | Requirement | Owner | Policy/specification | Implementation status and evidence | Required test/evidence path |
|---|---|---|---|---|---|
| WS1-01 | Inventory applications/services/repos/cloud/databases/environments/integrations/secrets/subprocessors | Founder / security | `system-boundary.md` | Partial: repository/browser inventory complete; external services unknown | Approved inventory plus hosting/GitHub/provider exports |
| WS1-02 | Current production architecture diagram | Technical owner | `diagrams/current-architecture.mmd` | Partial: current evidenced boundary diagrammed; production architecture not evidenced | Owner validation and rendered diagram |
| WS1-03 | Data-flow diagram incl. issuance, verification, storage, auth, logs, exports, deletion, backups | Technical + privacy | `data-flow.md` | Partial: current flows and missing flows recorded | Design review; implementation-specific DFD |
| WS1-04 | System and trust boundaries | Security owner | `system-boundary.md`, `data-flow.md` | Evidenced as current-state documentation | Founder/technical approval |
| WS1-05 | Data classification and field inventory | Privacy/records | `data-inventory.md` | Partial: prototype fields inventoried; hosting telemetry unknown | Field/schema review and provider inventory |
| WS1-06 | Control matrix with owner, implementation, test, evidence | Security owner | This file | Partial: provisional owners; most controls unimplemented | Named owner approval and evidence index |
| WS1-07 | Limitations and prohibited early-pilot data | Founder / privacy | `pilot-boundaries.md`; founder approval in PR #3 | Evidenced as approved rules; not technically enforced | Training, schema rejection tests, pilot approval record |
| CY-IA-01 | MFA for privileged administration | GitHub/hosting admin | Not documented | Not evidenced; account configuration outside repo | Account/IdP configuration export and access review |
| CY-IA-02 | RBAC, least privilege, user/operator/developer/service separation | Security owner | Not documented | Not implemented in application; external admin controls unknown | Authorization matrix and positive/negative tests |
| CY-IA-03 | Joiner/mover/leaver and emergency access | Operations owner | Not documented | Not implemented/evidenced | Approved procedure and access-review records |
| CY-DP-01 | Encryption in transit and at rest verified | Security owner | Not documented | Not evidenced; hosting/storage unknown | TLS scan and provider/storage configuration evidence |
| CY-DP-02 | Approved cryptography and signing-key lifecycle | Security owner | Prototype uses SHA-256/ECDSA P-256 | Partial demonstration only; extractable demo private key in localStorage | Crypto standard, threat review, rotation/revocation tests |
| CY-DP-03 | Managed secrets; no committed secrets | Security owner | README warns indirectly; pilot policy prohibits secrets | Partial: no apparent production secrets found; no scanner/gate | Secret scan, repository history review, CI gate |
| CY-SDLC-01 | Secure SDLC, review, static/dependency scans, SBOM | Engineering owner | Not documented | Not implemented; no dependencies/CI config | Protected-branch evidence and passing CI artifacts |
| CY-SDLC-02 | Environment separation and protected deploy/migrations/rollback | Operations owner | Not documented | Not evidenced; no deploy/database config | Environment inventory, deployment and rollback record |
| CY-WEB-01 | Security headers and session/cookie configuration | Security owner | Not documented | Not evidenced; no server config; no app sessions | Header scan; session tests if introduced |
| CY-MR-01 | Structured minimal logging and alerting | Operations/security | Data rules in pilot docs | Not implemented/evidenced | Log schema, redaction tests, alert test records |
| CY-MR-02 | Backups, restoration, RTO/RPO | Operations owner | Not documented | Not implemented/evidenced | Backup configuration and restoration report |
| PR-01 | Purpose limitation and minimization | Privacy owner | Approved synthetic/non-sensitive demo rule; strict minimal schema; `data-inventory.md`, `pilot-boundaries.md` | Partial: approved specification exists; no enforcement | Version/unknown-field/prohibited-content tests |
| PR-02 | Personal-data purposes, privacy notice, DPA, subprocessors, residency | Privacy/legal | Initial inventory only | Not implemented/evidenced | Approved documents and provider/subprocessor evidence |
| PR-03 | Data subject access/correction/export/restriction/deletion | Privacy owner | Not documented | Not implemented; DAR stores no evidenced server records | Workflow and tests for any managed data |
| PR-04 | Customer data excluded from model training unless authorized | Founder/privacy | Pilot policy prohibits customer content | Not implemented as binding policy/control | Approved policy, contracts, provider settings/evidence |
| RR-01 | Retention/immutability architecture decision | Records owner | Accepted ADR-0001; founder approval in PR #3 | Evidenced as accepted architecture decision; no technical implementation | Implementation architecture review and evidence listed in ADR |
| RR-02 | Configurable retention and legal hold | Records/engineering | Accepted ADR-0001: customer roles control holds; ≤30-day temporary demo storage absent exception | Not implemented | Expiry/exception/hold/release authorization and operator-denial tests |
| RR-03 | Human/machine export | Records/engineering | ADR-0001 requirements | Partial demo downloads only; no managed export | Format conformance, authorization, scale/accessibility tests |
| RR-04 | Authorized deletion/cryptographic erasure and disposition receipt | Records/security | Accepted ADR-0001: policy + no-hold + auditable authorization; conditional erasure; minimal receipt | Not implemented | Separation-of-duties, copy/replica/cache/backup erasure, audit, and receipt tests |
| RR-05 | Contract termination return/deletion | Legal/operations | ADR-0001 notes exit | Not implemented | Approved procedure and completed exercise |
| AC-01 | WCAG 2.2 AA standard, automated/manual testing, statement | Accessibility owner | Target exists in issue only | Not implemented/evidenced | Automated results, keyboard/screen-reader report, statement |
| IR-01 | Incident plan, roles, notification, evidence preservation | Incident owner | Threat model only | Not implemented | Approved plan and contact/escalation test |
| IR-02 | Key compromise/revocation, credential, unauthorized issue, DB, verifier, outage, evidence, supply-chain playbooks | Incident/security | Threats identified | Not implemented | Playbooks and tabletop/simulation reports |
| IR-03 | Post-incident corrective action | Incident owner | Not documented | Not implemented | Exercise/incident record and action register |
| PP-01 | Low-risk pilot eligibility and prohibited uses | Founder | Approved direction in `pilot-boundaries.md` and PR #3 | Evidenced as approved baseline; pilot-specific approval and enforcement remain | Signed pilot readiness checklist and data validation evidence |
| VT-01 | Registered issuer and trusted key | Security owner | Approved founder direction; `system-boundary.md`, `threat-model.md` | Not implemented; prototype accepts a supplied key | Registry, recognition, key-status/revocation, and negative test evidence |
| VT-02 | Accurate verifier result language | Security/product | “Verified” only after all required crypto/trust checks; placeholder explicitly labeled | Not implemented; current verifier can display “Verified” after field-presence checks | Result-state tests covering invalid, unrecognized, revoked, incomplete, and valid cases |
| DS-01 | Strict minimal receipt schema | Privacy/security/engineering | Approved versioned schema, unknown-field rejection, no unrestricted free-form content | Not implemented | Schema conformance, unknown-field, prohibited-content, and version tests |
| PP-02 | Shared responsibility and procurement trust package | Founder/legal/security | Initial boundaries documented | Not implemented | Approved package and questionnaire evidence index |

## Current positive evidence (narrowly scoped)

- The playground performs browser-local SHA-256 hashing and ECDSA P-256 signing/verification and provides tamper buttons for manual demonstration (`playground.html`).
- The website states that receipts do not prove correctness, intent, authorization, fairness, or compliance (`definition.html`, `boundaries.html`, `verifier.html`).
- The playground warns that localStorage demo keys must not be used in production.
- The verifier defaults its optional remote-fetch feature to offline mode, but its actual verification logic is a placeholder.

These facts do not establish a production security control environment.
