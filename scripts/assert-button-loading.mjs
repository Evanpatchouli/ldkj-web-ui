import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const providedUrl = process.argv[2] ?? process.env.DOCS_URL;
const docsDistDir = path.resolve("docs/.vitepress/dist");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

function resolveAssetPath(urlPathname) {
  const pathname = decodeURIComponent(urlPathname.split("?")[0]);
  const normalizedPathname = pathname === "/" ? "/index.html" : pathname;
  const relativePath = normalizedPathname.replace(/^\/+/, "");
  const absolutePath = path.resolve(docsDistDir, relativePath);

  return absolutePath.startsWith(docsDistDir) ? absolutePath : null;
}

async function createStaticServer() {
  const server = createServer(async (request, response) => {
    try {
      const absolutePath = resolveAssetPath(request.url ?? "/");
      if (!absolutePath) {
        response.writeHead(403);
        response.end("Forbidden");
        return;
      }

      const fileBuffer = await readFile(absolutePath);
      response.writeHead(200, {
        "Content-Type":
          contentTypes[path.extname(absolutePath)] ?? "application/octet-stream",
      });
      response.end(fileBuffer);
    } catch {
      response.writeHead(404);
      response.end("Not Found");
    }
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Failed to determine local docs server address.");
  }

  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () =>
      new Promise((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      }),
  };
}

const localServer = providedUrl ? null : await createStaticServer();
const baseUrl = providedUrl ?? localServer.baseUrl;
const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(
    `${baseUrl.replace(/\/$/, "")}/components/interact/button.html`,
    { waitUntil: "domcontentloaded" },
  );

  const button = page.locator('button[data-button-loading-fixed="true"]');
  await button.waitFor({ state: "visible" });

  if (!(await button.isDisabled())) {
    throw new Error("A loading Button must be disabled.");
  }
  if ((await button.getAttribute("aria-busy")) !== "true") {
    throw new Error('A loading Button must expose aria-busy="true".');
  }
  if (await button.getAttribute("loading")) {
    throw new Error("The loading prop must not be forwarded to the DOM.");
  }
  if (!(await button.innerText()).includes("正在生成任务包")) {
    throw new Error("loadingText should replace the button content.");
  }
  if ((await button.locator('[aria-hidden="true"]').count()) === 0) {
    throw new Error("The default loading icon should be decorative.");
  }

  console.log("Button loading assertion passed: disabled, aria-busy, content, and prop consumption are correct.");
} finally {
  await browser.close();
  await localServer?.close();
}
