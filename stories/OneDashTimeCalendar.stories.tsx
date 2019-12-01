import React from "react";
import { storiesOf } from "@storybook/react";
import OneDashCard from "../src/OneDashCard/OneDashCard";
import OneDashTimeCalendar from "../src/OneDashTimeCalendar/OneDashTimeCalendar";

interface WorkingDay {
	days: number[];
	startingHour: number;
	startingMinute: number;
	endHour: number;
	endMinute: number;
}

const workingHours: WorkingDay[] = [
	{
		days: [0],
		startingHour: 7,
		startingMinute: 0,
		endHour: 20,
		endMinute: 0,
	},
	{
		days: [1, 2, 3, 4],
		startingHour: 8,
		startingMinute: 0,
		endHour: 12,
		endMinute: 0,
	},
	{
		days: [1, 2, 3],
		startingHour: 13,
		startingMinute: 0,
		endHour: 17,
		endMinute: 0,
	},
];

storiesOf("Time Calendar", module).add("default", () => (
	<OneDashCard maxWidth={800}>
		<OneDashTimeCalendar appointments={[]} cellSize={30} startDate={new Date().getTime()} workingHours={workingHours} type="Week" />
	</OneDashCard>
));
