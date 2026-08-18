import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

const outputDirectory = "pages-dist";
const repository = process.env.GITHUB_REPOSITORY ?? "Kayden21-lab/VTC-Social-Website";
const [owner, repositoryName] = repository.split("/");
const isRootPagesRepository = repositoryName?.toLowerCase() === `${owner}.github.io`.toLowerCase();
const basePath = isRootPagesRepository ? "" : `/${repositoryName}`;

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp("dist/client", outputDirectory, { recursive: true });

// These source references are intentionally kept local and are not website assets.
await rm(join(outputDirectory, "images", "hero-style-reference.jpg"), { force: true });
await rm(join(outputDirectory, "images", "portrait-reference.jpg"), { force: true });

const { default: worker } = await import(`../dist/server/index.js?pages=${Date.now()}`);
const response = await worker.fetch(
  new Request("http://localhost/", { headers: { accept: "text/html" } }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) throw new Error(`Static render failed with status ${response.status}`);

const rebase = (content) => content
  .replaceAll("/_next/", `${basePath}/_next/`)
  .replaceAll("/images/", `${basePath}/images/`)
  .replaceAll('content="/og.png"', `content="${basePath}/og.png"`);

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

const html = await response.text();
await writeFile(join(outputDirectory, "index.html"), html);
await writeFile(join(outputDirectory, "404.html"), html);
await writeFile(join(outputDirectory, ".nojekyll"), "");
await rewriteTextAssets(outputDirectory);

console.log(`GitHub Pages artifact created in ${outputDirectory} with base path "${basePath || "/"}".`);
