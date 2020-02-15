interface GenericInputProps {
	name: string;
	placeholder?: string;
	readonly?: boolean;
	style?: any;
	className?: string | string[];
	disabled?: boolean;
	value?: any;
	_change: () => any;
	onChange: () => any;
}
interface GenericInputState {
	value?: any;
	valid: boolean;
	focus: boolean;
}
