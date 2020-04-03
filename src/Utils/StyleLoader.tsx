import React from "react";
import SETTINGS, { setStyle } from "./Settings";
import TWENTY_THEME from "../Styles/TWENTY_THEME";
import MINIMAL_THEME from "../Styles/MINIMAL_THEME";

interface StyleLoaderProps {
	toolStyle?: styles;
	additionalStyle?: StyleLoaderStyle;
	theme?: "light" | "dark";
}
export default class StyleLoader extends React.Component<StyleLoaderProps> {
	getTheme = () => {
		let THEME;
		if (this.props.toolStyle === undefined || this.props.toolStyle === "twenty") THEME = TWENTY_THEME;
		if (this.props.toolStyle === "minimal") THEME = MINIMAL_THEME;

		SETTINGS.style = this.props.toolStyle ? this.props.toolStyle : "twenty";
		return THEME;
	};

	constructor(props) {
		super(props);
		setStyle(this.getTheme(), this.props.theme ? this.props.theme : "light");
		setStyle(this.props.additionalStyle, this.props.theme ? this.props.theme : "light");
	}
	componentDidUpdate(lastProps: StyleLoaderProps) {
		if (lastProps.toolStyle !== this.props.toolStyle || lastProps.theme !== this.props.theme) {
			setStyle(this.getTheme(), this.props.theme ? this.props.theme : "light");
		}
		if (lastProps.additionalStyle !== this.props.additionalStyle || lastProps.theme !== this.props.theme) {
			setStyle(this.props.additionalStyle, this.props.theme ? this.props.theme : "light");
		}
	}
	render() {
		return this.props.children;
	}
}
