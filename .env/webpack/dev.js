const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConf = require("./base");

module.exports = ["inline-source-map"].map((devtool) => ({
	...baseConf,
	mode: "development",
	entry: {
		ui: "./src/index.js",
	},
	devtool,
	optimization: {
		runtimeChunk: true,
	},
	devServer: {
		contentBase: path.join(__dirname, "../../dist"),
		compress: true,
		port: 9000,
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Playground",
			template: "./src/playground.html",
		}),
	],
}));
