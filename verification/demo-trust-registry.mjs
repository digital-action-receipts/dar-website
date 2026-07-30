export const DEMO_TRUST_REGISTRY = Object.freeze([
  Object.freeze({
    issuer_id: "issuer:dar-demo",
    recognized: true,
    signing_key_id: "key:trusted-demo-2026",
    algorithm: "ECDSA_P256_SHA256",
    valid_from: "2026-01-01T00:00:00Z",
    valid_until: "2027-01-01T00:00:00Z",
    status: "active",
    public_key_jwk: Object.freeze({
      kty: "EC",
      crv: "P-256",
      x: "1WB__cwuYJaOo__rCg0sSu_QTN8CKUpljR5zb6N6O00",
      y: "xNrRT1vP3WPgC-GiFa9hXBt2UEN-DRpbI5QB1eSND6I",
      ext: true,
      key_ops: ["verify"]
    })
  }),
  Object.freeze({
    issuer_id: "issuer:untrusted-demo",
    recognized: false,
    signing_key_id: "key:trusted-demo-2026",
    algorithm: "ECDSA_P256_SHA256",
    valid_from: "2026-01-01T00:00:00Z",
    valid_until: "2027-01-01T00:00:00Z",
    status: "active",
    public_key_jwk: Object.freeze({kty:"EC",crv:"P-256",x:"1WB__cwuYJaOo__rCg0sSu_QTN8CKUpljR5zb6N6O00",y:"xNrRT1vP3WPgC-GiFa9hXBt2UEN-DRpbI5QB1eSND6I",ext:true,key_ops:["verify"]})
  })
]);

export const DEMO_KEY_STATES = Object.freeze(["active", "expired", "revoked", "compromised", "unknown"]);
