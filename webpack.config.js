var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;

var libraryName = 'tinper-neoui-grid';

var plugins = [],
	outputFile;

if(env === 'build') {
	plugins.push(new UglifyJsPlugin({
		minimize: true
	}));
	outputFile = libraryName + '.min.js';
} else {
	outputFile = libraryName + '.js';
}

var config = {
	entry: __dirname + '/src/js/index.js',
	// devtool: 'source-map',
	output: {
		path: __dirname + '/dist',
		filename: outputFile,
		//library: 'u',
		libraryTarget: 'var',
		umdNamedDefine: true
	},
	module: {
		loaders: [{
			test: /(\.jsx|\.js)$/,
			loader: 'babel',
			exclude: /(bower_components)/
		}]
	},
	resolve: {
		root: path.resolve('./js'),
		extensions: ['', '.js']
	},
	plugins: plugins
};

module.exports = config;
