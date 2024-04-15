import { defineConfig } from 'umi';
// import path from 'path';
// // @ts-ignore
// import lessToJS from 'less-vars-to-js';
// import fs from 'fs';
import routes from './src/routes';
import extraBabelPlugins from './config/extraBabelPlugins';
import proxy from './config/proxy';
// function resolveCwd(...args: any) {
//   args.unshift(process.cwd());
//   return path.join(...args);
// }

// const themeVariables = lessToJS(
//   fs.readFileSync(
//     resolveCwd('./src/shared/styles/themes/antThemes.less'),
//     'utf8',
//   ),
// );
type ServeEnv = 'dev';

const SERVE_ENV = 'dev' as ServeEnv;
console.log('proxy[SERVE_ENV]', proxy[SERVE_ENV]);

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  extraBabelPlugins,
  cssLoader: {
    localsConvention: 'camelCase',
  },
  proxy: proxy[SERVE_ENV],
  dva: {
    immer: true,
    hmr: true,
  },
  chainWebpack(config: any) {
    config.module.rules.delete('svg');
    config.module
      .rule('svg')
      .test(/\.svg$/)
      .use('svg')
      .loader('@svgr/webpack');
  },
  favicon: '/favicon.ico',
  fastRefresh: {},
});
