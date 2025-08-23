const fs = require('fs');
const path = require('path');

function analyzeProject() {
  console.log('=== 项目结构分析 ===\n');
  
  // 分析主要目录
  const mainDirs = ['docs', 'blog', 'src'];
  mainDirs.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (fs.existsSync(dirPath)) {
      console.log(`目录 ${dir} 存在`);
      countFiles(dirPath);
    } else {
      console.log(`目录 ${dir} 不存在`);
    }
  });
  
  // 统计文件数量和大小
  function countFiles(dirPath) {
    let fileCount = 0;
    let totalSize = 0;
    let mdxCount = 0;
    let mdCount = 0;
    
    function walk(currentPath) {
      const files = fs.readdirSync(currentPath);
      
      files.forEach(file => {
        const filePath = path.join(currentPath, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          walk(filePath);
        } else {
          fileCount++;
          totalSize += stat.size;
          if (file.endsWith('.mdx')) mdxCount++;
          if (file.endsWith('.md')) mdCount++;
        }
      });
    }
    
    try {
      walk(dirPath);
      console.log(`  文件总数: ${fileCount}`);
      console.log(`  MDX 文件: ${mdxCount}`);
      console.log(`  MD 文件: ${mdCount}`);
      console.log(`  总大小: ${(totalSize/1024).toFixed(2)} KB\n`);
    } catch (e) {
      console.log(`  无法分析目录: ${e.message}\n`);
    }
  }
  
  // 查找最大的几个文件（任何类型）
  function findLargestFiles() {
    console.log('=== 项目中最大的文件 ===\n');
    
    let allFiles = [];
    
    function collectFiles(dirPath) {
      const files = fs.readdirSync(dirPath);
      
      files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          collectFiles(filePath);
        } else {
          allFiles.push({
            path: path.relative(__dirname, filePath),
            size: stat.size
          });
        }
      });
    }
    
    try {
      collectFiles(__dirname);
      allFiles.sort((a, b) => b.size - a.size);
      
      console.log('前20个最大的文件:');
      allFiles.slice(0, 20).forEach((file, index) => {
        const sizeKB = file.size / 1024;
        const sizeMB = sizeKB / 1024;
        if (sizeMB >= 1) {
          console.log(`${index + 1}. ${file.path}: ${sizeMB.toFixed(2)} MB`);
        } else {
          console.log(`${index + 1}. ${file.path}: ${sizeKB.toFixed(2)} KB`);
        }
      });
    } catch (e) {
      console.log(`无法收集文件信息: ${e.message}`);
    }
  }
  
  findLargestFiles();
}

analyzeProject();