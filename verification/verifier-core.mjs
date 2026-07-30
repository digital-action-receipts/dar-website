import { DEMO_TRUST_REGISTRY } from "./demo-trust-registry.mjs";

export const MAX_INPUT_BYTES = 16 * 1024;
export const SUPPORTED_SCHEMA_VERSION = "dar-demo-1.0";
export const SUPPORTED_ALGORITHM = "ECDSA_P256_SHA256";

const allowedFields = Object.freeze(["receipt_id", "schema_version", "issuer_id", "signing_key_id", "actor_ref", "action_type", "target_ref", "event_time", "payload_hash", "authorization_context_ref", "related_receipt_refs", "signature_algorithm", "signature"]);
const requiredFields = Object.freeze(allowedFields.filter((field) => field !== "authorization_context_ref"));
const prohibitedKeyPattern = /(?:password|passwd|secret|token|credential|authorization|cookie|session|private[_-]?key|api[_-]?key|ssn|social[_-]?security|health|biometric|card[_-]?number|raw[_-]?(?:input|prompt)|customer[_-]?content)/i;
const patterns = Object.freeze({
  receipt_id: /^dar:demo:[A-Za-z0-9_-]{43}$/,
  issuer_id: /^issuer:[a-z0-9][a-z0-9.-]{2,63}$/,
  signing_key_id: /^key:[A-Za-z0-9._-]{3,64}$/,
  actor_ref: /^actor:[A-Za-z0-9._:-]{3,96}$/,
  action_type: /^[a-z][a-z0-9_.-]{2,63}$/,
  target_ref: /^target:[A-Za-z0-9._:-]{3,96}$/,
  event_time: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/,
  payload_hash: /^sha256:[A-Za-z0-9_-]{43}$/,
  authorization_context_ref: /^authctx:[A-Za-z0-9._:-]{3,96}$/,
  signature: /^[A-Za-z0-9_-]{80,100}$/
});
const maximumLengths = Object.freeze({receipt_id:52, schema_version:12, issuer_id:71, signing_key_id:68, actor_ref:102, action_type:64, target_ref:103, event_time:24, payload_hash:50, authorization_context_ref:104, signature_algorithm:18, signature:100});

function result(state, detail) { return Object.freeze({ state, detail }); }
function utf8Bytes(value) { return new TextEncoder().encode(value); }
function base64url(bytes) {
  let binary = "";
  for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/u, "");
}
function fromBase64url(value) {
  if (!/^[A-Za-z0-9_-]+$/u.test(value)) throw new Error("Signature is not base64url.");
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - value.length % 4) % 4);
  const raw = atob(base64);
  return Uint8Array.from(raw, (character) => character.charCodeAt(0));
}
async function sha256(value) { return crypto.subtle.digest("SHA-256", utf8Bytes(value)); }

export function canonicalize(value) {
  if (value === null) return "null";
  if (typeof value === "string" || typeof value === "boolean") return JSON.stringify(value);
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new TypeError("RFC 8785 forbids non-finite numbers.");
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
  if (typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype) {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalize(value[key])}`).join(",")}}`;
  }
  throw new TypeError("Only JSON values with ordinary object prototypes can be canonicalized.");
}

export function unsignedReceipt(receipt) {
  const copy = Object.create(null);
  for (const key of allowedFields) if (key !== "signature" && Object.hasOwn(receipt, key)) copy[key] = receipt[key];
  return Object.assign({}, copy);
}

export function receiptIdContent(receipt) {
  const copy = unsignedReceipt(receipt);
  delete copy.receipt_id;
  return copy;
}

export async function deriveReceiptId(receipt) {
  return `dar:demo:${base64url(await sha256(canonicalize(receiptIdContent(receipt))))}`;
}

export function parseReceiptText(text) {
  if (typeof text !== "string") return { ok:false, errors:["Input must be text."] };
  if (utf8Bytes(text).byteLength > MAX_INPUT_BYTES) return { ok:false, errors:[`Input exceeds ${MAX_INPUT_BYTES} bytes.`] };
  let value;
  try { value = JSON.parse(text); } catch { return { ok:false, errors:["Malformed JSON."] }; }
  if (!value || Array.isArray(value) || typeof value !== "object" || Object.getPrototypeOf(value) !== Object.prototype) return { ok:false, errors:["Top-level JSON value must be an object."] };
  return { ok:true, value };
}

export function validateStructure(receipt) {
  const errors = [];
  const keys = Object.keys(receipt);
  for (const key of keys) {
    if (allowedFields.includes(key)) continue;
    if (prohibitedKeyPattern.test(key)) errors.push(`Prohibited field: ${key}.`);
    else errors.push(`Unknown field: ${key}.`);
  }
  for (const field of requiredFields) if (!Object.hasOwn(receipt, field)) errors.push(`Missing required field: ${field}.`);
  for (const field of keys) {
    if (!allowedFields.includes(field)) continue;
    const value = receipt[field];
    if (field === "related_receipt_refs") {
      if (!Array.isArray(value) || value.length > 16 || new Set(value).size !== value.length || value.some((item) => typeof item !== "string" || !patterns.receipt_id.test(item))) errors.push("related_receipt_refs must contain at most 16 unique DAR receipt IDs.");
      continue;
    }
    if (typeof value !== "string") { errors.push(`${field} must be a string.`); continue; }
    if (value.length > maximumLengths[field]) errors.push(`${field} exceeds its maximum length.`);
    if (patterns[field] && !patterns[field].test(value)) errors.push(`${field} has an invalid format.`);
  }
  if (receipt.schema_version !== SUPPORTED_SCHEMA_VERSION) errors.push(`Unsupported schema version: ${String(receipt.schema_version)}.`);
  if (receipt.signature_algorithm !== SUPPORTED_ALGORITHM) errors.push(`Unsupported signature algorithm: ${String(receipt.signature_algorithm)}.`);
  if (typeof receipt.event_time === "string" && (!patterns.event_time.test(receipt.event_time) || Number.isNaN(Date.parse(receipt.event_time)))) errors.push("event_time must be a valid UTC RFC 3339 timestamp.");
  return { ok:errors.length === 0, errors };
}

