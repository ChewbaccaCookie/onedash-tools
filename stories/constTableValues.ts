import { tableHeader } from "../src/OneDashTable/OneDashTable";

export const TABLE_VALUES = {
	basicHeaders: [
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
	] as tableHeader[],
	basicValues: [
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
	] as any[],

	tagHeaders: [
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
	] as tableHeader[],
	tagValues: [
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
	] as any[],

	selectHeaders: [
		{
			columnName: "plz",
			title: "Postleitzahl",
			type: "number",
			visible: 1,
			columnNotNull: 1,
		},
		{
			columnName: "ort",
			title: "Ortsname",
			type: "select",
			visible: 1,
			columnNotNull: 1,
			selectValueLabelPair: [
				{
					value: 54470,
					label: "Bernkastel - Kues",
				},
				{
					value: 68169,
					label: "Mannheim",
				},
				{
					value: 54516,
					label: "Wittlich",
				},
			],
		},
	] as tableHeader[],
	selectValues: [
		{
			id: 0,
			plz: "54470",
			ort: undefined,
			tags: [],
		},
		{
			id: 1,
			plz: "54516",
			ort: {
				value: 54470,
				label: "Bernkastel - Kues",
			},
		},
		{
			id: 2,
			plz: "68169",
			ort: undefined,
			tags: [],
		},
	] as any[],
};
