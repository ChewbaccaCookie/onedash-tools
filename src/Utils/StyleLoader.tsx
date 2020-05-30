import React from "react";
import SETTINGS, { setStyle } from "./Settings";
import TWENTY_THEME from "../Styles/TWENTY_THEME";
import MINIMAL_THEME from "../Styles/MINIMAL_THEME";
import { StyleLoaderStyle, styles } from "../ToolTypes";

interface StyleLoaderProps {
	toolStyle?: styles;
	additionalStyle?: StyleLoaderStyle;
	theme?: "light" | "dark";
}
export default class StyleLoader extends React.Component<StyleLoaderProps> {
	getTheme = () => {
		let THEME: any;
		if (this.props.toolStyle === undefined || this.props.toolStyle === "twenty") THEME = TWENTY_THEME;
		if (this.props.toolStyle === "minimal") THEME = MINIMAL_THEME;

		SETTINGS.style = this.props.toolStyle ? this.props.toolStyle : "twenty";
		return THEME;
	};

	constructor(props: StyleLoaderProps) {
		super(props);
		setStyle(this.props.theme ?? "light", this.getTheme(), this.props.additionalStyle);
	}

	componentDidUpdate(lastProps: StyleLoaderProps) {
		if (
			lastProps.toolStyle !== this.props.toolStyle ||
			lastProps.theme !== this.props.theme ||
			lastProps.additionalStyle !== this.props.additionalStyle
		) {
			setStyle(this.props.theme ?? "light", this.getTheme(), this.props.additionalStyle);
		}
	}
	render() {
		return this.props.children;
	}
}
