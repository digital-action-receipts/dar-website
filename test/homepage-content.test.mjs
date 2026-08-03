import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const text = html.replace(/\s+/g, " ");

test("homepage preserves required product strategy", () => {
  for (const phrase of [
    "independently reviewable",
    "Creators remain the low-risk usability laboratory",
    "Third-party work verification",
    "does not have to be installed in every system or agent",
    "Evidence upload",
    "Read-only connectors",
    "Local collector",
    "Native receipts",
    "No default surveillance",
    "keylogging",
    "continuous screen recording",
    "policy engine",
    "Customer-hosted",
    "independent verification service",
  ]) {
    assert.match(text, new RegExp(phrase, "i"), `missing strategy phrase: ${phrase}`);
  }
});

test("homepage maintains claims discipline", () => {
  assert.doesNotMatch(html, /Trust Score/i);
  assert.match(text, /does not determine truth, quality, legal compliance, ownership, or contractual acceptance/i);
  assert.match(text, /does not automatically prove/i);
  assert.match(text, /illustrative, not a current verification result/i);
  assert.match(text, /not currently certified production services/i);
});

test("homepage retains navigation, local tools, and accessibility affordances", () => {
  for (const href of [
    "#top",
    "#work",
    "#integration",
    "#trust",
    "#creators",
    "/boundaries.html",
    "/tools.html",
    "/playground.html",
    "mailto:hello@digitalactionreceipts.com?subject=Third-party%20verification%20pilot",
    "https://github.com/digital-action-receipts",
  ]) {
    assert.match(html, new RegExp(`href=["']${href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`));
  }
  assert.match(html, /class="skip-link"/);
  assert.match(html, /aria-label="Primary navigation"/);
  assert.match(html, /:focus-visible/);
  assert.match(html, /prefers-reduced-motion/);
});

