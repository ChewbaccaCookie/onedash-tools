import * as React from "react";
import { Component } from "react";
import OneDashCalendarHeader from "./OneDashCalendarHeader";
import OneDashCalendarContent from "./OneDashCalendarContent";
import dayjs, { Dayjs } from "dayjs";
import "./OneDashTimeCalendar.scss";
import "dayjs/locale/de"; // load on demand
dayjs.locale("de");

export interface OneDashTimeCalendarProps {
	className?: string;
	appointments: Appointment[];
	addAppointment?: (appointment: Appointment) => void;
	removeAppointment?: (appointment: Appointment) => void;
	workingHours: WorkingDay[];
	startDate: timeStamp;
	type: "Week" | "Month";
	cellSize: number;
}

class OneDashTimeCalendar extends Component<OneDashTimeCalendarProps, any> {
	getEndDate = (startDate: Dayjs) => {
		let days = 0;
		switch (this.props.type) {
		case "Month":
			days = startDate.daysInMonth();
			break;
		case "Week":
			days = 7;
			break;
		}
		return startDate
			.clone()
			.add(days, "d")
			.toDate()
			.getTime();
	};
	getStartDate = () => {
		const date = dayjs(this.props.startDate);
		switch (this.props.type) {
		case "Month":
			return date.startOf("month");
		case "Week":
			return date.startOf("week");
		}
	};
	render() {
		const startDate = this.getStartDate()
			.toDate()
			.getTime();
		const endDate = this.getEndDate(this.getStartDate());
		return (
			<div className="onedash-time-calendar">
				<OneDashCalendarHeader currentDate={this.props.startDate} />
				<OneDashCalendarContent
					cellSize={this.props.cellSize}
					startDate={startDate}
					endDate={endDate}
					workingHours={this.props.workingHours}
				/>
			</div>
		);
	}
}

export default OneDashTimeCalendar;
