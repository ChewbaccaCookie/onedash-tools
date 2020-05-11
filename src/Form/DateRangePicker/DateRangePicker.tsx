import React from "react";
import GenericInput from "../Generic/GenericInput";
import "./styles/twenty.scss";
import { GenericInputProps } from "../InputTypes";
import "react-dates/initialize";
import "./styles/twenty.scss";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker as DRangePicker } from "react-dates";

import moment from "moment";
import { Utils } from "../..";

interface BooleanSettings {
	requiredNotVisible?: boolean;
}
interface DateRangePickerProps extends GenericInputProps {
	required?: boolean;
	settings?: BooleanSettings;
	numberOfMonths?: number;
	minDate?: moment.Moment;
	maxDate?: moment.Moment;
	isDayBlocked?: (date: moment.Moment) => boolean;
	langKey?: string;
	startPlaceholder?: string;
	endPlaceholder?: string;
}

const DEFAULT_VALUE = {
	startDate: null,
	endDate: null,
};

export default class DateRangePicker extends GenericInput<DateRangePickerProps, any> {
	locale = "de";
	state = {
		value: DEFAULT_VALUE as { startDate: moment.Moment | null; endDate: moment.Moment | null },
		valid: true,
		focus: false,
		focusedInput: null as null | "startDate" | "endDate",
	};
	protected _validate = () => {
		let valid = true;
		const value = this.state.value;

		if (this.props.required && (!value.startDate || !value.endDate)) {
			valid = false;
		}
		return valid;
	};

	constructor(props) {
		super(props);
		this.reference = React.createRef<any>();
	}

	checkRange = (date: moment.Moment) => {
		if (this.props.minDate) {
			if (this.props.maxDate) {
				return !(date.isSameOrAfter(this.props.minDate) && date.isSameOrBefore(this.props.maxDate));
			} else {
				return !date.isSameOrAfter(this.props.minDate);
			}
		}
		if (this.props.maxDate) {
			return !date.isSameOrBefore(this.props.maxDate);
		}
		return false;
	};
	componentDidMount() {
		this.setState({ value: this.props.value ? this.props.value : DEFAULT_VALUE });
		this.setMomentLang();
	}

	setMomentLang = () => {
		this.locale = this.props.langKey ?? "de";
		moment.locale(this.locale);
	};

	componentDidUpdate(lastProps: DateRangePickerProps) {
		const value = this.props.value ? this.props.value : DEFAULT_VALUE;
		if (this.props.value !== lastProps.value) {
			this.setState({ value });
		}
		if (this.props.langKey !== lastProps.langKey) {
			this.setMomentLang();
		}
	}

	private dateChanged = (dateRange: { startDate: moment.Moment; endDate: moment.Moment }) => {
		this.resetted = false;
		this.setState(
			{
				value: dateRange,
			},
			() => {
				this.onBlur();
				if (this.props.onChange) this.props.onChange({ name: this.props.name, value: dateRange });
				if (this.props._change) this.props._change({ name: this.props.name, value: dateRange });
			}
		);
	};

	render() {
		return (
			<div className={this.buildClassList("onedash-date-range-picker")}>
				{this.props.label && (
					<label className="onedash-label" htmlFor={this.id}>
						{this.props.label}
						{this.props.required === true && !this.props.settings?.requiredNotVisible && (
							<span className="required">*</span>
						)}
					</label>
				)}
				{this.props.placeholder && this.props.required === true && !this.props.settings?.requiredNotVisible && (
					<span className="required placeholder-required">*</span>
				)}

				{!this.props.readonly ? (
					<DRangePicker
						startDate={this.state.value.startDate}
						endDate={this.state.value.endDate}
						onDatesChange={this.dateChanged}
						readOnly={this.props.readonly}
						disabled={this.props.disabled}
						startDatePlaceholderText={this.props.startPlaceholder ?? ""}
						endDatePlaceholderText={this.props.endPlaceholder ?? ""}
						numberOfMonths={
							this.props.numberOfMonths ? this.props.numberOfMonths : window.innerWidth > 1200 ? 2 : 1
						}
						isOutsideRange={this.checkRange}
						isDayBlocked={this.props.isDayBlocked}
						onFocusChange={(focusedInput) => this.setState({ focusedInput })}
						focusedInput={this.state.focusedInput}
						startDateId={Utils.generateGuid()}
						endDateId={Utils.generateGuid()}
					/>
				) : (
					<p className="read-only">
						{this.state.value.startDate ? this.state.value.startDate.format("ll") : ""} -{" "}
						{this.state.value.endDate ? this.state.value.endDate.format("ll") : ""}
					</p>
				)}
			</div>
		);
	}
}
