import * as React from "react";
import { Component } from "react";
import OneDashPopover from "../OneDashPopover/OneDashPopover";
import OneDashInput from "../OneDashForm/OneDashInput";
import dayjs from "dayjs";
import OneDashUtils from "../OneDashUtils/OneDashUtils";

export interface OneDashCellProps extends TimeCell {
	onMouseDown: (e: React.SyntheticEvent<HTMLDivElement, MouseEvent>) => void;
	onMouseOver: (e: React.SyntheticEvent<HTMLDivElement, MouseEvent>) => void;
	onMouseUp: (e: React.SyntheticEvent<HTMLDivElement, MouseEvent>) => void;
	onDelete: (appointment: Appointment) => void;
	onChange: (id: number, appointment: Appointment) => void;
	onAdd: (appointment: Appointment) => void;
	index: number;
}

class OneDashCell extends Component<OneDashCellProps> {
	popover = React.createRef<OneDashPopover>();
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
			switch (this.props.appointment.type) {
				case "appointment":
					className += " booked booked__primary";
					break;
				case "full-day":
					className += " booked full-day";
					break;
				default:
					className += " booked";
			}
		}
		return className;
	};
	preventDragHandler = (e: any) => {
		e.preventDefault();
	};

	mouseDown = (e: any) => {
		if (!this.props.appointment) {
			this.props.onMouseDown(e);
		}
	};
	mouseUp = (e: any) => {
		if (this.props.appointment) {
			if (this.popover.current) this.popover.current.open();
		} else {
			this.props.onMouseUp(e);
		}
	};
	toggleRepeat = (value: "1" | "0") => {
		const appointment = this.props.appointment;

		if (appointment) {
			const a = OneDashUtils.clone(appointment);
			a.repeatWeekly = value;
			this.props.onChange(a.id, a);
		}
	};
	generateTitle = () => {
		if (!this.props.appointment) return undefined;
		const a = this.props.appointment;
		const from = dayjs(a.timestamp_from).format("HH:mm");
		const to = dayjs(a.timestamp_to).format("HH:mm");
		return `${from} - ${to}`;
	};
	render() {
		return (
			<div
				onDragStart={this.preventDragHandler}
				data-index={this.props.index}
				onMouseOver={this.props.onMouseOver}
				onMouseUp={this.mouseUp}
				onMouseDown={this.mouseDown}
				className={this.buildClassName()}>
				{this.props.appointment && (
					<OneDashPopover className="onedash-cell-popover" title={this.generateTitle()} ref={this.popover}>
						<OneDashInput
							value={this.props.appointment.repeatWeekly}
							className="full-width separated"
							onChange={this.toggleRepeat}
							type="boolean"
							name="repeat"
							label="Wöchentlich wiederholen"></OneDashInput>
						<button
							className="onedash-cell-popover-btn"
							onClick={() => this.props.appointment && this.props.onDelete(this.props.appointment)}>
							Termin löschen
						</button>
					</OneDashPopover>
				)}
			</div>
		);
	}
}

export default OneDashCell;
