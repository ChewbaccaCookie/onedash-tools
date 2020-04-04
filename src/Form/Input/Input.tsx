import React from "react";
import GenericInput from "../Generic/GenericInput";
import "./styles/twenty.scss";
import { GenericInputProps } from "../InputTypes";

interface InputSettings {
	requiredNotVisible: boolean;
	allowNumberNull: boolean;
	validateEmail: boolean;
}

interface InputProps extends GenericInputProps {
	required?: boolean;
	autoComplete?: string;
	minLength?: number;
	maxLength?: number;
	settings?: InputSettings;
	type?: "text" | "password" | "number" | "email" | "tel" | "textarea" | "search";
}

class Input extends GenericInput<InputProps, any> {
	constructor(props: GenericInputProps) {
		super(props);
		this.reference = React.createRef<HTMLInputElement>();
	}

	protected _validate = () => {
		let valid = true;
		const value = this.state.value;

		if (this.props.required === true && (value === undefined || String(value)?.length === 0)) valid = false;
		if (this.props.minLength && String(value)?.length < this.props.minLength) valid = false;
		if (this.props.maxLength && this.props.maxLength > 0 && String(value)?.length > this.props.maxLength)
			valid = false;
		if (value && this.props.type === "email" && this.emailValidation(String(value)) === false) valid = false;
		if (value && this.props.type === "tel" && this.phoneValidation(String(value)) === false) valid = false;
		return valid;
	};

	private emailValidation = (email: string) => {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email.toLowerCase());
	};

	private phoneValidation = (phoneNum: string) => {
		const re = /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/;
		return re.test(phoneNum.toLowerCase());
	};

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

	private inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.resetted = false;
		let value: string | number = e.target.value;
		if (this.props.type === "number" && !this.props.settings?.allowNumberNull) {
			value = value !== undefined ? value : 0;
		}
		if (value !== undefined) {
			this.setState(
				{
					value,
				},
				() => {
					if (this.props.onChange) this.props.onChange({ name: this.props.name, value });
					if (this.props._change) this.props._change({ name: this.props.name, value });
				}
			);
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
			this.setState({ value: this.formatValue(this.props.value), valid: true });
		}
	}

	render() {
		return (
			<div className={this.buildClassList("onedash-input")}>
				{this.props.label && (
					<label className="onedash-label" htmlFor={this.id}>
						{this.props.label}
						{this.props.required === true && !this.props.settings?.requiredNotVisible && (
							<span className="required">*</span>
						)}
					</label>
				)}
				{!this.props.readonly ? (
					<>
						<input
							disabled={this.props.disabled}
							className="component"
							placeholder={this.props.placeholder}
							onFocus={this.onFocus}
							ref={this.reference}
							type={this.props.type ? this.props.type : "text"}
							id={this.id}
							onChange={this.inputChange}
							value={this.state.value ? this.state.value : ""}
							onBlur={this.onBlur}
							autoComplete={this.props.autoComplete}
						/>
						{this.props.type === "search" && (
							<div className="search-icon" onClick={this.reset}>
								<div className="search-icon__circle"></div>
								<div className="search-icon__rectangle"></div>
							</div>
						)}
					</>
				) : (
					<>
						{this.props.type === "email" && (
							<a className="read-only" href={`mailto:${this.state.value}`}>
								{this.state.value}
							</a>
						)}
						{this.props.type === "tel" && (
							<a className="read-only" href={`tel:${this.state.value}`}>
								{this.state.value}
							</a>
						)}
						{this.props.type !== "email" && this.props.type !== "tel" && (
							<p className="read-only">{this.state.value}</p>
						)}
					</>
				)}
			</div>
		);
	}
}

export default Input;
