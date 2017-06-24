const webpack = require('webpack');

const friendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const duplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

/**
 * Note: For more Webpack Plugins see: https://webpack.js.org/plugins/
 */

/**
 * Link: https://webpack.js.org/plugins/loader-options-plugin/
 */
exports.addLoaderOptionsPlugin = ({ options } = { options: {} }) => {
  return {
    plugins: [new webpack.LoaderOptionsPlugin(options)]
  };
};

exports.addNamedModulesPlugin = () => {
  return {
    plugins: [new webpack.NamedModulesPlugin()]
  };
};

/**
 * Link: https://webpack.js.org/plugins/define-plugin/
 */
exports.addGlobalVariablePlugin = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [new webpack.DefinePlugin(env)]
  };
};

/**
 * Link: https://www.npmjs.com/package/friendly-errors-webpack-plugin
 */
exports.addFriendlyErrorsPlugin = ({ clearConsole } = { clearConsole: true }) => {
  return {
    plugins: [
      new friendlyErrorsPlugin({
        clearConsole
      })
    ]
  };
};

/**
 * Link: https://www.npmjs.com/package/duplicate-package-checker-webpack-plugin
 */
exports.addDuplicatePackageCheckerPlugin = ({ verbose } = { verbose: false }) => {
  return {
    plugins: [
      new duplicatePackageCheckerPlugin({
        verbose
      })
    ]
  };
};

exports.addUglifyJsPlugin = (
  { beautify, sourceMap, mangle, warnings, comments } = {
    beautify: false,
    sourceMap: true,
    mangle: false,
    warnings: true,
    comments: true
  }
) => {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        beautify,
        sourceMap,
        mangle,
        compress: {
          warnings,
          screw_ie8: true
        },
        comments
      })
    ]
  };
};
