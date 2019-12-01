import * as React from "react";
import { Component } from "react";
import dayjs from "dayjs";
import OneDashCell from "./OneDashCell";

export interface OneDashDayProps {
	//Weekly 0 - 6; Monthly 0 - 30
	dayOfInterval: number;
	date: timeStamp;
	//How height should be the cell => e.g. 30min
	cellSize: number;
	appointments: Appointment[];
	workingHours: WorkingDay[];
	isNonWorkingDay?: boolean;
}

class OneDashDay extends Component<OneDashDayProps> {
	mouseClick = false;
	startingIndex = -1;
	state = {
		timeCells: [] as TimeCell[],
	};
	generateTimeCells = () => {
		const timeCells: TimeCell[] = [];
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
			timeCells.push({
				startDate: date.toDate().getTime(),
				endDate: date
					.clone()
					.add(this.props.cellSize, "minute")
					.toDate()
					.getTime(),
				isNonWorking: isWorking ? false : true,
			});
			date = date.add(this.props.cellSize, "minute");
		}
		this.setState({ timeCells });
	};

	componentDidMount() {
		this.generateTimeCells();
	}
	componentDidUpdate(lastProps: OneDashDayProps) {
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
	mouseUp = (e: React.SyntheticEvent<HTMLDivElement, MouseEvent>) => {
		this.mouseClick = false;
		const timeCells = this.state.timeCells;
		const endIndex = (e.target as any).getAttribute("data-index");
		console.log(endIndex);

		//Reset Hover
		timeCells.forEach((cell) => {
			cell.hover = false;
		});

		timeCells[this.startingIndex].selected = true;
		this.setState({ timeCells });
		this.startingIndex = -1;
	};

	mouseHover = (e: any) => {
		if (this.mouseClick) {
			const currIndex = e.target.getAttribute("data-index");
			const timeCells = this.state.timeCells;
			timeCells.forEach((cell, index) => {
				if (index > this.startingIndex && index < currIndex) {
					cell.hover = true;
				} else {
					cell.hover = false;
				}
			});
			this.setState({ timeCells });
		}
	};

	render() {
		const timeCells = this.state.timeCells;
		return (
			<div className={this.generateClassName()}>
				<div className="onedash-day__header">
					<span className="bold">{dayjs(this.props.date).format("dddd")}</span>
					<span>{dayjs(this.props.date).format("DD.MM.YYYY")}</span>
				</div>
				<div className="onedash-day__content">
					{timeCells &&
						timeCells.map((cell, index) => (
							<OneDashCell
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

export default OneDashDay;
