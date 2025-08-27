// apply-translation.js
const fs = require('fs');
const path = require('path');

// 配置部分
const TRANSLATED_FILE = 'translation-source-translated.txt'; // 翻译后的文件
const SEPARATOR = '===FILE_SEPARATOR==='; // 文件分隔符
const FILE_INFO_PREFIX = '===FILE_INFO:'; // 文件信息前缀
const TARGET_LOCALE = 'en'; // 目标语言目录

/**
 * 解析翻译后的文件内容
 * @param {string} filePath - 翻译后文件的路径
 * @returns {Array} 解析后的文件数据数组
 */
function parseTranslatedFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 按分隔符分割文件
    const fileSections = content.split(new RegExp(`\\n${SEPARATOR}\\n`, 'g'));
    
    const filesData = [];
    
    fileSections.forEach(section => {
      if (section.trim()) {
        // 提取文件信息
        const fileInfoLine = section.trim().split('\n')[0];
        if (fileInfoLine.startsWith(FILE_INFO_PREFIX)) {
          const relativePath = fileInfoLine.substring(FILE_INFO_PREFIX.length, fileInfoLine.length - 3);
          const filePath = path.join(process.cwd(), relativePath);
          
          // 提取frontmatter和content
          let frontmatter = '';
          let contentBody = '';
          
          // 查找frontmatter部分
          const frontmatterMatch = section.match(/---FRONTMATTER---\n([\s\S]*?)\n---END FRONTMATTER---/);
          if (frontmatterMatch) {
            frontmatter = frontmatterMatch[1];
          }
          
          // 查找content部分
          const contentMatch = section.match(/---CONTENT---\n([\s\S]*?)\n---END CONTENT---/);
          if (contentMatch) {
            contentBody = contentMatch[1];
          }
          
          filesData.push({
            originalPath: filePath,
            relativePath: relativePath,
            frontmatter: frontmatter,
            content: contentBody
          });
        }
      }
    });
    
    return filesData;
  } catch (error) {
    console.error(`读取翻译文件失败 ${filePath}:`, error.message);
    return [];
  }
}

/**
 * 重构文件内容
 * @param {object} fileData - 文件数据
 * @returns {string} 重构后的完整文件内容
 */
function reconstructFileContent(fileData) {
  let newContent = '';
  
  // 如果有frontmatter，添加frontmatter
  if (fileData.frontmatter.trim()) {
    newContent += '---\n';
    newContent += fileData.frontmatter.trim() + '\n';
    newContent += '---\n';
  }
  
  // 添加正文内容
  if (fileData.content.trim()) {
    if (newContent) {
      newContent += '\n';
    }
    newContent += fileData.content.trim();
  }
  
  return newContent;
}

/**
 * 获取国际化目录路径
 * @param {string} originalPath - 原始文件路径
 * @param {string} locale - 目标语言
 * @returns {string} 国际化目录中的文件路径
 */
function getI18nPath(originalRelativePath, locale) {
  // 分析原始路径确定插件类型
  let pluginPath = '';
  let contentPath = '';
  
  if (originalRelativePath.startsWith('docs/')) {
    pluginPath = `i18n/${locale}/docusaurus-plugin-content-docs/current`;
    contentPath = originalRelativePath.substring(5); // 移除 'docs/' 前缀
  } else if (originalRelativePath.startsWith('blog/')) {
    pluginPath = `i18n/${locale}/docusaurus-plugin-content-blog`;
    contentPath = originalRelativePath.substring(5); // 移除 'blog/' 前缀
  } else {
    // 其他页面文件
    pluginPath = `i18n/${locale}/docusaurus-plugin-content-pages`;
    contentPath = originalRelativePath;
  }
  
  return path.join(process.cwd(), pluginPath, contentPath);
}

/**
 * 应用翻译到国际化目录
 * @param {Array} filesData - 解析后的文件数据
 */
function applyTranslations(filesData) {
  console.log(`开始应用 ${filesData.length} 个文件的翻译到 ${TARGET_LOCALE} 目录...`);
  
  let successCount = 0;
  let errorCount = 0;
  
  filesData.forEach(fileData => {
    try {
      // 计算国际化目录中的目标路径
      const i18nPath = getI18nPath(fileData.relativePath, TARGET_LOCALE);
      
      // 确保目录存在
      const dir = path.dirname(i18nPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // 重构文件内容
      const newContent = reconstructFileContent(fileData);
      
      // 写入翻译后的内容到国际化目录
      fs.writeFileSync(i18nPath, newContent, 'utf8');
      
      console.log(`✓ 已创建翻译文件: ${i18nPath}`);
      successCount++;
    } catch (error) {
      console.error(`✗ 创建翻译文件失败 ${fileData.relativePath}:`, error.message);
      errorCount++;
    }
  });
  
  console.log(`\n翻译应用完成:`);
  console.log(`  成功: ${successCount} 个文件`);
  console.log(`  失败: ${errorCount} 个文件`);
  console.log(`  总计: ${filesData.length} 个文件`);
  
  console.log(`\n翻译文件已保存到 i18n/${TARGET_LOCALE}/ 目录中`);
  console.log(`您可以运行 'npm run build' 来构建多语言网站`);
}

/**
 * 主函数
 */
function main() {
  if (!fs.existsSync(TRANSLATED_FILE)) {
    console.error(`错误: 翻译文件不存在 - ${TRANSLATED_FILE}`);
    console.log('请确保已将 translation-source.txt 翻译并保存为 translation-source-translated.txt');
    return;
  }
  
  console.log('开始解析翻译文件...');
  
  const filesData = parseTranslatedFile(TRANSLATED_FILE);
  
  if (filesData.length === 0) {
    console.error('未找到有效的文件数据，请检查翻译文件格式');
    return;
  }
  
  console.log(`解析到 ${filesData.length} 个文件的数据`);
  
  // 确认操作
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question(`\n确认要将这些翻译应用到 i18n/${TARGET_LOCALE}/ 目录吗？(y/N): `, (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      applyTranslations(filesData);
    } else {
      console.log('操作已取消');
    }
    rl.close();
  });
}

// 执行主函数
main();