import React from "react";
import { storiesOf } from "@storybook/react";
import OneDashCard from "../src/OneDashCard/OneDashCard";
import OneDashTimeCalendar from "../src/OneDashTimeCalendar/OneDashTimeCalendar";
import dayjs from "dayjs";

interface WorkingDay {
	days: number[];
	startingHour: number;
	startingMinute: number;
	endHour: number;
	endMinute: number;
}

const workingHours: WorkingDay[] = [
	{
		days: [0, 1, 2, 3, 4],
		startingHour: 8,
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
];

interface Appointment {
	timestamp_from: string | number;
	timestamp_to: string | number;
	type?: "out-of-office" | "appointment";
}
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
	},
];

storiesOf("Time Calendar", module)
	.add("default", () => (
		<OneDashCard maxWidth={800}>
			<OneDashTimeCalendar appointments={[]} cellSize={30} startDate={new Date().getTime()} workingHours={workingHours} type="Week" />
		</OneDashCard>
	))
	.add("preselected appointments", () => (
		<OneDashCard maxWidth={800}>
			<OneDashTimeCalendar
				appointments={appointments}
				cellSize={30}
				startDate={new Date().getTime()}
				workingHours={workingHours}
				type="Week"
			/>
		</OneDashCard>
	));
