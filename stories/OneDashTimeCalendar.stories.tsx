import React from "react";
import { storiesOf } from "@storybook/react";
import OneDashCard from "../src/OneDashCard/OneDashCard";
import OneDashTimeCalendar from "../src/OneDashTimeCalendar/OneDashTimeCalendar";
import dayjs from "dayjs";

interface WorkingSchema {
	numberOfDays: number;
	workingDays: {
		days: number[];
		startingHour: number;
		startingMinute: number;
		endHour: number;
		endMinute: number;
	}[];
}

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

interface Appointment {
	timestamp_from: string | number;
	timestamp_to: string | number;
	type?: "out-of-office" | "appointment" | "full-day";
	repeatWeekly?: "1" | "0";
	fullDayDate?: string;
	fullDay?: "1" | "0";
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

storiesOf("Time Calendar", module)
	.add("default", () => (
		<OneDashCard maxWidth={800}>
			<OneDashTimeCalendar appointments={[]} slotMinutes={30} startDate={new Date().getTime()} workingSchema={workingSchema} />
		</OneDashCard>
	))
	.add("preselected appointments", () => (
		<OneDashCard maxWidth={800}>
			<OneDashTimeCalendar
				appointments={appointments}
				slotMinutes={30}
				startDate={new Date().getTime()}
				workingSchema={workingSchema}
			/>
		</OneDashCard>
	))
	.add("monthly view", () => (
		<OneDashCard maxWidth={1200}>
			<OneDashTimeCalendar
				appointments={appointments}
				slotMinutes={30}
				startDate={new Date().getTime()}
				workingSchema={workingSchema}
				defaultType="month"
			/>
		</OneDashCard>
	));
