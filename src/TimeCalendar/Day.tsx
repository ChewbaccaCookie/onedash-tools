import * as React from "react";
import { Component } from "react";
import dayjs from "dayjs";
import OneDashCell from "./Cell";
import Utils from "../Utils/Utils";

export interface DayProps {
	//Weekly 0 - 6; Monthly 0 - 30
	dayOfInterval: number;
	date: TimeStamp;
	//Height of the cell => e.g. 30 minutes
	cellSize: number;
	appointments: Appointment[];
	workingHours: WorkingDay[];
	isNonWorkingDay?: boolean;
	onAddAppointment: (appointment: Appointment) => void;
	onDelete: (appointment: Appointment) => void;
	onChange: (id: number, appointment: Appointment) => void;
	type: TimeCalendarTypes;
}

class Day extends Component<DayProps> {
	mouseClick = false;
	startingIndex = -1;
	state = {
		timeCells: [] as TimeCell[],
		appointments: [] as Appointment[],
	};
	generateTimeCells = () => {
		const timeCells: TimeCell[] = [];

		this.setState({ timeCells });
		let date = dayjs(this.props.date);
		const workingHours = this.props.workingHours.filter((wh) => wh.days.includes(this.props.dayOfInterval));

		if (workingHours.length === 0) return;
		const earliestTime = this.props.workingHours.sort((a, b) => a.startingHour - b.startingHour)[0];

		const end = workingHours[workingHours.length - 1];
		const start = workingHours[0];

		const endDate = date
			.clone()
			.set("hour", end.endHour)
			.set("minute", end.endMinute);
		const startDate = date
			.clone()
			.set("hour", start.startingHour)
			.set("minute", start.startingMinute);

		//Add prescending time slots if there are different starting times
		const prescendingNum = startDate.diff(
			date
				.clone()
				.set("hour", earliestTime.startingHour)
				.set("minute", earliestTime.startingMinute),
			"minute"
		);
		date = date.set("hour", earliestTime.startingHour).set("minute", earliestTime.startingMinute);
		for (let i = 0; i < prescendingNum / this.props.cellSize; i++) {
			timeCells.push({
				isNonWorking: true,
				startDate: date.toDate().getTime(),
				endDate: date
					.clone()
					.add(this.props.cellSize, "minute")
					.toDate()
					.getTime(),
			});
			date = date.add(this.props.cellSize, "minute");
		}

		const minuteNum = endDate.diff(startDate, "minute");
		const count = minuteNum / this.props.cellSize;

		date = date.set("hour", start.startingHour).set("minute", start.startingMinute);

		for (let i = 0; i < count; i++) {
			const isWorking = this.props.workingHours.find((wh) => {
				if (!wh.days.includes(this.props.dayOfInterval)) {
					return false;
				}
				const startTime = date
					.clone()
					.set("h", wh.startingHour)
					.set("m", wh.startingMinute);
				const endTime = date
					.clone()
					.set("h", wh.endHour)
					.set("m", wh.endMinute);
				return (
					date
						.clone()
						.add(1, "millisecond")
						.isAfter(startTime) &&
					date
						.clone()
						.add(1, "millisecond")
						.isBefore(endTime)
				);
			});

			const endDate = date
				.clone()
				.add(this.props.cellSize, "minute")
				.toDate()
				.getTime();
			const startDate = date.toDate().getTime();

			//Search for a appointment which is matching
			const appointment = this.props.appointments.find((a) => {
				if (String(a.repeatWeekly) === "1") {
					const dayOfWeek = dayjs(a.timestamp_from).day();
					if (dayjs(startDate).day() === dayOfWeek) {
						const u = Utils.removeDate;
						const t =
							u(a.timestamp_from as number) <= u(startDate) && u(a.timestamp_to as number) >= u(endDate);
						return t;
					} else {
						return false;
					}
				} else {
					return a.timestamp_from <= startDate && a.timestamp_to >= endDate;
				}
			});
			timeCells.push({
				startDate: startDate,
				endDate: endDate,
				isNonWorking: isWorking ? false : true,
				appointment,
			});
			date = date.add(this.props.cellSize, "minute");
		}

		this.setState({ timeCells });
	};

