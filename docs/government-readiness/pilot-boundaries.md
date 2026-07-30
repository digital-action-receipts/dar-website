# Early-Pilot Limitations and Prohibited Data Classes

## Permitted posture

DAR may be demonstrated in local/offline scenarios using synthetic or explicitly approved non-sensitive data and evaluated for vendor registration, discovery, RFIs, and architecture review. Customer-controlled custody is the default, and DAR must not retain customer receipt content by default. An early pilot is not authorized until named owners approve its data flow, deployment, incident path, retention schedule, and exit plan.

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

Do not use the prototype for production or high-impact decisions, eligibility/benefits, law enforcement, personnel action, compliance certification, or any claim of government approval. Do not represent `verifier.html` output as cryptographic verification.

## Allowed pilot data

Use synthetic, non-personal data with random tenant-scoped identifiers, non-sensitive action types, controlled timestamps/nonces, and hashes of synthetic artifacts. Keep authoritative artifacts outside DAR and confirm metadata combinations cannot identify a person or reveal protected activity.

If temporary demonstration storage is introduced, it must expire within 30 days or less unless a documented approved exception applies. The core receipt must use a strict, versioned, minimal schema, reject unknown fields by default, and exclude unrestricted free-form customer content.

Demonstration results must distinguish mathematical signature validity from registered-issuer recognition and trusted-key status. The word “Verified” must not appear unless every required cryptographic and trust check succeeds; placeholder or incomplete checks must be conspicuously labeled.

## Remaining pilot entry approvals

The founder has approved the custody, retention, hold, disposition, erasure, issuer-trust, verifier-language, and schema direction. Pilot-specific approval is still required for deployment/providers, use case/users, named data and records owners, issuer registration/key custody, access control, logging/incident handling, recovery, accessibility scope, customer exit/export, any retention exception, and explicit acceptance of remaining implementation risks.
