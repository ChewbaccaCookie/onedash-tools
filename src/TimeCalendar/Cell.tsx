import * as React from "react";
import { Component } from "react";
import dayjs from "dayjs";
import Utils from "../Utils/Utils";
import ArrowBox from "../ArrowBox/ArrowBox";
import Boolean from "../Form/Boolean/Boolean";
import Button from "../Form/Button/Button";

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
	popover = React.createRef<ArrowBox>();
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
	toggleRepeat = (obj: { name: string; value: boolean }) => {
		const appointment = this.props.appointment;

		if (appointment) {
			const a = Utils.clone(appointment);
			a.repeatWeekly = obj.value === true ? 1 : 0;
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
					<ArrowBox className="onedash-cell-popover" title={this.generateTitle()} ref={this.popover}>
						<Boolean
							value={this.props.appointment.repeatWeekly}
							className="full-width separated"
							onChange={this.toggleRepeat}
							name="repeat"
							label="Wöchentlich wiederholen"
						/>
						<Button
							mode="link"
							className="onedash-cell-popover-btn"
							onClick={() => this.props.appointment && this.props.onDelete(this.props.appointment)}>
							Termin löschen
						</Button>
					</ArrowBox>
				)}
			</div>
		);
	}
}

export default OneDashCell;
