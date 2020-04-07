import * as React from "react";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import Select from "../Form/Select/Select";
dayjs.extend(weekOfYear);
export interface HeaderProps {
	currentDate: TimeStamp;
	onTypeChange: (type: TimeCalendarTypes) => void;
	setStartDate: (startDate: TimeStamp | undefined) => void;
	defaultType: TimeCalendarTypes;
	currentType: TimeCalendarTypes;
}

class Header extends React.Component<HeaderProps, any> {
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
				name =
					"KW " + dayjs(this.props.currentDate).week() + " - " + dayjs(this.props.currentDate).format("YYYY");
				break;
		}
		return name;
	};
	onTypeChange = (obj: { value: any; name: string }) => {
		this.props.onTypeChange(obj.value);
	};
	render() {
		return (
			<div className="onedash-calendar-header">
				<Select
					options={[
						{ label: "Woche", value: "week" },
						{ label: "Monat", value: "month" },
					]}
					placeholder="Wählen Sie eine Ansicht"
					required
					value={this.props.defaultType}
					name="type"
					onChange={this.onTypeChange}
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

export default Header;
