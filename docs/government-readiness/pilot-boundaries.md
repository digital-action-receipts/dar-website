# Early-Pilot Limitations and Prohibited Data Classes

## Permitted posture

DAR may be demonstrated in local/offline, synthetic-data scenarios and evaluated for vendor registration, discovery, RFIs, and architecture review. An early pilot is not authorized until named owners approve its data flow, deployment, incident path, retention schedule, and exit plan.

## Known limitations

- This is a static prototype, not an evidenced production service.
- `verifier.html` uses placeholder field-presence checks and can label data “Verified” without cryptography.
- `playground.html` stores an extractable private demo key in localStorage and has no issuer identity proof, revocation, protected time, or production key lifecycle.
- Authentication, authorization, tenant isolation, MFA, environment separation, deployment controls, logging, alerting, backup, recovery, and retention enforcement are absent or not evidenced.
- There is no enforced schema, payload minimization, rate/size limit, managed legal hold, archival, export, disposition, or disposition receipt.
- Privacy, subprocessors, residency, incident response, accessibility conformance, and service commitments are not yet evidenced.
- Prototype cryptography/canonicalization has not received independent specification or security review.

## Prohibited data and uses

Until Phase B controls and pilot-specific approval exist, do not enter, paste, upload, fetch, commit, transmit, or store through DAR prototypes:

- Classified information, CUI, FCI, export-controlled, law-enforcement-sensitive, or government-secret data.
- Passwords, tokens, API keys, cookies, sessions, recovery codes, or production private/key-encryption keys.
- Government IDs, financial/payment data, precise location, biometrics, health/genetic data, criminal-history data, or data about minors.
- Raw prompts, source documents, case files, communications, personnel/investigation material, or other customer content.
- Names, personal email/phone/address, employee/student IDs, or linkable device identifiers.
- Production incident evidence, security logs, vulnerability details, secrets, malware, or active content.
- Any data subject to retention, hold, deletion, residency, or notification duties the pilot cannot enforce.

Do not use the prototype for production or high-impact decisions, eligibility/benefits, law enforcement, personnel action, compliance …2240 tokens truncated…odel

This STRIDE-informed model covers only evidenced browser/static-site behavior. Security objectives are receipt integrity, accurate verification, issuer authenticity, key confidentiality, data minimization, independent verification availability, and accurate readiness claims.

| ID | Threat / scenario | Current mitigation evidenced | Risk | Required treatment |
|---|---|---|---|---|
| T1 | Fabricated receipt embeds attacker key and appears authentic | None; playground accepts supplied key | Critical | Trusted issuer registry/binding, authorization, revocation, tests |
| T2 | Placeholder verifier displays “Verified” without cryptographic checks | Source labels code as placeholder | Critical | Disable the claim or implement/review a conforming verifier |
| T3 | Demo private key is extracted from localStorage | Demo warning only | Critical outside demos | Managed non-extractable/HSM-backed keys and lifecycle |
| T4 | XSS/compromised delivery steals data/keys or changes results | No CSP/deploy evidence | High | CSP/headers, release integrity, tests and monitoring |
| T5 | Arbitrary URL tracks user, substitutes content, or returns malicious/oversized JSON | Offline default and browser CORS | High | Disable/allowlist, size/time limits, privacy notice |
| T6 | Personal/restricted content enters receipt/context/repository | Copy recommends hashes/pseudonyms | High | Enforced schema/minimization, scanning and training |
| T7 | Low-entropy hashes permit confirmation/correlation | SHA-256 only | High | Opaque scoped IDs; keyed commitments/salts where appropriate |
| T8 | Malformed/replayed timestamps, nonces, or fields | Browser time/random nonce; no schema/registry | High | Normative schema, time and replay strategy, tests |
| T9 | Canonicalization/signature encoding differs across verifiers | One custom implementation | High | Normative format, test vectors, multiple implementations |
| T10 | Repository/account compromise changes released code or claims | Git history only | High | MFA, least privilege, protection, reviewed/provenanced releases |
| T11 | Receipt retained forever or deleted despite hold | No implementation | Critical for managed storage | Customer policy, hold precedence, governed disposition |
| T12 | Evidence cannot be exported/recovered | Demo download only | High | Formats, bulk export, backups and restore tests |
| T13 | Logs leak data, or missing logs prevent investigation | No logs | High | Minimal allowlisted events, redaction, access/retention, alerts |
| T14 | Valid receipt is over-interpreted as truth/authorization/compliance | Concept pages state limitations | High | Consistent assurance language, contracts and training |
| T15 | Compromised user device changes inputs/results/downloads | None under DAR control | Medium/High | Shared-responsibility terms and independent verification |

## Assets, actors, and priorities

Assets include receipt/context data, signing keys, issuer-key bindings, source/release integrity, verification results, customer trust, and future lifecycle state. Actors include maintainers, hosting admins, users/auditors, customer integrators, malicious receipt authors, remote URL operators, compromised platforms, and attackers controlling delivery or a device.

Founder decisions needed first: custody model; issuer trust/key model; disposition of the placeholder verifier; minimum schema/prohibited-data rules; and deployment/provider selection. Phase B should add automated abuse cases for tampering, untrusted/revoked keys, malformed/oversized JSON, canonicalization, replay, sensitive-field rejection, authorization, retention/hold/export/deletion, and restoration.
