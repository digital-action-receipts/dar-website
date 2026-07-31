# Evidence index

| Evidence | Classification | Location / reference |
|---|---|---|
| Starting branch, commit, clean worktree | directly_observed | `case-study/evidence-manifest.json` starting_state |
| Instrumentation source, tests, sample receipt | directly_observed | `case-study/`, `test/case-study-instrumentation.test.mjs` |
| 28 passing local tests and security checks | locally_verified | manifest security_checks and local command record |
| Implementation commit `b184230` | directly_observed | manifest generated_commits |
| Draft PR #7 and target branch | externally_corroborated | GitHub PR #7 |
| GitHub Actions run `30631129041`, successful | externally_corroborated | GitHub Actions run reference in manifest |
| SBOM artifact digest | externally_corroborated | manifest artifact record |
| Human authorization for external publication | human_attested | request authorizing the corroboration stage |
| Model internal reasoning completeness | not_verified | outside repository evidence |
| Government certification, production controls, legal conclusions | not_applicable / not_verified | outside case-study scope |
