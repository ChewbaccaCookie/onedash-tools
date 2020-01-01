import React from "react";
import OneDashInput, { OneDashInputProps } from "./OneDashInput";
import "./OneDashSelect.scss";
import OneDashUtils from "../OneDashUtils/OneDashUtils";
import Select from "react-select";
import OneDashMediaRender from "../OneDashMediaRender/OneDashMediaRender";
import AsyncSelect from "react-select/async";

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
	isSearchable?: boolean;
	native?: boolean;
	async?: boolean;
	loadOptions?: (inputValue) => Promise<ValueLabelPair[]>;
	preventDuplicateSearch?: boolean;
	timeout?: number;
}

export default class OneDashSelect extends OneDashInput<OneDashSelectProps> {
	id = OneDashUtils.generateGuid();
	isLoading = false;
	searchWaiting = false;
	latestSearchString = "";
	timeout: number | NodeJS.Timeout | null = null;

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
		if (this.props.styling) {
			switch (this.props.styling) {
				case "none":
					break;
				case "default":
					classList += " onedash-style-one";
					break;
				default:
					classList += " onedash-style-" + this.props.styling;
					break;
			}
		} else {
			classList += " onedash-style-one";
		}
		return classList;
	};

	public focus = () => {
		if (this.selectRef.current) {
			this.selectRef.current.focus();
			this.onFocus();
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

	inputChange = (e: ValueLabelPair | any, isNative: boolean) => {
		let value = e.value;
		if (isNative) {
			value = e.target.value;
		}
		if (value !== "invalid-input" || !this.props.required) {
			this.setState(
				{
					value,
				},
				() => {
					if (this.props.onChange) {
						this.props.onChange(value);
					}
					if (this.props.onFormChange) this.props.onFormChange();
				}
			);
		}
	};
	private timeoutFunc = (ms: number) => {
		return new Promise((resolve) => (this.timeout = setTimeout(resolve, ms)));
	};

	private loadAsyncOptions = (searchString: string) => {
		this.latestSearchString = searchString;

		return new Promise<ValueLabelPair[]>(async (resolve) => {
			if (this.props.timeout) {
				if (this.timeout) clearTimeout(this.timeout as NodeJS.Timeout);
				await this.timeoutFunc(this.props.timeout);
				this.timeout = null;
			}
			if (!this.isLoading) {
				this.isLoading = true;
				(this.props.loadOptions as any)(searchString).then((values) => {
					resolve(values);
					this.isLoading = false;
					if (this.searchWaiting) {
						this.searchWaiting = false;
						this.loadAsyncOptions(this.latestSearchString);
					}
				});
			} else {
				this.searchWaiting = true;
			}
		});
	};

	private loadOptions = () => {
		const options = this.props.options;
		this.setState({ options });
	};
	private loadSelected = () => {
		const value = this.props.value ? String(this.props.value) : undefined;
		this.setState({ value });
	};

	checkProps = () => {
		if (this.props.async) {
			if (!this.props.loadOptions) {
				throw new Error("You have to provide a loadOptions property if you want to load the options asnychron");
			}
			if (this.props.native) {
				throw new Error("Asynchron select is only possible if you use the custom select");
			}
		}
	};

	componentDidMount() {
		this.checkProps();
		this.loadOptions();
		this.loadSelected();
	}

	componentDidUpdate(lastProps: OneDashSelectProps) {
		// Default Value is defined
		if (this.props.value !== lastProps.value) {
			this.loadSelected();
		}
		if (this.props.options !== lastProps.options) {
			this.loadOptions();
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
					{!this.props.async && (
						<>
							{!this.props.native && (
								<>
									<OneDashMediaRender type="desktop">
										<Select
											classNamePrefix="onedash-select"
											placeholder={this.props.placeholder ? this.props.placeholder : "Wählen Sie ..."}
											options={this.state.options}
											value={this.props.options.find((o) => o.value === this.state.value)}
											onFocus={this.onFocus}
											onBlur={this.onBlur}
											onChange={(e) => this.inputChange(e, false)}
											className="onedash-select"
											id={this.id}
											isSearchable={this.props.isSearchable}
										/>
									</OneDashMediaRender>
									<OneDashMediaRender type="mobile">
										<select
											onBlur={this.onBlur}
											value={this.state.value}
											onFocus={this.onFocus}
											onChange={(e) => this.inputChange(e, true)}
											className="onedash-native-select">
											<option value="invalid-input">
												{this.props.placeholder ? this.props.placeholder : "Wählen Sie eine Option"}
											</option>
											{this.state.options.map((option, index) => (
												<option key={index} value={option.value}>
													{option.label}
												</option>
											))}
										</select>
									</OneDashMediaRender>
								</>
							)}
							{this.props.native === true && (
								<select
									onBlur={this.onBlur}
									value={this.state.value}
									onFocus={this.onFocus}
									onChange={(e) => this.inputChange(e, true)}
									className="onedash-native-select">
									<option value="invalid-input">
										{this.props.placeholder ? this.props.placeholder : "Wählen Sie eine Option"}
									</option>
									{this.state.options.map((option, index) => (
										<option key={index} value={option.value}>
											{option.label}
										</option>
									))}
								</select>
							)}
							{this.props.native === false && (
								<Select
									classNamePrefix="onedash-select"
									placeholder={this.props.placeholder ? this.props.placeholder : "Wählen Sie ..."}
									options={this.state.options}
									value={this.props.options.find((o) => o.value === this.state.value)}
									onFocus={this.onFocus}
									onBlur={this.onBlur}
									onChange={(e) => this.inputChange(e, false)}
									className="onedash-select"
									id={this.id}
									isSearchable={this.props.isSearchable}
								/>
							)}
						</>
					)}
					{this.props.async && (
						<AsyncSelect
							classNamePrefix="onedash-select"
							placeholder={this.props.placeholder ? this.props.placeholder : "Wählen Sie ..."}
							defaultOptions={this.state.options}
							value={this.props.options.find((o) => o.value === this.state.value)}
							onFocus={this.onFocus}
							onBlur={this.onBlur}
							loadOptions={this.loadAsyncOptions}
							onChange={(e) => this.inputChange(e, false)}
							className="onedash-select"
							id={this.id}
							isSearchable={this.props.isSearchable}
						/>
					)}
				</div>
			</>
		);
	}
}
