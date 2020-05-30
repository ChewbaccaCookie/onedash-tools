import React from "react";
import StyleLoader from "../Utils/StyleLoader";
import { withKnobs, select } from "@storybook/addon-knobs";
import Card from "../Card/Card";
import DarkLightModeSwitch from "./DarkLightModeSwitch";
import { StyleLoaderStyle } from "../ToolTypes";
import Button from "../Form/Button/Button";

export default {
	title: "Theme Switch",
	decorators: [withKnobs],
};
export const defaultDialog = () => {
	let theme = select("theme", { light: "light", dark: "dark" }, "light");
	const changeMode = (t: any) => {
		theme = t;
	};
	return (
		<StyleLoader theme={theme}>
			<Card>
				<DarkLightModeSwitch cookie={true} onModeChange={changeMode} />
			</Card>
		</StyleLoader>
	);
};

export const overridingTheme = () => {
	let theme = select("theme", { light: "light", dark: "dark" }, "light");
	const additionalStyle: StyleLoaderStyle = {
		dark: {
			"tools-btn-primary": "#41ff50",
			"tools-text": "yellow",
		},
		light: {
			"tools-btn-primary": "#41ff50",
			"tools-text": "yellow",
		},
		all: {},
	};
	return (
		<StyleLoader additionalStyle={additionalStyle} theme={theme}>
			<Card title="LOREM IPSUM!">
				<p>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
					labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
					et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
					labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
					et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				</p>
				<Button>ICH BIN GRÜN!</Button>
			</Card>
		</StyleLoader>
	);
};
