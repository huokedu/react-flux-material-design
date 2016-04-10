const webpack = require('webpack');

module.exports = {
	entry: [
		'babel-polyfill',
		'./src/js/main.js'
	],
	output: {
		path: './dist',
		filename: 'bundle.js',
		publicpath: '/'
	},
	devServer: {
		inline: true,
		contentBase: './dist'
	},
	plugins: [
		new webpack.ProvidePlugin({
			'Moment': 'moment'
		})
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				// test: /\.(jsx|js)?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
					plugins: ['transform-runtime'],
					presets: ['es2015', 'react']
				}
			}, {
				  test: /\.css$/,
				  loader: 'style!css?modules',
				  include: /flexboxgrid/
			}
		]
	}
};