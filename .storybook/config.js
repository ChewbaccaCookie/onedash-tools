import { configure, addParameters, addDecorator } from "@storybook/react";
import { themes } from "@storybook/theming";
const req = require.context("../stories", true, /(.*)\.tsx/);

addParameters({
	options: {
		theme: themes.dark,
	},
});

function loadStories() {
	req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
