const path = require('path'),
  webpack = require('webpack'),
  dirName = path.resolve('./'),
  distdirName = path.resolve('../../../', 'js', 'art');

function createConfig(isDebug, options = {}) {
  let devTool = '',
    externals = [],
    plugins = [],
    appEntry = ['./_src/art-wallpaper.js'];

  if (isDebug) {
    devTool = 'eval-source-map';

    plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: false,
      output: {
        beautify: true,
        comments: true,
      },
      compress: {
        unused: false,
        drop_console: false,
        warnings: false
      }
    }), new webpack.HotModuleReplacementPlugin());

  } else {
    devTool = 'source-map';

    plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: true,
      output: {
        beautify: false,
        comments: false,
      },
      compress: {
        unused: true,
        drop_console: true,
        warnings: true
      }
    }), new webpack.BannerPlugin({
      banner: (options.banner || ''),
      raw: true
    }));
  }

  return {
    target: 'web',

    context: dirName,

    entry: {
      'art-wallpaper': appEntry
    },

    output: {
      filename: "[name].js",
      path: path.resolve(distdirName)
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              ["env", {
                "modules": false
              }]
            ]
          }
        },

        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        }
      ]
    },

    // https://webpack.js.org/configuration/devtool/
    devtool: devTool,

    plugins: plugins,

    devServer: {
      contentBase: './',
      noInfo: true,
      host: '',
      port: 9001,
      hot: true,
      inline: true
    }
  };
}

module.exports = createConfig;