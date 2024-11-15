import { defineConfig } from 'umi';
const { resolve } = require('path');
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  alias: {
    utils: resolve(__dirname, 'src/utils'),
    components: resolve(__dirname, 'src/components'),
    common: resolve(__dirname, 'src/common'),
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
});
