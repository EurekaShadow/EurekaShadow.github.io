const fs = require('fs');
const path = require('path');

// 获取 build 目录中最大的几个文件
const jsDir = path.join(__dirname, 'build', 'assets', 'js');
const files = fs.readdirSync(jsDir)
  .filter(file => file.endsWith('.js'))
  .map(file => {
    const stats = fs.statSync(path.join(jsDir, file));
    return { 
      name: file, 
      size: stats.size,
      sizeMB: (stats.size / 1024 / 1024).toFixed(2)
    };
  })
  .sort((a, b) => b.size - a.size);

console.log('=== 前10个最大的 JS 文件 ===');
files.slice(0, 10).forEach((file, index) => {
  console.log(`${index + 1}. ${file.name}: ${file.sizeMB} MB`);
});

console.log('\n=== 文件详细信息 ===');
// 分析前几个最大的文件
const largestFiles = files.slice(0, 5);
largestFiles.forEach(file => {
  const filePath = path.join(jsDir, file.name);
  const content = fs.readFileSync(filePath, 'utf8');
  
  console.log(`\n文件: ${file.name}`);
  console.log(`大小: ${file.sizeMB} MB`);
  console.log(`行数: ${content.split('\n').length}`);
  
  // 检查是否包含可疑内容
  if (content.includes('webpackJsonp') || content.includes('__webpack_require__')) {
    console.log('✓ 这是一个 webpack 打包文件');
  }
  
  // 检查是否有大量重复内容
  if (content.length > 1000000) { // 1MB以上
    const start = content.substring(0, 500);
    const end = content.substring(content.length - 500);
    console.log('文件开头预览:');
    console.log(start.substring(0, 200) + '...');
  }
});