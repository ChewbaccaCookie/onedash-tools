import * as React from "react";
import { Component } from "react";
import Header from "./Header";
import Content from "./Content";
import dayjs, { Dayjs } from "dayjs";
import "./styles/twenty.scss";
import "dayjs/locale/de"; // load on demand
import Utils from "../Utils/Utils";
import SETTINGS from "../Utils/Settings";
import { styles } from "../ToolTypes";
dayjs.locale("de");

export interface OneDashTimeCalendarProps {
	className?: string;
	appointments?: Appointment[];
	addAppointment?: (appointment: Appointment) => void;
	removeAppointment?: (appointment: Appointment) => void;
	changeAppointment?: (appointment: Appointment) => void;
	onStartDateChanged?: (startDate: TimeStamp, endDate: TimeStamp) => void;
	workingSchema: WorkingSchema;
	startDate?: TimeStamp;
	defaultType?: TimeCalendarTypes;
	slotMinutes: number;
	showWeekend?: boolean;
	style?: styles;
}

class TimeCalendar extends Component<OneDashTimeCalendarProps, any> {
	state = {
		appointments: [] as Appointment[],
		type: "week" as TimeCalendarTypes,
		workingHours: [] as WorkingDay[],
		startDate: new Date().getTime(),
	};
	getNumberOfDays = (startDate: Dayjs) => {
		switch (this.state.type) {
			case "month":
				return startDate.daysInMonth();
			case "week":
				if (this.props.showWeekend) {
					return 7;
				} else {
					return 5;
				}
		}
	};
	getEndDate = (startDate: Dayjs) => {
		const days = this.getNumberOfDays(startDate);
		return startDate.clone().add(days, "d").toDate().getTime();
	};
	getStartDate = () => {
		const date = dayjs(this.state.startDate);
		switch (this.state.type) {
			case "month":
				return date.startOf("month");
			case "week":
				return date.startOf("week");
		}
	};
	loadAppointments = () => {
		const appointments = this.props.appointments;
		if (appointments) {
			appointments.forEach((a, i) => {
				if (!a.id) a.id = i;
			});
			this.setState({ appointments });
		}
	};
	public setStartDate = (startDate: TimeStamp | undefined) => {
		this.setState({ startDate: startDate ? startDate : new Date().getTime() }, this.startDateHasChanged);
	};
	componentDidMount() {
		this.loadAppointments();
		this.setStartDate(this.props.startDate);
		if (this.props.defaultType) {
			this.setState({ type: this.props.defaultType });
		}
	}
	componentDidUpdate(lastProps: OneDashTimeCalendarProps) {
		if (lastProps.appointments !== this.props.appointments) {
			this.loadAppointments();
		}
		if (lastProps.startDate !== this.props.startDate) {
			this.setStartDate(this.props.startDate);
		}
	}

	addAppointment = (app: Appointment) => {
		let appointments = this.state.appointments;
		if (app && appointments) {
			app.id = Math.round(Math.random() * 1000000);
			if (this.props.addAppointment) this.props.addAppointment(app);
			appointments = appointments.concat(app);
			this.setState({ appointments });
		}
	};
	deleteAppointment = (app: Appointment) => {
		if (this.props.removeAppointment) this.props.removeAppointment(app);
		const appointments = this.state.appointments;
		if (app && appointments) {
			const i = appointments.indexOf(app);
			appointments.splice(i, 1);
			this.setState({ appointments });
		}
	};
	changeAppointment = (id: number, app: Appointment) => {
		const appointments = this.state.appointments;
		const index = appointments.findIndex((a) => a.id === id);
		appointments[index] = app;
		if (this.props.changeAppointment) this.props.changeAppointment(appointments[index]);
		this.setState({ appointments });
	};

	startDateHasChanged = () => {
		this.generateWorkingHours();
		if (this.props.onStartDateChanged)
			this.props.onStartDateChanged(this.getStartDate().toDate().getTime(), this.getEndDate(this.getStartDate()));
	};
	typeChange = (type: TimeCalendarTypes) => {
		this.setState({ type }, this.startDateHasChanged);
	};

	generateWorkingHours = () => {
		const startDate = this.getStartDate();
		const daysInMonth = this.getNumberOfDays(startDate);
		const workingSchema = Utils.clone(this.props.workingSchema);
		// Calculate offset between monday (index 0 in working hours) and startDate
		// E.g. -1 => Sunday

		const offset = -1 + startDate.get("day");
		let workingHours = [] as WorkingDay[];
		workingSchema.workingDays.forEach((d) => {
			const days = [] as number[];
			d.days.forEach((day) => {
				day = day - offset;
				let num = 0;
				while (day + num <= daysInMonth) {
					days.push(day + num);
					num += workingSchema.numberOfDays;
				}
			});
			d.days = days;
		});

		workingHours = workingSchema.workingDays;
		this.setState({ workingHours });
	};

	buildClassName = () => {
		let className = "onedash-time-calendar";
		if (this.props.style) {
			className += " style-" + this.props.style;
		} else {
			className += " style-" + SETTINGS.style;
		}
		return className;
	};

	render() {
		const startDate = this.getStartDate().toDate().getTime();

		const endDate = this.getEndDate(this.getStartDate());
		return (
			<div className={this.buildClassName()}>
				<Header
					setStartDate={this.setStartDate}
					currentType={this.state.type}
					defaultType={this.state.type}
					onTypeChange={this.typeChange}
					currentDate={this.state.startDate}
				/>
				<Content
					type={this.state.type}
					appointments={this.state.appointments}
					onDelete={this.deleteAppointment}
					onChange={this.changeAppointment}
					onAddAppointment={this.addAppointment}
					cellSize={this.props.slotMinutes}
					startDate={startDate}
					endDate={endDate}
					workingHours={this.state.workingHours}
				/>
			</div>
		);
	}
}

export default TimeCalendar;
