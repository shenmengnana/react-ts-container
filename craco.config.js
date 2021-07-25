const {whenProd, whenDev} = require('@craco/craco');
const path = require('path');
const pathResolve = pathUrl => path.join(__dirname, pathUrl);
const CracoAntDesignPlugin = require('craco-antd');
const {CracoAliasPlugin, configPaths} = require('react-app-rewire-alias');
module.exports = async () => {
  return {
    style: {
      postcss: {
        loaderOptions: (postcssLoaderOptions, {env, paths}) => {
          postcssLoaderOptions.sourceMap = false;
          return postcssLoaderOptions;
        },
      },
    },
    webpack: {
      configure: (webpackConfig, {env, paths}) => {
        paths.appBuild = 'dist';
        webpackConfig.output = {
          ...webpackConfig.output,
          path: path.resolve(__dirname, 'dist'), // 修改输出文件目录
          publicPath: '/',
        };
        return webpackConfig;
      },
    },
    plugins: [
      {
        plugin: CracoAntDesignPlugin,
        options: {
          customizeTheme: {},
        },
      },
      {
        plugin: CracoAliasPlugin,
        options: {alias: configPaths('./tsconfig.paths.json')},
      },
    ],
    babel: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false, // 对ES6的模块文件不做转化，以便使用tree shaking、sideEffects等
          },
        ],
      ],
      plugins: [
        // 配置 babel-plugin-import
        ['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}, 'antd'],
      ],
      loaderOptions: (babelLoaderOptions, {env, paths}) => {
        return babelLoaderOptions;
      },
    },
  };
};
