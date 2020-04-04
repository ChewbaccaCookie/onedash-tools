import { addParameters } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { configure } from "@storybook/react";

configure(require.context("../src", true, /\.stories\.tsx$/), module);

addParameters({
	viewport: {
		viewports: INITIAL_VIEWPORTS,
	},
});
