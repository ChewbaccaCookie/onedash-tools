import React, { Component } from "react";
import "./styles/twenty.scss";
import SETTINGS from "../Utils/Settings";

export interface CardProps {
	cssStyles?: React.CSSProperties;
	style?: styles;
	className?: string;
	title?: string;
	maxWidth?: number;
}

class Card extends Component<CardProps, any> {
	getClasses = () => {
		let classList = "onedash-card";
		if (this.props.className) {
			classList += " " + this.props.className;
		}
		if (this.props.style) {
			classList += " style-" + this.props.style;
		} else {
			classList += " style-" + SETTINGS.style;
		}
		return classList;
	};
	render() {
		const styles = this.props.cssStyles ? this.props.cssStyles : {};
		if (this.props.maxWidth) styles.maxWidth = this.props.maxWidth;

		return (
			<div style={styles} className={this.getClasses()}>
				{this.props.title && <h2 className="card-headding">{this.props.title}</h2>}

				<div className="card-content">{this.props.children}</div>
			</div>
		);
	}
}

export default Card;
