module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  // 自定义规则
  rules: {
    // Vue 单行属性最大数量设置
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 10,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    // 设置禁止使用v-html
    'vue/no-v-html': 'off',
    // 字符串统一使用单引号
    'quotes': [2, 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
    // 强制每个文件最后有一个空行
    'eol-last': 2,
    // 函数表达式后强制使用分号
    'semi': [2, 'never'],
    // 使用箭头函数时，箭头前后必须有空格
    'arrow-spacing': [2, { 'before': true, 'after': true }],
    // 属性之前不能有空格
    'no-multi-spaces': 2,
    // 必须使用常量代替魔法字符串
    'prefer-const': 2,
    // 去除console的使用
    'no-console': 'off',
    // 单行块式语句应使用大括号
    'curly': [2, 'multi-line'],
    // 强制函数参数之间无空格
    'space-between-function-paren': [2, 'never'],
    // 禁止在JSX中使用JavaScript表达式
    'no-template-curly-in-string': 2,
    // 禁止在多行注释中出现尾随空格
    'no-trailing-spaces': 2,
    // 强制块语句内使用一致的缩进
    'indent': [2, 2, { 'SwitchCase': 1 }],
    // 不允许出现空的代码块
    'no-empty': 2,
    // 禁止使用eval()
    'no-eval': 2,
    // 禁止使用with
    'no-with': 2,
    // 禁止使用未声明的变量
    'no-undef': 2,
    // 禁止出现未使用的变量
    'no-unused-vars': [2, { 'vars': 'all', 'args': 'none' }],
    // 禁止出现重复的 case 标签
    'no-duplicate-case': 2,
    // 禁止变量声明与外部环境冲突
    'no-shadow-restricted-names': 2,
    // 强制使用驼峰命名法
    'camelcase': [0, { 'properties': 'always' }],
    // 禁止使用eval
    'no-new-object': 2,
    // 强制每行最大空格数
    'no-mixed-spaces-and-tabs': 2,
    // 强制代码中使用一致的空格
    'space-infix-ops': 2,
    // 强制代码风格一致性
    'no-whitespace-before-property': 2,
    // 强制行尾空格
    'no-trailing-spaces': 2,
    // 禁止删除变量
    'no-delete-var': 2,
    // 强制代码中的属性方法统一使用点操作
    'dot-location': [2, 'property'],
    // 禁止使用多个空行
    'no-multiple-empty-lines': [2, { 'max': 1 }]
  }
}