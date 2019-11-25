import React from "react";
import { storiesOf } from "@storybook/react";
import "../src/styles/default.scss";
import OneDashCard from "../src/OneDashCard/OneDashCard";
import OneDashTable from "../src/OneDashTable/OneDashTable";
import { action } from "@storybook/addon-actions";
import { TABLE_VALUES } from "./constTableValues";
const { basicHeaders, basicValues, selectValues, selectHeaders, tagValues, tagHeaders } = TABLE_VALUES;
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
	.add("select", () => (
		<OneDashCard>
			<OneDashTable searchable editable onSave={action("Add")} tableHeaders={selectHeaders} tableValues={selectValues} />
		</OneDashCard>
	))
	.add("tag input", () => (
		<OneDashCard>
			<OneDashTable searchable editable onSave={action("Add")} tableHeaders={tagHeaders} tableValues={tagValues} />
		</OneDashCard>
	));
