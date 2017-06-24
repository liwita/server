const nodeExternals = require('webpack-node-externals');

exports.setBail = ({ enable }) => ({
  bail: enable
});

exports.setWatchMode = (
  { enable, cache, options } = {
    enable: false,
    cache: false,
    options: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: [/dist/, /node_modules/]
    }
  }
) => {
  return {
    cache,
    watch: enable,
    watchOptions: options
  };
};

exports.setName = ({ name }) => ({
  name
});

exports.setEntry = ({ entry }) => ({
  entry
});

exports.setOutput = ({ filename, path, publicPath, pathinfo, devtoolModuleFilenameTemplate }) => ({
  output: {
    filename,
    path,
    publicPath,
    pathinfo,
    devtoolModuleFilenameTemplate
  }
});

exports.setResolve = ({ extensions }) => ({
  resolve: {
    extensions
  }
});

exports.setContextPath = ({ path }) => ({
  context: path
});

exports.setDevServer = ({ options }) => ({
  devServer: options
});

exports.targetNode = () => ({
  target: 'node',
  externals: [nodeExternals()],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  }
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type
});

exports.addTypeScriptLintLoader = (
  { include, exclude, options } = { include: '', exclude: '', options: '' }
) => ({
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include,
        exclude,
        enforce: 'pre',
        loader: 'tslint-loader',
        options
      }
    ]
  }
});

exports.addTypeScriptLoader = (
  { include, exclude, options } = { include: '', exclude: '', options: '' }
) => ({
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include,
        exclude,
        loader: 'ts-loader',
        options
      }
    ]
  }
});

exports.addBabelJavaScriptLoader = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include,
        exclude,
        loader: 'babel-loader',
        options
      }
    ]
  }
});

/**
 * Link: https://github.com/webpack-contrib/source-map-loader
 */
exports.addSourceMapLoader = () => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: 'source-map-loader'
      }
    ]
  }
});
