# Data Inventory and Classification

## Classification scheme

| Class | Meaning | Examples |
|---|---|---|
| Public | Approved for unrestricted release | Website copy, public specifications, public keys |
| Internal | Non-public operational information with limited impact | Draft architecture, non-sensitive runbooks |
| Confidential | Business/customer information needing access control | Customer identifiers, contracts, non-public usage metadata |
| Restricted | High-impact or regulated information requiring explicit approval and controls | Government-sensitive data, secrets, regulated records |
| Authentication data | Credentials or material that enables identity/session/key use | Passwords, tokens, private keys, session identifiers |
| Personal data | Information linked or linkable to a person | Names, emails, IP/device identifiers, persistent pseudonyms |
| Receipt metadata | Fields describing an action or its evidence relationships | Issuer, subject, action type, time, hashes, nonce, references |

A datum may carry multiple classifications. Apply the most protective handling requirements.

## Current data inventory

| Data element | Classification | Source / location | Persistence | Current control evidence | Required handling |
|---|---|---|---|---|---|
| Public website source/content | Public | Repository and browser | Git history; hosting unknown | Git history | Review before publication |
| Demo private signing JWK | Authentication data; Restricted | Generated in `playground.html` | Browser `localStorage` | Warning says demo only | Never use as production key; clear after demonstration |
| Demo public JWK | Public when intentionally published | Browser/localStorage and receipt | Browser-local | WebCrypto generation | Bind to a trustworthy issuer identity in future design |
| Receipt JSON | Receipt metadata; may become Personal/Confidential/Restricted based on values | Textareas, uploaded file, downloaded file | Browser memory; user filesystem on download | No schema validation or server storage | Permit only approved minimal fields for pilot |
| `subject` | Receipt metadata; Personal if linkable | Playground input / receipt | Receipt downloaded by user | Example is pseudonymous only | Use non-reversible, tenant-scoped pseudonym; no direct identifier |
| `action_type`, `issued_at`, issuer, key ID, nonce | Receipt metadata; usually Internal/Confidential | Generated/input in playground | Receipt | Basic generation only | Assess inference risk and tenant segregation |
| `context_hash`, `payload_hash`, artifact/policy/model references | Receipt metadata; may be Confidential | Receipt | Receipt | SHA-256 demonstration | Hashes do not anonymize low-entropy inputs; prohibit secrets/raw sensitive values |
| Context JSON (`app_id`, terms hash, session/device hashes) | Internal/Confidential; Personal if linkable | Playground textarea | Browser memory; optional user download | No minimization validation | Do not include raw session/device data; use approved scoped identifiers |
| Pasted/uploaded verifier input | Same classification as receipt; potentially Restricted | `verifier.html` DOM | Browser memory | Display redaction covers a small key-name list only | Treat as untrusted; early pilots may not process sensitive content |
| Receipt reference URL | Confidential/Personal depending on path/query | Verifier input and outbound request | Browser/history/network systems | Offline toggle defaults on | Allowlist origins before production; prohibit credentials/query secrets |
| Browser/network telemetry (IP, user agent, request time) | Personal data; Internal | Hosting/CDN/browser | Unknown | No repository evidence | Inventory provider, purpose, retention, residency, access |
| Repository contributor metadata | Personal/Internal | Git/GitHub | Git history | Platform-managed | Govern access and retention through repository policy |

## Data lifecycle findings

- Collection is direct in the browser. No server collection by DAR code is evidenced.
- The playground persists extractable demo key material indefinitely in origin-scoped localStorage until reset or browser storage removal.
- Receipt and context downloads are controlled by the user and fall under the user's device/storage controls.
- The verifier may send a GET request to an arbitrary user-supplied URL, exposing client network metadata and URL contents to that destination and any intermediaries.
- No repository-evidenced retention, legal hold, archival, export service, authorized disposition, backup, or deletion workflow exists.
- Git history is durable but is not an approved store for receipts, customer data, keys, tokens, or evidence.

## Approved lifecycle and schema requirements

- Customer-controlled custody is the default; DAR retains no customer receipt content by default.
- Demonstrations use synthetic or explicitly approved non-sensitive data.
- Any temporary demonstration storage expires within 30 days or less unless a documented approved exception applies.
- The core receipt has a strict, versioned, minimal schema, rejects unknown fields by default, and contains no unrestricted free-form customer content.
- Customer-authorized records roles control legal holds. Disposition requires policy eligibility, a no-hold check, and auditable authorization.
- Disposition receipts contain only minimal authority and opaque lifecycle metadata, never deleted protected content.

These are accepted requirements without current technical enforcement.

## Minimization rule for early pilots

Receipt payloads must be limited to an approved receipt schema containing opaque, tenant-scoped identifiers and cryptographic digests of separately governed artifacts. A digest is still sensitive when it enables confirmation attacks, correlation, or inference. Raw source content must remain in the customer's authorized system of record.