	componentDidMount() {
		this.generateTimeCells();
	}
	componentDidUpdate(lastProps: DayProps) {
		if (lastProps !== this.props) this.generateTimeCells();
	}

	generateClassName = () => {
		let className = "onedash-day";
		if (this.props.isNonWorkingDay) {
			className += " non-working-day";
		}
		return className;
	};

	mouseDown = (e: React.SyntheticEvent<HTMLDivElement, MouseEvent>) => {
		this.mouseClick = true;
		this.startingIndex = (e.target as any).getAttribute("data-index");
		const timeCells = this.state.timeCells;
		timeCells[this.startingIndex].selected = true;
		this.setState({ timeCells });
	};

	/**
	 * Event which will be triggered when a user has selected a time range
	 */
	mouseUp = (e: React.SyntheticEvent<HTMLDivElement, MouseEvent>) => {
		this.mouseClick = false;
		const timeCells = this.state.timeCells;
		const endIndex = (e.target as any).getAttribute("data-index");

		const timestampFrom =
			timeCells[this.startingIndex].startDate <= timeCells[endIndex].startDate
				? timeCells[this.startingIndex].startDate
				: timeCells[endIndex].startDate;
		const timestampTo =
			timeCells[this.startingIndex].endDate >= timeCells[endIndex].endDate
				? timeCells[this.startingIndex].endDate
				: timeCells[endIndex].endDate;

		// Add appointment on main element => Prop will be updated to display appointment
		this.props.onAddAppointment({
			timestamp_from: timestampFrom,
			timestamp_to: timestampTo,
			type: "out-of-office",
		});

		// Now Reset Styling =>
		//Reset Hover
		timeCells.forEach((cell) => {
			cell.hover = false;
		});

		timeCells[this.startingIndex].selected = false;
		this.setState({ timeCells });
		this.startingIndex = -1;
	};

	mouseHover = (e: any) => {
		if (this.mouseClick) {
			const currIndex = e.target.getAttribute("data-index");
			const timeCells = this.state.timeCells;
			timeCells.forEach((cell, index) => {
				if (
					(index > this.startingIndex && index < currIndex) ||
					(index < this.startingIndex && index > currIndex)
				) {
					cell.hover = true;
				} else {
					cell.hover = false;
				}
			});
			this.setState({ timeCells });
		}
	};

	generateDayName = () => {
		switch (this.props.type) {
			case "month":
				return dayjs(this.props.date).format("dd");
			case "week":
				return dayjs(this.props.date).format("dddd");
		}
	};
	generateDay = () => {
		switch (this.props.type) {
			case "month":
				return dayjs(this.props.date).format("DD");
			case "week":
				return dayjs(this.props.date).format("DD.MM.YYYY");
		}
	};

	toggleFullDay = () => {
		const fDate = dayjs(this.props.date).format("DD.MM.YYYY");
		const app = this.props.appointments.find((a) => a.fullDayDate === fDate);
		if (app) {
			this.props.onDelete(app);
		} else {
			this.props.onAddAppointment({
				fullDay: "1",
				fullDayDate: fDate,
				timestamp_from: Utils.setTime(this.props.date),
				timestamp_to: Utils.setTime(this.props.date, 23, 59, 59, 999),
				type: "full-day",
			});
		}
	};

	render() {
		const timeCells = this.state.timeCells;

		return (
			<div className={this.generateClassName()}>
				<div className="onedash-day__header" onClick={this.toggleFullDay}>
					<span className="bold">{this.generateDayName()}</span>
					<span>{this.generateDay()}</span>
				</div>
				<div className="onedash-day__content">
					{timeCells &&
						timeCells.map((cell, index) => (
							<OneDashCell
								onAdd={this.props.onAddAppointment}
								onDelete={this.props.onDelete}
								onChange={this.props.onChange}
								index={index}
								selected={cell.selected}
								hover={cell.hover}
								onMouseDown={this.mouseDown}
								onMouseUp={this.mouseUp}
								onMouseOver={this.mouseHover}
								key={index}
								appointment={cell.appointment}
								startDate={cell.startDate}
								endDate={cell.endDate}
								isNonWorking={cell.isNonWorking}
							/>
						))}
				</div>
			</div>
		);
	}
}

export default Day;
