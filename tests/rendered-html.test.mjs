import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the VTCSocial portfolio experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>VTCSocial — AI Creative Technologist<\/title>/i);
  assert.match(html, /Ideas built/);
  assert.match(html, /for the/);
  assert.match(html, /Digital experiences/);
  assert.match(html, /Message on WhatsApp/);
  assert.match(html, /Social Media Management/i);
  assert.match(html, /instagram\.com\/altivonsg\?utm_source=qr/i);
  assert.match(html, /instagram\.com\/yunapiexo\//i);
  assert.match(html, /instagram\.com\/hananorii\.real\//i);
  assert.match(html, /instagram\.com\/k4\.yden\//i);
  assert.match(html, /mailto:vtcsmm@gmail\.com/i);
  assert.match(html, /wa\.me\/6589950821/i);
  assert.doesNotMatch(html, /\bLoras?\b|Selected modules|Indicative starting total/i);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview|react-loading-skeleton/i);
});

test("keeps the premium interaction and layout requirements in source", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /useGSAP/);
  assert.match(page, /ScrollTrigger/);
  assert.match(css, /cybernetic-shell-portrait\.png/);
  assert.match(css, /futuristic-portrait\.png/);
  assert.match(page, /moveHero/);
  assert.match(page, /hero-face-reveal/);
  assert.match(page, /--reveal-x/);
  assert.match(css, /--obsidian:/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(page, /SECTION \d|QUESTION \d|Guaranteed viral|Guaranteed subscribers/i);
});
