module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  // 使用vue-eslint-parser解析vue文件
  parser: 'vue-eslint-parser',
  parserOptions: {
    // 使用babel-eslint解析js文件以及vuescript标签内的内容
    parser: 'babel-eslint',
    ecmaVersion: 8,
    sourceType: 'module'
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': 'error',
    semi: ['error', 'always'],
    'no-var': 0 // 禁用var，用let和const代替
  }
};
