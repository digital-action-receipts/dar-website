# Digital Action Receipts

DAR is intended to become the evidence and authorization layer for consequential AI-assisted actions.

The project explores portable, independently reviewable records showing what an AI agent, person, contractor, or third-party vendor was asked to do; who or what acted; which authority, evidence, tools, and approvals applied; what was completed; and what was blocked, declined, escalated, or left unsubmitted.

## Accountability model

- **Proof of action:** evidence of the work that was performed.
- **Proof of restraint:** evidence that authority boundaries, approval gates, and prohibited actions were respected.

DAR is designed as complementary infrastructure for existing agent, workflow, procurement, governance, and case-management systems. It is not intended to be employee-surveillance software, a generic activity logger, or an automatic compliance or legal decision-maker.

## Demonstrated today

This repository currently provides:

- A public static website and reference documentation.
- A bounded browser-based receipt verification demonstration.
- Strict demonstration schemas and size limits.
- Receipt-ID derivation and ECDSA signature verification.
- Separate checks for structure, integrity, issuer recognition, key status, and event-time validity.
- Automated verifier and trust-registry tests.
- Government-readiness documentation that identifies implemented, unimplemented, and unknown controls without claiming certification.

The current repository is not a production service, government-approved system, compliance certification, or complete authorization-enforcement platform.

## Case studies

- **Case Study 1 — completed:** Codex/software-development instrumentation and publication-readiness evidence. The public-redacted report is maintained on the `government-readiness/codex-case-study-instrumentation` branch.
- **Case Study 2 — completed:** AI-assisted government procurement opportunity analysis within a controlled research and document-preparation boundary. Submission, signature, certification, and legal representation remained outside the authorized scope.
- **Case Study 3 — planned:** a bounded, non-sensitive external-company pilot. It is not represented as completed.

## Roadmap direction

Future work may include receipt issuance patterns, proof-of-restraint events, human approval records, customer-controlled custody, bounded workflow integrations, enterprise identity, enforceable authorization, managed keys, tenant isolation, accessibility assurance, and independent security review. These are roadmap items unless repository evidence states otherwise.

## Development

Requires Node.js 22 or newer.

```sh
npm test
```

No sensitive customer information, production credentials, private keys, or nonpublic procurement evidence should be committed to this repository.
