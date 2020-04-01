import * as React from "react";
import { Component } from "react";
import dayjs from "dayjs";

export interface LegendProps {
	workingHours: WorkingDay[];
	cellSize: number;
}

class Legend extends Component<LegendProps> {
	generateWorkingTimes = () => {
		const earliestTime = this.props.workingHours.sort((a, b) => a.startingHour - b.startingHour)[0];
		const latestTimeSort = this.props.workingHours.sort((a, b) => a.endHour - b.endHour);
		const latestTime = latestTimeSort[latestTimeSort.length - 1];
		if (!latestTime) return [];
		const timeCells: TimeCell[] = [];
		const minuteNum = dayjs()
			.set("h", latestTime.endHour)
			.set("m", latestTime.endMinute)
			.diff(
				dayjs()
					.set("h", earliestTime.startingHour)
					.set("m", earliestTime.startingMinute),
				"minute"
			);
		const count = minuteNum / this.props.cellSize;

		let date = dayjs()
			.set("hour", earliestTime.startingHour)
			.set("minute", earliestTime.startingMinute);
		for (let i = 0; i < count; i++) {
			timeCells.push({
				startDate: date.toDate().getTime(),
				endDate: date
					.clone()
					.add(this.props.cellSize, "minute")
					.toDate()
					.getTime(),
			});
			date = date.add(this.props.cellSize, "minute");
		}
		return timeCells;
	};
	render() {
		const timeCells = this.generateWorkingTimes();
		return (
			<div className="onedash-time-legend">
				<div className="onedash-time-legend__header">Uhrzeit</div>
				<div className="onedash-time-legend__content">
					{timeCells.map((cell, i) => (
						<div key={i} className="onedash-time-legend__cell">
							{dayjs(cell.startDate).format("HH:mm")}
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default Legend;
