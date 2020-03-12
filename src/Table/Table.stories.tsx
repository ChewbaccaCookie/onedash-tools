import React from "react";
import { action } from "@storybook/addon-actions";
import StyleLoader from "../Utils/StyleLoader";
import { withKnobs, select as sel, boolean, text, number } from "@storybook/addon-knobs";
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
		plz: "68169",
		ort: "Mannheim",
	},
] as any[];

export const card = () => {
	const disabled = boolean("Disabled", false);
	return (
		<StyleLoader>
			<Card>
				<Table disabled={disabled} tableHeaders={tableHeaders} tableValues={tableValues} />
			</Card>
		</StyleLoader>
	);
};
