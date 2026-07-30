# Phase B2 trust registry

The demonstration verifier now consumes a bounded, signed, versioned registry. It accepts only the bundled local registry or caller-supplied pasted/local JSON; it never fetches arbitrary URLs.

## Trust model

The registry is canonicalized with the repository's deliberately narrow JSON Canonicalization implementation (ordinary JSON objects, arrays, strings, booleans and finite JavaScript numbers). Unknown fields, unsupported algorithms, oversized input, duplicate references, malformed timestamps and invalid public JWKs are rejected. The registry signature is checked against the bundled `authority:dar-demo-root` public key, freshness is checked against `issued_at`/`next_update`, and callers can enforce a minimum accepted sequence to demonstrate rollback protection.

Issuer statuses are `active`, `suspended`, `revoked`, `retired`, and `unknown`. Active issuers may verify; suspended/retired/unknown issuers produce an incomplete result; revoked issuers fail.

Key statuses are `active`, `expired`, `revoked`, `compromised`, `suspended`, `retired`, and `unknown`. Event-time validity is evaluated separately from current status. A receipt created before a compromise is shown as “Valid at event time, but key later compromised”; a receipt after the compromise-effective time is shown as “Issued after compromise-effective time.” Mathematical signature validity never overrides these lifecycle results. Retirement includes the replacement key reference where present.

This is a controlled demonstration only. Production issuer onboarding, HSM/KMS custody, revocation distribution, authentication/authorization, audit logging, incident response, backups, retention and privacy operations remain out of scope for Phase B2. Phase B3 may address governed distribution, operational custody and policy administration.
