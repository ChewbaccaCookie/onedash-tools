import React from "react";
import StyleLoader from "../Utils/StyleLoader";
import { withKnobs, select as sel, boolean } from "@storybook/addon-knobs";
import Table from "./Table";
import Card from "../Card/Card";

export default {
	title: "Table",
	decorators: [withKnobs],
};

const tableHeaders = [
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
] as TableHeader[];
const tableValues = [
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
		plz: "12323",
		ort: "Mannheim",
	},
	{
		id: 3,
		plz: "54342",
		ort: "Mannheim",
	},
	{
		id: 4,
		plz: "32152",
		ort: "Mannheim",
	},
	{
		id: 5,
		plz: "67834",
		ort: "Mannheim",
	},
	{
		id: 6,
		plz: "03927",
		ort: "Mannheim",
	},
	{
		id: 7,
		plz: "68169",
		ort: "Mannheim",
	},
	{
		id: 8,
		plz: "68169",
		ort: "Mannheim",
	},
	{
		id: 9,
		plz: "68169",
		ort: "Mannheim",
	},
	{
		id: 10,
		plz: "68169",
		ort: "Mannheim",
	},
	{
		id: 11,
		plz: "68169",
		ort: "Mannheim",
	},
	{
		id: 12,
		plz: "68169",
		ort: "Mannheim",
	},
	{
		id: 13,
		plz: "68169",
		ort: "Mannheim",
	},
	{
		id: 14,
		plz: "68169",
		ort: "Mannheim",
	},
	{
		id: 15,
		plz: "68169",
		ort: "Mannheim",
	},
	{
		id: 16,
		plz: "68169",
		ort: "Mannheim",
	},
	{
		id: 17,
		plz: "68169",
		ort: "Mannheim",
	},
	{
		id: 18,
		plz: "68169",
		ort: "Mannheim",
	},
	{
		id: 19,
		plz: "68169",
		ort: "Mannheim",
	},
	{
		id: 20,
		plz: "68169",
		ort: "Mannheim",
	},
] as any[];

export const defaultTable = () => {
	const disabled = boolean("Disabled", false);
	const editable = boolean("Editable", true);
	const searchable = boolean("Searchable", true);
	const orderable = boolean("Orderable", true);
	const maxElements = Number(sel("Anzahl zeilen", ["0", "5", "10", "15", "20"], "15"));
	return (
		<StyleLoader>
			<Card maxWidth={900}>
				<Table
					searchable={searchable}
					orderable={orderable}
					editable={editable}
					disabled={disabled}
					tableHeaders={tableHeaders}
					tableValues={tableValues.slice(0, maxElements)}
				/>
			</Card>
		</StyleLoader>
	);
};
