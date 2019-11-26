import React from "react";
import { OneDashUtils } from "..";
import OneDashInput, { OneDashInputProps } from "./OneDashInput";
import "./OneDashSelect.scss";

export interface ValueLabelPair {
	label: string;
	value: any;
}
/**
 * Value is key value
 */
interface OneDashSelectProps extends OneDashInputProps {
	options: ValueLabelPair[];
	name: string;
	value?: any;
	onChange?: (value: any) => void;
}

export default class OneDashSelect extends OneDashInput<OneDashSelectProps> {
	id = OneDashUtils.generateGuid();

	selectRef = React.createRef<HTMLSelectElement>();

	state = {
		renderRangeDatePicker: false,
		value: undefined as any,
		valid: true,
		focus: false,
		options: [] as SelectValueLabelPair[],
	};
	public getInputValue = () => {
		const value = this.state.value;
		return {
			name: this.props.name,
			value,
		};
	};
	public validateInput = () => {
		let valid = true;
		if (this.props.required && (!this.state.value || this.state.value === "invalid-input")) {
			valid = false;
		}
		this.setState({
			valid,
		});
		return valid;
	};
	public resetInput = () => {
		this.setState({
			value: this.props.value || "",
			valid: true,
		});
	};
	buildClassList = () => {
		let classList = "onedash-input-container onedash-select-container";
		if (!this.state.valid) {
			classList += " input-invalid";
		}
		if (this.state.focus) {
			classList += " focused";
		}
		return classList;
	};

	public focus = () => {
		if (this.selectRef.current) {
			this.selectRef.current.focus();
		}
	};
	onFocus = () => {
		this.setState({
			valid: true,
			focus: true,
		});
	};

	onBlur = () => {
		this.setState({
			focus: false,
		});
	};

	inputChange = (e: any) => {
		const value = e.target.value;
		if (value !== "invalid-input" || !this.props.required) {
			this.setState(
				{
					value,
				},
				() => {
					if (this.props.onChange) this.props.onChange(value);
				}
			);
		}
	};

	private loadOptions = () => {
		const options = this.props.options;
		this.setState({ options });
	};
	private loadSelected = () => {
		const value = this.props.value ? String(this.props.value) : undefined;
		this.setState({ value });
	};

	componentDidMount() {
		this.loadOptions();
		this.loadSelected();
	}

	componentDidUpdate(lastProps: OneDashSelectProps) {
		// Default Value is defined
		if (this.props.value !== lastProps.value) {
			this.loadSelected();
		}
	}

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
					<select
						onBlur={this.onBlur}
						value={this.state.value}
						onFocus={this.onFocus}
						onChange={this.inputChange}
						className="onedash-select">
						<option value="invalid-input">{this.props.placeholder ? this.props.placeholder : "Wählen Sie eine Option"}</option>
						{this.state.options.map((option, index) => (
							<option key={index} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>
			</>
		);
	}
}
