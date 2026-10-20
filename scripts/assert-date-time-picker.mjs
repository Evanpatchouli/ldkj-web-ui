import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";
import { chromium } from "playwright";

const root = path.resolve("docs/.vitepress/dist");
const artifactDir = process.env.ARTIFACT_DIR ?? path.join(tmpdir(), "ldkj-web-ui-date-time-picker");
const contentTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
};
const server = createServer(async (req, res) => {
  const file = path.resolve(
    root,
    `.${decodeURIComponent((req.url ?? "/").split("?")[0])}`,
  );
  if (!file.startsWith(`${root}${path.sep}`)) {
    res.writeHead(403).end();
    return;
  }
  try {
    const body = await readFile(file);
    res
      .writeHead(200, {
        "Content-Type":
          contentTypes[path.extname(file)] ?? "application/octet-stream",
      })
      .end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
    timezoneId: "Asia/Shanghai",
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(
    `http://127.0.0.1:${server.address().port}/components/form/date-time-picker.html`,
  );
  const basic = page.locator("#publish-at");
  const edit = page.locator("#run-at");
  const dialog = page.getByRole("dialog", { name: "选择日期和时间" });
  const column = (name) => dialog.getByRole("listbox", { name, exact: true });
  const selected = (name) =>
    column(name).getByRole("option", { selected: true });
  await basic.waitFor();
  assert.equal(
    await page
      .locator(
        "datetimepickerbasicdemo, datetimepickerstatesdemo, datetimepickerformdemo",
      )
      .count(),
    0,
  );

  await edit.click();
  await dialog.waitFor();
  assert.equal(await selected("时").innerText(), "23");
  // 循环不进位；取消不改变受控值。
  await column("时").press("ArrowDown");
  assert.equal(await selected("时").innerText(), "00");
  assert.equal(await selected("分").innerText(), "59");
  await dialog.getByRole("button", { name: "取消", exact: true }).click();
  assert.equal(await edit.innerText(), "2026-10-20 23:59:58");
  await edit.click();
  assert.equal(await selected("时").innerText(), "23");

  // 日期改变保留时间；时间列的键盘首尾和五格跳转。
  const days = dialog.locator(
    '.ldkj-date-time-picker-calendar button[role="gridcell"], .ldkj-date-time-picker-calendar td:not(.rdp-outside) button',
  );
  await days.filter({ hasText: /^21$/ }).first().click();
  assert.equal(await selected("秒").innerText(), "58");
  await column("时").press("Home");
  await column("分").press("Home");
  await column("分").press("PageDown");
  await column("秒").press("End");
  await dialog.getByRole("button", { name: "确定", exact: true }).click();
  assert.equal(await edit.innerText(), "2026-10-21 00:05:59");
  await dialog.waitFor({ state: "hidden" });
  await page.waitForFunction(() => document.activeElement?.id === "run-at");

  // 实际 wheel 动画后的选项必须居中，防止 Tailwind transform 覆盖造成闪跳。
  await edit.click();
  await column("秒").hover();
  await page.mouse.wheel(0, 32);
  await page.waitForFunction(() => {
    const list = document.querySelector("#run-at-seconds");
    return (
      list?.querySelector('[aria-selected="true"]')?.textContent === "00" &&
      !list.hasAttribute("data-scrolling")
    );
  });
  const alignment = await column("秒").evaluate((list) => {
    const option = list
      .querySelector('[aria-selected="true"]')
      .getBoundingClientRect();
    const band = list
      .querySelector('[data-slot="date-time-picker-selection-band"]')
      .getBoundingClientRect();
    return Math.abs(option.y + option.height / 2 - band.y - band.height / 2);
  });
  assert.ok(alignment < 1, `选中行与高亮带偏移 ${alignment}px`);
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
  await page.waitForFunction(() => document.activeElement?.id === "run-at");
  assert.equal(await edit.innerText(), "2026-10-21 00:05:59");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await edit.click();
  await column("秒").hover();
  await page.mouse.wheel(0, 32);
  await page.waitForFunction(
    () =>
      document.querySelector('#run-at-seconds [aria-selected="true"]')
        ?.textContent === "00",
  );
  await dialog.getByRole("button", { name: "确定", exact: true }).click();
  assert.equal(await edit.innerText(), "2026-10-21 00:05:00");
  await edit
    .locator("..")
    .getByRole("button", { name: "清除日期和时间" })
    .click();
  assert.equal(await edit.innerText(), "选择日期和时间");
  assert.equal(
    await page.getByRole("button", { name: "已锁定的执行时间" }).isDisabled(),
    true,
  );
  assert.equal(
    await page
      .getByRole("button", { name: "已锁定的执行时间" })
      .locator("..")
      .getByRole("button")
      .count(),
    1,
  );

  // 快捷操作仍须确认；点击面板外部丢弃草稿。
  await basic.click();
  await dialog.getByRole("button", { name: "此刻", exact: true }).click();
  assert.equal(
    await page.getByTestId("date-time-basic-value").innerText(),
    "尚未设置发布时间",
  );
  await page.locator("h1").click();
  await dialog.waitFor({ state: "hidden" });
  await basic.click();
  assert.equal(await selected("时").innerText(), "00");
  await dialog.getByRole("button", { name: "今天零点", exact: true }).click();
  await dialog.getByRole("button", { name: "确定", exact: true }).click();
  assert.match(await basic.innerText(), /00:00:00$/);

  // Form 自动收集 Date、必填校验和重置。
  await page.getByRole("button", { name: "保存排期", exact: true }).click();
  await page.getByText("请选择活动开始时间", { exact: true }).waitFor();
  const formTrigger = page.getByRole("button", { name: "安排活动开始时间" });
  await formTrigger.click();
  await dialog.getByRole("button", { name: "确定", exact: true }).click();
  assert.equal(
    await page.getByTestId("date-time-form-value").innerText(),
    "等待提交",
  );
  await page.getByRole("button", { name: "保存排期", exact: true }).click();
  await page.waitForFunction(
    () =>
      document.querySelector('[data-testid="date-time-form-value"]')
        ?.textContent !== "等待提交",
  );
  await page.getByRole("button", { name: "重置", exact: true }).click();
  await formTrigger.waitFor();

  await mkdir(artifactDir, { recursive: true });
  await edit.click();
  await page.screenshot({ path: path.join(artifactDir, "desktop.png") });
  await page.emulateMedia({ colorScheme: "dark" });
  await page.evaluate(() => document.documentElement.classList.add("dark"));
  await page.screenshot({ path: path.join(artifactDir, "dark.png") });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({ path: path.join(artifactDir, "mobile.png") });
  const bounds = await dialog.boundingBox();
  assert.ok(bounds && bounds.x >= 0 && bounds.x + bounds.width <= 375);
  assert.deepEqual(errors, []);
  console.log(
    "DateTimePicker assertions passed: draft, calendar, keyboard, wheel alignment, reduced motion, clear, disabled, shortcuts, Form and responsive layout.",
  );
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
