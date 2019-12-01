type dialogStyles = "default" | "ios";
type spinnerStyles = "dark" | "light";
type timeStamp = number;
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
	timestamp_from: string | number;
	timestamp_to: string | number;
	repeatWeekly?: boolean;
	description?: string;
	type?: "out-of-office" | "appointment";
}
interface NonWorkingDay {
	date: timeStamp;
	description?: string;
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
