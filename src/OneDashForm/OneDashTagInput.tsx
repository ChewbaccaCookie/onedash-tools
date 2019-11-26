import React from "react";
import OneDashInput, { OneDashInputProps } from "./OneDashInput";
import OneDashUtils from "../OneDashUtils/OneDashUtils";
import ReactTags, { Tag } from "react-tag-autocomplete";
import "./OneDashTagInput.scss";

export interface OneDashTagInputProps extends OneDashInputProps {
	tags: SelectValueLabelPair[];
	selectedTags?: SelectValueLabelPair[];
	preventDuplicates?: boolean;
}

class OneDashTagInput extends OneDashInput<OneDashTagInputProps> {
	id = OneDashUtils.generateGuid();

	state = {
		value: "",
		renderRangeDatePicker: true,
		selectedTags: [] as Tag[],
		tags: [] as Tag[],
		valid: true,
	};

	public getInputValue = () => {
		return {
			name: this.props.name,
			value: this.state.selectedTags.map((s) => {
				return {
					label: s.name,
					value: s.id,
				};
			}) as SelectValueLabelPair[],
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
		const st = this.props.selectedTags;
		const selectedTags = st
			? st.map((t) => {
					return { id: t.value, name: t.label };
			  })
			: [];
		this.setState({ selectedTags });
	};

	componentDidMount() {
		this.loadTags();
		this.loadSelectedTags();
	}

	componentDidUpdate(lastProps: OneDashTagInputProps) {
		if (lastProps.tags !== this.props.tags) {
			this.loadTags();
		}
		if (this.props.selectedTags) {
			const values = this.props.selectedTags
				? this.props.selectedTags.map((t) => {
						return { id: t.value, name: t.label };
				  })
				: [];
			if (JSON.stringify(values) !== JSON.stringify(this.state.selectedTags)) {
				this.loadSelectedTags();
			}
		}
	}

	handleDelete(i: any) {
		const selectedTags = this.state.selectedTags.slice(0);
		selectedTags.splice(i, 1);
		this.setState({ selectedTags }, () => {
			if (this.props.onChange)
				this.props.onChange(
					selectedTags.map((s) => {
						return {
							label: s.name,
							value: s.id,
						};
					}) as SelectValueLabelPair[]
				);
		});
	}

	handleAddition(tag: any) {
		let selectedTags = this.state.selectedTags;
		selectedTags = selectedTags.concat(tag);
		this.setState({ selectedTags }, () => {
			if (this.props.onChange)
				this.props.onChange(
					selectedTags.map((s) => {
						return {
							label: s.name,
							value: s.id,
						};
					}) as SelectValueLabelPair[]
				);
		});
	}

	render() {
		let tags = this.state.tags;
		if (this.props.preventDuplicates) {
			tags = this.state.tags.filter((tag) => {
				if (!this.state.selectedTags.find((s) => s.id === tag.id)) {
					return tag;
				} else {
					return undefined;
				}
			});
		}

		if (typeof this.props.tags === "string") return <></>;

		return (
			<div className="onedash-input-container onedash-tag-container">
				{this.props.label && (
					<label className="onedash-label" htmlFor={this.id}>
						{this.props.label}
						{this.props.required === true && !this.props.requiredNotVisible && <span className="required">*</span>}
					</label>
				)}
				<div className="onedash-tag-input">
					<ReactTags
						autofocus={false}
						placeholder={this.props.placeholder ? this.props.placeholder : "Geben Sie ein Tag ein"}
						tags={this.state.selectedTags}
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
