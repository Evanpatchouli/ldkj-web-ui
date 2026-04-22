import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.resolve(process.cwd(), 'package.json');

async function updateVersion() {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const currentVersion = packageJson.version || '0.0.0';

  console.log(`\n当前版本: ${currentVersion}`);

  const [major, minor, patch] = currentVersion.split('.').map(Number);
  const suggestions = {
    patch: `${major}.${minor}.${patch + 1}`,
    minor: `${major}.${minor + 1}.0`,
    major: `${major + 1}.0.0`
  };

  const { versionType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'versionType',
      message: '选择版本更新类型:',
      choices: [
        { name: `Patch (bug修复) ${suggestions.patch}`, value: 'patch' },
        { name: `Minor (新功能)  ${suggestions.minor}`, value: 'minor' },
        { name: `Major (大版本)  ${suggestions.major}`, value: 'major' },
        { name: '自定义版本号', value: 'custom' }
      ]
    }
  ]);

  let newVersion;

  if (versionType === 'custom') {
    const { customVersion } = await inquirer.prompt([
      {
        type: 'input',
        name: 'customVersion',
        message: '输入新版本号 (格式: x.x.x):',
        validate: (input) => {
          if (!input) return '版本号不能为空';
          if (!/^\d+\.\d+\.\d+/.test(input)) {
            return '版本号格式错误，应为 x.x.x (如: 1.2.3)';
          }
          return true;
        }
      }
    ]);
    newVersion = customVersion;
  } else {
    newVersion = suggestions[versionType];
  }

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `确认更新版本号 ${currentVersion} -> ${newVersion}?`,
      default: true
    }
  ]);

  if (!confirm) {
    console.log('\n已取消更新');
    return;
  }

  packageJson.version = newVersion;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

  console.log(`\n✅ 版本号已更新: ${currentVersion} -> ${newVersion}`);
  console.log(`📁 文件: ${packageJsonPath}`);
}

updateVersion().catch(err => {
  console.error('❌ 更新失败:', err.message);
  process.exit(1);
});