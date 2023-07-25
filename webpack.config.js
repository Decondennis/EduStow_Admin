const path = require('path');
const crypto = require('crypto');
const { ProvidePlugin } = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      fs: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      // Add other loaders for different file types if needed
    ]
  },
  plugins: [
    new ProvidePlugin({
      process: 'process/browser',
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};
