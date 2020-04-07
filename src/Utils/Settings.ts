import { StyleLoaderStyle, styles } from "../ToolTypes";

/**
 * Default Settings
 */
const SETTINGS: { style: styles } = {
	style: "none",
};

export const setStyle = (THEME: StyleLoaderStyle | undefined, theme: "light" | "dark") => {
	if (!THEME) return;
	const t = THEME[theme];
	Object.keys(t).forEach((key) => {
		document.documentElement.style.setProperty(`--${key}`, t[key]);
	});
	Object.keys(THEME.all).forEach((key) => {
		document.documentElement.style.setProperty(`--${key}`, THEME.all[key]);
	});
};

export default SETTINGS;
