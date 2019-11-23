import React from "react";
import "./OneDashCard.scss";

export interface OneDashCardProps {
	className?: string;
	title?: string;
	tableCard?: boolean;
	maxWidth?: number;
}

class OneDashCard extends React.Component<OneDashCardProps, any> {
	getClasses = () => {
		let classList = "onedash-card";
		if (this.props.className) {
			classList += " " + this.props.className;
		}
		if (this.props.tableCard) {
			classList += " onedash-table-card";
		}
		return classList;
	};
	render() {
		return (
			<div style={{ maxWidth: this.props.maxWidth }} className={this.getClasses()}>
				{this.props.title && <h2 className="card-headding">{this.props.title}</h2>}

				<div className="card-content">{this.props.children}</div>
			</div>
		);
	}
}

export default OneDashCard;
