import React from "react";
import "./styles/twenty.scss";
import SETTINGS from "../../Utils/Settings";

interface InputProps {
	type?: "button" | "submit" | "reset";
	mode?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link";
	className?: string;
	onClick?: () => void;
}

export default class Button extends React.Component<InputProps, any> {
	private buildClassName = () => {
		let className = "onedash-button";
		if (this.props.className) {
			className += " " + this.props.className;
		}
		className += ` btn-${this.props.mode ? this.props.mode : "primary"}`;
		className += " style-" + SETTINGS.style;
		return className;
	};

	render() {
		return (
			<button onClick={this.props.onClick} type={this.props.type ? this.props.type : "button"} className={this.buildClassName()}>
				{this.props.children}
			</button>
		);
	}
}
