import { StyleLoaderStyle, styles } from "../ToolTypes";

/**
 * Default Settings
 */
const SETTINGS: { style: styles } = {
	style: "none",
};

export const setStyle = (theme: "light" | "dark", ...THEMES: (StyleLoaderStyle | undefined)[]) => {
	if (!THEMES || THEMES.length === 0) return;
	const masterTheme: any = {};

	THEMES.forEach((THEME) => {
		if (!THEME) return;
		masterTheme[theme] = { ...masterTheme[theme], ...THEME[theme] };
		masterTheme.all = { ...(masterTheme.all ?? undefined), ...THEME.all };
	});

	Object.keys(masterTheme[theme]).forEach((key) => {
		document.documentElement.style.setProperty(`--${key}`, masterTheme[theme][key]);
	});
	Object.keys(masterTheme.all).forEach((key) => {
		document.documentElement.style.setProperty(`--${key}`, masterTheme.all[key]);
	});
};

export default SETTINGS;
