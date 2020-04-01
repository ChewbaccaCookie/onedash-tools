import React, { ChangeEvent } from "react";
import GenericInput from "../Generic/GenericInput";

interface BooleanSettings {
	requiredNotVisible?: boolean;
}
interface BooleanProps extends GenericInputProps {
	native?: boolean;
	required?: boolean;
	settings?: BooleanSettings;
}

export default class Boolean extends GenericInput<BooleanProps, any> {
	protected _validate = () => {
		let valid = true;
		const value = this.state.value;
		if (this.props.required && (!value || value === "invalid-input")) {
			valid = false;
		}
		this.setState({ valid });
		return valid;
	};

	constructor(props) {
		super(props);
		this.reference = React.createRef<any>();
	}
	onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.checked;
		this.setState(
			{
				value,
			},
			() => {
				if (this.props.onChange) this.props.onChange({ name: this.props.name, value });
				if (this.props._change) this.props._change({ name: this.props.name, value });
			}
		);
	};

	render() {
		return (
			<div className={this.buildClassList("onedash-boolean")}>
				<label className="checker">
					<input
						ref={this.reference}
						checked={this.state.value}
						onChange={this.onChange}
						className="checkbox"
						type="checkbox"
					/>
					<div className="check-bg" tabIndex={0} />
					<div className="checkmark">
						<svg viewBox="0 0 100 100">
							<path
								d="M20,55 L40,75 L77,27"
								fill="none"
								stroke="#FFF"
								strokeWidth="15"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				</label>

				{this.props.label && (
					<label className="onedash-label" htmlFor={this.id}>
						{this.props.label}
						{this.props.required === true && !this.props.settings?.requiredNotVisible && (
							<span className="required">*</span>
						)}
					</label>
				)}
				{this.props.children}
			</div>
		);
	}
}
