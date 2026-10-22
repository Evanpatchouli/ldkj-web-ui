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

async function assertDrawerMotion(trigger, action, label) {
  const motion = await trigger.evaluate(async (element, action) => {
    const frame = () => new Promise(requestAnimationFrame);
    let panel = document.querySelector('[role="dialog"]');
    if (action === "open") {
      element.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    } else if (action === "escape") {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    } else if (action === "mask") {
      panel.previousElementSibling.click();
    } else {
      [...panel.querySelectorAll("button")]
        .find((button) => button.textContent.trim() === (action === "confirm" ? "确定" : "取消")).click();
    }
    let transition;
    for (let index = 0; index < 20; index++) {
      await frame();
      panel = document.querySelector('[role="dialog"]');
      transition = panel?.getAnimations().find((animation) => animation.transitionProperty === "transform");
      if (transition) break;
    }
    if (!transition) return { animated: false };
    const animations = panel.parentElement.getAnimations({ subtree: true });
    for (const animation of animations) animation.pause();
    const duration = Number(transition.effect.getTiming().duration);
    const sample = (time) => {
      for (const animation of animations) animation.currentTime = time;
      const style = getComputedStyle(panel);
      const transform = new DOMMatrixReadOnly(style.transform);
      return {
        x: transform.m41, y: transform.m42, opacity: Number(style.opacity),
        overlayOpacity: Number(getComputedStyle(panel.previousElementSibling).opacity),
      };
    };
    const start = sample(0);
    const mid = sample(duration / 2);
    const end = sample(duration);
    sample(duration / 2);
    return { animated: true, duration, start, mid, end, height: panel.getBoundingClientRect().height };
  }, action);
  assert.ok(motion.animated, `${label}-${action}: 未执行抽屉位移动画`);
  assert.equal(motion.duration, 220);
  const closing = action !== "open";
  assert.ok(Math.abs(motion.start.y - (closing ? 0 : motion.height)) < 1, `${label}-${action}: 滑动起点错误`);
  assert.ok(Math.abs(motion.end.y - (closing ? motion.height : 0)) < 1, `${label}-${action}: 滑动终点错误`);
  assert.ok(motion.mid.y > 1 && motion.mid.y < motion.height - 1, `${label}-${action}: 面板直接跳到终点`);
  for (const sample of [motion.start, motion.mid, motion.end]) {
    assert.equal(sample.x, 0, `${label}-${action}: 面板不应横向移动`);
    assert.equal(sample.opacity, 1, `${label}-${action}: 面板不应渐隐`);
  }
  assert.ok(motion.mid.overlayOpacity > 0 && motion.mid.overlayOpacity < 1, `${label}-${action}: 遮罩缺少渐变`);
}

async function finishDrawerMotion(dialog) {
  await dialog.evaluate(async (element) => {
    for (const animation of element.parentElement.getAnimations({ subtree: true })) animation.finish();
    await new Promise(requestAnimationFrame);
  });
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

      const dialog = page.getByRole("dialog");
      const choices = component === "mobile-select"
        ? ["标准洗车"]
        : ["新疆维吾尔自治区", "乌鲁木齐市", "天山区"];
      for (const action of ["cancel", "escape", "mask"]) {
        await assertDrawerMotion(trigger, "open", label);
        await finishDrawerMotion(dialog);
        assert.equal(await page.evaluate(() => document.body.style.overflow), "hidden");
        for (const name of choices) {
          await dialog.getByRole("button", { name, exact: true }).click();
        }
        assert.match(await trigger.innerText(), /请选择/, "临时选择不应提前提交");
        await assertDrawerMotion(trigger, action, label);
        await page.locator('[role="dialog"]').waitFor({ state: "detached" });
        assert.match(await trigger.innerText(), /请选择/, "取消不应提交临时选择");
        assert.notEqual(await page.evaluate(() => document.body.style.overflow), "hidden");
      }

      await assertDrawerMotion(trigger, "open", label);
      await page.screenshot({ path: path.join(artifactDir, `${label}-opening.png`) });
      await finishDrawerMotion(dialog);
      assert.equal(await dialog.getByRole("button", { name: "Close drawer" }).count(), 0, "应保留移动端确认栏，避免重复标题");
      assert.equal(await dialog.evaluate((element) => getComputedStyle(element.firstElementChild).padding), "0px");
      const bounds = await dialog.boundingBox();
      assert.ok(bounds && bounds.x >= 0 && bounds.width <= width && Math.abs(bounds.y + bounds.height - 900) < 1, "面板应贴合视口底部");
      await page.screenshot({ path: path.join(artifactDir, `${label}-open.png`) });
      for (const name of choices) {
        await dialog.getByRole("button", { name, exact: true }).click();
      }
      await assertDrawerMotion(trigger, "confirm", label);
      await page.locator('[role="dialog"]').waitFor({ state: "detached" });
      await clear.waitFor();
      assert.ok((await trigger.innerText()).includes(choices.at(-1)));
      await assertAlignment(wrapper, `${label}-selected`);

      // 模拟横屏或软键盘压缩后的视口，确保复用 Drawer 后仍由列表内部滚动。
      await page.setViewportSize({ width, height: 240 });
      await assertDrawerMotion(trigger, "open", `${label}-short`);
      await finishDrawerMotion(dialog);
      const scroll = await dialog.evaluate((element) => {
        const list = element.querySelector(".overflow-y-auto");
        const header = element.firstElementChild.firstElementChild;
        const before = header.getBoundingClientRect().y;
        list.scrollTop = list.scrollHeight;
        return {
          height: element.getBoundingClientRect().height,
          scrollable: list.scrollHeight > list.clientHeight && list.scrollTop > 0,
          headerMoved: Math.abs(header.getBoundingClientRect().y - before),
        };
      });
      assert.ok(scroll.height <= 240 * 0.76 + 1, "抽屉超出最大高度");
      assert.ok(scroll.scrollable, "受限高度下列表不能滚动");
      assert.equal(scroll.headerMoved, 0, "列表滚动带走了标题和操作栏");
      await page.screenshot({ path: path.join(artifactDir, `${label}-short-viewport.png`) });
      await assertDrawerMotion(trigger, "cancel", `${label}-short`);
      await page.locator('[role="dialog"]').waitFor({ state: "detached" });
      await page.setViewportSize({ width, height: 900 });
      console.log(`${label}: 图标、底部滑出/收回、取消/ESC/遮罩丢弃草稿、确认提交及受限高度滚动通过`);
    }
  }
  assert.deepEqual(errors, []);
  console.log(`截图目录: ${artifactDir}`);
} finally {
  await browser.close();
  if (server) await new Promise((resolve) => server.close(resolve));
}
