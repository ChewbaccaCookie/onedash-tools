import TWENTY_THEME from "../Styles/TWENTY_THEME";

/**
 * Default Settings
 */
const SETTINGS = {
	style: "none",
};

export const setStyle = (style: styles, theme: "light" | "dark") => {
	SETTINGS.style = style;
	if (style === "twenty") {
		const t = TWENTY_THEME[theme];
		Object.keys(t).forEach((key) => {
			document.documentElement.style.setProperty(`--${key}`, t[key]);
		});
		Object.keys(TWENTY_THEME.all).forEach((key) => {
			document.documentElement.style.setProperty(`--${key}`, TWENTY_THEME.all[key]);
		});
	}
};

export default SETTINGS;
