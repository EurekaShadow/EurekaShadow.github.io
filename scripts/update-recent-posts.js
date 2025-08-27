// update-recent-posts.js (完整版)
// 自动更新最近内容列表的脚本
// 支持扫描 blog 和 docs 目录，按修改时间排序

// 导入Node.js内置模块
const fs = require('fs');      // 文件系统模块，用于读写文件
const path = require('path');  // 路径处理模块，用于处理文件路径

// ==================== 配置部分 ====================
// 内容目录配置 - 要扫描的所有内容文件夹
const CONTENT_DIRS = ['blog', 'docs'];

// 目标文件配置 - 需要更新的MDX文件列表（可以同时更新多个文件）
const MDX_FILES = ['docs/example.mdx', 'docs/reflection-space.mdx'];

// 显示内容数量配置 - 最多显示的最近更新内容数量
const MAX_POSTS = 4;

// 排序依据配置 - 控制按哪种时间排序内容
// 'modified': 按文件最后修改时间排序（推荐用于"最近更新"）
// 'created': 按文件创建时间排序
// 'published': 按文章发布日期排序（来自frontmatter或文件名）
const SORT_BY = 'modified';

// 文件类型过滤配置 - 只处理指定扩展名的文件
const INCLUDE_EXTENSIONS = ['.md', '.mdx'];

// 加载排除配置 - 用于排除不需要统计的文件和目录
let excludeConfig = {
  // 完整路径排除 - 完全匹配这些路径的文件将被排除
  excludePaths: [],
  // 模式排除 - 文件路径包含这些字符串的将被排除
  excludePatterns: [],
  // 目录排除 - 这些目录及其子目录将被排除
  excludeDirectories: ['node_modules', '.git', '.docusaurus']
};

// 尝试加载自定义排除配置文件
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
 * 根据配置的排除规则判断文件是否需要被排除在统计之外
 * @param {string} filePath - 文件的完整路径
 * @param {string} dir - 文件所在的顶级目录（blog/docs）
 * @returns {boolean} true表示应该排除，false表示不应该排除
 */
function shouldExcludeFile(filePath, dir) {
  // 将文件路径转换为相对于项目根目录的标准化路径
  const relativePath = path.relative(process.cwd(), filePath);
  const normalizedPath = relativePath.replace(/\\/g, '/');
  
  // 检查是否在完整路径排除列表中
  if (excludeConfig.excludePaths.some(excludePath => 
    normalizedPath.includes(excludePath))) {
    return true;
  }
  
  // 检查是否匹配模式排除列表
  if (excludeConfig.excludePatterns.some(pattern => 
    normalizedPath.includes(pattern))) {
    return true;
  }
  
  // 检查是否在排除目录中
  const dirName = path.basename(path.dirname(filePath));
  if (excludeConfig.excludeDirectories.includes(dirName)) {
    return true;
  }
  
  return false;
}

/**
 * 获取所有内容文件信息
 * 递归扫描配置的目录，收集所有符合条件的内容文件信息
 * @returns {Array} 包含所有内容文件信息的数组
 */
function getContentFiles() {
  let files = [];  // 存储所有找到的内容文件信息
  
  // 遍历所有配置的内容目录
  CONTENT_DIRS.forEach(dir => {
    // 检查目录是否存在
    if (fs.existsSync(dir)) {
      /**
       * 递归遍历目录函数
       * @param {string} currentPath - 当前遍历的目录路径
       */
      function walkDirectory(currentPath) {
        // 读取当前目录中的所有项目
        const items = fs.readdirSync(currentPath);
        
        // 遍历每个项目
        items.forEach(item => {
          // 构建项目的完整路径
          const fullPath = path.join(currentPath, item);
          // 获取项目的文件状态信息
          const stat = fs.statSync(fullPath);
          
          // 如果是目录，递归遍历（除非被排除）
          if (stat.isDirectory()) {
            // 检查目录是否应该被排除
            if (!shouldExcludeFile(fullPath, dir)) {
              walkDirectory(fullPath);
            }
          } 
          // 如果是文件，检查是否符合要求
          else if (stat.isFile()) {
            // 获取文件扩展名
            const ext = path.extname(fullPath);
            // 获取不包含扩展名的文件名
            const fileName = path.basename(fullPath, ext);
            
            // 检查文件扩展名是否在允许列表中且文件不应该被排除
            if (INCLUDE_EXTENSIONS.includes(ext) && 
                !shouldExcludeFile(fullPath, dir)) {
              
              // 获取文件的详细统计信息
              const fileStats = fs.statSync(fullPath);
              // 提取文件的标题、日期等信息
              const fileInfo = extractFileInfo(fullPath, fileName, fileStats);
              
              // 计算文件相对于项目根目录的路径
              const relativePath = path.relative(process.cwd(), fullPath);
              // 生成URL友好的路径（替换反斜杠为正斜杠，移除扩展名）
              const urlPath = relativePath.replace(/\\/g, '/').replace(/\.[^.]+$/, '');
              
              // 将文件信息添加到数组中
              files.push({
                ...fileInfo,           // 展开已提取的文件信息
                path: fullPath,        // 完整文件路径
                relativePath: relativePath,  // 相对于项目根目录的路径
                urlPath: urlPath,      // URL友好的路径
                directory: dir,        // 所在的顶级目录（blog/docs）
                createdTime: fileStats.birthtime,  // 文件创建时间
                modifiedTime: fileStats.mtime,     // 文件修改时间
                extension: ext         // 文件扩展名
              });
            }
          }
        });
      }
      
      // 开始递归遍历目录
      walkDirectory(dir);
    }
  });
  
  return files;  // 返回所有找到的内容文件信息
}

