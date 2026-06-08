#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const distPackageJsonPath = path.join(distDir, 'package.json');
const releasesDir = path.join(rootDir, '.releases');

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    throw new Error(`读取 JSON 失败：${filePath}\n${error.message}`);
  }
}

function assertExists(targetPath, message) {
  if (!fs.existsSync(targetPath)) {
    throw new Error(message);
  }
}

function main() {
  assertExists(distDir, `dist 目录不存在：${distDir}`);
  assertExists(distPackageJsonPath, `dist/package.json 不存在：${distPackageJsonPath}`);

  const distPackageJson = readJson(distPackageJsonPath);
  const { version } = distPackageJson;

  if (!version || typeof version !== 'string') {
    throw new Error('dist/package.json 中缺少有效的 version 字段');
  }

  const releaseDir = path.join(releasesDir, `v${version}`);

  fs.mkdirSync(releasesDir, { recursive: true });

  if (fs.existsSync(releaseDir)) {
    fs.rmSync(releaseDir, {
      recursive: true,
      force: true,
    });

    console.log(`已删除旧发布目录：${path.relative(rootDir, releaseDir)}`);
  }

  fs.cpSync(distDir, releaseDir, {
    recursive: true,
    force: true,
  });

  console.log(`已复制 dist 到：${path.relative(rootDir, releaseDir)}`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}