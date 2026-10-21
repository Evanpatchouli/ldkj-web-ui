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
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

function resolveAssetPath(urlPathname) {
  const pathname = decodeURIComponent(urlPathname.split("?")[0]);
  const normalizedPathname = pathname === "/" ? "/index.html" : pathname;
  const relativePath = normalizedPathname.replace(/^\/+/, "");
  const absolutePath = path.resolve(docsDistDir, relativePath);

  if (!absolutePath.startsWith(docsDistDir)) {
    return null;
  }

  return absolutePath;
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
      const ext = path.extname(absolutePath);

      response.writeHead(200, {
        "Content-Type":
          contentTypes[ext] ?? "application/octet-stream",
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
    baseUrl: `http://127.0.0.1:${address.port}/`,
    close: () =>
      new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        });
      }),
  };
}

const localServer = providedUrl ? null : await createStaticServer();
const baseUrl = providedUrl ?? localServer.baseUrl;

const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage();

  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".DocSearch-Button", { state: "visible" });
  await page.waitForFunction(() => {
    const text = document.body.textContent ?? "";
    return !text.includes("Loading Searchbox...");
  });

  const searchButton = page.locator(".DocSearch-Button");
  const buttonCount = await searchButton.count();

  if (buttonCount !== 1) {
    throw new Error(`Expected one search button, got ${buttonCount}.`);
  }

  await searchButton.click();
  const activeElement = await page.evaluate(() => {
    const element = document.activeElement;
    return {
      ariaLabel: element?.getAttribute?.("aria-label") ?? null,
      className: element?.className ?? null,
      tagName: element?.tagName ?? null,
    };
  });

  if (
    activeElement.ariaLabel !== "Search" ||
    !["BUTTON", "INPUT"].includes(String(activeElement.tagName))
  ) {
    throw new Error(
      `Unexpected active element after click: ${JSON.stringify(activeElement)}.`,
    );
  }

  console.log(`Search assertion passed for ${baseUrl}`);
} finally {
  await browser.close();
  await localServer?.close();
}
