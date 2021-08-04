const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin'),
      CopyPlugin = require('copy-webpack-plugin'),
      {CleanWebpackPlugin} = require('clean-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      OptimazeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'),
      TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development',
      isProd = !isDev;

const optimization = () => {
  const config = {
      splitChunks: {
      chunks: 'all'
    }
  }

  if(isProd) {
    config.minimizer = [
      new OptimazeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;
const cssLoaders = extra => {
  const loaders = [MiniCssExtractPlugin.loader, 'css-loader'];

  if(extra) { loaders.push(extra) };

  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './js/index.js',
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "src/favicon"), to: path.resolve(__dirname, "dist/favicon") },
        { from: path.resolve(__dirname, "src/icons"), to: path.resolve(__dirname, "dist/icons") },
        { from: path.resolve(__dirname, "src/img"), to: path.resolve(__dirname, "dist/img") }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ],
  optimization: optimization(),
  devServer: {
    port: 8080,
    hot: isDev
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader')
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      }
    ]
  }
}