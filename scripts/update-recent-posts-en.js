// update-recent-posts-en.js
// 自动更新英文内容最近更新列表的脚本
// 专门处理 i18n/en 目录下的内容

// 导入Node.js内置模块
const fs = require('fs');
const path = require('path');

// ==================== 配置部分 ====================
// 英文内容目录配置
const CONTENT_DIRS = [
  'i18n/en/docusaurus-plugin-content-blog',
  'i18n/en/docusaurus-plugin-content-docs/current'
];

// 目标文件配置 - 只更新英文的 reflection-space.mdx
const MDX_FILES = ['i18n/en/docusaurus-plugin-content-docs/current/reflection-space.mdx'];

// 显示内容数量配置
const MAX_POSTS = 4;

// 排序依据配置
const SORT_BY = 'modified';

// 文件类型过滤配置
const INCLUDE_EXTENSIONS = ['.md', '.mdx'];

// 加载排除配置
let excludeConfig = {
  excludePaths: [],
  excludePatterns: [],
  excludeDirectories: ['node_modules', '.git', '.docusaurus']
};

try {
  const configPath = path.join(__dirname, 'config', 'exclude-config.json');
  if (fs.existsSync(configPath)) {
    excludeConfig = { ...excludeConfig, ...JSON.parse(fs.readFileSync(configPath, 'utf8')) };
  }
} catch (error) {
  console.warn('警告: 无法加载排除配置文件，使用默认配置');
}
// ==================== 配置部分结束 ====================

/**
 * 检查文件是否应该被排除
 */
function shouldExcludeFile(filePath, dir) {
  const relativePath = path.relative(process.cwd(), filePath);
  const normalizedPath = relativePath.replace(/\\/g, '/');
  
  if (excludeConfig.excludePaths.some(excludePath => 
    normalizedPath.includes(excludePath))) {
    return true;
  }
  
  if (excludeConfig.excludePatterns.some(pattern => 
    normalizedPath.includes(pattern))) {
    return true;
  }
  
  const dirName = path.basename(path.dirname(filePath));
  if (excludeConfig.excludeDirectories.includes(dirName)) {
    return true;
  }
  
  return false;
}

/**
 * 获取所有内容文件信息
 */
function getContentFiles() {
  let files = [];
  
  CONTENT_DIRS.forEach(dir => {
    if (fs.existsSync(dir)) {
      function walkDirectory(currentPath) {
        const items = fs.readdirSync(currentPath);
        
        items.forEach(item => {
          const fullPath = path.join(currentPath, item);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            if (!shouldExcludeFile(fullPath, dir)) {
              walkDirectory(fullPath);
            }
          } else if (stat.isFile()) {
            const ext = path.extname(fullPath);
            const fileName = path.basename(fullPath, ext);
            
            if (INCLUDE_EXTENSIONS.includes(ext) && 
                !shouldExcludeFile(fullPath, dir)) {
              
              const fileStats = fs.statSync(fullPath);
              const fileInfo = extractFileInfo(fullPath, fileName, fileStats);
              
              const relativePath = path.relative(process.cwd(), fullPath);
              const urlPath = relativePath.replace(/\\/g, '/').replace(/\.[^.]+$/, '');
              
              files.push({
                ...fileInfo,
                path: fullPath,
                relativePath: relativePath,
                urlPath: urlPath,
                directory: dir,
                createdTime: fileStats.birthtime,
                modifiedTime: fileStats.mtime,
                extension: ext
              });
            }
          }
        });
      }
      
      walkDirectory(dir);
    }
  });
  
  return files;
}

/**
 * 从文件中提取标题、日期和slug信息
 */
