import React, { Component } from "react";
import Button from "../Form/Button/Button";

interface DButtonProps {
	button: DialogButton;
	hide: () => void;
}

export default class DButton extends Component<DButtonProps> {
	dbbutton = React.createRef<Button>();
	public focus = () => {
		if (this.dbbutton.current) {
			const button = this.dbbutton.current.getRef().current;
			if (button) button.focus();
		}
	};
	render() {
		const button = this.props.button;
		let buttonText = button.text;
		let buttonMode = button.mode;
		if (!buttonText) {
			switch (button.type) {
				case "save":
					buttonText = "Speichern";
					break;
				case "close":
					buttonText = "Schließen";
					break;
				case "default":
					buttonText = "MISSING TEXT";
					break;
			}
		}
		if (!buttonMode) {
			switch (button.type) {
				case "save":
					buttonMode = "primary";
					break;
				case "close":
					buttonMode = "light";
					break;
				case "default":
					buttonMode = "info";
					break;
			}
		}

		// Event Handler
		const buttonEvent = () => {
			if (!button.validateFunc || button.validateFunc() === true) {
				if (button.closeOnClick === undefined || button.closeOnClick === true) this.props.hide();
				if (button.onClick) button.onClick();
			}
		};

		return (
			<Button
				ref={this.dbbutton}
				type={button.submitButton === true ? "submit" : undefined}
				mode={buttonMode}
				onClick={buttonEvent}>
				{buttonText}
			</Button>
		);
	}
}
