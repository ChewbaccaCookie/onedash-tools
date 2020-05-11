import React from "react";
import GenericInput from "../Generic/GenericInput";
import "./styles/twenty.scss";
import { GenericInputProps } from "../InputTypes";
import "react-dates/initialize";
import "./styles/twenty.scss";
import SingleDatePicker from "react-dates/lib/components/SingleDatePicker";

import moment from "moment";
import "moment/locale/de";
import "moment/locale/en-gb";
import "react-dates/lib/css/_datepicker.css";

interface BooleanSettings {
	requiredNotVisible?: boolean;
}
interface DatePickerProps extends GenericInputProps {
	required?: boolean;
	settings?: BooleanSettings;
	numberOfMonths?: number;
	minDate?: moment.Moment;
	maxDate?: moment.Moment;
	isDayBlocked?: (date: moment.Moment) => boolean;
	langKey?: string;
}

export default class DatePicker extends GenericInput<DatePickerProps, any> {
	locale = "de";
	state = {
		value: null as moment.Moment | null,
		valid: true,
		focus: false,
	};
	protected _validate = () => {
		let valid = true;
		const value = this.state.value;
		if (this.props.required && !value) {
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
		this.setState({ value: this.props.value ? this.props.value : null });
		this.setMomentLang();
	}

	setMomentLang = () => {
		this.locale = this.props.langKey ?? "de";
		moment.locale(this.locale);
	};

	componentDidUpdate(lastProps: DatePickerProps) {
		const value = this.props.value ? this.props.value : null;
		if (this.props.value !== lastProps.value) {
			this.setState({ value });
		}
		if (this.props.langKey !== lastProps.langKey) {
			this.setMomentLang();
		}
	}

	private dateChanged = (date: moment.Moment) => {
		this.resetted = false;
		this.setState(
			{
				value: date,
			},
			() => {
				this.onBlur();
				if (this.props.onChange) this.props.onChange({ name: this.props.name, value: date });
				if (this.props._change) this.props._change({ name: this.props.name, value: date });
			}
		);
	};

	render() {
		return (
			<div className={this.buildClassList("onedash-date-picker")}>
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
					<SingleDatePicker
						date={this.state.value}
						onDateChange={this.dateChanged}
						focused={this.state.focus}
						readOnly={this.props.readonly}
						disabled={this.props.disabled}
						placeholder={this.props.placeholder ?? ""}
						numberOfMonths={
							this.props.numberOfMonths ? this.props.numberOfMonths : window.innerWidth > 1200 ? 2 : 1
						}
						isOutsideRange={this.checkRange}
						isDayBlocked={this.props.isDayBlocked}
						onFocusChange={(e) => {
							if (e.focused === true) {
								this.onFocus();
							} else {
								this.onBlur();
							}
						}}
						id={this.id}
					/>
				) : (
					<p className="read-only">{this.state.value ? this.state.value.format("ll") : ""}</p>
				)}
			</div>
		);
	}
}
