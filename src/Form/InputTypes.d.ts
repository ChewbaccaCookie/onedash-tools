/**
 * Thats a comment
 */

interface GenericInputProps {
	/**
	 * Name of the component.
	 */
	name: string;

	/**
	 * Optional name of the input
	 */
	label?: string;

	/**
	 * Optional placeholder
	 */
	placeholder?: string;

	/**
	 * Boolean which determines whether the input is read only
	 */
	readonly?: boolean;

	style?: styles;
	className?: string | string[];
	disabled?: boolean;
	value?: any;
	_change?: (obj: { value: any; name: string }) => any;
	onChange?: (obj: { value: any; name: string }) => any;
	onBlur?: (value: any) => any;
	onValidate?: (value: any) => boolean;
}

interface GenericInputState {
	value?: any;
	valid: boolean;
	focus: boolean;
}
