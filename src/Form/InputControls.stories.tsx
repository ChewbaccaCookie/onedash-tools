import React from "react";
import Input from "./Input/Input";
import Select from "./Select/Select";
import Form from "./Form/Form";
import { action } from "@storybook/addon-actions";
import StyleLoader from "../Utils/StyleLoader";
import { withKnobs, select as sel, boolean, text, number } from "@storybook/addon-knobs";
import Button from "./Button/Button";
import TagInput from "./TagInput/TagInput";
import Card from "../Card/Card";
function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
	title: "InputControls",
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
	const theme = sel("theme", { light: "light", dark: "dark" }, "light");
	const label = text("Label", "Geben Sie ein");
	const disabled = boolean("Disabled", false);
	const readOnly = boolean("ReadOnly", false);

	return (
		<StyleLoader theme={theme}>
			<Card>
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
			</Card>
		</StyleLoader>
	);
};

export const select = () => {
	const theme = sel("theme", { light: "light", dark: "dark" }, "light");
	const required = boolean("Required", true);
	const native = boolean("Native", false);
	const disabled = boolean("Disabled", false);
	const readOnly = boolean("ReadOnly", false);
	const label = text("Label", "Wählen Sie");
	return (
		<StyleLoader theme={theme}>
			<Card>
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
			</Card>
		</StyleLoader>
	);
};

export const selectAsync = () => {
	const theme = sel("theme", { light: "light", dark: "dark" }, "light");
	const required = boolean("Required", true);
	const native = boolean("Native", false);
	const disabled = boolean("Disabled", false);
	const label = text("Label", "Wählen Sie");
	const readOnly = boolean("Read Only", false);

	const loadOptions = async (inputString: string) => {
		return new Promise<ValueLabelPair[]>(async (resolve) => {
			await timeout(500);
			resolve(selectOptions.filter((o) => o.label.indexOf(inputString) !== -1));
		});
	};
	return (
		<StyleLoader theme={theme}>
			<Card>
				<Select
					readonly={readOnly}
					asyncLoad={loadOptions}
					disabled={disabled}
					className="select-input"
					name="select-input"
					required={required}
					native={native}
					label={label}
				/>
			</Card>
		</StyleLoader>
	);
};

export const buttons = () => {
	const theme = sel("theme", { light: "light", dark: "dark" }, "light");
	return (
		<StyleLoader theme={theme}>
			<Card>
				<Button onClick={action("Default (Primary)")}>Default (Primary)</Button>
				<Button onClick={action("Warning")} mode="warning">
					Warning
				</Button>
				<Button onClick={action("Danger")} mode="danger">
					Danger
				</Button>
				<Button onClick={action("Dark")} mode="dark">
					Dark
				</Button>
				<Button onClick={action("Light")} mode="light">
					Light
				</Button>
				<Button onClick={action("Info")} mode="info">
					Info
				</Button>
				<Button onClick={action("Link")} mode="link">
					Link
				</Button>
				<Button onClick={action("Primary")} mode="primary">
					Primary
				</Button>
				<Button onClick={action("Secondary")} mode="secondary">
					Secondary
				</Button>
				<Button onClick={action("Success")} mode="success">
					Success
				</Button>
				<Button disabled onClick={action("Disabled")}>
					Disabled
				</Button>
			</Card>
		</StyleLoader>
	);
};

export const tagInput = () => {
	const theme = sel("theme", { light: "light", dark: "dark" }, "light");
	const disabled = boolean("Disabled", false);
	const required = boolean("Required", true);
	const readOnly = boolean("Read Only", false);
	const label = text("Label", "Tag input");

	return (
		<StyleLoader theme={theme}>
			<Card>
				<TagInput
					label={label}
					required={required}
					name="tag-input"
					disabled={disabled}
					readonly={readOnly}
					tags={[
						{ label: "Farbe 1", value: "farbe1" },
						{ label: "Farbe 2", value: "farbe2" },
					]}
				/>
			</Card>
		</StyleLoader>
	);
};

export const form = () => {
	const theme = sel("theme", { light: "light", dark: "dark" }, "light");
	return (
		<StyleLoader theme={theme}>
			<Card>
				<Form
					onChange={action("form-change")}
					onSubmit={action("form-submit")}
					validateOnChange={boolean("Valdiate on Change", true)}
					validateOnSubmit={boolean("Valdiate on Submit", true)}
					submitText="Absenden"
					resetText="Zurücksetzen">
					<fieldset
						style={{ margin: "10px", borderRadius: "5px", borderColor: "#ebebeb", borderStyle: "solid" }}>
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
					<fieldset
						style={{ margin: "10px", borderRadius: "5px", borderColor: "#ebebeb", borderStyle: "solid" }}>
						<h2 style={{ fontFamily: "Raleway" }}>Weitere Angaben</h2>
						<Input required name="email" type="email" label="Ihre Email - Adresse" />
						<Input required name="tel" type="tel" label="Ihre Telefonnummer" />
						<Input name="address" type="text" disabled label="Ihre Adresse" />
						<Input required name="land" value="Deutschland" type="text" readonly label="Land" />
						<TagInput
							label="Lieblingsfarben"
							required
							name="tag-input"
							tags={[{ label: "Blau", value: "blue" }]}
						/>
					</fieldset>
				</Form>
			</Card>
		</StyleLoader>
	);
};
