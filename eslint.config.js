// @ts-check

const js = require('@eslint/js');
const globals = require('globals');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const prettierConfig = require('eslint-config-prettier');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  // 全局忽略的文件
  {
    ignores: [
      'build/',
      '.docusaurus/',
      'node_modules/',
      '*.min.js',
      '*.bundle.js',
      'logs/',
      '*.log',
    ],
  },

  // 基础配置
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooksPlugin,
    },
  },

  // 推荐规则
  js.configs.recommended,
  
  // React Hooks 规则
  {
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
    },
  },
  
  // React 规则（简化版）
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // React 基本规则
      'react/react-in-jsx-scope': 'off', // React 17+ 不需要
      
      // 代码质量相关
      'no-console': 'warn', // 警告 console.log
      'no-unused-vars': ['warn', { vars: 'all', args: 'none' }], // 未使用的变量
      'prefer-const': 'error', // 能用 const 就不用 let
      'no-var': 'error', // 禁止使用 var
      
      // 代码风格（大部分交给 Prettier 处理）
      'quotes': ['warn', 'single', { // 优先单引号
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }],
      'semi': ['error', 'always'], // 必须分号
      'indent': 'off', // 缩进交给 Prettier
      'comma-dangle': ['warn', 'only-multiline'], // 多行时允许尾随逗号
    },
  },

  // Prettier 配置（必须放在最后）
  prettierConfig,
];
