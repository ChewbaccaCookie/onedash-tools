import React from "react";
import { storiesOf } from "@storybook/react";
import "../src/styles/default.scss";
import { action } from "@storybook/addon-actions";
import OneDashForm from "../src/OneDashForm/OneDashForm";
import OneDashInput from "../src/OneDashForm/OneDashInput";
import OneDashSelect from "../src/OneDashForm/OneDashSelect";
import OneDashTagInput from "../src/OneDashForm/OneDashTagInput";
import OneDashCard from "../src/OneDashCard/OneDashCard";

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
	.add("select", () => (
		<OneDashCard>
			<OneDashForm onSubmit={action("Submit")}>
				<OneDashSelect
					name="select"
					label="Select"
					options={[
						{ label: "Option 1", value: "option-1" },
						{ label: "Option 2", value: "option-2" },
					]}
				/>
				<OneDashInput name="submit" type="submit" value="Absenden"></OneDashInput>
			</OneDashForm>
		</OneDashCard>
	))
	.add("tag input", () => (
		<OneDashCard>
			<OneDashForm onSubmit={action("Submit")}>
				<OneDashTagInput
					name="select"
					label="Tag Input"
					tags={[
						{ label: "Option 1", value: "option-1" },
						{ label: "Option 2", value: "option-2" },
					]}></OneDashTagInput>
				<OneDashInput name="submit" type="submit" value="Absenden"></OneDashInput>
			</OneDashForm>
		</OneDashCard>
	))
	.add("onchange", () => (
		<OneDashCard>
			<OneDashForm onChange={action("Change")}>
				<OneDashTagInput
					name="select"
					label="Tag Input"
					tags={[
						{ label: "Option 1", value: "option-1" },
						{ label: "Option 2", value: "option-2" },
					]}></OneDashTagInput>
			</OneDashForm>
		</OneDashCard>
	));
