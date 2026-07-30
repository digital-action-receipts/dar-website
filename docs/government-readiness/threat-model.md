# Initial Threat Model

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
