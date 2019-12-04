import * as React from "react";
import { Component } from "react";

export interface OneDashCellProps extends TimeCell {
	onMouseDown: (e: React.SyntheticEvent<HTMLDivElement, MouseEvent>) => void;
	onMouseOver: (e: React.SyntheticEvent<HTMLDivElement, MouseEvent>) => void;
	onMouseUp: (e: React.SyntheticEvent<HTMLDivElement, MouseEvent>) => void;
	onDelete: (appointment: Appointment) => void;
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
		if (this.props.appointment) {
			// An appointment is available => Cell will be styled
			if (this.props.appointment.type === "appointment") {
				className += " booked booked__primary";
			} else {
				className += " booked";
			}
		}
		return className;
	};
	preventDragHandler = (e: any) => {
		e.preventDefault();
	};
	deleteAppointment = () => {
		if (this.props.appointment) {
			this.props.onDelete(this.props.appointment);
		}
	};
	mouseDown = (e: any) => {
		if (!this.props.appointment) {
			this.props.onMouseDown(e);
		}
	};
	render() {
		return (
			<div
				onClick={this.deleteAppointment}
				onDragStart={this.preventDragHandler}
				data-index={this.props.index}
				onMouseOver={this.props.onMouseOver}
				onMouseUp={this.props.onMouseUp}
				onMouseDown={this.mouseDown}
				className={this.buildClassName()}></div>
		);
	}
}

export default OneDashCell;
