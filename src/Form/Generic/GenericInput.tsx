import React from "react";
import Utils from "../../Utils/Utils";
import SETTINGS from "../../Utils/Settings";

import "./styles/twenty.scss";

abstract class GenericInput<T extends GenericInputProps, S extends GenericInputState> extends React.Component<T, any, S> {
	protected id = Utils.generateGuid();
	protected reference: any;
	protected resetted = false;

	state = {
		value: undefined as undefined | string | number,
		valid: true,
		focus: false,
	};

	public validate = () => {
		const valid = this.props.onValidate ? this.props.onValidate(this.state.value) : true;
		return valid && this._validate();
	};

	public reset = () => {
		this.resetted = false;
		this.setState({
			value: undefined,
			valid: false,
		});
	};

	public getValue = (validate?: boolean) => {
		if ((validate && this.validate()) || !validate) {
			return this.state.value;
		} else {
			return false;
		}
	};

	protected onFocus = () => {
		this.setState({
			focus: true,
			valid: true,
		});
	};

	protected onBlur = () => {
		this.validate();
		this.setState({
			focus: false,
		});
		if (this.props.onBlur) this.props.onBlur(this.getValue());
	};

	protected buildClassList = () => {
		let classList = "onedash-input-container";
		if (this.props.style) {
			classList += " style-" + this.props.style;
		} else {
			classList += " style-" + SETTINGS.style;
		}

		if (this.state.focus) {
			classList += " focused";
		}
		if (!this.state.valid) {
			classList += " input-invalid";
		}
		if (this.props.className) {
			classList += " " + this.props.className;
		}
		return classList;
	};

	protected abstract _validate = (): boolean => {
		throw new Error("Valdiate is not implemented yet");
	};
}

export default GenericInput;
