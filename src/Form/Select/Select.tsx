/* eslint-disable quotes */
import React from "react";
import GenericInput from "../Generic/GenericInput";
import MediaRender from "../../MediaRender/MediaRender";
import ReactSelect from "react-select";
import AsyncSelect from "react-select/async";
import "./styles/twenty.scss";

interface SelectSettings {
	requiredNotVisible?: boolean;
	searchTimeout?: number;
	searchable?: boolean;
}

interface SelectProps extends GenericInputProps {
	options?: ValueLabelPair[];
	settings?: SelectSettings;
	native?: boolean;
	required?: boolean;
	asyncLoad?: (inputValue: string) => Promise<ValueLabelPair[]>;
}

export default class Select extends GenericInput<SelectProps, any> {
	isLoading = false;
	searchWaiting = false;
	latestSearchString = "";
	timeout: number | null = null;

	constructor(props) {
		super(props);
		this.reference = React.createRef<any>();
	}

	protected _validate = () => {
		let valid = true;
		const value = this.state.value;
		if (this.props.required && (!value || value === "invalid-input")) {
			valid = false;
		}
		this.setState({ valid });
		return valid;
	};

	private timeoutFunc = (ms: number) => {
		return new Promise((resolve) => (this.timeout = Number(setTimeout(resolve, ms))));
	};
	private loadAsyncOptions = (searchString: string) => {
		this.latestSearchString = searchString;
		return new Promise<ValueLabelPair[]>(async (resolve) => {
			if (this.timeout) clearTimeout(this.timeout);
			await this.timeoutFunc(this.props.settings?.searchTimeout ? this.props.settings?.searchTimeout : 500);
			this.timeout = null;

			if (!this.isLoading && this.props.asyncLoad) {
				this.isLoading = true;
				this.props.asyncLoad(searchString).then((values) => {
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
	private inputChange = (value: any, native: boolean) => {
		this.resetted = false;
		if (native) {
			value = value !== undefined ? JSON.parse(value) : value;
		} else {
			value = value.value;
		}
		if (value !== "invalid-input") {
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

	private loadSelected = () => {
		const value = this.props.value ? this.props.value : undefined;
		this.setState({ value });
	};

	componentDidMount() {
		this.loadSelected();
	}

	componentDidUpdate(lastProps: SelectProps) {
		// Default Value is defined
		if (this.props.value !== lastProps.value) {
			this.loadSelected();
		}
	}

	render() {
		const options = this.props.options ? this.props.options : [];
		if (!this.props.required && !options.find((x) => x.value === "none")) {
			options.unshift({
				label: "Keine Auswahl",
				value: "none",
			});
		}

		const reactSelect = (
			<ReactSelect
				isDisabled={this.props.disabled}
				classNamePrefix="onedash-select"
				placeholder={this.props.placeholder ? this.props.placeholder : "Wählen Sie ..."}
				options={options}
				value={options.find((o) => o.value === this.state.value)}
				onFocus={this.onFocus}
				onBlur={this.onBlur}
				onChange={(e) => this.inputChange(e, false)}
				loadingMessage={() => "..."}
				noOptionsMessage={(res) => {
					return res.inputValue.length > 0 && res.inputValue.length < 200
						? `${res.inputValue} wurde nicht gefunden`
						: "...";
				}}
				className="onedash-select"
				id={this.id}
				isSearchable={this.props.settings?.searchable}
			/>
		);

		const nativeSelect = (
			<select
				placeholder={this.props.placeholder ? this.props.placeholder : "Wählen Sie ..."}
				disabled={this.props.disabled}
				onBlur={this.onBlur}
				value={this.state.value !== undefined ? JSON.stringify(this.state.value) : undefined}
				onFocus={this.onFocus}
				onChange={(e) => this.inputChange(e.target.value, true)}
				className="component">
				<option value={'"invalid-input"'}>
					{this.props.placeholder ? this.props.placeholder : "Wählen Sie ..."}
				</option>
				{options.map((option, index) => (
					<option key={index} value={JSON.stringify(option.value)}>
						{option.label}
					</option>
				))}
			</select>
		);

		return (
			<div className={this.buildClassList("onedash-select")}>
				{this.props.label && (
					<label className="onedash-label" htmlFor={this.id}>
						{this.props.label}
						{this.props.required === true && !this.props.settings?.requiredNotVisible && (
							<span className="required">*</span>
						)}
					</label>
				)}
				{!this.props.readonly && (
					<>
						{!this.props.asyncLoad && (
							<>
								{this.props.native === undefined && (
									<>
										<MediaRender type="desktop">{reactSelect}</MediaRender>
										<MediaRender type="mobile">{nativeSelect}</MediaRender>
									</>
								)}
								{this.props.native === true && <>{nativeSelect}</>}
								{this.props.native === false && <>{reactSelect}</>}
							</>
						)}

						{this.props.asyncLoad && (
							<AsyncSelect
								isDisabled={this.props.disabled}
								classNamePrefix="onedash-select"
								placeholder={this.props.placeholder ? this.props.placeholder : "Wählen Sie ..."}
								defaultOptions={this.props.options}
								value={options.find((o) => o.value === this.props.value)}
								onFocus={this.onFocus}
								onBlur={this.onBlur}
								loadOptions={this.loadAsyncOptions}
								onChange={(event) => this.inputChange(event, false)}
								className="onedash-select"
								id={this.id}
								isSearchable={this.props.settings?.searchable}
								loadingMessage={() => "..."}
								noOptionsMessage={(res) => {
									return res.inputValue.length > 0 && res.inputValue.length < 200
										? `${res.inputValue} wurde nicht gefunden`
										: "...";
								}}
							/>
						)}
					</>
				)}

				{this.props.readonly && (
					<p className="read-only">{options.find((x) => x.value === this.state.value)?.label}</p>
				)}
			</div>
		);
	}
}
