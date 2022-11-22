const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  stats: {
    errorsCount: true,
    warningsCount: true,
    preset: 'errors-warnings',
    timings: false,
  },
  mode: 'development',
  entry: './src/index.js',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    onListening: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      const port = devServer.server.address().port;
      console.log('Listening on port:', port);
    },
    static: './dist',
    port: 3001,
    host: 'local-ipv4',
    hot: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  optimization: {
    runtimeChunk: 'single',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack config',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      // babel 
      // {
      //   test: /\.js$/,
      //   include: path.resolve(__dirname, 'src'),
      //   loader: 'babel-loader',
      // },
    ]
  }
}