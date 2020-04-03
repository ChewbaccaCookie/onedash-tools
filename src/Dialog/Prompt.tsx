import React from "react";
import Dialog from "./Dialog";
import { ButtonMode } from "../Form/InputTypes";
import { DialogButton } from "./DialogTypes";
interface PromptDialogButtonOptions {
	event?: () => void;
	closeOnClick?: boolean;
	mode?: ButtonMode;
	text?: string;
}

interface PromptDialogOptions {
	text: string;
	title: string;
	accept?: PromptDialogButtonOptions;
	cancel?: PromptDialogButtonOptions;
	dialogRef?: React.RefObject<Dialog>;
	isOpen?: boolean;
}
export default function Prompt({ isOpen, dialogRef, accept, cancel, title, text }: PromptDialogOptions) {
	const buttons: DialogButton[] = [
		{
			type: "close",
			closeOnClick: cancel?.closeOnClick,
			mode: cancel?.mode ? cancel.mode : "light",
			text: cancel?.text ? cancel.text : "Abbrechen",
			onClick: cancel?.event,
		},
		{
			type: "save",
			closeOnClick: accept?.closeOnClick,
			mode: accept?.mode ? accept?.mode : "success",
			text: accept?.text ? accept?.text : "Akzeptieren",
			onClick: accept?.event,
			submitButton: true,
		},
	];
	return (
		<Dialog
			isOpen={isOpen}
			ref={dialogRef}
			onClose={cancel?.event}
			className="prompt"
			title={title}
			buttons={buttons}
			settings={{ showX: false, maxWidth: 500 }}>
			<p>{text}</p>
		</Dialog>
	);
}
