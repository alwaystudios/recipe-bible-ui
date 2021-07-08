const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlWebpackTemplate = require('html-webpack-template')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const plugins = [
  new Dotenv({
    safe: false,
    allowEmptyValues: true,
    systemvars: true,
    silent: true,
    defaults: true,
  }),
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: 'global.[contenthash].css',
  }),
  new FaviconsWebpackPlugin('./src/public/favicon.png'),
  new HtmlWebpackPlugin({
    title: 'Recipe Bible',
    template: htmlWebpackTemplate,
    meta: {
      viewport: 'width=device-width, initial-scale=1',
    },
    bodyHtmlSnippet: '<div id="root"></div>',
  }),
]

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.ttf$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash][ext][query]',
        },
      },
      {
        test: /\.(png|jpe?g|svg|pdf)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        },
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          },
        ],
        exclude: [/node_modules/, /test/, /.*.test.ts$/],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins:
    process.env.ANALYSE_BUNDLE === 'true' ? [...plugins, new BundleAnalyzerPlugin()] : plugins,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          filename: 'vendors.[contenthash].js',
          chunks: 'all',
        },
      },
    },
  },
}
