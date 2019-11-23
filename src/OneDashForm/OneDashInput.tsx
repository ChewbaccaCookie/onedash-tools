import React from "react";
import OneDashUtils from "../OneDashUtils/OneDashUtils";
import Cleave from "cleave.js/react";
import { RangeDatePicker } from "@y0c/react-datepicker";
import dayjs, { Dayjs } from "dayjs";

export interface OneDashInputProps {
	label?: string;
	label2?: string;
	type?:
		| "text"
		| "password"
		| "number"
		| "email"
		| "tel"
		| "textarea"
		| "submit"
		| "cancel"
		| "euro"
		| "percent"
		| "boolean"
		| "date-range";
	required?: boolean;
	name: string;
	minLength?: number;
	maxLength?: number;
	showHint?: boolean;
	value?: string | Dayjs[];
	requiredNotVisible?: boolean;
	onChange?: Function;
	placeholder?: string;
	placeholder2?: string;
	iconRight?: string;
	readonly?: boolean;
	disabled?: boolean;
	validOnEnabled?: boolean;
}

class OneDashInput<T extends OneDashInputProps> extends React.Component<T, any> {
	id = OneDashUtils.generateGuid();

	inputRef = React.createRef<any>();

	state = {
		value: "",
		renderRangeDatePicker: true,
		valid: true,
	};

	public getInputValue = () => {
		let value = this.state.value;
		if (this.props.type === "boolean" || this.props.type === "number") {
			if (this.state.value === "") {
				value = "0";
				this.setState({ value });
			}
			value = String(value);
		}
		return {
			name: this.props.name,
			value,
		};
	};

	public validateInput = () => {
		let valid = true;
		if (this.props.required && this.state.value.length === 0) {
			valid = false;
		}
		if (this.props.minLength && this.state.value.length < this.props.minLength) {
			valid = false;
		}
		if (this.props.maxLength && this.props.maxLength > 0 && this.state.value.length > this.props.maxLength) {
			valid = false;
		}
		this.setState({
			valid,
		});
		return valid;
	};

	inputChange = (e: any, value2?: any) => {
		let value;
		if (this.props.type === "date-range") {
			value = [e, value2];
		} else if (this.props.type === "boolean") {
			value = e.target.checked === true ? "1" : "0";
		} else if (this.props.type === "number") {
			value = e.target.value ? e.target.value : 0;
		} else {
			value = e.target.value;
		}

		if (this.props.type === "euro") {
			value = value.replace("€", "");
		}
		this.setState(
			{
				value: value,
			},
			() => {
				if (this.props.onChange) this.props.onChange();
			}
		);
	};

	componentDidMount() {
		this.initValue(this.props.value);
	}
	componentDidUpdate(lastProps: OneDashInputProps) {
		if (this.props.value !== lastProps.value) {
			this.initValue(this.props.value);

			this.setState({ renderRangeDatePicker: false });
			setTimeout(() => {
				this.setState({ renderRangeDatePicker: true });
			}, 20);
		}
	}
	public resetInput = () => {
		this.setState({
			value: this.props.value || "",
			valid: true,
		});
	};

	public focus = () => {
		if (this.inputRef.current) {
			this.inputRef.current.focus();
		}
	};

	initValue = (value: any) => {
		if (value) {
			if (this.props.type === "euro") {
				this.formatPrice({ target: { value } });
			} else {
				this.setState({
					value,
				});
			}
		} else {
			if (this.props.type === "boolean") this.setState({ value: "0" });
			if (this.props.type === "number") this.setState({ value: 0 });
			if (this.props.type === "date-range") this.setState({ value: [dayjs(), dayjs()] });
		}
	};

	formatPrice = (e: any) => {
		let val = String(e.target.value)
			.replace("€", "")
			.replace(",", ".");
		if (val.length === 0 || val === "undefined") {
			val = "0";
		}
		val = String(Number(val).toFixed(2)).replace(".", ",");
		this.setState({
			value: val,
		});
	};
	removeInvalid = () => {
		this.setState({
			valid: true,
		});
	};

