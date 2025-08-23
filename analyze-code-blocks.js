const fs = require('fs');
const path = require('path');

function analyzeCodeBlocks() {
  const docsDir = path.join(__dirname, 'docs');
  const blogDir = path.join(__dirname, 'blog');
  
  let totalCodeBlocks = 0;
  let largeCodeBlocks = [];
  
  function analyzeDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        analyzeDirectory(filePath);
      } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
        const content = fs.readFileSync(filePath, 'utf8');
        // 匹配代码块
        const codeBlockRegex = /```[\s\S]*?```/g;
        let match;
        while ((match = codeBlockRegex.exec(content)) !== null) {
          totalCodeBlocks++;
          const codeBlock = match[0];
          const lines = codeBlock.split('\n').length;
          const chars = codeBlock.length;
          
          if (chars > 5000 || lines > 100) { // 超过5000字符或100行
            largeCodeBlocks.push({
              file: filePath,
              lines: lines,
              chars: chars,
              preview: codeBlock.substring(0, 100) + '...'
            });
          }
        }
      }
    });
  }
  
  analyzeDirectory(docsDir);
  analyzeDirectory(blogDir);
  
  console.log(`总共找到 ${totalCodeBlocks} 个代码块`);
  console.log(`发现 ${largeCodeBlocks.length} 个大型代码块:`);
  
  // 按大小排序并显示前10个
  largeCodeBlocks.sort((a, b) => b.chars - a.chars);
  largeCodeBlocks.slice(0, 10).forEach((block, index) => {
    console.log(`${index + 1}. ${block.file}`);
    console.log(`   行数: ${block.lines}, 字符数: ${block.chars}`);
    console.log(`   预览: ${block.preview}`);
    console.log('');
  });
}

analyzeCodeBlocks();