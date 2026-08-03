# Phase B3 validation evidence

Run with Node 22:

```text
npm test
npm run scan:secrets
npm run audit:dependencies
npm run scan:sast
npm run scan:headers
npm run sbom
git diff --check
```

The CI workflow stores the generated CycloneDX SBOM as an artifact. Secret output is summary-only and raw matches are not committed. Header evidence is `security-headers.json` plus the deployable `_headers` file. Rollback exercise: identify the approved commit from the PR merge/release record, redeploy that immutable SHA, rerun the commands above, compare the rendered static smoke page, and record the decision and preserved evidence.
