# Minimum-Safe Verification Demonstration

Status: Phase B1 demonstration; not a production verifier or certification.

## Verification states and gates

The UI exposes `Invalid input`, `Structure valid`, `Content integrity valid`, `Signature valid`, `Issuer recognized`, `Key valid`, `Verification incomplete`, `Verification failed`, and `Fully verified`. `Fully verified` is possible only when the strict schema, derived receipt ID, ECDSA signature, registered issuer, recognized key, active status, and event-time validity all pass. Mathematical signature validity is displayed separately and is insufficient by itself.

## Schema

`verification/dar-demo-receipt.schema.json` is the normative Draft 2020-12 schema for `dar-demo-1.0`. It rejects unknown fields, bounds strings and arrays, allows no unrestricted content, and permits only one optional field: `authorization_context_ref`. All other fields are required. `authorization_context_ref` is conditionally required by an integrating workflow when authorization context is claimed; this bounded demo cannot infer that condition.

Input is limited to 16 KiB UTF-8. The implementation also rejects prohibited key names associated with secrets, credentials, tokens, private keys, raw prompts/input, and sensitive data. JSON must be an ordinary top-level object. No remote URL retrieval occurs.

## Canonicalization and integrity

The selected method is RFC 8785 JSON Canonicalization Scheme (JCS). The implementation covers JSON primitives, arrays, and ordinary objects, uses UTF-8, recursively sorts object property names, and rejects non-JSON or non-finite values. Receipt fields are strings and string arrays, avoiding cross-runtime number concerns. Timestamps are UTC RFC 3339 with seconds and optional exactly three fractional digits.

The signature field alone is excluded from the signed canonical object. The receipt ID is `dar:demo:` plus base64url SHA-256 of the canonical receipt excluding both `receipt_id` and `signature`; the signature covers the canonical receipt including `receipt_id` and excluding only `signature`.

Interoperability limitation: this is a small audited subset implementation, not a general-purpose certified JCS library. Future specifications should adopt maintained cross-language libraries and published conformance vectors.

## Trust and time

The bounded registry records issuer ID, recognition decision, key ID, public JWK, algorithm, validity interval, and status. Supported states are active, expired, revoked, compromised, and unknown. Verification checks the event against the key validity interval and checks current status/time. Revoked, compromised, currently expired, or event-time-invalid keys fail trust even when the mathematical signature is valid.

The repository contains only the public demonstration key outside tests. Its matching private fixture is isolated under `test/fixtures/` for automated tests and is explicitly development-only. The browser verifier never generates, stores, or reads a private key and does not use localStorage. This is not production key management; managed generation, custody, rotation, revocation, recovery, and compromise handling remain unimplemented.

## Limits of the result

This demonstration is not government-certified or approved for sensitive data. It does not prove that the underlying action was lawful, authorized, accurate, successful, fair, or complete. It reports only the evidence and trust checks shown.
