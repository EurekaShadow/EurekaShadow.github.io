// extract-text.js
const fs = require('fs');
const path = require('path');

// 配置部分
const CONTENT_DIRS = ['docs', 'blog']; // 要扫描的目录
const INCLUDE_EXTENSIONS = ['.md', '.mdx']; // 要处理的文件扩展名
const OUTPUT_FILE = 'translation-source.txt'; // 输出文件名
const SEPARATOR = '===FILE_SEPARATOR==='; // 文件分隔符
const FILE_INFO_PREFIX = '===FILE_INFO:'; // 文件信息前缀

/**
 * 递归获取目录下所有文件
 * @param {string} dir - 目录路径
 * @returns {Array} 文件路径数组
 */
function getAllFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    
    if (stat && stat.isDirectory()) {
      // 递归处理子目录
      results = results.concat(getAllFiles(file));
    } else {
      // 检查文件扩展名
      const ext = path.extname(file);
      if (INCLUDE_EXTENSIONS.includes(ext)) {
        results.push(file);
      }
    }
  });
  
  return results;
}

/**
 * 提取文件中的可翻译文本
 * @param {string} filePath - 文件路径
 * @returns {object} 包含文件信息和内容的对象
 */
function extractTextFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 提取frontmatter
    let frontmatter = '';
    let bodyContent = content;
    
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      frontmatter = frontmatterMatch[1];
      bodyContent = content.substring(frontmatterMatch[0].length).trim();
    }
    
    return {
      path: filePath,
      frontmatter: frontmatter,
      content: bodyContent
    };
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}

/**
 * 格式化文件信息为标识符
 * @param {string} filePath - 文件路径
 * @returns {string} 格式化的文件信息
 */
function formatFileInfo(filePath) {
  const relativePath = path.relative(process.cwd(), filePath);
  return `${FILE_INFO_PREFIX}${relativePath}===`;
}

/**
 * 主函数 - 提取所有文本并整合到一个文件
 */
function extractAllText() {
  console.log('开始提取文本内容...');
  
  let combinedContent = '';
  let fileCount = 0;
  
  CONTENT_DIRS.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`扫描目录: ${dir}`);
      const files = getAllFiles(dir);
      
      files.forEach(filePath => {
        const fileData = extractTextFromFile(filePath);
        
        if (fileData) {
          // 添加分隔符（如果不是第一个文件）
          if (fileCount > 0) {
            combinedContent += `\n${SEPARATOR}\n`;
          }
          
          // 添加文件信息标识
          combinedContent += formatFileInfo(fileData.path) + '\n';
          
          // 添加frontmatter（如果有）
          if (fileData.frontmatter) {
            combinedContent += '---FRONTMATTER---\n';
            combinedContent += fileData.frontmatter + '\n';
            combinedContent += '---END FRONTMATTER---\n\n';
          }
          
          // 添加正文内容
          combinedContent += '---CONTENT---\n';
          combinedContent += fileData.content + '\n';
          combinedContent += '---END CONTENT---\n';
          
          fileCount++;
          console.log(`已处理: ${fileData.path}`);
        }
      });
    } else {
      console.log(`目录不存在: ${dir}`);
    }
  });
  
  // 写入输出文件
  try {
    fs.writeFileSync(OUTPUT_FILE, combinedContent, 'utf8');
    console.log(`\n成功提取 ${fileCount} 个文件的文本内容`);
    console.log(`输出文件: ${OUTPUT_FILE}`);
    console.log(`文件大小: ${Math.round(combinedContent.length / 1024)} KB`);
  } catch (error) {
    console.error('写入文件失败:', error.message);
  }
}

// 执行主函数
extractAllText();