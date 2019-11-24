import React from "react";
import { storiesOf } from "@storybook/react";
import "../src/styles/default.scss";
import OneDashCard from "../src/OneDashCard/OneDashCard";
import OneDashTable, { tableHeader } from "../src/OneDashTable/OneDashTable";
import { action } from "@storybook/addon-actions";

const basicHeaders: tableHeader[] = [
	{
		columnName: "plz",
		title: "Postleitzahl",
		type: "number",
		visible: 1,
	},
	{
		columnName: "ort",
		title: "Ortsname",
		type: "text",
		visible: 1,
	},
];
const basicValues: any[] = [
	{
		id: 0,
		plz: "54470",
		ort: "Bernkastel - Kues",
	},
	{
		id: 1,
		plz: "54516",
		ort: "Wittlich",
	},
	{
		id: 2,
		plz: "68169",
		ort: "Mannheim",
	},
];

const tagHeaders: tableHeader[] = [
	{
		columnName: "plz",
		title: "Postleitzahl",
		type: "number",
		visible: 1,
	},
	{
		columnName: "ort",
		title: "Ortsname",
		type: "text",
		visible: 1,
	},
	{
		columnName: "tags",
		title: "Tags",
		type: "tag-input",
		visible: 1,
		selectValueLabelPair: [
			{
				value: "alpha",
				label: "Alphabet",
			},
			{
				value: "beta",
				label: "Brüssel",
			},
		],
	},
];
const tagValues: any[] = [
	{
		id: 0,
		plz: "54470",
		ort: "Bernkastel - Kues",
		tags: [],
	},
	{
		id: 1,
		plz: "54516",
		ort: "Wittlich",
		tags: [
			{
				value: "alpha",
				label: "Alphabet",
			},
		],
	},
	{
		id: 2,
		plz: "68169",
		ort: "Mannheim",
		tags: [],
	},
];

storiesOf("Table", module)
	.add("default", () => (
		<OneDashCard>
			<OneDashTable tableHeaders={basicHeaders} tableValues={basicValues} />
		</OneDashCard>
	))
	.add("search", () => (
		<OneDashCard>
			<OneDashTable searchable tableHeaders={basicHeaders} tableValues={basicValues} />
		</OneDashCard>
	))
	.add("orderable", () => (
		<OneDashCard>
			<OneDashTable orderable tableHeaders={basicHeaders} tableValues={basicValues} />
		</OneDashCard>
	))
	.add("delete", () => (
		<OneDashCard>
			<OneDashTable onDelete={action("Delete")} tableHeaders={basicHeaders} tableValues={basicValues} />
		</OneDashCard>
	))
	.add("editable / add", () => (
		<OneDashCard>
			<OneDashTable searchable editable onSave={action("Add")} tableHeaders={basicHeaders} tableValues={basicValues} />
		</OneDashCard>
	))
	.add("tag input", () => (
		<OneDashCard>
			<OneDashTable searchable editable onSave={action("Add")} tableHeaders={tagHeaders} tableValues={tagValues} />
		</OneDashCard>
	));
