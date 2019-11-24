import React from "react";
import OneDashInput, { OneDashInputProps } from "./OneDashInput";
import OneDashUtils from "../OneDashUtils/OneDashUtils";

export interface OneDashSelectProps extends OneDashInputProps {
	selectValues: SelectValueLabelPair[];
	defaultIndex?: number;
	zIndex?: number;
}

class OneDashSelect extends OneDashInput<OneDashSelectProps> {
	id = OneDashUtils.generateGuid();

	state = {
		selectedIndex: 0,
		value: "",
		renderRangeDatePicker: false,
		valid: true,
	};
	public getIndex = () => {
		return this.state.selectedIndex;
	};
	componentDidMount() {
		if (this.props.defaultIndex && this.props.defaultIndex >= 0) {
			let index = 0;
			if (!isNaN(Number(this.props.defaultIndex))) {
				index = Number(this.props.defaultIndex);
			}
			this.setState({
				selectedIndex: index,
			});
		}
	}

	componentDidUpdate(lastProps: OneDashSelectProps) {
		let index = 0;
		if (this.props.defaultIndex && lastProps.defaultIndex !== this.props.defaultIndex) {
			if (this.props.defaultIndex && this.props.defaultIndex >= 0) {
				index = this.props.defaultIndex;
			}
			if (!isNaN(Number(index))) this.setState({ selectedIndex: Number(index) });
		}
	}

	setIndex = (index: number) => {
		this.setState({ selectedIndex: Number(index) }, () => {
			if (this.props.onChange) this.props.onChange(Number(index));
		});
	};

	public getInputValue = () => {
		const val = this.props.selectValues[this.getIndex()].value;
		return {
			name: this.props.name,
			value: val,
		};
	};

	render() {
		if (typeof this.props.selectValues === "string") return <></>;
		return (
			<div className="onedash-input-container" style={{ zIndex: this.props.zIndex || 5 }}>
				{this.props.label && (
					<label className="onedash-label" htmlFor={this.id}>
						{this.props.label}
						{this.props.required === true && !this.props.requiredNotVisible && <span className="required">*</span>}
					</label>
				)}
				<div className="onedash-select">
					<div className="onedash-select__current" tabIndex={0}>
						{this.props.selectValues.map((val, index) => (
							<div key={index} className="onedash-select__value">
								<input
									className="onedash-select__input"
									type="radio"
									id={this.id + "-" + index}
									value={val.value}
									name={this.props.name}
									readOnly
									checked={index === this.state.selectedIndex ? true : false}
								/>
								<p className="onedash-select__input-text">{val.label}</p>
							</div>
						))}

						<i className="fas fa-chevron-down onedash-select__icon" />
					</div>
					<ul className="onedash-select__list">
						{this.props.selectValues.map((val, index) => (
							<li key={index}>
								<label
									onClick={() => this.setIndex(index)}
									className="onedash-select__option"
									htmlFor={this.id + "-" + index}
									aria-hidden="true">
									{val.label}
								</label>
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
}

export default OneDashSelect;
