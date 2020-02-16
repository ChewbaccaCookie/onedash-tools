import React from "react";
import { setStyle } from "./Settings";
interface StyleLoaderProps {
	style?: styles;
	theme?: "light" | "dark";
}
export default class StyleLoader extends React.Component<StyleLoaderProps> {
	constructor(props) {
		super(props);
		setStyle(this.props.style ? this.props.style : "twenty", this.props.theme ? this.props.theme : "light");
	}
	render() {
		return this.props.children;
	}
}
