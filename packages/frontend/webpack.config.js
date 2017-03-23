const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

var env = process.env['NODE_ENV'];
var isProduction = env && env.match(/production/);

var config = {
  context: path.join(__dirname, 'src'),
  entry: {
    main: 'main',
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'isomorphic-fetch',
      'redux',
      'react-redux',
      'redux-thunk',
      'glamor'
    ]
  },
  output: {
    path: path.join(__dirname, 'assets', 'build'),
    filename: '[name].min.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          compilerOptions: {
            module: 'es2015'
          }
        }
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [precss, autoprefixer]
              }
            }
          ]
        })
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'main.min.css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.min.js'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: isProduction,
      debug: !isProduction
    })
  ],
  devServer: {
    port: 8080,
    historyApiFallback: true,
    publicPath: '/assets/'
  }
};

if (isProduction) {
  // Production Mode
  config = Object.assign({}, config, {
    plugins: [
      ...config.plugins,
      new webpack.optimize.UglifyJsPlugin({
        minimize: true
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      })
    ]
  });
}

module.exports = config;
