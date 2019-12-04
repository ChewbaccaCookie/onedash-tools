import * as React from "react";
import { OneDashSelect } from "..";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear);
export interface OneDashCalendarHeaderProps {
	currentDate: timeStamp;
	onTypeChange: (type: TimeCalendarTypes) => void;
	setStartDate: (startDate: timeStamp | undefined) => void;
	defaultType: TimeCalendarTypes;
	currentType: TimeCalendarTypes;
}

class OneDashCalendarHeader extends React.Component<OneDashCalendarHeaderProps, any> {
	changeStartDate = (next: boolean) => {
		let date = dayjs();
		switch (this.props.currentType) {
		case "month":
			if (next) {
				date = dayjs(this.props.currentDate).add(1, "month");
			} else {
				date = dayjs(this.props.currentDate).subtract(1, "month");
			}
			break;
		case "week":
			if (next) {
				date = dayjs(this.props.currentDate).add(1, "week");
			} else {
				date = dayjs(this.props.currentDate).subtract(1, "week");
			}
			break;
		}
		const newDate = date.toDate().getTime();
		this.props.setStartDate(newDate);
	};
	generateName = () => {
		let name = "";
		switch (this.props.currentType) {
		case "month":
			name = dayjs(this.props.currentDate).format("MMMM YYYY");
			break;
		case "week":
			name = "KW " + dayjs(this.props.currentDate).week() + " - " + dayjs(this.props.currentDate).format("YYYY");
			break;
		}
		return name;
	};
	render() {
		return (
			<div className="onedash-calendar-header">
				<OneDashSelect
					options={[
						{ label: "Woche", value: "week" },
						{ label: "Monat", value: "month" },
					]}
					placeholder="Wählen Sie eine Ansicht"
					required
					value={this.props.defaultType}
					name="type"
					onChange={this.props.onTypeChange}
				/>
				<div className="onedash-calendar-header-controls">
					<button onClick={() => this.changeStartDate(false)}>&lt;</button>
					<span>{this.generateName()}</span>
					<button onClick={() => this.changeStartDate(true)}>&gt;</button>
				</div>
			</div>
		);
	}
}

export default OneDashCalendarHeader;
