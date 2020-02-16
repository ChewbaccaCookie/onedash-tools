interface GenericInputProps {
	name: string;
	label?: string;
	placeholder?: string;
	readonly?: boolean;
	style?: styles;
	className?: string | string[];
	disabled?: boolean;
	value?: any;
	_change?: (obj: { value: any; name: string }) => any;
	onChange?: (value: any) => any;
	onBlur?: (value: any) => any;
	onValidate?: (value: any) => boolean;
}
interface ValueLabelPair {
	label: string;
	value: any;
}
interface GenericInputState {
	value?: any;
	valid: boolean;
	focus: boolean;
}
