# Phase B1 Verification Outcome Evidence

Captured: 2026-07-30 using the local static server and browser at `verifier.html`.

| Scenario | Overall result | Key observed checks |
|---|---|---|
| Empty/malformed input | `Invalid input` | Input failed; structure, integrity, signature, issuer, and key were not evaluated. |
| Committed trusted demonstration receipt | `Fully verified` | Input, strict structure, derived content identity, ECDSA signature, registered issuer, and active event-time-valid key all passed. |
| Mathematically valid receipt from an unrecognized issuer | `Verification incomplete` | Structure, integrity, signature, and key-time checks passed; issuer recognition remained unknown. The UI did not display `Fully verified`. |

Visual browser inspection confirmed the demonstration disclosure, result headings, independent check cards, and false-positive-prevention language were visible at desktop layout. Automated evidence for failed/tampered/revoked/compromised/expired/oversized/prohibited cases is retained in `test/verifier.test.mjs` and the CI test output.

This evidence is demonstration-only and does not establish production readiness, government certification, accessibility conformance, or correctness of any underlying real-world action.
