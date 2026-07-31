import { canonicalize } from "../verification/verifier-core.mjs";

export const INSTRUMENTATION_VERSION = "dar-codex-instrumentation-1.0";
export const MAX_EVENTS = 256;
export const MAX_DETAIL_LENGTH = 512;
const allowedKinds = new Set(["command", "change", "test", "security_check", "ci", "outcome"]);
const utf8 = (value) => new TextEncoder().encode(value);

function boundedText(value, label) {
  if (typeof value !== "string" || value.length < 1 || value.length > MAX_DETAIL_LENGTH) {
    throw new TypeError(`${label} must be a non-empty string of at most ${MAX_DETAIL_LENGTH} characters.`);
  }
  return value;
}

function safeEvent(event) {
  if (!event || typeof event !== "object" || Array.isArray(event)) throw new TypeError("Evidence event must be an object.");
  const kind = boundedText(event.kind, "Event kind");
  if (!allowedKinds.has(kind)) throw new TypeError(`Unsupported event kind: ${kind}.`);
  const status = boundedText(event.status ?? "recorded", "Event status");
  const detail = boundedText(event.detail, "Event detail");
  const copy = { kind, status, detail };
  if (event.command !== undefined) copy.command = boundedText(event.command, "Event command");
  if (event.path !== undefined) copy.path = boundedText(event.path, "Event path");
  if (event.sha !== undefined) copy.sha = boundedText(event.sha, "Event SHA");
  return Object.freeze(copy);
}

export function createManifest(startingState, scope) {
  if (!startingState || typeof startingState !== "object") throw new TypeError("Starting state is required.");
  if (!Array.isArray(scope) || scope.length < 1) throw new TypeError("Authorized scope is required.");
  return {
    manifest_version: INSTRUMENTATION_VERSION,
    starting_state: structuredClone(startingState),
    authorized_scope: scope.map((item) => boundedText(item, "Scope item")),
    prohibited_actions: ["push", "merge", "deploy", "external-infrastructure-change", "secret-access", "pull-request"],
    required_human_approvals: ["Human approval is required before any prohibited action."],
    acceptance_criteria: ["bounded local instrumentation", "sample receipt", "verification report", "automated tests", "machine-readable evidence"],
    events: [],
    security_checks: [],
    generated_commits: [],
    ci_evidence: [],
    final_outcome: "in_progress"
  };
}

export function recordEvent(manifest, event) {
  if (!manifest || !Array.isArray(manifest.events)) throw new TypeError("Invalid evidence manifest.");
  if (manifest.events.length >= MAX_EVENTS) throw new RangeError(`Manifest cannot exceed ${MAX_EVENTS} events.`);
  manifest.events.push(safeEvent(event));
  return manifest;
}

export function recordCommit(manifest, sha, message) {
  manifest.generated_commits.push({ sha: boundedText(sha, "Commit SHA"), message: boundedText(message, "Commit message") });
  return manifest;
}

export function recordCi(manifest, name, status, detail) {
  manifest.ci_evidence.push({ name: boundedText(name, "CI name"), status: boundedText(status, "CI status"), detail: boundedText(detail, "CI detail") });
  return manifest;
}

export function recordSecurity(manifest, name, status, detail) {
  manifest.security_checks.push({ name: boundedText(name, "Security check name"), status: boundedText(status, "Security check status"), detail: boundedText(detail, "Security check detail") });
  return manifest;
}

export async function evidenceDigest(manifest) {
  const copy = structuredClone(manifest);
  delete copy.evidence_digest;
  const bytes = await crypto.subtle.digest("SHA-256", utf8(canonicalize(copy)));
  return Buffer.from(bytes).toString("base64url");
}

export async function finalizeManifest(manifest, outcome = "complete") {
  if (!new Set(["complete", "blocked", "in_progress"]).has(outcome)) throw new TypeError("Invalid final outcome.");
  manifest.final_outcome = outcome;
  manifest.evidence_digest = await evidenceDigest(manifest);
  return manifest;
}
