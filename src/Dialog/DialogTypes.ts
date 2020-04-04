import { ButtonMode } from "../Form/InputTypes";
import { styles } from "../ToolTypes";

export interface DialogProps {
	cssStyles?: React.CSSProperties;
	style?: styles;
	className?: string;
	isOpen?: boolean;
	closeable?: boolean;
	title?: string;
	onClose?: (forceClose?: boolean) => void;

	settings?: DialogSettings;
	buttons?: DialogButton[];
}
export interface DialogSettings {
	showX?: boolean;
	wrapperClickClose?: boolean;
	escapeClose?: boolean;
	maxWidth?: number;
}
export interface DialogButton {
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
