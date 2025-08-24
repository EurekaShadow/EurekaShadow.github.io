const fs = require('fs');
const path = require('path');
const glob = require('glob');
const simpleGit = require('simple-git');

// 目标字段定义：仅保留时间相关字段
const TARGET_FIELDS = {
  // 获取首次提交时间（创建时间）
  date: async (filePath) => {
    try {
      const git = simpleGit();
      const logs = await git.log({ file: filePath, '--diff-filter': 'A' });
      return logs.all[0]?.date ? formatDate(new Date(logs.all[0].date)) : formatDate(new Date());
    } catch (e) {
      return formatDate(new Date());
    }
  },
  // 获取最后一次提交时间（更新时间）
  last_updated: async (filePath) => {
    try {
      const git = simpleGit();
      const logs = await git.log({ file: filePath });
      return logs.latest?.date ? formatDate(new Date(logs.latest.date)) : formatDate(new Date());
    } catch (e) {
      return formatDate(new Date());
    }
  }
};

// 日期格式化工具
function formatDate(date) {
  const pad = (n) => n.toString().padStart(2, '0');
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return `${date.getFullYear()}年${pad(date.getMonth() + 1)}月${pad(date.getDate())}日 ${
    weekdays[date.getDay()]
  } ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

// 主处理函数
async function processMarkdownFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  const metadataMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);

  // 解析已有元数据
  const [metadataLines, metadata] = metadataMatch
    ? [
        metadataMatch[1].split(/\r?\n/),
        Object.fromEntries(
          metadataMatch[1]
            .split(/\r?\n/)
            .map(line => line.split(':').map(s => s.trim()))
            .filter(([k]) => k)
        ),
      ]
    : [[], {}];

  // 生成目标字段
  const allFields = {};
  for (const [field, generator] of Object.entries(TARGET_FIELDS)) {
    allFields[field] = typeof generator === 'function'
      ? await generator(filePath)
      : generator;
  }

  // 更新或新增字段
  for (const [key, value] of Object.entries(allFields)) {
    const index = metadataLines.findIndex(line => line.startsWith(key + ':'));
    if (index !== -1) {
      metadataLines[index] = `${key}: ${value}`;
    } else {
      metadataLines.push(`${key}: ${value}`);
    }
  }

  // 构建新内容
  const newContent = metadataMatch
    ? ['---', ...metadataLines.filter(Boolean), '---', content.slice(metadataMatch[0].length)].join('\n')
    : ['---', ...Object.entries(allFields).map(([k, v]) => `${k}: ${v}`), '---', content].join('\n');

  fs.writeFileSync(filePath, newContent);
  console.log(`✅ Processed: ${path.basename(filePath)}`);
}

// 启动入口
const patterns = process.argv.slice(2).filter(arg => !arg.startsWith('--'));
const isDryRun = process.argv.includes('--dry-run');

(async () => {
  const files = patterns.flatMap(pattern =>
    glob.sync(pattern, { nodir: true, absolute: true })
  );

  for (const file of files) {
    const ext = path.extname(file);
    if (ext === '.md' || ext === '.mdx') {
      if (isDryRun) {
        console.log(`[Dry Run] Would process: ${file}`);
      } else {
        await processMarkdownFile(file);
      }
    }
  }
})();