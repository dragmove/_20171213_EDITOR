const path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  dirname = path.resolve('./');

const vendorModules = ['jquery'];

function createConfig(isDebug) {
  const devTool = (isDebug) ? 'eval-source-map' : 'source-map';

  let externals = [],

    plugins = [new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js'
    })];

  let cssLoader = {
    test: /\.css$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' }
    ]
  };

  let sassLoader = {
    test: /\.scss$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      { loader: 'sass-loader' }
    ]
  };

  const appEntry = ['./app/src/app.js'];

  if (!isDebug) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        drop_console: false,
        warnings: false
      },
      sourceMap: true,
      mangle: true,
      beautify: false
    }));

    plugins.push(new ExtractTextPlugin('[name].css'));

    cssLoader = {
      test: /\.css$/,

      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader']
      })
    };

    sassLoader = {
      test: /\.scss$/,

      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    };

  } else {
    plugins.push(new webpack.HotModuleReplacementPlugin());

    // appEntry.splice(0, 0, 'webpack-hot-middleware/client');
  }

  return {
    target: 'web',

    entry: {
      app: appEntry,
      vendor: vendorModules
    },

    output: {
      filename: '[name].js',
      path: path.join(dirname, 'build'),
      publicPath: '/build/'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },

        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
        },

        {
          test: /\.(gif|png|jpg|jpeg)$/,
          use: [{
            loader: 'file-loader'
          }]
        },

        {
          test: /\.(woff|woff2|ttf|eot|svg)$/,
          use: [{
            loader: 'url-loader'
          }]
        },

        cssLoader,

        sassLoader
      ]
    },

    devtool: devTool,

    externals: externals,

    plugins: plugins,

    devServer: {
      contentBase: './app',
      noInfo: true, //  --no-info option
      // host: '',
      port: 9000,
      hot: true,
      inline: true
    },
  };
}

module.exports = createConfig;