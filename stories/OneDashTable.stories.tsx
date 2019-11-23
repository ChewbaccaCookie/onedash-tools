import React from "react";
import { storiesOf } from "@storybook/react";
import "../src/styles/default.scss";
import OneDashCard from "../src/OneDashCard/OneDashCard";
import OneDashTable, { tableHeader } from "../src/OneDashTable/OneDashTable";
import { action } from "@storybook/addon-actions";

const tableHeaders: tableHeader[] = [
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
const tableValues: any[] = [
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

storiesOf("Table", module)
	.add("default", () => (
		<OneDashCard>
			<OneDashTable tableHeaders={tableHeaders} tableValues={tableValues} />
		</OneDashCard>
	))
	.add("search", () => (
		<OneDashCard>
			<OneDashTable searchable tableHeaders={tableHeaders} tableValues={tableValues} />
		</OneDashCard>
	))
	.add("orderable", () => (
		<OneDashCard>
			<OneDashTable orderable tableHeaders={tableHeaders} tableValues={tableValues} />
		</OneDashCard>
	))
	.add("delete", () => (
		<OneDashCard>
			<OneDashTable onDelete={action("Delete")} tableHeaders={tableHeaders} tableValues={tableValues} />
		</OneDashCard>
	))
	.add("editable / add", () => (
		<OneDashCard>
			<OneDashTable searchable editable onSave={action("Add")} tableHeaders={tableHeaders} tableValues={tableValues} />
		</OneDashCard>
	));