	renderInput = () => {
		if (this.state.value === null) {
			this.setState({
				value: "",
			});
		}
		if (this.props.readonly && this.props.type !== "date-range") {
			return <div className="onedash-input readonly">{this.state.value}</div>;
		}
		switch (this.props.type) {
		case "textarea":
			return (
				<textarea
					disabled={this.props.disabled}
					ref={this.inputRef}
					placeholder={this.props.placeholder}
					onChange={this.inputChange}
					value={this.state.value}
					onFocus={this.removeInvalid}
					className="onedash-input onedash-textarea-input"></textarea>
			);
		case "boolean":
			const checked = String(this.state.value) === "1" ? true : false;
			return (
				<label className="onedash-switch">
					<input
						disabled={this.props.disabled}
						ref={this.inputRef}
						id={this.id}
						type="checkbox"
						checked={checked}
						onChange={this.inputChange}
					/>
					<span className="slider"></span>
				</label>
			);
		case "password":
			return (
				<input
					disabled={this.props.disabled}
					ref={this.inputRef}
					placeholder={this.props.placeholder}
					onChange={this.inputChange}
					className="onedash-input"
					autoComplete="page-password"
					type="password"
					value={this.state.value}
					id={this.id}
					onFocus={this.removeInvalid}
				/>
			);
		case "date-range":
			if (this.state.renderRangeDatePicker) {
				return (
					<RangeDatePicker
						startPlaceholder={this.props.placeholder}
						endPlaceholder={this.props.placeholder2}
						dateFormat="DD.MM.YYYY"
						className="form-input"
						onChange={this.inputChange}
						showMonthCnt={1}
						disableDay={this.disableDay}
						initialStartDate={this.state.value[0] as any}
						initialEndDate={this.state.value[1] as any}
						startDay={this.state.value[0] as any}
						endDay={this.state.value[1] as any}
						readOnly={this.props.readonly}
					/>
				);
			} else {
				return <></>;
			}
		case "submit":
			return (
				<button disabled={this.props.disabled} className="onedash-button onedash-submit-button" type="submit">
					<span className="text">{this.props.value} </span>
				</button>
			);
		case "cancel":
			return (
				<button disabled={this.props.disabled} className="onedash-button onedash-cancel-button" type="reset">
					<span className="text">{this.props.value} </span>
				</button>
			);
		case "euro":
			return (
				<Cleave
					disabled={this.props.disabled}
					options={{
						prefix: "€ ",
						numeral: true,
						numeralThousandsGroupStyle: "thousand",
						numeralDecimalMark: ",",
						delimiter: ".",
					}}
					className="onedash-input onedash-input-euro"
					onChange={this.inputChange}
					value={this.state.value}
					onBlur={this.formatPrice}
					placeholder={this.props.placeholder}
					onFocus={this.removeInvalid}
				/>
			);
		case "percent":
			return (
				<Cleave
					disabled={this.props.disabled}
					options={{ prefix: "% ", numeral: true, numeralPositiveOnly: true, numeralDecimalScale: 0 }}
					className="onedash-input onedash-input-euro"
					onChange={this.inputChange}
					value={this.state.value}
					placeholder={this.props.placeholder}
					onFocus={this.removeInvalid}
				/>
			);
		case "number":
			return (
				<input
					disabled={this.props.disabled}
					ref={this.inputRef}
					placeholder={this.props.placeholder}
					value={this.state.value}
					onChange={this.inputChange}
					className="onedash-input"
					type="number"
					id={this.id}
					onFocus={this.removeInvalid}
				/>
			);
		case "tel":
			return (
				<input
					disabled={this.props.disabled}
					ref={this.inputRef}
					placeholder={this.props.placeholder}
					value={this.state.value}
					onChange={this.inputChange}
					className="onedash-input"
					type="tel"
					id={this.id}
					onFocus={this.removeInvalid}
				/>
			);
		default:
			return (
				<input
					disabled={this.props.disabled}
					ref={this.inputRef}
					placeholder={this.props.placeholder}
					value={this.state.value}
					onChange={this.inputChange}
					className="onedash-input"
					type="text"
					id={this.id}
					onFocus={this.removeInvalid}
				/>
			);
		}
	};

	disableDay = (date: Dayjs) => {
		return date.isBefore(dayjs());
	};

	buildClassList = () => {
		let classList = "onedash-input-container";
		if (this.props.type === "submit") {
			classList += " onedash-submit-container";
		}
		if (this.props.iconRight) {
			classList += " input-icon-right";
		}
		if (!this.state.valid) {
			classList += " input-invalid";
		}
		return classList;
	};

	render() {
		return (
			<>
				<div className={this.buildClassList()}>
					{this.props.label && (
						<label className="onedash-label" htmlFor={this.id}>
							{this.props.label}
							{this.props.required === true && !this.props.requiredNotVisible && <span className="required">*</span>}
						</label>
					)}

					{this.renderInput()}
					{this.props.label2 && this.props.type === "date-range" && (
						<label className="onedash-label onedash-label2" htmlFor={this.id}>
							{this.props.label2}
							{this.props.required === true && !this.props.requiredNotVisible && <span className="required">*</span>}
						</label>
					)}
					{this.props.iconRight && <i className={this.props.iconRight}></i>}
					{this.props.showHint === true && <InputHint />}
				</div>
			</>
		);
	}
}

const InputHint = () => {
	return (
		<div className="onedash-input-hint">
			<h3>Voraussetzungen</h3>
			<ul>
				<li>
					<span className="hint-status" />
					Mindestens 8 Zeichen
				</li>
				<li>
					<span className="hint-status hint-status-success" />
					Maximal 32 Zeichen
				</li>
				<li>
					<span className="hint-status" />
					Mindestens 1 Nummer
				</li>

				<li>
					<span className="hint-status hint-status-success" />
					Mindestens 1 Großbuchstabe
				</li>
			</ul>
		</div>
	);
};

export default OneDashInput;
