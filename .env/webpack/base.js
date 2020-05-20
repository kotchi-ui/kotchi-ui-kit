const path = require("path");
const __rootDir = "../..";

const conf = {
	module: {
		rules: [
			{
				test: /\.html$/,
				use: ["html-loader"],
			},
			{
				test: /\.s[ac]ss$/i,
				use: ["css-to-string-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.css$/i,
				use: ["css-to-string-loader", "css-loader"],
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
						plugins: [
							"@babel/plugin-proposal-object-rest-spread",
							["@babel/plugin-proposal-decorators", { legacy: true }],
							["@babel/plugin-proposal-class-properties", { loose: true }]						],
					},
				},
			},
		],
	},
	output: {
		path: path.resolve(__dirname, `${__rootDir}/dist`),
		filename: "[name].js",
		library: ["kotchiUI", "[name]"],
		libraryTarget: "umd",
	},
};

module.exports = conf;
