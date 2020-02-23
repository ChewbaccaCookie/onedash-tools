import React from "react";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Button from "../Button/Button";
import TagInput from "../TagInput/TagInput";

export interface FormProps {
	onSubmit?: (values: any, control: Form) => void;
	onChange?: (values: any, control: Form) => void;
	className?: string;
	submitText?: string;
	resetText?: string;
	validateOnSubmit?: boolean;
	validateOnChange?: boolean;
	style?: styles;
}

class Form extends React.Component<FormProps> {
	references: any[] = [];

	constructor(props: FormProps) {
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
			if (child.type === Input || child.type === Select || child.type === TagInput) {
				const newEl = React.cloneElement(
					child,
					{ ref: (el: any) => this.references.push(el), key: i, _change: this.onChange, style: this.props.style },
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
				if (!ref.validate()) {
					valid = false;
				}
			}
		});
		return valid;
	};

	public resetForm = () => {
		this.references.forEach((ref) => {
			if (ref) ref.reset();
		});

		if (this.references.length > 0) {
			const ref = this.references[0];
			if (ref) ref.focus();
		}
	};

	onChange = () => {
		const values = this.mapData();
		if (this.props.onChange) {
			if (this.props.validateOnChange === true) {
				if (this.validateInputs() === true) {
					this.props.onChange(values, this);
				}
			} else {
				this.props.onChange(values, this);
			}
		}
	};

	private mapData = () => {
		const values = {} as any;
		this.references.forEach((ref) => {
			if (ref) {
				const valuePair = ref.getValue();
				if (valuePair.name) {
					values[valuePair.name] = valuePair.value;
				}
			}
		});
		return values;
	};

	onSubmit = (e: any) => {
		const values = this.mapData();
		if (this.props.validateOnSubmit === true) {
			if (this.validateInputs() === true) {
				if (this.props.onSubmit) this.props.onSubmit(values, this);
				e.preventDefault();
				return;
			} else {
				e.preventDefault();
				return;
			}
		}
		if (this.props.onSubmit) this.props.onSubmit(values, this);

		e.preventDefault();
	};

	buildClassName = () => {
		let classes = "onedash-form";
		if (this.props.className) {
			classes += " " + this.props.className;
		}
		return classes;
	};

	render() {
		this.references = [];
		return (
			<form className={this.buildClassName()} onSubmit={this.onSubmit}>
				<div>{this.cloneChildren(this.props.children, [])}</div>
				{this.props.resetText && (
					<Button onClick={() => this.resetForm()} type="reset" mode="light">
						{this.props.resetText}
					</Button>
				)}
				{this.props.submitText && (
					<Button type="submit" mode="primary">
						{this.props.submitText}
					</Button>
				)}
			</form>
		);
	}
}

export default Form;
