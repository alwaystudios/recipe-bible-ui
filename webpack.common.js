const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlWebpackTemplate = require('html-webpack-template')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
	entry: './src/index.tsx',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: [/node_modules/],
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
	plugins: [
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
		new FaviconsWebpackPlugin('./src/images/favicon.ico'),
		new HtmlWebpackPlugin({
			title: 'Recipe Bible',
			template: htmlWebpackTemplate,
			bodyHtmlSnippet: '<div id="root"></div>',
		}),
	],
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
