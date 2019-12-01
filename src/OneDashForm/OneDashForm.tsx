import React from "react";
import "./OneDashForm.scss";
import OneDashInput from "./OneDashInput";
import OneDashSelect from "./OneDashSelect";
import OneDashTagInput from "./OneDashTagInput";

export interface OneDashFormProps {
	onSubmit?: (values: any, formControl: OneDashForm) => void;
	onChange?: (values: any, formControl: OneDashForm) => void;
	listStyle?: "normal" | "pair";
	listStyleLabel?: string;
	listStyleLabelToolTip?: string;
	className?: string;
	validateOnSubmit?: boolean;
}

export interface InputNameValuePair {
	name: string;
	value: string;
}

export interface OneDashFormState {
	className: string;
}

class OneDashForm extends React.Component<OneDashFormProps, OneDashFormState> {
	references: any[] = [];
	state = {
		className: "",
	};

	constructor(props: OneDashFormProps) {
		super(props);
		this.references = [];
		this.onSubmit.bind(this);
	}

	cloneChildren = (children: any, elements: any[]) => {
		React.Children.forEach(children, (child, i) => {
			if (!child) return;
			let childElements = [] as any[];
			if (child.props && child.props.children && typeof child.props.children === "object") {
				childElements = this.cloneChildren(child.props.children, []);
			}
			if (child.type === OneDashInput || child.type === OneDashSelect || child.type === OneDashTagInput) {
				const newEl = React.cloneElement(
					child,
					{ ref: (el: any) => this.references.push(el), key: i, onFormChange: this.onChange },
					childElements
				);
				elements.push(newEl);
			} else {
				if (childElements.length > 0) {
					const newEl = React.cloneElement(child, { key: i }, childElements);
					elements.push(newEl);
				} else {
					elements.push(child);
				}
			}
		});
		return elements;
	};

	public getData = () => {
		return this.mapData();
	};
	public validateInputs = () => {
		let valid = true;
		this.references.forEach((ref) => {
			if (ref) {
				if (!ref.validateInput()) {
					valid = false;
				}
			}
		});
		return valid;
	};

	public resetForm = () => {
		this.references.forEach((ref) => {
			if (ref) ref.resetInput();
		});

		if (this.references.length > 0) {
			const ref = this.references[0];
			if (ref) ref.focus();
		}
	};

	onChange = () => {
		const values = this.mapData();
		if (this.props.onChange) this.props.onChange(values, this);
	};

	private mapData = () => {
		const values = {} as any;
		this.references.forEach((ref) => {
			if (ref) {
				const valuePair = ref.getInputValue();
				if (valuePair.name) {
					values[valuePair.name] = valuePair.value;
				}
			}
		});
		return values;
	};

	onSubmit = (e: any) => {
		const values = this.mapData();
		if (this.props.validateOnSubmit) {
			if (this.validateInputs() === true) {
				if (this.props.onSubmit) this.props.onSubmit(values, this);
			} else {
				e.preventDefault();
				return;
			}
		}
		if (this.props.onSubmit) this.props.onSubmit(values, this);

		e.preventDefault();
	};

	getClass = () => {
		let classes = "onedash-form ";
		if (this.props.listStyle === "pair") {
			classes += "onedash-pair-form ";
		}
		if (this.props.className) {
			classes += this.props.className + " ";
		}
		if (this.state.className) {
			classes += this.state.className + " ";
		}
		return classes;
	};

	render() {
		this.references = [];
		return (
			<form className={this.getClass()} onSubmit={this.onSubmit}>
				{this.props.listStyleLabel && (
					<div data-tip={this.props.listStyleLabelToolTip} className="onedash-pair-label">
						{this.props.listStyleLabel}
					</div>
				)}
				<div>{this.cloneChildren(this.props.children, [])}</div>
			</form>
		);
	}
}

export default OneDashForm;
