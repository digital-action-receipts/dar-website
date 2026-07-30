import test from "node:test";
import assert from "node:assert/strict";
import { canonicalize, deriveReceiptId, MAX_INPUT_BYTES, unsignedReceipt, verifyReceipt, verifyReceiptText } from "../verification/verifier-core.mjs";
import { DEMO_TRUST_REGISTRY } from "../verification/demo-trust-registry.mjs";
import { TRUSTED_DEMO_RECEIPT } from "../verification/trusted-demo-receipt.mjs";
import { DEVELOPMENT_PRIVATE_JWK } from "./fixtures/development-private-key.mjs";

const encoder=new TextEncoder();const clone=(v)=>structuredClone(v);const b64=(v)=>Buffer.from(v).toString("base64url");
async function resign(receipt){const value=clone(receipt);value.receipt_id=await deriveReceiptId(value);const key=await crypto.subtle.importKey("jwk",DEVELOPMENT_PRIVATE_JWK,{name:"ECDSA",namedCurve:"P-256"},false,["sign"]);value.signature=b64(await crypto.subtle.sign({name:"ECDSA",hash:"SHA-256"},key,encoder.encode(canonicalize(unsignedReceipt(value)))));return value;}
const registry=(overrides={})=>[{...DEMO_TRUST_REGISTRY[0],...overrides,public_key_jwk:{...DEMO_TRUST_REGISTRY[0].public_key_jwk}}];

test("valid trusted receipt",async()=>assert.equal((await verifyReceipt(TRUSTED_DEMO_RECEIPT,{now:"2026-07-30T13:00:00Z"})).overall,"Fully verified"));
test("reordered properties canonicalize equally",()=>assert.equal(canonicalize({b:2,a:"x"}),canonicalize({a:"x",b:2})));
test("reordered input verifies",async()=>assert.equal((await verifyReceipt(Object.fromEntries(Object.entries(TRUSTED_DEMO_RECEIPT).reverse()),{now:"2026-07-30T13:00:00Z"})).overall,"Fully verified"));
for(const [name,field,value] of [["altered receipt","action_type","demo.changed"],["altered timestamp","event_time","2026-07-30T12:00:01Z"],["altered issuer","issuer_id","issuer:changed"],["altered key ID","signing_key_id","key:changed-demo"]])test(name+" fails",async()=>{const r=clone(TRUSTED_DEMO_RECEIPT);r[field]=value;assert.notEqual((await verifyReceipt(r,{now:"2026-07-30T13:00:00Z"})).overall,"Fully verified")});
test("invalid signature",async()=>{const r=clone(TRUSTED_DEMO_RECEIPT);r.signature=(r.signature[0]==="A"?"B":"A")+r.signature.slice(1);assert.equal((await verifyReceipt(r,{now:"2026-07-30T13:00:00Z"})).checks.signature.state,"fail")});
test("malformed signature",async()=>{const r=clone(TRUSTED_DEMO_RECEIPT);r.signature="not-a-signature";assert.equal((await verifyReceipt(r)).overall,"Invalid input")});
test("valid signature from unrecognized issuer is incomplete",async()=>{let r={...TRUSTED_DEMO_RECEIPT,issuer_id:"issuer:untrusted"};r=await resign(r);const out=await verifyReceipt(r,{registry:registry({issuer_id:"issuer:untrusted",recognized:false}),now:"2026-07-30T13:00:00Z"});assert.equal(out.checks.signature.state,"pass");assert.equal(out.checks.issuer.state,"unknown");assert.equal(out.overall,"Verification incomplete")});
test("unknown key",async()=>{const r={...TRUSTED_DEMO_RECEIPT,signing_key_id:"key:unknown-demo"};r.receipt_id=await deriveReceiptId(r);assert.equal((await verifyReceipt(r)).overall,"Verification incomplete")});
for(const status of ["revoked","compromised","expired"])test(`${status} key`,async()=>assert.equal((await verifyReceipt(TRUSTED_DEMO_RECEIPT,{registry:registry({status}),now:"2026-07-30T13:00:00Z"})).overall,"Verification failed"));
test("event outside key validity",async()=>{let r={...TRUSTED_DEMO_RECEIPT,event_time:"2025-12-31T23:59:59Z"};r=await resign(r);assert.equal((await verifyReceipt(r,{now:"2026-07-30T13:00:00Z"})).checks.key.state,"fail")});
test("malformed JSON",async()=>assert.equal((await verifyReceiptText("{")).overall,"Invalid input"));
test("unknown field",async()=>assert.equal((await verifyReceipt({...TRUSTED_DEMO_RECEIPT,extra:"x"})).overall,"Invalid input"));
test("prohibited field",async()=>assert.match((await verifyReceipt({...TRUSTED_DEMO_RECEIPT,access_token:"secret"})).checks.structure.detail,/Prohibited field/));
test("oversized input",async()=>assert.equal((await verifyReceiptText(" ".repeat(MAX_INPUT_BYTES+1))).overall,"Invalid input"));
test("unsupported schema",async()=>assert.equal((await verifyReceipt({...TRUSTED_DEMO_RECEIPT,schema_version:"dar-demo-2.0"})).overall,"Invalid input"));
test("unsupported algorithm",async()=>assert.equal((await verifyReceipt({...TRUSTED_DEMO_RECEIPT,signature_algorithm:"none"})).overall,"Invalid input"));
test("placeholder field presence never fully verifies",async()=>assert.notEqual((await verifyReceipt({receipt_id:TRUSTED_DEMO_RECEIPT.receipt_id,event_time:TRUSTED_DEMO_RECEIPT.event_time,signature:TRUSTED_DEMO_RECEIPT.signature})).overall,"Fully verified"));
