import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdir, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { chromium } from "playwright";

const providedUrl = process.argv[2] ?? process.env.DOCS_URL;
const root = path.resolve("docs/.vitepress/dist");
const artifactDir = process.env.ARTIFACT_DIR ?? path.join(tmpdir(), "ldkj-web-ui-mobile-stepper");
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
};
const server = providedUrl ? null : createServer(async (req, res) => {
  const file = path.resolve(root, `.${decodeURIComponent((req.url ?? "/").split("?")[0])}`);
  if (!file.startsWith(`${root}${path.sep}`)) {
    res.writeHead(403).end();
    return;
  }
  try {
    const body = await readFile(file);
    res.writeHead(200, {
      "Content-Type": contentTypes[path.extname(file)] ?? "application/octet-stream",
    }).end(body);
  } catch {
    res.writeHead(404).end();
  }
});
if (server) {
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
}
const baseUrl = providedUrl ?? `http://127.0.0.1:${server.address().port}`;
let browser;

async function assertGeometry(stepper, height, label) {
  const pills = await stepper.locator(".mobile-stepper-pill").evaluateAll((elements) =>
    elements.map((element) => {
      const rect = element.getBoundingClientRect();
      const icon = element.firstElementChild.getBoundingClientRect();
      return {
        x: rect.x, y: rect.y, width: rect.width, height: rect.height,
        active: element.getAttribute("aria-current") === "step",
        iconOffset: Math.abs(icon.y + icon.height / 2 - rect.y - rect.height / 2),
        borderStyle: getComputedStyle(element).borderStyle,
      };
    }),
  );
  assert.ok(pills.length >= 3, `${label}: 步骤未渲染`);
  for (const [index, pill] of pills.entries()) {
    assert.equal(pill.height, height, `${label}: 第 ${index + 1} 项高度不一致`);
    assert.ok(Math.abs(pill.y - pills[0].y) < 1, `${label}: 第 ${index + 1} 项未对齐`);
    assert.ok(pill.iconOffset < 1, `${label}: 数字未垂直居中`);
    assert.equal(pill.borderStyle, "solid", `${label}: 按钮和非交互项边框不一致`);
    if (!pill.active) assert.equal(pill.width, height, `${label}: 数字项不是正圆`);
    if (index > 0) {
      const previous = pills[index - 1];
      assert.ok(Math.abs(pill.x - previous.x - previous.width - 8) < 1, `${label}: 间距不一致`);
    }
  }
}

try {
  browser = await chromium.launch({ headless: true });
  await mkdir(artifactDir, { recursive: true });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${baseUrl.replace(/\/$/, "")}/components/mobile/mobile-stepper.html`);
    const basic = page.locator(".mobile-stepper").nth(0);
    await basic.locator(".mobile-stepper-pill").first().waitFor();
    assert.equal(await page.locator("mobilestepperbasicdemo, mobilesteppercontrolleddemo").count(), 0);
    await assertGeometry(basic, 32, `sm-${width}-middle`);
    await basic.getByRole("button", { name: "上一步" }).click();
    await assertGeometry(basic, 32, `sm-${width}-first`);
    assert.match(await basic.locator('[aria-current="step"]').innerText(), /商户信息/);
    await basic.screenshot({ path: path.join(artifactDir, `sm-${width}.png`) });
    for (let index = 0; index < 2; index++) {
      await basic.getByRole("button", { name: "下一步" }).click();
      await assertGeometry(basic, 32, `sm-${width}-next-${index}`);
    }
    assert.match(await basic.locator('[aria-current="step"]').innerText(), /确认提交/);

    const controlled = page.locator(".mobile-stepper").nth(1);
    for (let index = 0; index < 4; index++) {
      await controlled.locator(".mobile-stepper-pill").nth(index).click();
      await assertGeometry(controlled, 36, `md-${width}-step-${index}`);
      assert.equal(await controlled.locator('[aria-current="step"]').count(), 1);
    }
    await controlled.screenshot({ path: path.join(artifactDir, `md-${width}.png`) });
    console.log(`${width}px: sm/md 等高、对齐、圆形数字和步骤切换通过`);
  }
  assert.deepEqual(errors, []);
  console.log(`截图目录: ${artifactDir}`);
} finally {
  await browser?.close();
  if (server) await new Promise((resolve) => server.close(resolve));
}
