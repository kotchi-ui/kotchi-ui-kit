const path = require("path");
const custom = require("../webpack/base.js");

module.exports = {
    stories: ["../../src/stories/kui-*.stories.js"],
    addons: ['@storybook/addon-knobs/register'],
	webpackFinal: (config) => {
		return { ...config, module: { ...config.module, rules: custom.module.rules } };
	},
};
