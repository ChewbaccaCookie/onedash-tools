import Input from "./Form/Input/Input";

/**
 * Default Settings
 */
const settings = {
	style: "none",
};

const setStyle = (style: styles) => {
	settings.style = style;
};

export { Input, setStyle };
