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
  await stepper.evaluate(async (element) => {
    await Promise.all(element.getAnimations({ subtree: true }).map((animation) =>
      animation.finished.catch(() => {}),
    ));
  });
  const pills = await stepper.locator(".mobile-stepper-pill").evaluateAll((elements) =>
    elements.map((element) => {
      const rect = element.getBoundingClientRect();
      const icon = element.querySelector(".mobile-stepper-pill-content").firstElementChild.getBoundingClientRect();
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

async function assertMotion(stepper, label) {
  await stepper.locator(".mobile-stepper-pill").first().click();
  await assertGeometry(stepper, 36, `${label}-start`);
  const motion = await stepper.evaluate(async (element) => {
    const marker = element.querySelector(".mobile-stepper-active-indicator");
    const pills = element.querySelectorAll(".mobile-stepper-pill");
    const frame = () => new Promise(requestAnimationFrame);
    const startX = new DOMMatrixReadOnly(getComputedStyle(marker).transform).m41;
    pills[3].click();
    await frame();
    await frame();
    const animation = marker.getAnimations()[0];
    if (!animation) return { animated: false };
    const duration = animation.effect.getTiming().duration;
    const frames = animation.effect.getKeyframes();
    const endX = new DOMMatrixReadOnly(frames.at(-1).transform).m41;
    for (const animation of element.getAnimations({ subtree: true })) {
      animation.pause();
      animation.currentTime = Number(duration) / 4;
    }
    const midStyle = getComputedStyle(marker);
    const midX = new DOMMatrixReadOnly(midStyle.transform).m41;
    const midWidth = parseFloat(midStyle.width);
    // 动画中途反向选择，起点应延续暂停画面，而不是原步骤或上一目标。
    pills[1].click();
    await frame();
    await frame();
    const next = marker.getAnimations()[0].effect.getKeyframes()[0];
    const retargetX = new DOMMatrixReadOnly(next.transform).m41;
    const retargetWidth = parseFloat(next.width);
    for (const animation of element.getAnimations({ subtree: true })) animation.finish();
    await frame();
    return { animated: true, duration, startX, endX, midX, midWidth, retargetX, retargetWidth };
  });
  assert.ok(motion.animated, `${label}: 高亮未产生滑动动画`);
  assert.equal(motion.duration, 300, `${label}: 整体动画应为 0.3 秒`);
  assert.ok(motion.midX > motion.startX + 1 && motion.midX < motion.endX - 1, `${label}: 高亮直接跳至终点`);
  assert.ok((motion.midX - motion.startX) / (motion.endX - motion.startX) < 0.2, `${label}: 起步过快，缺少短暂蓄力感`);
  assert.ok(Math.abs(motion.midX - motion.retargetX) < 1, `${label}: 连续切换位置跳变`);
  assert.ok(Math.abs(motion.midWidth - motion.retargetWidth) < 1, `${label}: 连续切换宽度跳变`);
  await assertGeometry(stepper, 36, `${label}-retarget`);
  const aligned = await stepper.evaluate((element) => {
    const marker = element.querySelector(".mobile-stepper-active-indicator").getBoundingClientRect();
    const active = element.querySelector('[aria-current="step"]').getBoundingClientRect();
    return Math.abs(marker.x - active.x) < 1 && Math.abs(marker.width - active.width) < 1;
  });
  assert.ok(aligned, `${label}: 动画结束后高亮未贴合激活项`);
}

async function assertLinearRetarget(stepper, label) {
  await stepper.getByRole("button", { name: "上一步" }).click();
  await stepper.getByRole("button", { name: "上一步" }).click();
  await assertGeometry(stepper, 32, `${label}-start`);
  const result = await stepper.evaluate(async (element) => {
    const frame = () => new Promise(requestAnimationFrame);
    const footer = element.querySelector(".mobile-stepper-footer");
    footer.querySelectorAll("button")[1].click();
    await frame();
    await frame();
    for (const animation of element.getAnimations({ subtree: true })) {
      animation.pause();
      animation.currentTime = 100;
    }
    const before = element.querySelectorAll(".mobile-stepper-pill")[1].getBoundingClientRect().width;
    footer.querySelectorAll("button")[0].click();
    await frame();
    await frame();
    const pill = element.querySelectorAll(".mobile-stepper-pill")[1];
    const animation = pill.getAnimations().find((animation) =>
      animation.effect.getKeyframes()[0].width !== undefined,
    );
    const after = parseFloat(animation?.effect.getKeyframes()[0].width);
    for (const animation of element.getAnimations({ subtree: true })) animation.finish();
    await frame();
    return { before, after, tag: pill.tagName };
  });
  assert.equal(result.tag, "SPAN", `${label}: 未覆盖线性流程的节点替换`);
  assert.ok(Math.abs(result.before - result.after) < 1, `${label}: 前进中回退导致宽度跳变`);
  await assertGeometry(stepper, 32, `${label}-end`);
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
    await assertLinearRetarget(basic, `linear-${width}`);

    const controlled = page.locator(".mobile-stepper").nth(1);
    for (let index = 0; index < 4; index++) {
      await controlled.locator(".mobile-stepper-pill").nth(index).click();
      await assertGeometry(controlled, 36, `md-${width}-step-${index}`);
      assert.equal(await controlled.locator('[aria-current="step"]').count(), 1);
    }
    await controlled.screenshot({ path: path.join(artifactDir, `md-${width}.png`) });
    await assertMotion(controlled, `motion-${width}`);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await controlled.locator(".mobile-stepper-pill").first().click();
    assert.equal(await controlled.evaluate((element) => element.getAnimations({ subtree: true }).length), 0);
    await assertGeometry(controlled, 36, `reduced-motion-${width}`);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    console.log(`${width}px: 等高对齐、滑动吸附、连续切换及减少动态效果通过`);
  }
  assert.deepEqual(errors, []);
  console.log(`截图目录: ${artifactDir}`);
} finally {
  await browser?.close();
  if (server) await new Promise((resolve) => server.close(resolve));
}
