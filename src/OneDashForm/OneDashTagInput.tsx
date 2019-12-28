import React from "react";
import OneDashInput, { OneDashInputProps } from "./OneDashInput";
import OneDashUtils from "../OneDashUtils/OneDashUtils";
import ReactTags, { Tag } from "react-tag-autocomplete";
import "./OneDashTagInput.scss";

export interface OneDashTagInputProps extends OneDashInputProps {
	tags: SelectValueLabelPair[];
	preventDuplicates?: boolean;
	value?: any[];
	minQueryLength?: number;
}

class OneDashTagInput extends OneDashInput<OneDashTagInputProps> {
	id = OneDashUtils.generateGuid();

	state = {
		value: [] as any,
		renderRangeDatePicker: true,
		tags: [] as Tag[],
		valid: true,
	};

	public getInputValue = () => {
		return {
			name: this.props.name,
			value: this.state.value.map((t: Tag) => t.id),
		};
	};

	public resetInput = () => {
		this.setState({
			selectedTags: [],
		});
	};

	private loadTags = () => {
		const ts = this.props.tags;
		const tags = ts.map((t) => {
			return { id: t.value, name: t.label };
		});
		this.setState({ tags });
	};
	private loadSelectedTags = () => {
		const values = this.props.value;
		const selectedTags = [] as Tag[];
		if (values) {
			values.forEach((v) => {
				let name = String(v);
				const t = this.props.tags.find((t) => t.value === v);
				if (t) {
					name = t.label;
				}
				selectedTags.push({
					id: v,
					name,
				});
			});
		}
		this.setState({ value: selectedTags });
	};

	componentDidMount() {
		this.loadTags();
		this.loadSelectedTags();
	}

	componentDidUpdate(lastProps: OneDashTagInputProps) {
		if (lastProps.tags !== this.props.tags) {
			this.loadTags();
		}
		if (this.props.value !== lastProps.value) {
			this.loadSelectedTags();
		}
	}

	handleDelete(i: any) {
		const selectedTags = this.state.value.slice(0);
		selectedTags.splice(i, 1);
		this.setState({ value: selectedTags }, () => {
			if (this.props.onChange) this.props.onChange(selectedTags.map((t: Tag) => t.id));
			if (this.props.onFormChange) this.props.onFormChange();
		});
	}

	handleAddition(tag: any) {
		let selectedTags = this.state.value;
		selectedTags = selectedTags.concat(tag);
		this.setState({ value: selectedTags }, () => {
			if (this.props.onChange) this.props.onChange(selectedTags.map((t: Tag) => t.id));
			if (this.props.onFormChange) this.props.onFormChange();
		});
	}

	buildClassName = () => {
		let classList = "onedash-input-container onedash-tag-container";
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

	render() {
		let tags = this.state.tags;
		if (this.props.preventDuplicates) {
			tags = this.state.tags.filter((tag) => {
				if (!this.state.value.find((s) => s.id === tag.id)) {
					return tag;
				} else {
					return undefined;
				}
			});
		}

		if (typeof this.props.tags === "string") return <></>;

		return (
			<div className={this.buildClassName()}>
				{this.props.label && (
					<label className="onedash-label" htmlFor={this.id}>
						{this.props.label}
						{this.props.required === true && !this.props.requiredNotVisible && <span className="required">*</span>}
					</label>
				)}
				<div className="onedash-tag-input">
					<ReactTags
						minQueryLength={this.props.minQueryLength}
						autofocus={false}
						placeholder={this.props.placeholder ? this.props.placeholder : "Geben Sie ein Tag ein"}
						tags={this.state.value}
						allowBackspace={false}
						suggestions={tags}
						handleDelete={this.handleDelete.bind(this)}
						handleAddition={this.handleAddition.bind(this)}
					/>
				</div>
			</div>
		);
	}
}

export default OneDashTagInput;