function findTrust(receipt, registry) {
  const issuerEntries = registry.filter((entry) => entry.issuer_id === receipt.issuer_id);
  const key = issuerEntries.find((entry) => entry.signing_key_id === receipt.signing_key_id);
  return { issuerRecognized:issuerEntries.some((entry) => entry.recognized !== false), key };
}

export async function verifyReceipt(receipt, options = {}) {
  const registry = options.registry ?? DEMO_TRUST_REGISTRY;
  const now = new Date(options.now ?? Date.now());
  const structure = validateStructure(receipt);
  const checks = {
    input: result("pass", "JSON input parsed safely within the size limit."),
    structure: result(structure.ok ? "pass" : "fail", structure.ok ? "Required structure is valid." : structure.errors.join(" ")),
    integrity: result("unknown", "Not evaluated."), signature: result("unknown", "Not evaluated."),
    issuer: result("unknown", "Not evaluated."), key: result("unknown", "Not evaluated.")
  };
  if (!structure.ok) return { overall:"Invalid input", checks, structureErrors:structure.errors };

  const expectedId = await deriveReceiptId(receipt);
  checks.integrity = result(expectedId === receipt.receipt_id ? "pass" : "fail", expectedId === receipt.receipt_id ? "Content integrity is valid: receipt ID matches canonical content." : "Content integrity failed: receipt ID does not match canonical content.");
  const trust = findTrust(receipt, registry);
  checks.issuer = result(trust.issuerRecognized ? "pass" : "unknown", trust.issuerRecognized ? "Issuer is recognized by the demonstration registry." : "Issuer is not recognized by the demonstration registry.");
  if (!trust.key) {
    checks.key = result("unknown", trust.issuerRecognized ? "Signing key is unknown for this issuer." : "Signing key cannot be trusted because the issuer is unknown.");
    checks.signature = result("unknown", "Signature cannot be checked without a recognized public key.");
    return { overall:checks.integrity.state === "fail" ? "Verification failed" : "Verification incomplete", checks };
  }

  let signatureValid = false;
  try {
    const publicKey = await crypto.subtle.importKey("jwk", trust.key.public_key_jwk, {name:"ECDSA", namedCurve:"P-256"}, false, ["verify"]);
    signatureValid = await crypto.subtle.verify({name:"ECDSA", hash:"SHA-256"}, publicKey, fromBase64url(receipt.signature), utf8Bytes(canonicalize(unsignedReceipt(receipt))));
    checks.signature = result(signatureValid ? "pass" : "fail", signatureValid ? "Mathematical signature is valid." : "Mathematical signature is invalid.");
  } catch {
    checks.signature = result("fail", "Signature is malformed or cannot be verified.");
  }

  const eventTime = new Date(receipt.event_time);
  const validFrom = new Date(trust.key.valid_from);
  const validUntil = trust.key.valid_until ? new Date(trust.key.valid_until) : null;
  const eventValid = eventTime >= validFrom && (!validUntil || eventTime < validUntil);
  const currentlyExpired = trust.key.status === "expired" || (validUntil && now >= validUntil);
  const dangerous = trust.key.status === "revoked" || trust.key.status === "compromised";
  const keyActive = trust.key.status === "active" && !currentlyExpired && eventValid;
  let keyDetail = `Key status is ${trust.key.status}; event-time validity ${eventValid ? "passes" : "fails"}.`;
  if (currentlyExpired) keyDetail += " The key is currently expired.";
  if (dangerous) keyDetail += " Revoked or compromised keys are never trusted.";
  checks.key = result(keyActive ? "pass" : "fail", keyDetail);

  const fullyVerified = structure.ok && checks.integrity.state === "pass" && signatureValid && checks.issuer.state === "pass" && checks.key.state === "pass";
  const trustIncomplete = checks.integrity.state === "pass" && signatureValid && checks.issuer.state === "unknown" && checks.key.state === "pass";
  return { overall:fullyVerified ? "Fully verified" : trustIncomplete ? "Verification incomplete" : "Verification failed", checks };
}

export async function verifyReceiptText(text, options = {}) {
  const parsed = parseReceiptText(text);
  if (!parsed.ok) return { overall:"Invalid input", checks:{input:result("fail", parsed.errors.join(" ")), structure:result("unknown", "Not evaluated."), integrity:result("unknown", "Not evaluated."), signature:result("unknown", "Not evaluated."), issuer:result("unknown", "Not evaluated."), key:result("unknown", "Not evaluated.")}, structureErrors:parsed.errors };
  return verifyReceipt(parsed.value, options);
}
