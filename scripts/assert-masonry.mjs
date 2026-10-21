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
        "Content-Type": contentTypes[path.extname(absolutePath)] ?? "application/octet-stream",
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

async function readGeometry(page) {
  return page.locator('[data-masonry-demo="basic"]').evaluate((root) => {
    const rootRect = root.getBoundingClientRect();
    const frames = [...root.querySelectorAll(":scope > .ldkj-masonry__frame")].map(
      (frame) => {
        const rect = frame.getBoundingClientRect();
        return {
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom,
        };
      },
    );

    return {
      columns: Number(root.getAttribute("data-masonry-columns")),
      rootTop: rootRect.top,
      rootBottom: rootRect.bottom,
      frames,
    };
  });
}

function assertGeometry(geometry) {
  for (let leftIndex = 0; leftIndex < geometry.frames.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < geometry.frames.length; rightIndex += 1) {
      const left = geometry.frames[leftIndex];
      const right = geometry.frames[rightIndex];
      const overlapWidth = Math.min(left.right, right.right) - Math.max(left.left, right.left);
      const overlapHeight = Math.min(left.bottom, right.bottom) - Math.max(left.top, right.top);

      if (overlapWidth > 0.5 && overlapHeight > 0.5) {
        throw new Error(`Masonry frames ${leftIndex} and ${rightIndex} overlap.`);
      }
    }
  }

  const maxBottom = Math.max(...geometry.frames.map((frame) => frame.bottom));
  if (Math.abs(maxBottom - geometry.rootBottom) > 1) {
    throw new Error(
      `Masonry root height mismatch: root=${geometry.rootBottom}, frames=${maxBottom}.`,
    );
  }
}

const localServer = providedUrl ? null : await createStaticServer();
const baseUrl = providedUrl ?? localServer.baseUrl;
const pageUrl = `${baseUrl.replace(/\/$/, "")}/components/layout/masonry.html`;
const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(pageUrl, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('[data-masonry-demo="basic"][data-masonry-positioned="true"]');
  await page.waitForSelector('[data-masonry-demo="regular"][data-masonry-positioned="true"]');
  await page.waitForSelector('[data-masonry-demo="balanced"][data-masonry-positioned="true"]');

  const initialGeometry = await readGeometry(page);
  if (initialGeometry.columns < 2) {
    throw new Error(`Expected a multi-column layout, got ${initialGeometry.columns}.`);
  }
  assertGeometry(initialGeometry);

  const variantHeights = await page.evaluate(() => {
    const regular = document.querySelector('[data-masonry-demo="regular"]');
    const balanced = document.querySelector('[data-masonry-demo="balanced"]');
    return {
      regular: regular?.getBoundingClientRect().height ?? 0,
      balanced: balanced?.getBoundingClientRect().height ?? 0,
    };
  });
  if (
    variantHeights.regular <= 0 ||
    variantHeights.balanced <= 0 ||
    variantHeights.balanced > variantHeights.regular + 0.5
  ) {
    throw new Error(
      `Unexpected variant heights: ${JSON.stringify(variantHeights)}.`,
    );
  }

  await page.setViewportSize({ width: 520, height: 900 });
  await page.waitForFunction(
    (previousColumns) =>
      Number(
        document
          .querySelector('[data-masonry-demo="basic"]')
          ?.getAttribute("data-masonry-columns"),
      ) < previousColumns,
    initialGeometry.columns,
  );
  const resizedGeometry = await readGeometry(page);
  assertGeometry(resizedGeometry);

  const disabledRoot = page.locator('[data-masonry-demo="disabled"]');
  const toggleButton = disabledRoot.locator("xpath=preceding-sibling::button[1]");
  await toggleButton.click();
  await disabledRoot.waitFor({ state: "visible" });
  await page.waitForFunction(() =>
    document
      .querySelector('[data-masonry-demo="disabled"]')
      ?.getAttribute("data-masonry-positioned") === "false",
  );
  await toggleButton.click();
  await page.waitForFunction(() =>
    document
      .querySelector('[data-masonry-demo="disabled"]')
      ?.getAttribute("data-masonry-positioned") === "true",
  );

  console.log(
    `Masonry assertion passed: ${initialGeometry.columns} -> ${resizedGeometry.columns} columns; balanced ${variantHeights.balanced.toFixed(1)}px <= regular ${variantHeights.regular.toFixed(1)}px.`,
  );
} finally {
  await browser.close();
  await localServer?.close();
}
