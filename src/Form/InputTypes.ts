/**
 * Thats a comment
 */

import { styles } from "../ToolTypes";

export interface GenericInputProps {
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

export interface GenericInputState {
	value?: any;
	valid: boolean;
	focus: boolean;
}

export type ButtonMode =
	| "primary"
	| "secondary"
	| "success"
	| "danger"
	| "warning"
	| "info"
	| "light"
	| "dark"
	| "link";
export interface ButtonProps {
	type?: "button" | "submit" | "reset";
	mode?: ButtonMode;
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
	cssStyles?: React.CSSProperties;
}
