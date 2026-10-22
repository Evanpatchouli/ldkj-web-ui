import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdir, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { chromium } from "playwright";

const providedUrl = process.argv[2] ?? process.env.DOCS_URL;
const root = path.resolve("docs/.vitepress/dist");
const artifactDir = process.env.ARTIFACT_DIR ?? path.join(tmpdir(), "ldkj-web-ui-drawer");
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

async function sampleMotion(page, title, trigger, closing = false) {
  return page.evaluate(async ({ title, trigger, closing }) => {
    const findPanel = () => [...document.querySelectorAll('[role="dialog"]')]
      .find((element) => element.getAttribute("aria-label") === title);
    const frame = () => new Promise(requestAnimationFrame);
    if (closing) {
      findPanel().querySelector('[aria-label="Close drawer"]').click();
    } else {
      [...document.querySelectorAll("button")]
        .find((element) => element.textContent.trim() === trigger).click();
    }
    let panel;
    let transition;
    for (let index = 0; index < 20; index++) {
      await frame();
      panel = findPanel();
      transition = panel?.getAnimations().find((animation) => animation.transitionProperty === "transform");
      if (transition) break;
    }
    if (!transition) {
      return { animated: false, transform: panel && getComputedStyle(panel).transform };
    }
    const animations = panel.parentElement.getAnimations({ subtree: true });
    for (const animation of animations) animation.pause();
    const duration = Number(transition.effect.getTiming().duration);
    const sample = (time) => {
      for (const animation of animations) animation.currentTime = time;
      const style = getComputedStyle(panel);
      const matrix = new DOMMatrixReadOnly(style.transform);
      const rect = panel.getBoundingClientRect();
      return {
        x: matrix.m41, y: matrix.m42,
        width: rect.width, height: rect.height,
        opacity: Number(style.opacity),
        overlayOpacity: Number(getComputedStyle(panel.previousElementSibling).opacity),
        connected: panel.isConnected,
      };
    };
    const start = sample(0);
    const mid = sample(duration / 2);
    const end = sample(duration);
    sample(duration / 2);
    return { animated: true, duration, start, mid, end };
  }, { title, trigger, closing });
}

function assertSlide(motion, placement, closing, duration = 220) {
  const label = `${placement}-${closing ? "close" : "open"}`;
  assert.ok(motion.animated, `${label}: 面板没有位移动画 (${motion.transform})`);
  assert.equal(motion.duration, duration, `${label}: 动画时长不匹配`);
  const horizontal = placement === "left" || placement === "right";
  const axis = horizontal ? "x" : "y";
  const otherAxis = horizontal ? "y" : "x";
  const size = motion.start[horizontal ? "width" : "height"];
  const sign = placement === "left" || placement === "top" ? -1 : 1;
  assert.ok(Math.abs(motion.start[axis] - (closing ? 0 : sign * size)) < 1, `${label}: 起点不在预期位置`);
  assert.ok(Math.abs(motion.end[axis] - (closing ? sign * size : 0)) < 1, `${label}: 终点不在预期位置`);
  assert.ok(Math.abs(motion.mid[axis]) > 1 && Math.abs(motion.mid[axis]) < size - 1, `${label}: 中途直接跳到终点`);
  for (const sample of [motion.start, motion.mid, motion.end]) {
    assert.equal(sample.opacity, 1, `${label}: 面板不应渐隐`);
    assert.equal(sample[otherAxis], 0, `${label}: 非滑动轴发生位移`);
    assert.ok(sample.connected, `${label}: 收回完成前卸载了面板`);
  }
  assert.ok(motion.mid.overlayOpacity > 0 && motion.mid.overlayOpacity < 1, `${label}: 遮罩缺少渐变`);
}

async function finishMotion(page, title) {
  await page.evaluate(async (title) => {
    const panel = [...document.querySelectorAll('[role="dialog"]')]
      .find((element) => element.getAttribute("aria-label") === title);
    for (const animation of panel.parentElement.getAnimations({ subtree: true })) animation.finish();
    await new Promise(requestAnimationFrame);
  }, title);
}

