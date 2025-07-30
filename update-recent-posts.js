// update-recent-posts.js
// 自动更新博客最近更新列表的脚本
// 该脚本会扫描指定目录下的博客文件，提取最新的几篇文章，并更新到指定的MDX文件中

// 导入Node.js内置模块
const fs = require('fs');      // 文件系统模块，用于读写文件
const path = require('path');  // 路径处理模块，用于处理文件路径

// ==================== 配置部分 ====================
// 博客目录配置 - 要扫描的博客文件夹列表
const BLOG_DIRS = ['blog'];

// 目标文件配置 - 需要更新的MDX文件列表（可以同时更新多个文件）
const MDX_FILES = ['docs/example.mdx', 'docs/reflection-space.mdx'];

// 显示文章数量配置 - 最多显示的最近更新文章数量
const MAX_POSTS = 4;
// ==================== 配置部分结束 ====================

/**
 * 获取所有博客文件信息
 * @returns {Array} 包含所有博客文件信息的数组
 */
function getBlogFiles() {
  let files = [];  // 存储所有找到的博客文件信息
  
  // 遍历所有配置的博客目录
  BLOG_DIRS.forEach(dir => {
    // 检查目录是否存在
    if (fs.existsSync(dir)) {
      // 读取目录中的所有项目（文件和文件夹）
      const items = fs.readdirSync(dir);
      
      // 遍历每个项目
      items.forEach(item => {
        // 构建完整的文件路径
        const fullPath = path.join(dir, item);
        // 获取文件状态信息
        const stat = fs.statSync(fullPath);
        
        // 检查是否为文件且扩展名为.mdx或.md
        if (stat.isFile() && (path.extname(fullPath) === '.mdx' || path.extname(fullPath) === '.md')) {
          // 获取不包含扩展名的文件名
          const fileName = path.basename(fullPath, path.extname(fullPath));
          
          // 过滤掉模板文件和以下划线开头的文件（通常是隐藏文件或草稿）
          if (fileName !== 'template' && !fileName.startsWith('_')) {
            // 获取文件的详细信息（创建时间等）
            const fileStats = fs.statSync(fullPath);
            // 提取文件的标题、日期等信息
            const fileInfo = extractFileInfo(fullPath, fileName, fileStats);
            
            // 将文件信息添加到数组中
            files.push({
              ...fileInfo,  // 展开已提取的文件信息
              path: fullPath,  // 完整文件路径
              relativePath: `/${dir}/${fileName}`  // 相对路径（会被后续处理覆盖）
            });
          }
        }
      });
    }
  });
  
  return files;  // 返回所有找到的博客文件信息
}

/**
 * 从文件中提取标题、日期和slug信息
 * @param {string} filePath - 文件完整路径
 * @param {string} fileName - 文件名（不含扩展名）
 * @param {object} fileStats - 文件状态信息
 * @returns {object} 包含标题、日期和slug的对象
 */
function extractFileInfo(filePath, fileName, fileStats) {
  // 初始化默认值
  let title = formatFileName(fileName);  // 根据文件名生成默认标题
  let date = fileStats.birthtime;        // 默认使用文件创建时间
  let slug = fileName;                   // 默认使用文件名作为slug
  
  try {
    // 读取文件内容
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 尝试从文件名中提取日期信息（格式：YYYY-MM-DD-文件名）
    const dateInName = fileName.match(/^(\d{4}-\d{2}-\d{2})-/);
    if (dateInName) {
      // 如果文件名包含日期，使用该日期
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
      if (dateMatch) date = new Date(dateMatch[1]);
      if (slugMatch) slug = slugMatch[1];
    }
  } catch (error) {
    // 如果读取文件出错，输出警告信息但不中断程序
    console.warn(`Warning: Could not read file ${filePath}`);
  }
  
  // 返回提取到的文件信息
  return {
    title: title,
    date: date,
    slug: slug
  };
}

/**
 * 格式化文件名，将短横线分隔转换为单词首字母大写
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
 * 生成最近更新文章的Markdown列表
 * @returns {string} Markdown格式的文章列表
 */
function generateRecentPostsList() {
  // 获取所有博客文件
  const allFiles = getBlogFiles();
  
  // 按日期降序排序（最新的在前面）
  allFiles.sort((a, b) => b.date - a.date);
  
  // 取最新的几篇文章
  const recentFiles = allFiles.slice(0, MAX_POSTS);
  
  // 为每篇文章生成Markdown格式的链接
  const markdownList = recentFiles.map(file => {
    const formattedDate = formatDate(file.date);
    // 使用slug生成正确的博客链接
    return `- [${formattedDate} - ${file.title}](/blog/${file.slug})`;
  });
  
  // 将所有链接用换行符连接成一个字符串
  return markdownList.join('\n');
}

/**
 * 更新所有目标文件中的最近更新列表
 */
function updateTargetFile() {
  try {
    // 生成新的文章列表内容
    const newContent = generateRecentPostsList();
    console.log('生成的新内容:');
    console.log(newContent);
    
    // 遍历所有目标文件并更新
    MDX_FILES.forEach(targetFile => {
      console.log('正在处理文件:', targetFile);
      
      // 检查目标文件是否存在
      if (!fs.existsSync(targetFile)) {
        console.error(`❌ 目标文件不存在: ${targetFile}`);
        return;
      }
      
      // 读取目标文件内容
      const content = fs.readFileSync(targetFile, 'utf8');
      console.log(`文件 ${targetFile} 原始内容长度:`, content.length);
      
      // 使用正则表达式查找"最近更新"部分
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
  }
}

// 执行更新操作
updateTargetFile();