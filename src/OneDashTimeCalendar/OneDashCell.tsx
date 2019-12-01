import * as React from "react";
import { Component } from "react";

export interface OneDashCellProps extends TimeCell {
	onMouseDown: (e: React.SyntheticEvent<HTMLDivElement, MouseEvent>) => void;
	onMouseOver: (e: React.SyntheticEvent<HTMLDivElement, MouseEvent>) => void;
	onMouseUp: (e: React.SyntheticEvent<HTMLDivElement, MouseEvent>) => void;
	index: number;
}

class OneDashCell extends Component<OneDashCellProps> {
	buildClassName = () => {
		let className = "onedash-cell";
		if (this.props.isNonWorking) {
			className += " non-working";
		}
		if (this.props.hover) {
			className += " hover";
		}
		if (this.props.selected) {
			className += " selected";
		}
		return className;
	};
	preventDragHandler = (e: any) => {
		e.preventDefault();
	};
	render() {
		return (
			<div
				onDragStart={this.preventDragHandler}
				data-index={this.props.index}
				onMouseOver={this.props.onMouseOver}
				onMouseUp={this.props.onMouseUp}
				onMouseDown={this.props.onMouseDown}
				className={this.buildClassName()}></div>
		);
	}
}

export default OneDashCell;
