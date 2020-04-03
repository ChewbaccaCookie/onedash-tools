import React from "react";
import StyleLoader from "../Utils/StyleLoader";
import { withKnobs, select as sel, boolean } from "@storybook/addon-knobs";
import Table from "./Table";
import Card from "../Card/Card";
import { action } from "@storybook/addon-actions";
import * as ROUTE_TEST_DATA from "./routeTestData.json";
import * as FACILITIES_TEST_DATA from "./facilitiesTestData.json";

export default {
	title: "Table",
	decorators: [withKnobs],
};

export const routeTestData = () => {
	const disabled = boolean("Disabled", false);
	const editable = boolean("Editable", true);
	const searchable = boolean("Searchable", true);
	const orderable = boolean("Orderable", false);
	const openDialogOnAdd = boolean("openDialogOnAdd", true);
	const openDialogOnClick = boolean("openDialogOnRowClick", true);
	const maxElements = Number(sel("Anzahl zeilen", ["0", "5", "10", "15", "20"], "15"));
	const { tableHeaders, tableData } = ROUTE_TEST_DATA;
	return (
		<StyleLoader>
			<Card maxWidth={900}>
				<Table
					searchable={searchable}
					orderable={orderable}
					editable={editable}
					disabled={disabled}
					tableHeaders={tableHeaders as any}
					tableValues={tableData.slice(0, maxElements)}
					onSave={action("onSave")}
					onDelete={action("onDelete")}
					onAddClick={{ event: action("onAddClick"), openDialog: openDialogOnAdd }}
					onOrderChange={action("onOrderChange")}
					onRowClick={{ event: action("onRowClick"), openDialog: openDialogOnClick }}
				/>
			</Card>
		</StyleLoader>
	);
};
export const faciltiesTestData = () => {
	const disabled = boolean("Disabled", false);
	const editable = boolean("Editable", true);
	const searchable = boolean("Searchable", true);
	const orderable = boolean("Orderable", false);
	const maxElements = Number(sel("Anzahl zeilen", ["0", "5", "10", "15", "20"], "15"));
	const { tableHeaders, tableData } = FACILITIES_TEST_DATA;
	return (
		<StyleLoader>
			<Card maxWidth={900}>
				<Table
					dialogMaxWidth={800}
					searchable={searchable}
					orderable={orderable}
					editable={editable}
					disabled={disabled}
					tableHeaders={tableHeaders as any}
					tableValues={tableData.slice(0, maxElements)}
					onDelete={action("onDelete")}
				/>
			</Card>
		</StyleLoader>
	);
};
