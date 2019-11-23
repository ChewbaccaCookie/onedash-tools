type dialogStyles = "default" | "ios";
type spinnerStyles = "dark" | "light";
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
