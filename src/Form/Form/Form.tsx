import React from "react";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Button from "../Button/Button";
import TagInput from "../TagInput/TagInput";
import Boolean from "../Boolean/Boolean";
import { styles } from "../../ToolTypes";
import DatePicker from "../DatePicker/DatePicker";
import DateRangePicker from "../DateRangePicker/DateRangePicker";

export interface FormProps {
	onSubmit?: (values: any, control: Form) => void;
	onChange?: (values: any, control: Form, valid: boolean) => void;
	className?: string;
	submitText?: string;
	resetText?: string;
	validateOnSubmit?: boolean;
	validateOnChange?: boolean;
	onValidate?: (values: any, control: Form) => boolean;
	style?: styles;
}

class Form extends React.Component<FormProps> {
	references: { ref: any; name: string }[] = [];
	state = {
		valid: true,
	};
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
			if (
				child.type === Input ||
				child.type === DatePicker ||
				child.type === DateRangePicker ||
				child.type === Select ||
				child.type === TagInput ||
				child.type === Boolean
			) {
				const newEl = React.cloneElement(
					child,
					{
						ref: (ref: any) => this.references.push({ name: child.props.name, ref }),
						key: i,
						_change: this.onChange,
						style: this.props.style,
					},
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

	public getRef = (name: string) => {
		return this.references.find((x) => x.name === name && x.ref !== null);
	};

	public getData = () => {
		return this.mapData();
	};
	public validateInputs = (updateComponent = true) => {
		let valid = true;
		this.references.forEach((entry) => {
			if (entry.ref) {
				if (!entry.ref.validate(updateComponent)) {
					valid = false;
				}
			}
		});

		return valid;
	};

	public resetForm = () => {
		this.references.forEach((entry) => {
			if (entry.ref) entry.ref.reset();
		});

		if (this.references.length > 0) {
			const entry = this.references[0];
			if (entry.ref) entry.ref.focus();
		}
	};

	validateSubmitBtn = () => {
		this.setState({
			valid: this.validateInputs(false),
		});
	};

	componentDidMount() {
		if (this.props.validateOnChange || this.props.validateOnSubmit) {
			this.validateSubmitBtn();
		}
	}

	onChange = () => {
		const values = this.mapData();
		this.validateSubmitBtn();
		if (this.props.onValidate && this.props.onValidate(values, this) === false) {
			return;
		}
		if (this.props.onChange) {
			if (this.props.validateOnChange === true) {
				if (this.validateInputs() === true) {
					this.props.onChange(values, this, this.validateInputs(false));
				}
			} else {
				this.props.onChange(values, this, this.validateInputs(false));
			}
		}
	};

	private mapData = () => {
		const values = {} as any;
		this.references.forEach((entry) => {
			if (entry.ref) {
				const valuePair = entry.ref.getValue();
				if (valuePair.name) {
					values[valuePair.name] = valuePair.value;
				}
			}
		});
		return values;
	};

	onSubmit = (e?: any) => {
		const values = this.mapData();
		if (this.props.onValidate && this.props.onValidate(values, this) === false) {
			if (e) e.preventDefault();
			return;
		}
		if (this.props.validateOnSubmit === true) {
			if (this.validateInputs() === true) {
				if (this.props.onSubmit) this.props.onSubmit(values, this);
				if (e) e.preventDefault();
				return;
			} else {
				if (e) e.preventDefault();
				return;
			}
		}
		if (this.props.onSubmit) this.props.onSubmit(values, this);

		if (e) e.preventDefault();
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
					<Button
						disabled={(this.props.validateOnSubmit || this.props.validateOnChange) && !this.state.valid}
						type="submit"
						mode="primary">
						{this.props.submitText}
					</Button>
				)}
			</form>
		);
	}
}

export default Form;
