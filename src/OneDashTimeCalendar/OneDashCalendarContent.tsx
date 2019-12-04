import * as React from "react";
import { Component } from "react";
import dayjs, { Dayjs } from "dayjs";
import OneDashDay from "./OneDashDay";
import OneDashTimeLegend from "./OneDashTimeLegend";

export interface OneDashCalendarContentProps {
	startDate: timeStamp;
	endDate: timeStamp;
	cellSize: number;
	appointments: Appointment[];
	workingHours: WorkingDay[];
	onAddAppointment: (appointment: Appointment) => void;
	onDelete: (appointment: Appointment) => void;
}

export interface OneDashCalendarContentState {}

class OneDashCalendarContent extends Component<OneDashCalendarContentProps, OneDashCalendarContentState> {
	startDate: Dayjs;
	endDate: Dayjs;
	generateDays = () => {
		this.startDate = dayjs(this.props.startDate)
			.set("h", 0)
			.set("m", 0)
			.set("s", 0);
		this.endDate = dayjs(this.props.endDate)
			.set("h", 0)
			.set("m", 0)
			.set("s", 0);
		const dayDiff = this.endDate.diff(this.startDate, "d");
		let date = this.startDate.clone();
		const days: number[] = [];

		for (let i = 0; i < dayDiff; i++) {
			days[i] = date.toDate().getTime();
			date = date.add(1, "day");
		}
		return days;
	};
	render() {
		const days = this.generateDays();
		return (
			<div className="onedash-calendar-content">
				<div className="onedash-calendar-content__days">
					<OneDashTimeLegend cellSize={this.props.cellSize} workingHours={this.props.workingHours} />
					{days.map((day, i) => (
						<OneDashDay
							onDelete={this.props.onDelete}
							onAddAppointment={this.props.onAddAppointment}
							key={i}
							dayOfInterval={i}
							appointments={this.props.appointments}
							cellSize={this.props.cellSize}
							isNonWorkingDay={false}
							date={day}
							workingHours={this.props.workingHours}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default OneDashCalendarContent;
