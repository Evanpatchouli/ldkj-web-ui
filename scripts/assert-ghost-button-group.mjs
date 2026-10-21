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
    `${baseUrl.replace(/\/$/, "")}/components/interact/ghost-button-group.html`,
    { waitUntil: "domcontentloaded" },
  );

  const trigger = page.locator(
    'button[data-ghost-button-group-trigger="hover"]',
  );
  const item = page.getByRole("button", { name: "Favorite" });

  await trigger.hover();
  await item.waitFor({ state: "visible" });

  const triggerBox = await trigger.boundingBox();
  const itemBox = await item.boundingBox();
  if (!triggerBox || !itemBox) {
    throw new Error("Could not measure the hover trigger and menu item.");
  }

  await page.mouse.move(
    triggerBox.x + triggerBox.width / 2,
    triggerBox.y + triggerBox.height / 2,
  );
  await page.mouse.move(
    itemBox.x + itemBox.width / 2,
    itemBox.y + itemBox.height / 2,
    { steps: 24 },
  );

  await page.waitForTimeout(150);

  const itemIsInteractive = await item.evaluate((element) => {
    const style = window.getComputedStyle(element);
    return style.opacity !== "0" && style.pointerEvents !== "none";
  });
  if (!itemIsInteractive) {
    throw new Error("Hover menu closed while the pointer crossed the menu gap.");
  }

  const clickableItemBox = await item.boundingBox();
  if (!clickableItemBox) {
    throw new Error("Could not measure the clickable hover menu item.");
  }

  const itemCenter = {
    x: clickableItemBox.x + clickableItemBox.width / 2,
    y: clickableItemBox.y + clickableItemBox.height / 2,
  };

  await page.mouse.click(itemCenter.x, itemCenter.y);
  await item.waitFor({ state: "hidden" });

  console.log("GhostButtonGroup hover assertion passed: item remained clickable across the menu gap.");
} finally {
  await browser.close();
  await localServer?.close();
}
