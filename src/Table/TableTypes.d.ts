type formattingFunction = (value: any, shortForm?: boolean) => any;

interface TableProps {
	tableHeaders: TableHeader[];
	tableValues: { id: number | string; [key: string]: any }[];
	editable?: boolean;
	searchable?: boolean;

	orderable?: boolean;
	onSave?: (entry: any) => void;
	onDelete?: (rowId: any, rowValues: any) => void;
	onAddClick?: { event: () => void; openDialog?: boolean };
	onOrderChange?: (lastOrderIndex: number, newOrderIndex: number) => void;

	// Will be triggered when a user clicks on the row
	onRowClick?: { event: (row: any) => void; openDialog?: boolean };
	cssStyles?: React.CSSProperties;
	className?: string;
	style?: styles;
	disabled?: boolean;
	dialogMaxWidth?: number;
}

interface TableHeader {
	title: string;
	columnName: string;
	type: "number" | "text" | "password" | "select" | "tag-input" | "boolean" | "email";
	inputData?: ValueLabelPair[];
	readonly?: boolean;
	formattingFunction?: formattingFunction;
	sqlType?: "VARCHAR" | "BOOLEAN" | "INT";
	maxLength?: number;
	required?: 1 | 0;
	visible: boolean | 0 | 1;
	isId?: boolean | 0 | 1;
}
