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

type ButtonMode = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link";
interface ButtonProps {
	type?: "button" | "submit" | "reset";
	mode?: ButtonMode;
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
	cssStyles?: React.CSSProperties;
}

interface DialogProps {
	cssStyles?: React.CSSProperties;
	style?: styles;
	className?: string;
	isOpen?: boolean;
	closeable?: boolean;
	title?: string;
	onClose?: () => void;

	settings?: DialogSettings;
	buttons?: DialogButton[];
}
interface DialogSettings {
	showX?: boolean;
	wrapperClickClose?: boolean;
	escapeClose?: boolean;
	maxWidth?: number;
}
interface DialogButton {
	type: "save" | "close" | "default";
	side?: "left" | "right";
	mode?: ButtonMode;
	text?: string;
	validateFunc?: () => boolean;
	onClick?: () => void;
	closeOnClick?: boolean;

	/**
	 * Use this option only once! It's used to define a default button.
	 *
	 * If the user presses enter. The popup will be closed with the event of the button
	 */
	submitButton?: boolean;
}
