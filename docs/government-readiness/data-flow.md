# Current-State Data Flow and Trust Boundaries

![Current data flow](diagrams/current-data-flow.svg)

Editable source: [current-data-flow.mmd](diagrams/current-data-flow.mmd).

## Flow A — Static site delivery

1. A maintainer commits static source to GitHub.
2. An unverified deployment/hosting path may publish the files; no deployment configuration is in the repository.
3. A hosting/CDN endpoint returns HTML to a visitor's browser. The provider may process request metadata, but provider/configuration/retention are unknown.

Trust boundaries crossed: maintainer to repository (TB-1), repository/deployment to hosting (unverified), hosting to browser (TB-2).

## Flow B — Demonstration receipt issuance

1. The user supplies action type, pseudonymous subject, application ID, and context JSON.
2. Browser WebCrypto generates an extractable ECDSA P-256 key pair; JWKs are written to localStorage.
3. Browser code deterministically serializes context, hashes it with SHA-256, creates receipt metadata, hashes the payload, and signs the payload hash.
4. Receipt JSON, including the public JWK, is displayed. The user may download receipt/context JSON.

Trust boundaries crossed: user input to code (TB-3), code to browser persistence (TB-5), browser to user-controlled filesystem. This is a demonstration, not an approved issuer. There is no authenticated actor, trusted time source, protected signing key, issuer registry, schema enforcement, durable server store, audit log, or revocation check.

## Flow C — Playground verification

1. The user pastes receipt/context/public-key JSON or uses values produced locally.
2. Browser code recomputes context and payload hashes and verifies the ECDSA signature with the supplied public key.
3. A local result is rendered; no network call or durable verification report is created.

The verifier proves consistency with a supplied key, not the real-world identity or authority of an issuer.

## Flow D — Verifier-template path

1. The user pastes receipt JSON, uploads a JSON file, or supplies a reference URL.
2. In default offline mode the URL is not fetched. If the user disables offline mode, browser code performs `fetch()` to the arbitrary supplied URL.
3. The response is parsed as JSON.
4. Placeholder logic checks only whether signature, identifier, and timestamp-like fields exist and can show a “Verified” state without cryptographic validation.
5. A key-name-based display redaction may replace selected values in the decoded display; it is not a data-loss-prevention control.

This path must not be used to make an authenticity or integrity determination.

## Required lifecycle flows not implemented

| Flow | Current state |
|---|---|
| Authenticated receipt issuance | Not implemented |
| Server-side verification/API | Not implemented |
| DAR-managed receipt storage | Not implemented |
| Customer retention policy configuration | Not implemented |
| Legal hold/release | Not implemented |
| Archival | Not implemented |
| Human- and machine-readable managed export | Only browser download demo; managed export not implemented |
| Authorized disposition/cryptographic erasure | Not implemented |
| Disposition receipt | Not implemented |
| Application/security logging | Not implemented |
| Backups and restore | Not implemented |

## Trust-boundary implications

- All JSON and URLs are untrusted inputs. Future implementations require schema/size validation, safe parsing, origin restrictions, and error handling.
- Browser storage is controlled by the browser profile and device, not DAR. It is unsuitable for production signing secrets.
- A public key supplied inside the same receipt does not establish issuer identity. Future verification needs a separately trusted key/issuer binding and revocation state.
- Remote URL fetching creates privacy, tracking, cross-origin, availability, and potentially content-substitution risks.
- Customer systems of record and evidence stores remain outside DAR; integration responsibilities must be explicit.
