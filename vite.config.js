const path = require('path');

module.exports = {
  hostname: '0.0.0.0',
  port: 9999,
  // 反向代理
  // proxy: {
  //   '/api': {
  //     target: 'http://babg.zj.pcc/proxy/gzpt-widget-all-new/',
  //     changeOrigin: true,
  //     rewrite: path => path.replace(/^\/api/, ''),
  //   },
  // },
};
