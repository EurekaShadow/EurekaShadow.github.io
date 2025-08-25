// comprehensive-analysis.js (增强版)
const fs = require('fs');
const path = require('path');

// 接受项目根目录作为参数，默认为上级目录
const projectRoot = process.argv[2] || path.join(__dirname, '..');

function analyzeProject() {
  console.log('=== 项目结构分析 ===\n');
  console.log(`分析目录: ${projectRoot}\n`);
  
  // 分析主要目录
  const mainDirs = ['docs', 'blog', 'src', 'static'];
  mainDirs.forEach(dir => {
    const dirPath = path.join(projectRoot, dir);
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
    
    // 按文件类型统计
    const fileTypeCounts = {
      '.md': 0,
      '.mdx': 0,
      '.js': 0,
      '.jsx': 0,
      '.ts': 0,
      '.tsx': 0,
      '.css': 0,
      '.scss': 0,
      '.json': 0,
      '.png': 0,
      '.jpg': 0,
      '.jpeg': 0,
      '.gif': 0,
      '.svg': 0,
      '.mp3': 0,
      '.mp4': 0,
      '.wav': 0,
      'other': 0
    };
    
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
          
          // 按文件扩展名分类统计
          const ext = path.extname(file).toLowerCase();
          if (fileTypeCounts.hasOwnProperty(ext)) {
            fileTypeCounts[ext]++;
          } else {
            fileTypeCounts['other']++;
          }
        }
      });
    }
    
    try {
      walk(dirPath);
      console.log(`  文件总数: ${fileCount}`);
      console.log(`  总大小: ${(totalSize/1024).toFixed(2)} KB`);
      
      // 显示详细的文件类型统计
      console.log('  文件类型分布:');
      Object.entries(fileTypeCounts)
        .filter(([type, count]) => count > 0)
        .sort((a, b) => b[1] - a[1]) // 按数量排序
        .forEach(([type, count]) => {
          if (type === 'other') {
            console.log(`    ${type}: ${count} 个文件`);
          } else {
            console.log(`    ${type}: ${count} 个文件`);
          }
        });
      console.log('');
    } catch (e) {
      console.log(`  无法分析目录: ${e.message}\n`);
    }
  }
  
  // 分析内容文件（文档和博客）
  function analyzeContentFiles() {
    console.log('=== 内容文件分析 ===\n');
    
    const contentDirs = [
      { name: 'docs', path: path.join(projectRoot, 'docs') },
      { name: 'blog', path: path.join(projectRoot, 'blog') }
    ];
    
    contentDirs.forEach(dirInfo => {
      if (fs.existsSync(dirInfo.path)) {
        analyzeContentDirectory(dirInfo.name, dirInfo.path);
      }
    });
  }
  
  function analyzeContentDirectory(name, dirPath) {
    let totalFiles = 0;
    let mdFiles = 0;
    let mdxFiles = 0;
    let totalWords = 0;
    let largestFile = { path: '', size: 0, words: 0 };
    
    function walk(currentPath) {
      const files = fs.readdirSync(currentPath);
      
      files.forEach(file => {
        const filePath = path.join(currentPath, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          walk(filePath);
        } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
          totalFiles++;
          if (file.endsWith('.md')) mdFiles++;
          if (file.endsWith('.mdx')) mdxFiles++;
          
          try {
            const content = fs.readFileSync(filePath, 'utf8');
            const words = content.split(/\s+/).filter(word => word.length > 0).length;
            totalWords += words;
            
            if (words > largestFile.words) {
              largestFile = {
                path: path.relative(projectRoot, filePath),
                size: stat.size,
                words: words
              };
            }
          } catch (e) {
            console.log(`  无法读取文件 ${filePath}: ${e.message}`);
          }
        }
      });
    }
    
    try {
      walk(dirPath);
      console.log(`${name} 目录:`);
      console.log(`  总文件数: ${totalFiles} (${mdFiles} MD, ${mdxFiles} MDX)`);
      console.log(`  总字数: ${totalWords.toLocaleString()}`);
      if (largestFile.words > 0) {
        console.log(`  最大文件: ${largestFile.path}`);
        console.log(`    字数: ${largestFile.words.toLocaleString()}`);
        console.log(`    大小: ${(largestFile.size/1024).toFixed(2)} KB`);
      }
      console.log('');
    } catch (e) {
      console.log(`  无法分析内容目录: ${e.message}\n`);
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
          // 排除 node_modules 和 .git 等目录
          const dirName = path.basename(filePath);
          if (!['node_modules', '.git', '.docusaurus'].includes(dirName)) {
            collectFiles(filePath);
          }
        } else {
          // 只收集大于10KB的文件以减少噪音
          if (stat.size > 10 * 1024) {
            allFiles.push({
              path: path.relative(projectRoot, filePath),
              size: stat.size
            });
          }
        }
      });
    }
    
    try {
      collectFiles(projectRoot);
      allFiles.sort((a, b) => b.size - a.size);
      
      console.log('前15个最大的文件 (>10KB):');
      allFiles.slice(0, 15).forEach((file, index) => {
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
  
  // 分析静态资源
  function analyzeStaticAssets() {
    const staticPath = path.join(projectRoot, 'static');
    if (fs.existsSync(staticPath)) {
      console.log('\n=== 静态资源分析 ===\n');
      
      let assetStats = {
        images: { count: 0, size: 0 },
        audio: { count: 0, size: 0 },
        video: { count: 0, size: 0 },
        documents: { count: 0, size: 0 },
        other: { count: 0, size: 0 }
      };
      
      function walk(currentPath) {
        const files = fs.readdirSync(currentPath);
        
        files.forEach(file => {
          const filePath = path.join(currentPath, file);
          const stat = fs.statSync(filePath);
          
          if (stat.isDirectory()) {
            walk(filePath);
          } else {
            const ext = path.extname(file).toLowerCase();
            const size = stat.size;
            
            // 分类统计
            if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'].includes(ext)) {
              assetStats.images.count++;
              assetStats.images.size += size;
            } else if (['.mp3', '.wav', '.ogg'].includes(ext)) {
              assetStats.audio.count++;
              assetStats.audio.size += size;
            } else if (['.mp4', '.avi', '.mov'].includes(ext)) {
              assetStats.video.count++;
              assetStats.video.size += size;
            } else if (['.pdf', '.doc', '.docx'].includes(ext)) {
              assetStats.documents.count++;
              assetStats.documents.size += size;
            } else {
              assetStats.other.count++;
              assetStats.other.size += size;
            }
          }
        });
      }
      
      try {
        walk(staticPath);
        
        console.log('静态资源统计:');
        Object.entries(assetStats).forEach(([type, stats]) => {
          if (stats.count > 0) {
            const sizeKB = stats.size / 1024;
            const sizeMB = sizeKB / 1024;
            const sizeStr = sizeMB >= 1 ? `${sizeMB.toFixed(2)} MB` : `${sizeKB.toFixed(2)} KB`;
            console.log(`  ${type}: ${stats.count} 个文件, ${sizeStr}`);
          }
        });
      } catch (e) {
        console.log(`  无法分析静态资源: ${e.message}`);
      }
    }
  }
  
  analyzeContentFiles();
  findLargestFiles();
  analyzeStaticAssets();
}

analyzeProject();