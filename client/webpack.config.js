const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');




module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    //Add and configure workbox plugins for a service worker and manifest file.
    plugins: 
            [
      //Webpack plugin that generates our htm file and insers our bundles. 
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Text Editor'
      }),

      //Injects our custome service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        title: 'Text Editor',
        short_name: 'Editor',
        description: 'A quick way to check and edit your text.',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    //Add Babel to webpack.
    module: {
      //Add CSS loaders
      rules: [
        {
          tests: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        //Use babel-loader in order to use ES6
        {
          use:{
            loader: 'babel-laoder',
            options:{
              presets: ['@babel/preset-env'],
              plugins: ['@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};