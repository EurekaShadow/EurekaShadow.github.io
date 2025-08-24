const fs = require('fs');
const path = require('path');

function findLargeFiles() {
  const dirs = ['docs', 'blog'];
  
  dirs.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) return;
    
    function walk(currentPath) {
      const files = fs.readdirSync(currentPath);
      
      files.forEach(file => {
        const filePath = path.join(currentPath, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          walk(filePath);
        } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
          const size = stat.size;
          if (size > 30 * 1024) { // 超过 30KB
            console.log(`大型文档: ${filePath} (${(size/1024).toFixed(1)} KB)`);
            
            // 如果文件特别大，显示前几行内容
            if (size > 100 * 1024) { // 超过 100KB
              try {
                const content = fs.readFileSync(filePath, 'utf8');
                console.log(`  内容预览: ${content.substring(0, 200)}...`);
              } catch (e) {
                console.log(`  无法读取文件内容`);
              }
            }
          }
        }
      });
    }
    
    walk(dirPath);
  });
}

findLargeFiles();