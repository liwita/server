const path = require('path');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');
const plugins = require('./webpack.plugins');

const PATHS = {
  src: path.resolve(__dirname, './../src'),
  dist: path.resolve(__dirname, './../dist'),
  nodeModules: path.resolve(__dirname, 'node_modules')
};

/**
 * Note: For more Webpack information onf how to configure it, see: https://webpack.js.org/configuration/
 */

const commonConfig = merge([
  parts.setName({ name: 'liwita Server' }),
  parts.setEntry({ entry: './index.ts' }),
  parts.setOutput({ filename: './index.js', path: PATHS.dist, publicPath: '/' }),
  parts.setResolve({ extensions: ['.ts', '.js'] }),
  parts.setBail({ enable: true }),
  parts.setContextPath({ path: PATHS.src }),
  parts.targetNode(),
  parts.addTypeScriptLoader({
    include: PATHS.src,
    exclude: [PATHS.nodeModules],
    options: {
      cacheDirectory: true
    }
  })
]);

const developmentConfig = merge([
  parts.setDevServer({ options: { contentBase: PATHS.dist } }),
  parts.setOutput({
    pathinfo: true,
    // NOTE: This has to be set, otherwise the debugging via Source Maps wont work for Typescript files..
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  }),
  parts.setWatchMode({ enable: true }),
  parts.addTypeScriptLintLoader({
    include: PATHS.src,
    exclude: [PATHS.nodeModules]
  }),
  parts.addSourceMapLoader(),
  parts.generateSourceMaps({ type: 'cheap-module-source-map' }), // cheap-module-eval-source-map | cheap-module-source-map
  plugins.addGlobalVariablePlugin('process.env.NODE_ENV', 'development'),
  plugins.addLoaderOptionsPlugin({ debug: true, minimize: false }),
  plugins.addNamedModulesPlugin(),
  plugins.addFriendlyErrorsPlugin(),
  plugins.addDuplicatePackageCheckerPlugin()
]);

const productionConfig = merge([
  parts.addTypeScriptLintLoader({
    include: PATHS.src,
    exclude: [PATHS.nodeModules]
  }),
  parts.generateSourceMaps({ type: 'source-map' }),
  plugins.addGlobalVariablePlugin('process.env.NODE_ENV', 'production'),
  plugins.addLoaderOptionsPlugin({ debug: false, minimize: true }),
  plugins.addUglifyJsPlugin({ beautify: false, sourceMap: false, comments: false, mangle: false }),
  plugins.addDuplicatePackageCheckerPlugin()
]);

module.exports = env => {
  console.log(`Running in "${env}" mode.`);

  const config = env === 'production' ? productionConfig : developmentConfig;
  const result = merge([commonConfig, config]);
  //console.log(result);
  return result;
};
