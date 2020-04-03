type TimeStamp = number;
type TimeCalendarTypes = "week" | "month";

interface Appointment {
	id?: number;
	timestamp_from: string | number;
	timestamp_to: string | number;
	repeatWeekly?: "1" | "0";
	description?: string;
	type?: "out-of-office" | "appointment" | "full-day";
	fullDayDate?: string;
	fullDay?: "1" | "0";
}
interface NonWorkingDay {
	date: TimeStamp;
	description?: string;
}

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
interface WorkingDay {
	days: number[];
	startingHour: number;
	startingMinute: number;
	endHour: number;
	endMinute: number;
}
interface TimeCell {
	startDate: TimeStamp;
	endDate: TimeStamp;
	appointment?: Appointment;
	isNonWorking?: boolean;
	hover?: boolean;
	selected?: boolean;
}
