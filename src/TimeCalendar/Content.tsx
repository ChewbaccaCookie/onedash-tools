import * as React from "react";
import { Component } from "react";
import dayjs, { Dayjs } from "dayjs";
import Day from "./Day";
import Legend from "./Legend";

export interface ContentProps {
	startDate: TimeStamp;
	endDate: TimeStamp;
	cellSize: number;
	appointments: Appointment[];
	workingHours: WorkingDay[];
	onAddAppointment: (appointment: Appointment) => void;
	onDelete: (appointment: Appointment) => void;
	onChange: (id, appointment: Appointment) => void;
	type: TimeCalendarTypes;
}

class Content extends Component<ContentProps> {
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
					<Legend cellSize={this.props.cellSize} workingHours={this.props.workingHours} />
					{days.map((day, i) => (
						<Day
							type={this.props.type}
							onDelete={this.props.onDelete}
							onChange={this.props.onChange}
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

export default Content;
