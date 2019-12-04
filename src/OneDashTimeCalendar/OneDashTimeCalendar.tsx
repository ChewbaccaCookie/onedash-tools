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
	appointments?: Appointment[];
	addAppointment?: (appointment: Appointment) => void;
	removeAppointment?: (appointment: Appointment) => void;
	workingHours: WorkingDay[];
	startDate: timeStamp;
	type: "Week" | "Month";
	cellSize: number;
}

class OneDashTimeCalendar extends Component<OneDashTimeCalendarProps, any> {
	state = {
		appointments: [] as Appointment[],
	};
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
	loadAppointments = () => {
		const appointments = this.props.appointments;
		if (appointments) {
			this.setState({ appointments });
		}
	};
	componentDidMount() {
		this.loadAppointments();
	}
	componentDidUpdate(lastProps: OneDashTimeCalendarProps) {
		if (lastProps.appointments !== this.props.appointments) {
			this.loadAppointments();
		}
	}

	addAppointment = (app: Appointment) => {
		let appointments = this.state.appointments;
		if (app && appointments) {
			appointments = appointments.concat(app);
			this.setState({ appointments });
		}
	};
	deleteAppointment = (app: Appointment) => {
		const appointments = this.state.appointments;
		if (app && appointments) {
			const i = appointments.indexOf(app);
			appointments.splice(i, 1);
			this.setState({ appointments });
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
					appointments={this.state.appointments}
					onDelete={this.deleteAppointment}
					onAddAppointment={this.addAppointment}
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
