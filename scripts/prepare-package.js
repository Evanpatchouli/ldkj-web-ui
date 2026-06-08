import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const rootPackageJsonPath = path.join(rootDir, "package.json");
const distDir = path.join(rootDir, "dist");
const distPackageJsonPath = path.join(distDir, "package.json");
const readmePath = path.join(rootDir, "README.dist.md");
const licensePath = path.join(rootDir, "LICENSE");
const srcResetPath = path.join(rootDir, "src", "reset.css");
const distResetPath = path.join(distDir, "reset.css");

if (!fs.existsSync(rootPackageJsonPath)) {
  throw new Error("Cannot find root package.json");
}

if (!fs.existsSync(distDir)) {
  throw new Error("Cannot find dist directory. Run the build first.");
}

const rootPackageJson = JSON.parse(
  fs.readFileSync(rootPackageJsonPath, "utf8"),
);

const distPackageJson = {
  name: rootPackageJson.name,
  version: rootPackageJson.version,
  private: false,
  author: rootPackageJson.author,
  description: rootPackageJson.description,
  keywords: rootPackageJson.keywords,
  type: rootPackageJson.type,
  main: "./index.cjs",
  module: "./index.js",
  types: "./index.d.ts",
  exports: {
    ".": {
      types: "./index.d.ts",
      import: "./index.js",
      require: "./index.cjs",
    },
    "./style.css": "./style.css",
    "./reset.css": "./reset.css",
  },
  peerDependencies: rootPackageJson.peerDependencies,
};

if (rootPackageJson.sideEffects) {
  distPackageJson.sideEffects = rootPackageJson.sideEffects;
}

if (rootPackageJson.repository) {
  distPackageJson.repository = rootPackageJson.repository;
}

if (rootPackageJson.homepage) {
  distPackageJson.homepage = rootPackageJson.homepage;
}

if (rootPackageJson.bugs) {
  distPackageJson.bugs = rootPackageJson.bugs;
}

if (rootPackageJson.license) {
  distPackageJson.license = rootPackageJson.license;
}

if (rootPackageJson.publishConfig) {
  distPackageJson.publishConfig = rootPackageJson.publishConfig;
}

fs.writeFileSync(
  distPackageJsonPath,
  `${JSON.stringify(distPackageJson, null, 2)}\n`,
);

if (fs.existsSync(readmePath)) {
  fs.copyFileSync(readmePath, path.join(distDir, "README.md"));
}

if (fs.existsSync(licensePath)) {
  fs.copyFileSync(licensePath, path.join(distDir, "LICENSE"));
}

console.log(`Created ${path.relative(rootDir, distPackageJsonPath)}`);

// 可选复制 .npmrc
if (fs.existsSync(path.join(rootDir, ".npmrc"))) {
  fs.copyFileSync(path.join(rootDir, ".npmrc"), path.join(distDir, ".npmrc"));
} else {
  console.warn("WARN: .npmrc not found, skipping");
}
// 可选复制 .npmignore
fs.copyFileSync(path.join(rootDir, ".npmignore"), path.join(distDir, ".npmignore"));

if (fs.existsSync(srcResetPath)) {
  fs.copyFileSync(srcResetPath, distResetPath);
}
