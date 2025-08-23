const fs = require('fs');
const path = require('path');

function analyzeBuildDir() {
  const buildDir = path.join(__dirname, 'build');
  
  function getDirSize(dir) {
    let size = 0;
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        size += getDirSize(filePath);
      } else {
        size += stat.size;
      }
    });
    
    return size;
  }
  
  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }
  
  // 分析主要目录
  const dirs = ['assets', 'blog', 'docs', 'img', 'audio'];
  console.log('=== 各目录大小分析 ===');
  
  dirs.forEach(dir => {
    const dirPath = path.join(buildDir, dir);
    if (fs.existsSync(dirPath)) {
      const size = getDirSize(dirPath);
      console.log(`${dir}: ${formatSize(size)}`);
    }
  });
  
  // 分析最大的 JS 文件
  const jsDir = path.join(buildDir, 'assets', 'js');
  if (fs.existsSync(jsDir)) {
    const jsFiles = fs.readdirSync(jsDir)
      .filter(file => file.endsWith('.js'))
      .map(file => {
        const stat = fs.statSync(path.join(jsDir, file));
        return { name: file, size: stat.size };
      })
      .sort((a, b) => b.size - a.size);
    
    console.log('\n=== 最大的 10 个 JS 文件 ===');
    jsFiles.slice(0, 10).forEach((file, index) => {
      console.log(`${index + 1}. ${file.name}: ${formatSize(file.size)}`);
    });
  }
}

analyzeBuildDir();