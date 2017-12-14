var pkg = require('./package.json'),
  gulp = require('gulp'),
  webpack = require('webpack'),
  WebpackDevServer = require('webpack-dev-server'),
  eslint = require('gulp-eslint');

const $ = require('gulp-load-plugins')();

const webpackConfig = require('./webpack.config.js'),
  devConfig = webpackConfig(true),
  prodConfig = webpackConfig(false);

gulp.task('webpack-dev-server', function () {
  const compiler = webpack(devConfig);

  var server = new WebpackDevServer(compiler, devConfig.devServer);
  server.listen(devConfig.devServer.port, 'localhost', (err) => {
    if (err) console.error('[webpack-dev-server failed to start :', err);
  });
});

gulp.task('prod:build', function (callback) {
  const compiler = webpack(prodConfig);

  compiler.run((error, stats) => {
    if (error) throw new Error(error);
    callback();
  });
});

function banner() {
  return `/*
 * ${pkg.name} ${pkg.version}
 * ${pkg.homepage}
 *
 * The MIT License (MIT)
 * Copyright (c) 2016-2017 Hyun-Seok.Kim, dragmove@gmail.com
 */
`;
}

/*
 * run server - connect http://localhost:9000/webpack-dev-server
 */
/*
 const config = require('./webpack.config.js'),
 devConfig = config(true),
 prodConfig = config(false),
 devWebpack = webpack(devConfig),
 prodWebpack = webpack(prodConfig);

 gulp.task('dev:webpack-dev-server', function () {
 const server = new WebpackDevServer(devWebpack, devConfig.devServer);

 server.listen(devConfig.devServer.port, 'localhost', function (err) {
 if (err) console.error('[webpack-dev-server failed to start :', err);
 });
 });

 gulp.task('prod:build', function () {
 prodWebpack.run((error, stats) => {
 if (error) throw new Error(error);
 });
 });
 */