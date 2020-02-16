import React from "react";
import Input from "./Input/Input";
import Select from "./Select/Select";
import Form from "./Form/Form";
import { action } from "@storybook/addon-actions";
import StyleLoader from "../Utils/StyleLoader";
import { withKnobs, select as sel, boolean, text, number } from "@storybook/addon-knobs";
function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
	title: "Form/Input",
	decorators: [withKnobs],
};

const selectOptions = [
	{ label: "Option 1", value: "option-1" },
	{ label: "Option 2", value: "option-2" },
	{ label: "Option 3", value: "option-3" },
	{ label: "Option 4", value: "option-4" },
	{ label: "Adamsapfel", value: "adamsapfel" },
	{ label: "Arabien", value: "arabien" },
	{ label: "Ananassaft", value: "ananassaft" },
];

export const defaultInput = () => {
	const label = text("Label", "Geben Sie ein");
	const disabled = boolean("Disabled", false);
	const readOnly = boolean("ReadOnly", false);
	return (
		<StyleLoader>
			<Input
				value={text("Value", "Lorem Ipsum")}
				minLength={number("Mininimal length", 4)}
				className="text-input"
				name="name-input"
				disabled={disabled}
				readonly={readOnly}
				required={boolean("Required", true)}
				label={label}
				type={sel(
					"Type",
					{
						text: "text",
						number: "number",
						password: "password",
						email: "email",
						tel: "tel",
					},
					"text"
				)}
			/>
		</StyleLoader>
	);
};

export const select = () => {
	const required = boolean("Required", true);
	const native = boolean("Native", false);
	const disabled = boolean("Disabled", false);
	const readOnly = boolean("ReadOnly", false);
	const label = text("Label", "Wählen Sie");
	return (
		<StyleLoader>
			<Select
				options={[
					{ label: "Farbe 1", value: "farbe1" },
					{ label: "Farbe 2", value: "farbe2" },
				]}
				disabled={disabled}
				readonly={readOnly}
				className="select-input"
				name="select-input"
				required={required}
				native={native}
				label={label}
			/>
		</StyleLoader>
	);
};

export const selectAsync = () => {
	const required = boolean("Required", true);
	const native = boolean("Native", false);
	const label = text("Label", "Wählen Sie");

	const loadOptions = async (inputString: string) => {
		return new Promise<ValueLabelPair[]>(async (resolve) => {
			await timeout(500);
			resolve(selectOptions.filter((o) => o.label.indexOf(inputString) !== -1));
		});
	};
	return (
		<StyleLoader>
			<Select
				asyncLoad={loadOptions}
				className="select-input"
				name="select-input"
				required={required}
				native={native}
				label={label}
			/>
		</StyleLoader>
	);
};

export const form = () => {
	return (
		<StyleLoader>
			<Form
				onChange={action("form-change")}
				onSubmit={action("form-submit")}
				validateOnChange={boolean("Valdiate on Change", true)}
				validateOnSubmit={boolean("Valdiate on Submit", true)}
				submitText="Absenden"
				resetText="Zurücksetzen">
				<fieldset style={{ margin: "10px", borderRadius: "5px", borderColor: "#ebebeb", borderStyle: "solid" }}>
					<h2 style={{ fontFamily: "Raleway" }}>Allgemeine Angaben</h2>
					<Select
						required
						label="Geschlecht"
						name="sex"
						options={[
							{ label: "Männlich", value: "m" },
							{ label: "Weiblich", value: "w" },
							{ label: "Divers", value: "d" },
						]}
					/>
					<Select
						label="Titel"
						native
						disabled
						name="title"
						options={[
							{ label: "Dr.", value: "dr" },
							{ label: "Prof.", value: "prof" },
							{ label: "Prof. Dr.", value: "profdr" },
						]}
					/>
					<Input required label="Vorname" name="firstName" />
					<Input required label="Nachname" name="lastName" />
				</fieldset>
				<fieldset style={{ margin: "10px", borderRadius: "5px", borderColor: "#ebebeb", borderStyle: "solid" }}>
					<h2 style={{ fontFamily: "Raleway" }}>Weitere Angaben</h2>
					<Input required name="email" type="email" label="Ihre Email - Adresse" />
					<Input required name="tel" type="tel" label="Ihre Telefonnummer" />
					<Input required name="address" type="text" disabled label="Ihre Adresse" />
					<Input required name="land" value="Deutschland" type="text" readonly label="Land" />
				</fieldset>
			</Form>
		</StyleLoader>
	);
};
