type formattingFunction = (value: any, shortForm?: boolean) => any;

interface TableProps {
	tableHeaders: TableHeader[];
	tableValues: any[];
	editable?: boolean;
	searchable?: boolean;
	orderable?: boolean;
	onSave?: (entry: any, tableValues: any[]) => void;
	onDelete?: (rowId: any, rowValues: any) => void;
	onClick?: Function | { click: Function; openDialog?: boolean };
	cssStyles?: React.CSSProperties;
	className?: string;
	style?: styles;
	disabled?: boolean;
}

interface TableHeader {
	title: string;
	columnName: string;
	type: "number" | "text" | "password" | "select" | "tag-input" | "boolean" | "email";
	inputData?: ValueLabelPair;
	readonly?: boolean;
	formattingFunction?: formattingFunction;
	sqlType?: "VARCHAR" | "BOOLEAN" | "INT";
	maxLength?: number;
	required?: 1 | 0;
	visible: boolean | 0 | 1;
}
