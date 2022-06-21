const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    background: path.resolve(__dirname, './src/background.js'),
    injection: path.resolve(__dirname, './src/injection.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'public/manifest.json',
          to: '',
        },
        {
          from: 'assets/get_started128.png',
          to: 'assets',
        },
        {
          from: 'assets/get_started48.png',
          to: 'assets',
        },
        {
          from: 'assets/get_started32.png',
          to: 'assets',
        },
        {
          from: 'assets/get_started16.png',
          to: 'assets',
        },
        // {
        //   from: 'src/injection.js',
        //   to: 'injection.js',
        // },
      ],
    }),
  ],
};
