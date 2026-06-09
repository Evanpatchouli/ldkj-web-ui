import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

// ====== 参数解析 ======

const version = process.argv[2];
if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
  console.error('用法: node scripts/release-version.js <x.y.z>');
  process.exit(1);
}

const today = new Date().toISOString().split('T')[0];

// ====== 辅助函数 ======

// 读取文件，统一换行符为 LF
function readNormalized(filePath) {
  return fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
}

// 写入文件。如果原文件使用 CRLF，输出也使用 CRLF
function writeRestoringEol(filePath, content) {
  let original = '';
  try {
    original = fs.readFileSync(filePath, 'utf8');
  } catch (_) { /* 新文件 */ }
  const useCRLF = original.includes('\r\n');
  const output = useCRLF ? content.replace(/\n/g, '\r\n') : content;
  fs.writeFileSync(filePath, output, { encoding: 'utf8' });
}

// 移除 next.md 中的模板行（与 next.example.md 完全相同的行）
function stripTemplateLines(content) {
  const templateLines = [
    '- 记录新增组件、能力、API、文档栏目等。',
    '- 示例: 新增 `ComponentName` 组件，支持 `propName` 配置。',
    '- 记录已有能力的体验优化、内部重构、API 增强等。',
    '- 示例: `ComponentName` 底层复用 `Box`，保持原 API 并继承通用容器能力。',
    '- 记录 bug 修复、行为纠正、边界情况补齐等。',
    '- 示例: 修复 `ComponentName` 在 `condition` 场景下的渲染异常。',
    '- 记录文档页、示例、侧边栏、开发日志等说明性变更。',
    '- 示例: 补充 `ComponentName` API 表格与基础示例。',
  ];
  return content
    .split('\n')
    .filter((line) => !templateLines.includes(line))
    .join('\n');
}

// ====== 步骤 1: 更新 package.json ======

const pkgPath = path.join(root, 'package.json');
const pkg = JSON.parse(readNormalized(pkgPath));
const oldVersion = pkg.version;
pkg.version = version;
writeRestoringEol(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`[1/6] package.json: ${oldVersion} -> ${version}`);

// ====== 步骤 2: 读取 next.md 内容 ======

const nextPath = path.join(root, 'docs', 'devlog', 'next.md');
const nextContent = readNormalized(nextPath);

// ====== 步骤 3: 创建版本日志 ======

const versionLogPath = path.join(root, 'docs', 'devlog', `v${version}.md`);
if (fs.existsSync(versionLogPath)) {
  console.error(`❌ 版本文件已存在: docs/devlog/v${version}.md`);
  process.exit(1);
}

const nextBody = nextContent.replace(
  /^# Next\n\n- 状态: 未发行\n- 记录范围: 下一版本发布前的所有未发行变更\n\n/m,
  ''
);

const cleaned = stripTemplateLines(nextBody);
const versionContent =
  `# v${version}\n\n- 发布日期: ${today}\n- 版本: \`${version}\`\n${cleaned}`;

writeRestoringEol(versionLogPath, versionContent);
console.log(`[2/6] 创建版本日志: docs/devlog/v${version}.md`);

// ====== 步骤 4: 更新 DevlogIndexList.ts ======

const indexPath = path.join(
  root,
  'docs', '.vitepress', 'theme', 'components', 'DevlogIndexList.ts'
);
const indexContent = readNormalized(indexPath);

const newEntry = `  { text: "v${version}（${today}）", link: "/devlog/v${version}" },`;
const updatedIndex = indexContent.replace(
  /(const versionLinks = \[\n)/,
  `$1${newEntry}\n`
);
writeRestoringEol(indexPath, updatedIndex);
console.log(`[3/6] DevlogIndexList: 新增 v${version}`);

// ====== 步骤 5: 更新侧边栏 config.ts ======

const configPath = path.join(root, 'docs', '.vitepress', 'config.ts');
const configContent = readNormalized(configPath);

// 匹配 "只陈列最近的 5 个版本" 后的所有版本条目行
const sidebarRe =
  /( {10}\/\/ 只陈列最近的 5 个版本\n)((?: {10}\{ text: "v[\d.]+", link: "\/devlog\/v[\d.]+" \},\n)+)/;
const sidebarMatch = configContent.match(sidebarRe);

if (!sidebarMatch) {
  console.error('❌ 未找到侧边栏版本日志条目，请手动更新 config.ts');
  process.exit(1);
}

const existingLines = sidebarMatch[2]
  .split('\n')
  .filter((l) => l.trim());

const newVersions = [
  `          { text: "v${version}", link: "/devlog/v${version}" },`,
  ...existingLines,
].slice(0, 5);

const newBlock = sidebarMatch[1] + newVersions.join('\n') + '\n';

const updatedConfig = configContent.replace(sidebarMatch[0], newBlock);
writeRestoringEol(configPath, updatedConfig);
console.log(`[4/6] 侧边栏: 新增 v${version}，保留最近 5 个版本`);

// ====== 步骤 6: 重置 next.md ======

const templatePath = path.join(root, 'docs', 'devlog', 'next.example.md');
const templateContent = readNormalized(templatePath);
writeRestoringEol(nextPath, templateContent);
console.log(`[5/6] 重置 next.md 为模板`);

// ====== 验证 ======

console.log(`[6/6] 验证文件...`);
const allOk = [
  fs.existsSync(versionLogPath),
  fs.existsSync(indexPath),
  fs.existsSync(configPath),
  fs.existsSync(nextPath),
].every(Boolean);

if (allOk) {
  console.log(`\n🎉 版本 ${version} 发布准备完成！请检查以下文件后提交:`);
  console.log(`   - package.json`);
  console.log(`   - docs/devlog/v${version}.md`);
  console.log(`   - docs/devlog/next.md`);
  console.log(`   - docs/.vitepress/config.ts`);
  console.log(`   - docs/.vitepress/theme/components/DevlogIndexList.ts`);
} else {
  console.error('❌ 部分文件写入失败，请检查');
  process.exit(1);
}
