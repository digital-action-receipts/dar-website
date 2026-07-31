# DAR Codex instrumentation verification report

## Scope

This package instruments a local Codex case study. It records repository state, authorized and prohibited actions, commands, changes, tests, security checks, commits, CI evidence, and outcome in `evidence-manifest.json`.

## Safety boundary

The package performs no network requests, does not read secrets, does not push or merge, does not deploy, and does not change external infrastructure. The sample receipt is synthetic and explicitly demonstration-only; it is not a DAR trust-registry receipt and must not be treated as a cryptographic verification claim.

## Verification criteria

The instrumentation tests enforce bounded event counts and field lengths, reject unsupported event kinds, calculate a deterministic SHA-256 evidence digest, and verify that the manifest records the required scope and approval guardrails. The manifest records the final local commands and results after implementation.

## Independent GitHub corroboration

The dedicated branch was published only after explicit human authorization. Draft PR [#7](https://github.com/digital-action-receipts/dar-website/pull/7) targets `government-readiness/phase-b3-secure-sdlc` and remains draft. Final GitHub Actions run [30630775265](https://github.com/digital-action-receipts/dar-website/actions/runs/30630775265) completed successfully for remote head `fb2d9998d2127933963974f1c93eeba569be02e6`. Its test job and all ten workflow steps passed, including SBOM artifact upload. The artifact was `dar-b3-sbom-852ac8dda00de995553c7aab3f871542a3acf728` with digest `sha256:35e3792060c23ca7dfaac1bc7abdd53c824b88d92cf9049ae01c1338e8ec203e`. This is independent CI corroboration, not a merge, deployment, or production-control claim.
