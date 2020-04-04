import React from "react";
import Utils from "../../Utils/Utils";
import SETTINGS from "../../Utils/Settings";

import "./styles/twenty.scss";
import { GenericInputProps, GenericInputState } from "../InputTypes";

abstract class GenericInput<T extends GenericInputProps, S extends GenericInputState> extends React.Component<
	T,
	any,
	S
> {
	protected id = Utils.generateGuid();
	protected reference: any;
	protected resetted = false;

	state = {
		value: undefined as undefined | any,
		valid: true,
		focus: false,
	};

	public validate = () => {
		const valid = this.props.onValidate ? this.props.onValidate(this.state.value) : true;
		this.setState({ valid: valid && this._validate() });
		return valid && this._validate();
	};

	public focus = () => {
		if (this.reference?.current?.focus) {
			this.reference?.current?.focus();
			this.onFocus();
		}
	};

	public reset = () => {
		if (this.props.readonly) return;
		this.resetted = false;
		if (this.props.onChange) this.props.onChange({ name: this.props.name, value: undefined });
		if (this.props._change) this.props._change({ name: this.props.name, value: undefined });
		this.setState({
			value: undefined,
			valid: true,
		});
	};

	public getValue = (validate?: boolean) => {
		if ((validate && this.validate()) || !validate) {
			return { name: this.props.name, value: this.state.value };
		} else {
			return undefined;
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

	protected buildClassList = (componentName: string) => {
		let classList = `onedash-form-component ${componentName}`;
		if (this.props.style) {
			classList += " style-" + this.props.style;
		} else {
			classList += " style-" + SETTINGS.style;
		}
		if (this.state.value && this.state.value.length > 0) {
			classList += " filled";
		}

		if (this.state.focus) {
			classList += " focused";
		}
		if (this.props.label && this.props.label.length > 0) {
			classList += " has-label";
		}
		if (!this.state.valid) {
			classList += " input-invalid";
		}
		if (React.Children.toArray(this.props.children).length > 0) {
			classList += " has-children";
		}
		if (this.props.disabled) {
			classList += " disabled";
		}
		if (this.props.readonly) {
			classList += " read-only";
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
