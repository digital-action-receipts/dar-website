# Independent review guide

1. Read `evidence-snapshot.json` and confirm version, starting commit, remote head, PR, run, artifact, timestamps, and classifications.
2. Confirm the starting commit is an ancestor of the implementation commits and that the worktree snapshot was clean.
3. Review `case-study/evidence-manifest.json`, then inspect the instrumentation source, schema, tests, sample receipt, and verification report.
4. Re-run `node --test test/*.test.mjs`, the repository security checks, SBOM generation, and `git diff --check`.
5. Open PR #7 and the linked Actions run independently. Confirm the PR is draft, targets `government-readiness/phase-b3-secure-sdlc`, and the recorded head and artifact digest match.
6. Separate Codex-performed actions from human-authorized external publication. No reviewer should infer unrecorded model actions from this package.

The conclusion is sufficient only for the narrow case-study claims listed in `limitations-and-claims.md`.
