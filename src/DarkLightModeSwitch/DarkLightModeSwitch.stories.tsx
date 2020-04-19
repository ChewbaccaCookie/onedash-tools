import React from "react";
import StyleLoader from "../Utils/StyleLoader";
import { withKnobs, select } from "@storybook/addon-knobs";
import Card from "../Card/Card";
import DarkLightModeSwitch from "./DarkLightModeSwitch";
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
