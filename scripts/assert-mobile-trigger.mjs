import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdir, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { chromium } from "playwright";

const providedUrl = process.argv[2] ?? process.env.DOCS_URL;
const root = path.resolve("docs/.vitepress/dist");
const artifactDir = process.env.ARTIFACT_DIR ?? path.join(tmpdir(), "ldkj-web-ui-mobile-trigger");
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
const browser = await chromium.launch({ headless: true });

async function assertAlignment(wrapper, label) {
  const geometry = await wrapper.evaluate((element) => {
    const trigger = element.querySelector('button[aria-haspopup="dialog"]');
    const bounds = trigger.getBoundingClientRect();
    const container = element.parentElement.getBoundingClientRect();
    const icons = [...element.querySelectorAll("svg")].map((icon) => {
      const rect = icon.getBoundingClientRect();
      return {
        offset: Math.abs(rect.y + rect.height / 2 - bounds.y - bounds.height / 2),
        inside: rect.top >= bounds.top && rect.bottom <= bounds.bottom &&
          rect.left >= bounds.left && rect.right <= bounds.right,
      };
    });
    return { icons, fitsContainer: bounds.width <= container.width + 1 };
  });
  assert.ok(geometry.fitsContainer, `${label}: 长文本撑宽触发器，导致图标溢出容器`);
  for (const icon of geometry.icons) {
    assert.ok(icon.offset < 1, `${label}: 图标垂直偏移 ${icon.offset}px`);
    assert.ok(icon.inside, `${label}: 图标超出触发器边界`);
  }
}

try {
  await mkdir(artifactDir, { recursive: true });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const component of ["mobile-select", "mobile-cascader"]) {
      const label = `${component}-${width}`;
      await page.goto(`${baseUrl.replace(/\/$/, "")}/components/mobile/${component}.html`);
      const trigger = page.locator('button[aria-haspopup="dialog"]').first();
      const wrapper = trigger.locator("..");
      const clear = wrapper.getByRole("button", { name: "清除选择" });
      await clear.waitFor();
      assert.equal(await wrapper.locator("svg").count(), 2);
      assert.equal(await page.locator("mobileselectbasicdemo, mobilecascaderbasicdemo").count(), 0);
      await assertAlignment(wrapper, label);
      await wrapper.screenshot({ path: path.join(artifactDir, `${label}.png`) });

      // 自定义高度后仍居中，不依赖默认的 40px 高度。
      await trigger.evaluate((element) => { element.style.height = "64px"; });
      await assertAlignment(wrapper, `${label}-height-64`);
      await trigger.evaluate((element) => { element.style.removeProperty("height"); });

      await clear.click();
      assert.equal(await clear.count(), 0);
      assert.equal(await page.getByRole("dialog").count(), 0, "清除不应打开抽屉");
      assert.match(await trigger.innerText(), /请选择/);
      assert.equal(await wrapper.locator("svg").count(), 1);
      await assertAlignment(wrapper, `${label}-cleared`);

      await trigger.press("Enter");
      const dialog = page.getByRole("dialog");
      await dialog.waitFor();
      const choices = component === "mobile-select"
        ? ["标准洗车"]
        : ["新疆维吾尔自治区", "乌鲁木齐市", "天山区"];
      for (const name of choices) {
        await dialog.getByRole("button", { name, exact: true }).click();
      }
      await dialog.getByRole("button", { name: "确定", exact: true }).click();
      await dialog.waitFor({ state: "hidden" });
      await clear.waitFor();
      assert.ok((await trigger.innerText()).includes(choices.at(-1)));
      await assertAlignment(wrapper, `${label}-selected`);
      console.log(`${label}: 图标居中、清除和重新选择通过`);
    }
  }
  assert.deepEqual(errors, []);
  console.log(`截图目录: ${artifactDir}`);
} finally {
  await browser.close();
  if (server) await new Promise((resolve) => server.close(resolve));
}
