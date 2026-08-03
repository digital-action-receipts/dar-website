# Secure SDLC and deployment baseline

Phase B3 establishes repository-testable safeguards for this static, dependency-light JavaScript/HTML prototype. CI runs tests, high-confidence secret scanning, dependency inventory/audit, targeted SAST, SBOM generation, header validation, documentation/schema checks, and `git diff --check`.

The scanners are intentionally narrow and fail closed for high-confidence findings. They are not a substitute for GitHub Advanced Security, provider configuration review, penetration testing, or production vulnerability management. The repository currently declares zero npm dependencies, so dependency results cover the application manifest only and do not claim infrastructure coverage.

Release evidence is tied to the commit SHA, CI result, CycloneDX SBOM artifact, checksums, review approval, and post-deployment smoke validation. Rollback means selecting the previously approved immutable commit, redeploying it, rerunning validation, and preserving the incident record.

Production authentication, RBAC, managed storage, key custody, backups, retention/privacy operations, accessibility conformance, incident response operations, and government certification remain outside this phase.
