/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { withKnobs, number, boolean } from "@storybook/addon-knobs";
import Card from "../Card/Card";
import TimeCalendar from "./TimeCalendar";
import dayjs from "dayjs";
import StyleLoader from "../Utils/StyleLoader";
import { action } from "@storybook/addon-actions";
export default {
	title: "TimeCalendar",
	decorators: [withKnobs],
};
const workingSchema: WorkingSchema = {
	numberOfDays: 7,
	workingDays: [
		{
			days: [0, 1, 3, 4],
			startingHour: 8,
			startingMinute: 0,
			endHour: 12,
			endMinute: 0,
		},
		{
			days: [2],
			startingHour: 10,
			startingMinute: 0,
			endHour: 12,
			endMinute: 0,
		},
		{
			days: [0, 1, 2, 3],
			startingHour: 13,
			startingMinute: 0,
			endHour: 17,
			endMinute: 0,
		},
	],
};
const date = dayjs().startOf("week");
const appointments: Appointment[] = [
	{
		timestamp_from: date
			.clone()
			.add(2, "d")
			.set("h", 13)
			.set("m", 0)
			.toDate()
			.getTime(),
		timestamp_to: date
			.clone()
			.add(2, "d")
			.set("h", 16)
			.set("m", 30)
			.toDate()
			.getTime(),
		type: "appointment",
	},
	{
		timestamp_from: date
			.clone()
			.add(4, "d")
			.set("h", 9)
			.set("m", 0)
			.toDate()
			.getTime(),
		timestamp_to: date
			.clone()
			.add(4, "d")
			.set("h", 11)
			.set("m", 30)
			.toDate()
			.getTime(),
		type: "out-of-office",
		repeatWeekly: "1",
	},
	{
		timestamp_from: date
			.clone()
			.add(1, "d")
			.set("h", 0)
			.set("m", 0)
			.toDate()
			.getTime(),
		timestamp_to: date
			.clone()
			.add(1, "d")
			.set("h", 23)
			.set("m", 59)
			.toDate()
			.getTime(),
		type: "full-day",
		fullDay: "1",
		fullDayDate: date.add(1, "d").format("DD.MM.YYYY"),
	},
];

export const timeCalendar = () => {
	const slotMinutes = number("slotMinutes", 30);
	const showWeekend = boolean("showWeekend", false);
	return (
		<StyleLoader>
			<Card maxWidth={1200}>
				<TimeCalendar
					appointments={appointments}
					slotMinutes={slotMinutes}
					startDate={new Date().getTime()}
					workingSchema={workingSchema}
					defaultType="month"
					addAppointment={action("addAppointment")}
					removeAppointment={action("removeAppointment")}
					changeAppointment={action("changeAppointment")}
					onStartDateChanged={action("onStartDateChanged")}
					showWeekend={showWeekend}
				/>
			</Card>
		</StyleLoader>
	);
};
