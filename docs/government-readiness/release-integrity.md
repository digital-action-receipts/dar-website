# Release integrity and rollback procedure

1. Record the source commit SHA and review/approval link.
2. Require green CI, including tests, scans, header validation, documentation checks and SBOM generation.
3. Retain the CycloneDX SBOM and SHA-256 checksums with release notes naming the commit, version, deployment target and approver.
4. Perform a static-page smoke check after deployment and record the result.
5. Roll back when validation fails, an unreviewed artifact is detected, a high/critical vulnerability is confirmed, or the deployed behavior diverges from the approved commit.
6. Redeploy the previously approved immutable commit, rerun validation, preserve logs and artifacts, and record who authorized the decision.

No production deployment target or attestation service is evidenced in this repository; this is a procedure and repository-only exercise, not a production control claim.