async function assertReopen(page) {
  assertSlide(await sampleMotion(page, "从 right 打开", "right"), "right", false);
  const motion = await page.evaluate(async () => {
    const panel = document.querySelector('[role="dialog"][aria-label="从 right 打开"]');
    const frame = () => new Promise(requestAnimationFrame);
    const waitForTransition = async (previous) => {
      for (let index = 0; index < 20; index++) {
        await frame();
        const transition = panel.getAnimations().find((animation) =>
          animation.transitionProperty === "transform" && animation !== previous,
        );
        if (transition) return transition;
      }
    };
    const opening = panel.getAnimations().find((animation) => animation.transitionProperty === "transform");
    panel.querySelector('[aria-label="Close drawer"]').click();
    const closing = await waitForTransition(opening);
    if (!closing) return { animated: false };
    closing.pause();
    closing.currentTime = Number(closing.effect.getTiming().duration) / 2;
    const before = new DOMMatrixReadOnly(getComputedStyle(panel).transform).m41;
    [...document.querySelectorAll("button")].find((element) => element.textContent.trim() === "right").click();
    const reopened = await waitForTransition(closing);
    if (!reopened) return { animated: false };
    reopened.pause();
    reopened.currentTime = 0;
    const start = new DOMMatrixReadOnly(getComputedStyle(panel).transform).m41;
    for (const animation of panel.parentElement.getAnimations({ subtree: true })) animation.finish();
    return { animated: true, before, start };
  });
  assert.ok(motion.animated, "关闭中重新打开没有位移动画");
  assert.ok(Math.abs(motion.before - motion.start) < 1, "重新打开时位移跳变");
  // 越过旧关闭计时器，确认重新打开取消了延迟卸载。
  await page.waitForTimeout(300);
  await page.getByRole("dialog", { name: "从 right 打开", exact: true }).waitFor();
  await page.keyboard.press("Escape");
  await page.locator('[role="dialog"][aria-label="从 right 打开"]').waitFor({ state: "detached" });
}

try {
  browser = await chromium.launch({ headless: true });
  await mkdir(artifactDir, { recursive: true });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    const docsPath = providedUrl ? "/components/interact/drawer" : "/components/interact/drawer.html";
    await page.goto(`${baseUrl.replace(/\/$/, "")}${docsPath}`);
    await page.getByRole("button", { name: "right", exact: true }).waitFor();
    assert.equal(await page.locator("drawerdemo, drawerplacementdemo, drawerbehaviordemo").count(), 0);

    for (const placement of ["left", "right", "top", "bottom"]) {
      const title = `从 ${placement} 打开`;
      const opening = await sampleMotion(page, title, placement);
      assertSlide(opening, placement, false);
      if (placement === "right") {
        await page.screenshot({ path: path.join(artifactDir, `opening-${width}.png`) });
      }
      await finishMotion(page, title);
      assert.equal(await page.evaluate(() => document.body.style.overflow), "hidden");
      if (placement === "right") {
        await page.screenshot({ path: path.join(artifactDir, `open-${width}.png`) });
      }
      assertSlide(await sampleMotion(page, title, placement, true), placement, true);
      await page.locator(`[role="dialog"][aria-label="${title}"]`).waitFor({ state: "detached" });
      assert.notEqual(await page.evaluate(() => document.body.style.overflow), "hidden");
    }

    assertSlide(await sampleMotion(page, "默认动画", "丝滑滑入"), "right", false, 260);
    await finishMotion(page, "默认动画");
    assertSlide(await sampleMotion(page, "默认动画", "丝滑滑入", true), "right", true, 260);
    await page.locator('[role="dialog"][aria-label="默认动画"]').waitFor({ state: "detached" });

    await page.getByRole("button", { name: "关闭动画", exact: true }).click();
    const instant = page.getByRole("dialog", { name: "无动画模式", exact: true });
    await instant.waitFor();
    assert.equal(await instant.evaluate((element) => element.getAnimations().length), 0);
    assert.equal(await instant.evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m41), 0);
    await page.keyboard.press("Escape");
    await instant.waitFor({ state: "detached" });
    await assertReopen(page);
    console.log(`${width}px: 四个方向滑出/收回、面板不透明、遮罩渐变、自定义时长、无动画、滚动锁及中途重新打开通过`);
  }
  assert.deepEqual(errors, []);
  console.log(`截图目录: ${artifactDir}`);
} finally {
  await browser?.close();
  if (server) await new Promise((resolve) => server.close(resolve));
}