function extractFileInfo(filePath, fileName, fileStats) {
  let title = formatFileName(fileName);
  let date = fileStats.birthtime;
  let slug = fileName;
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    const dateInName = fileName.match(/^(\d{4}-\d{2}-\d{2})-/);
    if (dateInName) {
      date = new Date(dateInName[1]);
      const nameWithoutDate = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, '');
      title = formatFileName(nameWithoutDate);
      slug = nameWithoutDate;
    }
    
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      
      const titleMatch = frontmatter.match(/title:\s*['"]?(.*?)['"]?\s*$/m);
      const dateMatch = frontmatter.match(/date:\s*['"]?(\d{4}-\d{2}-\d{2})['"]?\s*$/m);
      const slugMatch = frontmatter.match(/slug:\s*['"]?(.*?)['"]?\s*$/m);
      
      if (titleMatch) title = titleMatch[1];
      if (dateMatch) date = new Date(dateMatch[1]);
      if (slugMatch) slug = slugMatch[1];
    }
  } catch (error) {
    console.warn(`Warning: Could not read file ${filePath}`);
  }
  
  return {
    title: title,
    date: date,
    slug: slug,
    publishedDate: date
  };
}

/**
 * 格式化文件名
 */
function formatFileName(fileName) {
  return fileName
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * 格式化日期为英文格式
 * 例如: "2024-03-15" -> "March 15, 2024"
 * @param {Date} date - 日期对象
 * @returns {string} 格式化后的英文日期字符串
 */
function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',    // 四位数年份
    month: 'long',      // 完整月份名称
    day: 'numeric'      // 数字日期
  });
}

/**
 * 生成最近更新内容的Markdown列表
 */
function generateRecentPostsList() {
  const allFiles = getContentFiles();
  
  let sortedFiles;
  switch (SORT_BY) {
    case 'modified':
      sortedFiles = allFiles.sort((a, b) => b.modifiedTime - a.modifiedTime);
      console.log('按修改时间排序');
      break;
    case 'created':
      sortedFiles = allFiles.sort((a, b) => b.createdTime - a.createdTime);
      console.log('按创建时间排序');
      break;
    case 'published':
      sortedFiles = allFiles.sort((a, b) => b.publishedDate - a.publishedDate);
      console.log('按发布日期排序');
      break;
    default:
      sortedFiles = allFiles.sort((a, b) => b.modifiedTime - a.modifiedTime);
  }
  
  const recentFiles = sortedFiles.slice(0, MAX_POSTS);
  
  console.log(`\n找到 ${allFiles.length} 个内容文件，显示最近的 ${recentFiles.length} 个:`);
  recentFiles.forEach((file, index) => {
    const displayDate = SORT_BY === 'modified' ? file.modifiedTime :
                       SORT_BY === 'created' ? file.createdTime :
                       file.publishedDate;
    console.log(`${index + 1}. ${formatDate(displayDate)} - ${file.title} (${file.directory})`);
  });
  
  // 为每篇内容生成Markdown格式的链接
  const markdownList = recentFiles.map(file => {
    let displayDate;
    switch (SORT_BY) {
      case 'modified':
        displayDate = formatDate(file.modifiedTime);
        break;
      case 'created':
        displayDate = formatDate(file.createdTime);
        break;
      case 'published':
        displayDate = formatDate(file.publishedDate);
        break;
      default:
        displayDate = formatDate(file.modifiedTime);
    }
    
    // 生成正确的链接路径（针对英文文档）
    let linkPath;
    if (file.directory.includes('docusaurus-plugin-content-blog')) {
      // 英文博客文件使用 /en/blog/slug 格式
      linkPath = `/en/blog/${file.slug || path.basename(file.path, path.extname(file.path))}`;
    } else {
      // 英文文档文件处理
      let cleanPath = file.urlPath;
      // 确保链接以 /en/docs/ 开头
      if (cleanPath.includes('docusaurus-plugin-content-docs/current/')) {
        const docPath = cleanPath.replace('i18n/en/docusaurus-plugin-content-docs/current/', '');
        linkPath = `/en/docs/${docPath}`;
      } else {
        linkPath = `/en/docs/${cleanPath}`;
      }
    }
    
    // 生成Markdown格式的链接
    return `- [${displayDate} - ${file.title}](${linkPath})`;
  });
  
  return markdownList.join('\n');
}

/**
 * 更新所有目标文件中的最近更新列表
 */
function updateTargetFile() {
  try {
    const newContent = generateRecentPostsList();
    console.log('\n生成的新内容:');
    console.log(newContent);
    
    console.log(`\n排序方式: ${SORT_BY}`);
    
    MDX_FILES.forEach(targetFile => {
      console.log('\n正在处理文件:', targetFile);
      
      if (!fs.existsSync(targetFile)) {
        console.error(`❌ 目标文件不存在: ${targetFile}`);
        return;
      }
      
      const content = fs.readFileSync(targetFile, 'utf8');
      console.log(`文件 ${targetFile} 原始内容长度:`, content.length);
      
      // 修改正则表达式以匹配英文版文件格式
      const match = content.match(/(##\s*🕒?\s*Recent Updates\s*\n\s*---\s*\n)[\s\S]*?(\s*---)/);
      if (!match) {
        console.log(`❌ 在文件 ${targetFile} 中未找到匹配的内容，请检查文件格式`);
        return;
      }
      console.log(`✅ 在文件 ${targetFile} 中找到匹配的内容`);
      
      // 使用修改后的正则表达式进行替换
      const updatedContent = content.replace(
        /(##\s*🕒?\s*Recent Updates\s*\n\s*---\s*\n)[\s\S]*?(\s*---)/,
        `$1${newContent}$2`
      );
      
      fs.writeFileSync(targetFile, updatedContent, 'utf8');
      console.log(`✅ 文件 ${targetFile} 已成功更新！`);
    });
    
  } catch (error) {
    console.error('❌ 更新失败:', error.message);
    console.error('错误堆栈:', error.stack);
  }
}

// ==================== 程序入口 ====================
console.log('开始更新英文最近内容列表...');
updateTargetFile();
console.log('英文内容更新操作完成！');
// ==================== 程序结束 ====================