/**
 * 从文件中提取标题、日期和slug信息
 * 优先从frontmatter中提取信息，其次从文件名中提取
 * @param {string} filePath - 文件完整路径
 * @param {string} fileName - 文件名（不含扩展名）
 * @param {object} fileStats - 文件状态信息
 * @returns {object} 包含标题、日期和slug的对象
 */
function extractFileInfo(filePath, fileName, fileStats) {
  // 初始化默认值
  let title = formatFileName(fileName);  // 根据文件名生成默认标题
  let date = fileStats.birthtime;        // 默认使用文件创建时间作为发布日期
  let slug = fileName;                   // 默认使用文件名作为slug
  
  try {
    // 读取文件内容
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 尝试从文件名中提取日期信息（格式：YYYY-MM-DD-文件名）
    const dateInName = fileName.match(/^(\d{4}-\d{2}-\d{2})-/);
    if (dateInName) {
      // 如果文件名包含日期，使用该日期作为发布日期
      date = new Date(dateInName[1]);
      // 去掉日期前缀后的文件名部分
      const nameWithoutDate = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, '');
      // 根据去掉日期的文件名生成标题
      title = formatFileName(nameWithoutDate);
      // slug也使用去掉日期的部分
      slug = nameWithoutDate;
    }
    
    // 尝试从文件的frontmatter中提取信息
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      // 提取frontmatter内容
      const frontmatter = frontmatterMatch[1];
      
      // 查找title、date、slug字段
      const titleMatch = frontmatter.match(/title:\s*['"]?(.*?)['"]?\s*$/m);
      const dateMatch = frontmatter.match(/date:\s*['"]?(\d{4}-\d{2}-\d{2})['"]?\s*$/m);
      const slugMatch = frontmatter.match(/slug:\s*['"]?(.*?)['"]?\s*$/m);
      
      // 如果frontmatter中有相应字段，则使用frontmatter中的值
      if (titleMatch) title = titleMatch[1];
      if (dateMatch) date = new Date(dateMatch[1]); // 发布日期
      if (slugMatch) slug = slugMatch[1];
    }
  } catch (error) {
    // 如果读取文件出错，输出警告信息但不中断程序
    console.warn(`Warning: Could not read file ${filePath}`);
  }
  
  // 返回提取到的文件信息
  return {
    title: title,
    date: date,           // 发布日期（来自frontmatter或文件名）
    slug: slug,
    publishedDate: date   // 明确标识为发布日期
  };
}

/**
 * 格式化文件名，将短横线分隔转换为单词首字母大写
 * 例如: "hello-world" -> "Hello World"
 * @param {string} fileName - 原始文件名
 * @returns {string} 格式化后的标题
 */
function formatFileName(fileName) {
  return fileName
    .replace(/-/g, ' ')           // 将短横线替换为空格
    .replace(/\b\w/g, l => l.toUpperCase());  // 每个单词首字母大写
}

/**
 * 格式化日期为中文格式
 * 例如: "2024-03-15" -> "2024年3月15日"
 * @param {Date} date - 日期对象
 * @returns {string} 格式化后的日期字符串
 */
function formatDate(date) {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',    // 四位数年份
    month: 'long',      // 完整月份名称
    day: 'numeric'      // 数字日期
  });
}

/**
 * 生成最近更新内容的Markdown列表
 * 根据配置的排序方式，生成最新的几篇内容的Markdown链接列表
 * @returns {string} Markdown格式的内容列表
 */
function generateRecentPostsList() {
  // 获取所有内容文件
  const allFiles = getContentFiles();
  
  // 根据配置的排序方式对文件进行排序
  let sortedFiles;
  switch (SORT_BY) {
    case 'modified':
      // 按修改时间排序（最新的在前面）
      sortedFiles = allFiles.sort((a, b) => b.modifiedTime - a.modifiedTime);
      console.log('按修改时间排序');
      break;
    case 'created':
      // 按创建时间排序（最新的在前面）
      sortedFiles = allFiles.sort((a, b) => b.createdTime - a.createdTime);
      console.log('按创建时间排序');
      break;
    case 'published':
      // 按发布日期排序（最新的在前面）
      sortedFiles = allFiles.sort((a, b) => b.publishedDate - a.publishedDate);
      console.log('按发布日期排序');
      break;
    default:
      // 默认按修改时间排序
      sortedFiles = allFiles.sort((a, b) => b.modifiedTime - a.modifiedTime);
  }
  
  // 取最新的几篇内容
  const recentFiles = sortedFiles.slice(0, MAX_POSTS);
  
  // 显示找到的文件信息（调试用）
  console.log(`\n找到 ${allFiles.length} 个内容文件，显示最近的 ${recentFiles.length} 个:`);
  recentFiles.forEach((file, index) => {
    // 根据排序方式选择显示的日期
    const displayDate = SORT_BY === 'modified' ? file.modifiedTime :
                       SORT_BY === 'created' ? file.createdTime :
                       file.publishedDate;
    console.log(`${index + 1}. ${formatDate(displayDate)} - ${file.title} (${file.directory})`);
  });
  
// 为每篇内容生成Markdown格式的链接（不包含扩展名）
const markdownList = recentFiles.map(file => {
  // 根据排序方式显示不同的日期信息
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
  
  // 生成正确的链接路径
  let linkPath;
  if (file.directory === 'blog') {
    // 博客文件使用 /blog/slug 格式
    linkPath = `/blog/${file.slug || path.basename(file.path, path.extname(file.path))}`;
  } else {
    // 文档文件处理：使用 urlPath（已在前面处理过）
    // 移除扩展名并确保以 /docs/ 开头
    let cleanPath = file.urlPath;
    if (cleanPath.startsWith('docs/')) {
      linkPath = `/${cleanPath}`;
    } else {
      linkPath = `/docs/${cleanPath}`;
    }
  }
  
  // 生成Markdown格式的链接
  return `- [${displayDate} - ${file.title}](${linkPath})`;
});
  
  // 将所有链接用换行符连接成一个字符串
  return markdownList.join('\n');
}

/**
 * 更新所有目标文件中的最近更新列表
 * 读取目标文件，替换其中的最近更新内容列表部分
 */
function updateTargetFile() {
  try {
    // 生成新的内容列表
    const newContent = generateRecentPostsList();
    console.log('\n生成的新内容:');
    console.log(newContent);
    
    // 显示当前使用的排序方式
    console.log(`\n排序方式: ${SORT_BY}`);
    
    // 遍历所有目标文件并更新
    MDX_FILES.forEach(targetFile => {
      console.log('\n正在处理文件:', targetFile);
      
      // 检查目标文件是否存在
      if (!fs.existsSync(targetFile)) {
        console.error(`❌ 目标文件不存在: ${targetFile}`);
        return;
      }
      
      // 读取目标文件内容
      const content = fs.readFileSync(targetFile, 'utf8');
      console.log(`文件 ${targetFile} 原始内容长度:`, content.length);
      
      // 使用正则表达式查找"最近更新"部分
      // 匹配格式: ## 🕒 最近更新\n---\n[内容]\n---
      const match = content.match(/(## 🕒 最近更新\s*\n\s*---\s*\n)[\s\S]*?(\s*---)/);
      if (!match) {
        console.log(`❌ 在文件 ${targetFile} 中未找到匹配的内容，请检查文件格式`);
        return;
      }
      console.log(`✅ 在文件 ${targetFile} 中找到匹配的内容`);
      
      // 替换"最近更新"部分的内容
      const updatedContent = content.replace(
        /(## 🕒 最近更新\s*\n\s*---\s*\n)[\s\S]*?(\s*---)/,
        `$1${newContent}$2`
      );
      
      // 将更新后的内容写入文件
      fs.writeFileSync(targetFile, updatedContent, 'utf8');
      console.log(`✅ 文件 ${targetFile} 已成功更新！`);
    });
    
  } catch (error) {
    // 捕获并输出错误信息
    console.error('❌ 更新失败:', error.message);
    console.error('错误堆栈:', error.stack);
  }
}

// ==================== 程序入口 ====================
// 执行更新操作
console.log('开始更新最近内容列表...');
updateTargetFile();
console.log('更新操作完成！');
// ==================== 程序结束 ====================