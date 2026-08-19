import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the concise VTCSocial home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>VTCSocial \| Creative Technology<\/title>/i);
  assert.match(html, /Build sharper/);
  assert.match(html, /Advertisements/);
  assert.match(html, /Social Media Management/);
  assert.match(html, /Web &amp; Creative Technology/);
  assert.match(html, /instagram\.com\/k4\.yden\//i);
  assert.match(html, /wa\.me\/6589950821/i);
  assert.doesNotMatch(html, /Selected work|mailto:|<form|Yuna Pie XO|Hananorii|Altivon SG/i);
  assert.doesNotMatch(html, /\bLoras?\b|Guaranteed viral|Guaranteed subscribers/i);
});

test("renders social media clients on their own page", async () => {
  const response = await render("/social-media-management");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Social Media Management \| VTCSocial/i);
  assert.match(html, /Yuna Pie XO/);
  assert.match(html, /instagram\.com\/yunapiexo\//i);
  assert.match(html, /Hananorii/);
  assert.match(html, /instagram\.com\/hananorii\.real\//i);
  assert.match(html, /Altivon SG/);
  assert.match(html, /instagram\.com\/altivonsg\?utm_source=qr/i);
});

test("keeps the signature interaction and publishing route", async () => {
  const [page, socialPage, layout, css, exporter] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/social-media-management/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../scripts/build-pages.mjs", import.meta.url), "utf8"),
  ]);

  assert.match(page, /useGSAP/);
  assert.match(page, /moveHero/);
  assert.match(page, /hero-face-reveal/);
  assert.match(css, /cybernetic-shell-portrait\.png/);
  assert.match(css, /futuristic-portrait\.png/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(exporter, /social-media-management\/index\.html/);
  assert.doesNotMatch(`${page}${socialPage}${layout}`, /—|–/);
});
