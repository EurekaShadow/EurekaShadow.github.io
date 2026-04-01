# ESLint & Prettier 配置完成指南

## ✅ 已完成的配置

### 1. 配置文件已创建

| 文件                    | 用途             | 位置           |
| ----------------------- | ---------------- | -------------- |
| `.eslintrc.js`          | ESLint 配置      | 项目根目录     |
| `.prettierrc`           | Prettier 配置    | 项目根目录     |
| `.eslintignore`         | ESLint 忽略规则  | 项目根目录     |
| `.vscode/settings.json` | VS Code 集成设置 | VS Code 工作区 |

---

## 🎯 核心功能

### **ESLint - 代码质量检查**

✅ **检查内容：**

- 语法错误
- 未使用的变量
- React Hooks 使用规范
- 代码最佳实践

❌ **示例（会被标记）：**

```javascript
// ❌ 错误：使用了 var
var count = 0;

// ✅ 正确：使用 const/let
const count = 0;
```

### **Prettier - 代码格式化**

✅ **格式化内容：**

- 缩进（2 空格）
- 引号（单引号优先）
- 分号（必须）
- 行尾逗号（多行时自动添加）
- 换行符（LF）

❌ **格式化前：**

```javascript
function test() {
  console.log('hello');
}
```

✅ **格式化后：**

```javascript
function test() {
  console.log('hello');
}
```

---

## 🚀 使用方法

### **方式 1：保存时自动执行（推荐）**

配置已启用以下功能：

- ✅ `editor.formatOnSave: true` - 保存时自动格式化
- ✅ `source.fixAll.eslint: explicit` - 保存时自动修复 ESLint 问题

**操作：**

```text
编辑代码 → 按 Ctrl+S 保存 → 自动格式化 + 修复
```

### **方式 2：手动触发格式化**

```text
按 F1 → 输入 "Format Document" → 回车
```

或使用快捷键：

- Windows: `Shift + Alt + F`
- Mac: `Shift + Option + F`

### **方式 3：手动运行 ESLint**

```bash
# 检查整个项目
npx eslint .

# 检查并自动修复
npx eslint . --fix

# 检查特定文件
npx eslint src/components/*.js
```

---

## 📋 配置说明

### **ESLint 规则亮点**

```javascript
'no-console': 'warn',           // 警告 console.log（调试时可临时关闭）
'no-unused-vars': 'warn',       // 未使用的变量
'prefer-const': 'error',        // 能用 const 就不用 let
'quotes': ['warn', 'single'],   // 优先单引号
'semi': ['error', 'always'],    // 必须分号
```

### **Prettier 配置亮点**

```json
{
  "printWidth": 100, // 每行最多 100 字符
  "tabWidth": 2, // 2 空格缩进
  "singleQuote": true, // 单引号
  "semi": true, // 需要分号
  "trailingComma": "all" // 多行时添加尾随逗号
}
```

---

## 🔍 验证配置是否生效

### **测试 1：打开一个 JS/TS 文件**

1. 打开任意 `.js`、`.tsx` 或 `.mdx` 文件
2. 查看 VS Code 底部状态栏
3. 应该看到 ✅ ESLint 图标（对勾）或 ⚠️（警告）

### **测试 2：故意写错误代码**

```javascript
// 故意写这段代码测试
var unused = 'test'; // ESLint 会标黄警告
console.log('debug'); // ESLint 会标黄警告
```

**预期效果：**

- `var` 下方出现黄色波浪线
- `unused` 变量下方出现警告
- `console.log` 下方出现警告

### **测试 3：保存时自动格式化**

```javascript
// 保存前
function test() {
  console.log('hello');
}

// 按 Ctrl+S 保存后自动变成：
function test() {
  console.log('hello');
}
```

---

## ⚙️ 自定义规则

### **如果想修改规则**

编辑 `.eslintrc.js` 文件的 `rules` 部分：

```javascript
rules: {
  // 完全禁止 console.log
  'no-console': 'error',

  // 允许使用 var
  'no-var': 'off',

  // 双引号改为单引号
  'quotes': ['error', 'double'],
}
```

### **如果想修改格式化样式**

编辑 `.prettierrc` 文件：

```json
{
  "printWidth": 80, // 改成 80 字符一行
  "semi": false, // 不要分号
  "singleQuote": false // 改用双引号
}
```

---

## 🐛 常见问题解决

### **问题 1：保存时没有自动格式化**

**检查：**

1. VS Code 是否安装了 Prettier 扩展
2. `.vscode/settings.json` 中是否有以下配置：

   ```json
   "editor.formatOnSave": true,
   "editor.defaultFormatter": "esbenp.prettier-vscode"
   ```

### **问题 2：ESLint 没有报错**

**检查：**

1. VS Code 是否安装了 ESLint 扩展
2. 重启 VS Code 窗口：`Ctrl+Shift+P` → `Developer: Reload Window`
3. 查看输出面板：`查看 → 输出 → ESLint`

### **问题 3：MDX 文件不生效**

确保已安装 MDX 支持：

```bash
yarn add --dev eslint-plugin-mdx
```

并在 `.eslintrc.js` 中添加：

```javascript
extends: [
  // ... 其他配置
  'plugin:mdx/recommended',
],
```

### **问题 4：与 Prettier 冲突**

如果 ESLint 和 Prettier 的规则冲突，在 `.eslintrc.js` 中已经配置了：

```javascript
extends: [
  // ...
  'prettier', // 这一行会关闭所有与 Prettier 冲突的 ESLint 规则
]
```

---

## 📊 性能优化

### **如果感觉 linting 太慢**

在 `.vscode/settings.json` 中调整时间预算：

```json
{
  "eslint.timeBudget.onValidation": 3000, // 增加到 3 秒
  "eslint.timeBudget.onFixes": 3000
}
```

### **如果只想检查特定文件**

在 `.eslintrc.js` 的 `overrides` 中添加：

```javascript
overrides: [
  {
    files: ['src/**/*.js'], // 只检查 src 目录
  },
];
```

---

## 🎓 最佳实践建议

### **日常开发流程**

1. ✅ 编写代码
2. ✅ 按 `Ctrl+S` 保存（自动格式化 + 修复）
3. ✅ 查看 ESLint 警告并修复
4. ✅ 提交前运行一次完整检查

### **提交前检查清单**

```bash
# 1. 运行完整检查
npx eslint .

# 2. 自动修复能修复的问题
npx eslint . --fix

# 3. 确认没有错误后提交
git add .
git commit -m "feat: xxx"
```

---

## 📚 扩展阅读

- [ESLint 官方文档](https://eslint.org/docs/user-guide/getting-started)
- [Prettier 官方文档](https://prettier.io/docs/en/index.html)
- [React Hooks ESLint 插件](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- [Docusaurus ESLint 配置](https://docusaurus.io/docs/installation#eslint)

---

## ✨ 下一步

配置已完成！现在你可以：

1. ✅ 开始正常编码，享受自动格式化
2. ✅ 根据团队习惯调整规则
3. ✅ 在 CI/CD 中加入 ESLint 检查

**祝你编码愉快！** 🚀
