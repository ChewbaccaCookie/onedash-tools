import React from "react";
import "./styles/twenty.scss";
import SETTINGS from "../../Utils/Settings";
import { ButtonProps } from "../InputTypes";

export default class Button extends React.Component<ButtonProps, any> {
	button = React.createRef<HTMLButtonElement>();
	private buildClassName = () => {
		let className = "onedash-button";
		if (this.props.className) {
			className += " " + this.props.className;
		}
		if (this.props.disabled) {
			className += " disabled";
		}
		className += ` btn-${this.props.mode ? this.props.mode : "primary"}`;
		className += " style-" + SETTINGS.style;
		return className;
	};

	private onClick = () => {
		if (this.button.current) this.button.current.blur();
		if (this.props.onClick) this.props.onClick();
	};

	public getRef = () => {
		return this.button;
	};

	render() {
		return (
			<button
				style={this.props.cssStyles}
				ref={this.button}
				disabled={this.props.disabled}
				onClick={this.onClick}
				type={this.props.type ? this.props.type : "button"}
				className={this.buildClassName()}>
				{this.props.children ? this.props.children : "Press me"}
			</button>
		);
	}
}
