import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { build } from "vite";
import react from "@vitejs/plugin-react";

const rootDir = process.cwd();
const packageJsonPath = path.join(rootDir, "package.json");
const distDir = path.join(rootDir, "dist");

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function collectFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(absolutePath)));
    } else {
      files.push(absolutePath);
    }
  }

  return files;
}

function getExportTargets(exportValue) {
  if (typeof exportValue === "string") return [exportValue];
  return Object.values(exportValue);
}

const rootPackageJson = await readJson(packageJsonPath);
const requiredSubpaths = ["./button", "./ghost-button", "./select", "./theme", "./icon"];

for (const subpath of requiredSubpaths) {
  if (!rootPackageJson.exports?.[subpath]) {
    throw new Error(`Missing package export: ${subpath}`);
  }
}

for (const [subpath, exportValue] of Object.entries(rootPackageJson.exports)) {
  for (const target of getExportTargets(exportValue)) {
    if (!target.startsWith("./dist/")) continue;

    const targetPath = path.resolve(rootDir, target);
    if (!(await fs.stat(targetPath).catch(() => null))) {
      throw new Error(`Package export target does not exist for ${subpath}: ${target}`);
    }
  }
}

const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "ldkj-web-ui-consumer-"));
const consumerNodeModules = path.join(tempDir, "node_modules", "@ldkj");
const packageLink = path.join(consumerNodeModules, "web-ui");

async function buildConsumer(importPath, name) {
  const entryPath = path.join(tempDir, `${name}.ts`);
  const outputDir = path.join(tempDir, `output-${name}`);

  await fs.writeFile(
    entryPath,
    `import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "${importPath}";

const root = document.createElement("div");
document.body.appendChild(root);
createRoot(root).render(createElement(Button, null, "Save"));
`,
    "utf8",
  );

  await build({
    root: tempDir,
    configFile: false,
    logLevel: "silent",
    plugins: [react()],
    build: {
      outDir: outputDir,
      emptyOutDir: true,
      rollupOptions: {
        input: entryPath,
        output: {
          entryFileNames: "consumer.js",
          chunkFileNames: "chunks/[name].js",
        },
      },
    },
  });

  const outputFiles = await collectFiles(outputDir);
  const javascriptFiles = outputFiles.filter((filePath) => filePath.endsWith(".js"));
  const javascriptText = await Promise.all(
    javascriptFiles.map((filePath) => fs.readFile(filePath, "utf8")),
  );
  const iconFiles = outputFiles.filter((filePath) =>
    path.relative(outputDir, filePath).split(path.sep).includes("icons"),
  );

  return {
    name,
    iconFiles,
    hasIconRegistry: javascriptText.some((text) => text.includes("materialSymbolLoaders")),
    bundleBytes: javascriptText.reduce(
      (total, text) => total + Buffer.byteLength(text),
      0,
    ),
  };
}

try {
  await fs.mkdir(consumerNodeModules, { recursive: true });
  await fs.symlink(rootDir, packageLink, "junction");
  const results = [];
  for (const [importPath, name] of [
    ["@ldkj/web-ui/button", "button-subpath"],
    ["@ldkj/web-ui", "root-entry"],
  ]) {
    results.push(await buildConsumer(importPath, name));
  }

  const invalidResult = results.find(
    (result) => result.iconFiles.length > 0 || result.hasIconRegistry,
  );
  if (invalidResult) {
    throw new Error(
      `${invalidResult.name} unexpectedly includes icon modules: ${invalidResult.iconFiles.length} files.`,
    );
  }

  console.log(
    `Package export assertion passed: ${requiredSubpaths.join(", ")} resolve; ` +
      results.map((result) => `${result.name} ${result.bundleBytes} bytes`).join(", ") +
      "; no icon modules included.",
  );
} finally {
  await fs.rm(tempDir, { recursive: true, force: true });
}
