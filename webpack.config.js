const path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  dirName = path.resolve('./');

const vendorModules = ['jquery'];

function createConfig(isDebug, options = {banner: ''}) {
  let devTool = '',
    externals = [],
    plugins = [new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js'
    })],
    cssLoader = null,
    sassLoader = null;

  const appEntry = ['./app/src/app.js'];

  if (isDebug) {
    devTool = 'eval-source-map';

    plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
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

    cssLoader = {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' }
      ]
    };
  
    sassLoader = {
      test: /\.scss$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'sass-loader' }
      ]
    };

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
  }

  return {
    target: 'web',

    entry: {
      app: appEntry,
      vendor: vendorModules
    },

    output: {
      filename: '[name].js',
      path: path.join(dirName, 'build'),
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