export const TRUSTED_DEMO_RECEIPT = Object.freeze({
  schema_version: "dar-demo-1.0",
  issuer_id: "issuer:dar-demo",
  signing_key_id: "key:trusted-demo-2026",
  actor_ref: "actor:synthetic-reviewer",
  action_type: "demo.approval",
  target_ref: "target:synthetic-record-001",
  event_time: "2026-07-30T12:00:00Z",
  payload_hash: "sha256:SHNuWLQJ7QJByNe-2dwYilnhMAL0jnSShQvsFbWRR7Y",
  authorization_context_ref: "authctx:synthetic-policy-v1",
  related_receipt_refs: [],
  signature_algorithm: "ECDSA_P256_SHA256",
  receipt_id: "dar:demo:nCveNU09eRHchOmILeQbqlP9bhfqCljcJrgrMRJ8jgQ",
  signature: "fVTUPwkKPMvabuaGdHBDIb-Z4o42DTe9b5Hjjy2bAyPmZs6NLtPtkTpucI8BWjFSdsRgyuZepn6_5zw15434-g"
});

export const UNTRUSTED_ISSUER_DEMO_RECEIPT = Object.freeze({
  ...TRUSTED_DEMO_RECEIPT,
  issuer_id: "issuer:untrusted-demo",
  receipt_id: "dar:demo:DWX3uAEVX5IPccFddx29uY7pGZ1U88rwo2NV2slNx2E",
  signature: "uA0pgxubHQnskZTj1ENWh0jMM3mjiapamxL9lDWN6rUnVGHfzEmGlFM2UasZ31Qg_MDNhPQ59eqwudmjYoLmiw"
});
