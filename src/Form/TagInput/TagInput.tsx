import React from "react";
import GenericInput from "../Generic/GenericInput";
import ReactTags, { Tag } from "react-tag-autocomplete";
import "./styles/twenty.scss";
import { GenericInputProps } from "../InputTypes";
import { ValueLabelPair } from "../../ToolTypes";

interface TagInputSettings {
	requiredNotVisible?: boolean;
	preventDuplicates?: boolean;
	minQueryLength?: number;
}
interface TagInputProps extends GenericInputProps {
	tags: ValueLabelPair[];
	settings?: TagInputSettings;
	required?: boolean;
}

export default class TagInput extends GenericInput<TagInputProps, any> {
	state = {
		value: undefined as undefined | ValueLabelPair[],
		valid: true,
		focus: false,
	};

	protected _validate = () => {
		let valid = true;
		if ((this.props.required && this.state.value?.length === 0) || (this.props.required && !this.state.value))
			valid = false;
		return valid;
	};

	private handleDelete = (i: any) => {
		if (!this.state.value) return;
		const selectedTags: ValueLabelPair[] = this.state.value.slice(0);
		selectedTags.splice(i, 1);
		this.setState({ value: selectedTags }, () => {
			const value = selectedTags.map((t) => t.value);
			if (this.props.onChange) this.props.onChange({ name: this.props.name, value });
			if (this.props._change) this.props._change({ name: this.props.name, value });
		});
	};

	private handleAddition = (tag: Tag) => {
		const selectedTags = this.state.value ? this.state.value : [];
		selectedTags.push({ label: tag.name, value: tag.id });
		this.setState({ value: selectedTags }, () => {
			const value = selectedTags.map((t) => t.value);
			if (this.props.onChange) this.props.onChange({ name: this.props.name, value });
			if (this.props._change) this.props._change({ name: this.props.name, value });
		});
	};
	public getValue = (validate?: boolean) => {
		if ((validate && this.validate()) || !validate) {
			const selectedTags = this.state.value ? this.state.value : [];
			const value = selectedTags.map((t) => t.value);
			return { name: this.props.name, value: value };
		} else {
			return undefined;
		}
	};

	render() {
		const tags = this.props.tags;
		const _tags: Tag[] = tags
			.filter((x) => !this.state.value?.find((t) => t.value === x.value))
			.map((t) => {
				return {
					id: t.value,
					name: t.label,
				};
			});
		const _selectedTags: Tag[] = !this.state.value
			? []
			: this.state.value.map((t) => {
					return {
						id: t.value,
						name: t.label,
					};
			  });

		return (
			<div className={this.buildClassList("onedash-tag-input")}>
				{this.props.label && (
					<label className="onedash-label" htmlFor={this.id}>
						{this.props.label}
						{this.props.required === true && !this.props.settings?.requiredNotVisible && (
							<span className="required">*</span>
						)}
					</label>
				)}
				{!this.props.readonly && (
					<ReactTags
						minQueryLength={this.props.settings?.minQueryLength ? this.props.settings?.minQueryLength : 0}
						autofocus={false}
						placeholderText={this.props.placeholder ?? "Geben Sie ein Tag ein"}
						allowBackspace={false}
						tags={_selectedTags}
						suggestions={_tags}
						onDelete={this.handleDelete}
						onAddition={this.handleAddition}
					/>
				)}
				{this.props.readonly && <p className="read-only">{_selectedTags.map((x) => x.name).join(", ")}</p>}
			</div>
		);
	}
}
