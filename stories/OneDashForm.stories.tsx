import React from "react";
import { storiesOf } from "@storybook/react";
import "../src/styles/default.scss";
import { action } from "@storybook/addon-actions";
import OneDashForm from "../src/OneDashForm/OneDashForm";
import OneDashInput from "../src/OneDashForm/OneDashInput";
import OneDashSelect, { ValueLabelPair } from "../src/OneDashForm/OneDashSelect";
import OneDashTagInput from "../src/OneDashForm/OneDashTagInput";
import OneDashCard from "../src/OneDashCard/OneDashCard";

function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const selectOptions = [
	{ label: "Option 1", value: "option-1" },
	{ label: "Option 2", value: "option-2" },
	{ label: "Option 3", value: "option-3" },
	{ label: "Option 4", value: "option-4" },
	{ label: "Adamsapfel", value: "adamsapfel" },
	{ label: "Arabien", value: "arabien" },
	{ label: "Ananassaft", value: "ananassaft" },
];
const loadOptionsAsync = (inputString: string) => {
	action("Search")(inputString);
	return new Promise<ValueLabelPair[]>(async (resolve) => {
		await timeout(500);
		const values = selectOptions.filter((o) => o.label.indexOf(inputString) !== -1);
		resolve(values);
	});
};

storiesOf("Form", module)
	.add("text", () => (
		<OneDashCard>
			<OneDashForm onSubmit={action("Submit")}>
				<OneDashInput name="firstName" label="Vorname"></OneDashInput>
				<OneDashInput name="lastName" label="Nachname"></OneDashInput>
				<OneDashInput name="submit" type="submit" value="Absenden"></OneDashInput>
			</OneDashForm>
		</OneDashCard>
	))
	.add("plain style", () => (
		<OneDashCard>
			<OneDashForm styling="none" onSubmit={action("Submit")}>
				<OneDashInput name="firstName" label="Vorname"></OneDashInput>
				<OneDashInput name="lastName" label="Nachname"></OneDashInput>
				<OneDashInput name="submit" type="submit" value="Absenden"></OneDashInput>
				<OneDashSelect name="select" label="Select" onChange={action("Change")} value="option-1" options={selectOptions} />
				<OneDashTagInput name="select" label="Tag Input" value={["option-1"]} tags={selectOptions}></OneDashTagInput>
				<OneDashInput name="submit" type="submit" value="Absenden"></OneDashInput>
			</OneDashForm>
		</OneDashCard>
	))
	.add("number", () => (
		<OneDashCard>
			<OneDashForm onSubmit={action("Submit")}>
				<OneDashInput name="num" label="Nummer" type="number"></OneDashInput>
				<OneDashInput name="submit" type="submit" value="Absenden"></OneDashInput>
			</OneDashForm>
		</OneDashCard>
	))
	.add("euro", () => (
		<OneDashCard>
			<OneDashForm onSubmit={action("Submit")}>
				<OneDashInput name="euro" label="Euro" type="euro"></OneDashInput>
				<OneDashInput name="submit" type="submit" value="Absenden"></OneDashInput>
			</OneDashForm>
		</OneDashCard>
	))
	.add("boolean", () => (
		<OneDashCard>
			<OneDashForm onSubmit={action("Submit")}>
				<OneDashInput name="boolean-toggle" label="Boolean" type="boolean"></OneDashInput>
				<OneDashInput name="submit" type="submit" value="Absenden"></OneDashInput>
			</OneDashForm>
		</OneDashCard>
	))
	.add("textarea", () => (
		<OneDashCard>
			<OneDashForm onSubmit={action("Submit")}>
				<OneDashInput name="text" label="Textarea" type="textarea"></OneDashInput>
				<OneDashInput name="submit" type="submit" value="Absenden"></OneDashInput>
			</OneDashForm>
		</OneDashCard>
	))
	.add("date range picker", () => (
		<OneDashCard>
			<OneDashForm onSubmit={action("Submit")}>
				<OneDashInput name="text" label="Anfangsdatum" label2="Enddatum" type="date-range"></OneDashInput>
			</OneDashForm>
		</OneDashCard>
	))
	.add("select", () => (
		<OneDashCard>
			<OneDashForm onSubmit={action("Submit")}>
				<OneDashSelect name="select" label="Select" value="option-1" isSearchable={false} options={selectOptions} />
				<OneDashInput name="submit" type="submit" value="Absenden"></OneDashInput>
			</OneDashForm>
		</OneDashCard>
	))
	.add("select validate", () => (
		<OneDashCard>
			<OneDashForm validateOnSubmit onSubmit={action("Submit")}>
				<OneDashSelect required name="select" label="Select" isSearchable={false} options={selectOptions} />
				<OneDashInput name="submit" type="submit" value="Absenden"></OneDashInput>
			</OneDashForm>
		</OneDashCard>
	))
	.add("select async", () => (
		<OneDashCard>
			<OneDashForm validateOnSubmit onSubmit={action("Submit")}>
				<OneDashSelect
					async
					required
					name="select"
					label="Select"
					timeout={400}
					loadOptions={loadOptionsAsync}
					options={[
						{ label: "Option 1", value: "option-1" },
						{ label: "Option 2", value: "option-2" },
					]}
				/>
				<OneDashInput name="submit" type="submit" value="Absenden"></OneDashInput>
			</OneDashForm>
		</OneDashCard>
	))
	.add("select onchange", () => (
		<OneDashCard>
			<OneDashSelect name="select" label="Select" onChange={action("Change")} value="option-1" options={selectOptions} />
		</OneDashCard>
	))
	.add("select native", () => (
		<OneDashCard>
			<OneDashSelect
				name="select"
				label="Select"
				onChange={action("Change")}
				value="option-1"
				native={true}
				options={selectOptions}
			/>
		</OneDashCard>
	))
	.add("tag input", () => (
		<OneDashCard>
			<OneDashForm onSubmit={action("Submit")}>
				<OneDashTagInput name="select" label="Tag Input" value={["option-1"]} tags={selectOptions}></OneDashTagInput>
				<OneDashInput name="submit" type="submit" value="Absenden"></OneDashInput>
			</OneDashForm>
		</OneDashCard>
	))
	.add("onchange", () => (
		<OneDashCard>
			<OneDashForm onChange={action("Change")}>
				<OneDashTagInput name="select" label="Tag Input" value={["option-1"]} tags={selectOptions}></OneDashTagInput>
			</OneDashForm>
		</OneDashCard>
	))
	.add("validate", () => (
		<OneDashCard>
			<OneDashForm validateOnSubmit onSubmit={action("Submit")}>
				<OneDashInput required label="Boolean" name="boolean" type="boolean" />
				<OneDashInput required label="Boolean" name="boolean2" type="boolean" />
				<OneDashInput type="submit" name="submit" value="Abschicken"></OneDashInput>
			</OneDashForm>
		</OneDashCard>
	));
