module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'entry',
      // useBuiltIns: 'usage',
      corejs: 3,
      modules: false
    }]
  ],
  plugins: ['transform-vue-jsx', '@babel/plugin-transform-runtime']
};
