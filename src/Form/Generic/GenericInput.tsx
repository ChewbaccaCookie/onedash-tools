import React, { Component } from "react";
import Utils from "../../Utils/Utils";

abstract class GenericInput<T extends GenericInputProps, S extends GenericInputState> extends Component<T, any, S> {
	protected id = Utils.generateGuid();
	protected reference: any;
	protected resetted = false;

	state = {
		value: undefined,
		valid: false,
		focus: false,
	};

	public validate = () => {
		return this._validate();
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

	protected abstract _validate = (): boolean => {
		throw new Error("Valdiate is not implemented yet");
	};
}

export default GenericInput;
