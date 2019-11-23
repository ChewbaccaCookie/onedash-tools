import React, { Component } from "react";
import OneDashDialog from "../OneDashDialog/OneDashDialog";

import "./PromptDialog.scss";

export interface PromptDialogProps {
	title: string;
	callback: Function;
}

export interface PromptDialogState {}

class PromptDialog extends Component<PromptDialogProps, PromptDialogState> {
	dialog = React.createRef<OneDashDialog>();
	public close = () => {
		const dialog = this.dialog.current;
		if (dialog) dialog.close(true);
	};
	public open = () => {
		const dialog = this.dialog.current;
		if (dialog) dialog.open();
	};
	render() {
		return (
			<OneDashDialog className="prompt-dialog" isOpen={false} ref={this.dialog} title={this.props.title}>
				<button className="prompt-no" onClick={() => this.props.callback(false)}>
					Nein
				</button>
				<button className="prompt-yes" onClick={() => this.props.callback(true)}>
					Ja
				</button>
			</OneDashDialog>
		);
	}
}

export default PromptDialog;
