# Repository governance baseline

The checked-in repository contains no GitHub branch-protection export, ruleset, environment, deployment, or signed-release configuration. Therefore the following are intended controls, not implemented evidence:

- `main` requires pull requests, at least one designated review, and passing CI status checks.
- Force pushes and deletion are restricted; stale approvals are dismissed after new commits.
- Administrator bypass is exceptional, documented, and reviewed after use.
- Release tags and artifacts should be associated with a verified commit or attestation where platform support permits.

Secret findings are remediated by revoking the credential, preserving minimal evidence, removing it from the current tree and history where appropriate, and recording the incident. False-positive suppressions require a reviewed, narrowly scoped rule; no suppression file currently exists.

GitHub settings, CODEOWNERS enforcement, MFA, signed-commit enforcement, deployment environments, and administrator audit evidence require repository-owner configuration exports and are not claimed here.
