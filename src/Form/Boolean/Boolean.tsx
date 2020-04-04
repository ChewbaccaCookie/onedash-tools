import React, { ChangeEvent } from "react";
import GenericInput from "../Generic/GenericInput";
import "./styles/twenty.scss";
import { GenericInputProps } from "../InputTypes";
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
		if (this.props.required && value === false) {
			valid = false;
		}
		this.setState({ valid });
		return valid;
	};

	constructor(props) {
		super(props);
		this.reference = React.createRef<any>();
	}
	componentDidMount() {
		this.setState({ value: this.props.value ? this.props.value : false });
	}

	componentDidUpdate(lastProps: BooleanProps) {
		const value = this.props.value ? this.props.value : false;
		if (this.props.value !== lastProps.value) {
			this.setState({ value });
		}
	}
	onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.checked;
		this.setState(
			{
				value,
			},
			() => this.sendOnChange(value)
		);
	};
	sendOnChange = (value: boolean) => {
		console.log("moin");

		this._validate();
		if (this.props.onChange) this.props.onChange({ name: this.props.name, value });
		if (this.props._change) this.props._change({ name: this.props.name, value });
	};

	onKeyDown = (e: any) => {
		if (this.props.disabled === true || this.props.readonly === true) return;
		if (e.key === " ") this.toggle();
	};

	public isChecked = (checked: boolean) => {
		this.setState({ value: checked }, () => this.sendOnChange(checked));
	};
	public toggle = () => {
		this.setState({ value: !this.state.value }, () => this.sendOnChange(!this.state.value));
	};

	render() {
		return (
			<div className={this.buildClassList("onedash-boolean")}>
				{this.props.label && (
					<label className="onedash-label" htmlFor={this.id}>
						{this.props.label}
						{this.props.required === true && !this.props.settings?.requiredNotVisible && (
							<span className="required">*</span>
						)}
					</label>
				)}
				<label className="checker">
					<input
						ref={this.reference}
						checked={this.state.value}
						onChange={this.onChange}
						className="checkbox"
						type="checkbox"
						id={this.id}
					/>
					<div className="check-bg" tabIndex={0} onKeyDown={this.onKeyDown} />
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

				{this.props.children && (
					<div
						onClick={(e) => {
							if ((e as any).target.classList.contains("onedash-children")) this.toggle();
						}}
						className="onedash-children">
						{this.props.children}
					</div>
				)}
			</div>
		);
	}
}
