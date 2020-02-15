import React from "react";
import GenericInput from "../Generic/GenericInput";
import "./styles/twenty.scss";

interface InputOptions {
	requiredNotVisible: boolean;
	allowNumberNull: boolean;
	validateEmail: boolean;
}

interface InputProps extends GenericInputProps {
	required?: boolean;
	autoComplete?: string;
	minLength?: number;
	maxLength?: number;
	options?: InputOptions;
	type?: "text" | "password" | "number" | "email" | "tel" | "textarea";
}

class Input extends GenericInput<InputProps, any> {
	constructor(props) {
		super(props);
		this.reference = React.createRef<HTMLInputElement>();
	}

	private formatValue = (value?: any) => {
		if (value) {
			return value;
		} else {
			if (this.props.type === "number") {
				return 0;
			}
			return undefined;
		}
	};
	componentDidMount() {
		this.setState({ value: this.formatValue(this.props.value) });
	}
	componentDidUpdate(_lastProps: InputProps) {
		const t = JSON.stringify;
		if (
			(t(this.formatValue(this.props.value)) !== t(this.state.value) && this.resetted === true) ||
			_lastProps.value !== this.props.value
		) {
			this.setState({ value: this.formatValue(this.props.value) });
		}
	}

	protected _validate = () => {
		let valid = true;
		const value = this.state.value;
		if (this.props.required === true && String(value)?.length === 0) valid = false;
		if (this.props.minLength && String(value)?.length < this.props.minLength) valid = false;
		if (this.props.maxLength && this.props.maxLength > 0 && String(value)?.length > this.props.maxLength) valid = false;
		this.setState({ valid });
		return valid;
	};

	inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.resetted = false;
		let value: string | number = e.target.value;
		if (this.props.type === "number" && !this.props.options?.allowNumberNull) {
			value = value !== undefined ? value : 0;
		}
		if (value !== undefined) {
			this.setState(
				{
					value,
				},
				() => {
					if (this.props.onChange) this.props.onChange(value);
					if (this.props._change) this.props._change({ name: this.props.name, value });
				}
			);
		}
	};

	render() {
		return (
			<div className={this.buildClassList()}>
				{this.props.label && (
					<label className="onedash-label" htmlFor={this.id}>
						{this.props.label}
						{this.props.required === true && !this.props.options?.requiredNotVisible && <span className="required">*</span>}
					</label>
				)}
				<input
					placeholder={this.props.placeholder}
					onFocus={this.onFocus}
					ref={this.reference}
					type={this.props.type ? this.props.type : "text"}
					id={this.id}
					onChange={this.inputChange}
					value={this.state.value}
					onBlur={this.onBlur}
					autoComplete={this.props.autoComplete}
				/>
			</div>
		);
	}
}

export default Input;
