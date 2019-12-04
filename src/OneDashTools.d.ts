type dialogStyles = "default" | "ios";
type spinnerStyles = "dark" | "light";
type timeStamp = number;
type OneDashStyles = "none" | "default" | "one";
type TimeCalendarTypes = "week" | "month";
interface DialogProps {
	isOpen?: boolean;
	ref?: any;
	dialogStyle?: dialogStyles;
	closeable?: boolean;
	title?: string;
	onSaveButtonClick?: () => void;
	className?: string;
	closeByX?: boolean;
	maxWidth?: number;
	bigPadding?: boolean;
	closeBtnText?: string;
	saveBtnText?: string;
}
interface SelectValueLabelPair {
	value: string;
	label: string;
}
interface SpinnerProps {
	componentStyle?: spinnerStyles;
	defaultVisible?: boolean;
}

interface Appointment {
	id?: number;
	timestamp_from: string | number;
	timestamp_to: string | number;
	repeatWeekly?: "1" | "0";
	description?: string;
	type?: "out-of-office" | "appointment";
}
interface NonWorkingDay {
	date: timeStamp;
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
	startDate: timeStamp;
	endDate: timeStamp;
	appointment?: Appointment;
	isNonWorking?: boolean;
	hover?: boolean;
	selected?: boolean;
}
