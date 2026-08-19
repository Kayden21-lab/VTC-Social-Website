import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";

const outputDirectory = "pages-dist";
const repository = process.env.GITHUB_REPOSITORY ?? "Kayden21-lab/VTC-Social-Website";
const [owner, repositoryName] = repository.split("/");
const isRootPagesRepository = repositoryName?.toLowerCase() === `${owner}.github.io`.toLowerCase();
const basePath = isRootPagesRepository ? "" : `/${repositoryName}`;
const publicBaseUrl = `https://${owner}.github.io${basePath}`;

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp("dist/client", outputDirectory, { recursive: true });

// These source references are intentionally kept local and are not website assets.
await rm(join(outputDirectory, "images", "hero-style-reference.jpg"), { force: true });
await rm(join(outputDirectory, "images", "portrait-reference.jpg"), { force: true });

const { default: worker } = await import(`../dist/server/index.js?pages=${Date.now()}`);
const renderRoute = async (pathname, destination) => {
  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  if (!response.ok) throw new Error(`Static render failed for ${pathname} with status ${response.status}`);
  const outputPath = join(outputDirectory, destination);
  await mkdir(dirname(outputPath), { recursive: true });
  const html = await response.text();
  await writeFile(outputPath, html);
  return html;
};

const rebase = (content) => content
  .replaceAll("/_next/", `${basePath}/_next/`)
  .replaceAll("/images/", `${basePath}/images/`)
  .replaceAll('content="/og.png"', `content="${basePath}/og.png"`)
  .replaceAll("http://localhost:3000/og.png", `${publicBaseUrl}/og.png`);

const rewriteTextAssets = async (directory) => {
  const { readdir } = await import("node:fs/promises");
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await rewriteTextAssets(path);
    else if ([".css", ".js", ".json", ".html"].includes(extname(path))) {
      await writeFile(path, rebase(await readFile(path, "utf8")));
    }
  }
};

const homeHtml = await renderRoute("/", "index.html");
await renderRoute("/social-media-management", "social-media-management/index.html");
await writeFile(join(outputDirectory, "404.html"), homeHtml);
await writeFile(join(outputDirectory, ".nojekyll"), "");
await rewriteTextAssets(outputDirectory);

console.log(`GitHub Pages artifact created in ${outputDirectory} with base path "${basePath || "/"}".`);
