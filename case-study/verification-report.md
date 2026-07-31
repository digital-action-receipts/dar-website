# DAR Codex instrumentation verification report

## Scope

This package instruments a local Codex case study. It records repository state, authorized and prohibited actions, commands, changes, tests, security checks, commits, CI evidence, and outcome in `evidence-manifest.json`.

## Safety boundary

The package performs no network requests, does not read secrets, does not push or merge, does not deploy, and does not change external infrastructure. The sample receipt is synthetic and explicitly demonstration-only; it is not a DAR trust-registry receipt and must not be treated as a cryptographic verification claim.

## Verification criteria

The instrumentation tests enforce bounded event counts and field lengths, reject unsupported event kinds, calculate a deterministic SHA-256 evidence digest, and verify that the manifest records the required scope and approval guardrails. The manifest records the final local commands and results after implementation.
