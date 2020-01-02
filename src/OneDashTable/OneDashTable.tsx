/* eslint-disable indent */
import React, { Component } from "react";
import "./OneDashTable.scss";
import OneDashForm from "../OneDashForm/OneDashForm";
import OneDashInput from "../OneDashForm/OneDashInput";
import OneDashDialog from "../OneDashDialog/OneDashDialog";
import OneDashSelect from "../OneDashForm/OneDashSelect";
import PromptDialog from "../PromptDialog/PromptDialog";
import { SortableElement, SortableHandle, SortableContainer } from "react-sortable-hoc";
import OneDashTagInput from "../OneDashForm/OneDashTagInput";

type formattingFunction = (value: any, shortForm?: boolean) => any;
export type tableHeader = {
	title: string;
	columnName: string;
	type: "number" | "text" | "password" | "select" | "tag-input" | "boolean" | "email" | "readOnly";
	selectValueLabelPair?: SelectValueLabelPair[];
	visible: boolean | 0 | 1;
	formattingFunction?: formattingFunction;
	columnType?: "VARCHAR" | "BOOLEAN" | "INT";
	columnLength?: number;
	columnNotNull?: 1 | 0;
	isId?: 1 | 0;
};

export interface OneDashTableProps {
	tableHeaders: tableHeader[];
	tableValues: any[];
	editable?: boolean;
	searchable?: boolean;
	orderable?: boolean;
	onSave?: (entry: any, tableValues: any[]) => void;
	onDelete?: (rowId: any, rowValues: any) => void;
	onClick?: Function;
	formStyling?: OneDashStyles;
}

export interface OneDashTableState {
	tableHeaders: tableHeader[];
	tableValues: any[];
	selectedEntry: any;
	showPrompt: boolean;
}

class OneDashTable extends Component<OneDashTableProps, OneDashTableState> {
	state = {
		tableHeaders: [] as tableHeader[],
		tableValues: [] as any[],
		selectedEntry: {} as any,
		showPrompt: false,
	};
	currentId = "";
	entryDialog = React.createRef<OneDashDialog>();
	entryDialogForm = React.createRef<OneDashForm>();
	prompt = React.createRef<PromptDialog>();

	componentDidMount() {
		this.setInitialState();

		document.addEventListener("keydown", (ev) => {
			if (ev.key === "F7") {
				this.saveEntryAndAddNew();
			}
		});
	}

	saveEntryAndAddNew = () => {
		const dialog = this.entryDialog.current;
		const form = this.entryDialogForm.current;
		if (form && form.validateInputs()) {
			if (dialog) {
				if (dialog.isOpen()) {
					this.saveEntry();

					setTimeout(() => {
						this.showAddEntryDialog();
					}, 500);
				}
			}
		}
	};

	setInitialState = () => {
		const tableHeaders = this.props.tableHeaders;
		tableHeaders.forEach((tHeader) => {
			if (tHeader.type === "select" && typeof tHeader.selectValueLabelPair === "string") {
				try {
					tHeader.selectValueLabelPair = JSON.parse(tHeader.selectValueLabelPair as any);
				} catch (err) {
					console.error(err);
				}
			}
		});
		this.setState({
			tableHeaders: this.props.tableHeaders.filter((header) => header.visible === true || header.visible === 1),
			tableValues: this.props.tableValues,
		});
	};

	componentDidUpdate(lastProps: OneDashTableProps) {
		if (this.props.tableHeaders !== lastProps.tableHeaders || this.props.tableValues !== lastProps.tableValues) {
			this.setInitialState();
		}
	}

	filterEntries = (searchValues: any) => {
		const tValues = this.props.tableValues;
		const searchValue = searchValues.search.toLowerCase();
		const foundValues = tValues.filter((row) => {
			let stringFound = false;
			Object.keys(row).forEach((entry) => {
				const val = String(row[entry]).toLowerCase();
				if (val.indexOf(searchValue) !== -1) {
					stringFound = true;
				}
			});
			return stringFound;
		});
		this.setState({
			tableValues: foundValues,
		});
	};

	showEntryDetails = (e: any) => {
		const form = this.entryDialogForm.current;
		if (form) form.resetForm();
		const id = e.target.parentNode.getAttribute("data-entry-id") || {};
		const selectedEntry = this.state.tableValues.find((entry) => String(entry.id) === id);
		if (selectedEntry) {
			this.setState(
				{
					selectedEntry,
				},
				this.props.onClick
					? () => {
							this.props.onClick && this.props.onClick(selectedEntry);
					  }
					: this.openDialog
			);
		} else {
			console.error("Clicked element has not been found. Do you have forgotten to add an id?");
		}
	};
	openDialog = () => {
		const dialog = this.entryDialog.current;
		if (dialog) {
			dialog.open();
		}
	};
	closeDialog = () => {
		const dialog = this.entryDialog.current;
		if (dialog) dialog.close();
	};

	showAddEntryDialog = () => {
		if (this.entryDialogForm.current) this.entryDialogForm.current.resetForm();
		const newObj = {} as any;
		this.props.tableHeaders.forEach((header) => {
			if (header.type === "boolean" || header.type === "number") {
				newObj[header.columnName] = "0";
			} else {
				newObj[header.columnName] = "";
			}
		});
		this.setState(
			{
				selectedEntry: newObj,
			},
			this.openDialog
		);
	};

	saveEntry = () => {
		const form = this.entryDialogForm.current;
		const tableValues = this.state.tableValues;

		if (form && form.validateInputs()) {
			const data = form.getData();
			data.id = this.state.selectedEntry.id;
			if (data.id !== undefined) {
				const objIndex = tableValues.findIndex((tValue) => tValue.id === data.id);
				tableValues[objIndex] = data;
			} else {
				data.id = Math.round(Math.random() * 100000);
				tableValues.push(data);
			}
			tableValues.forEach((tVal, index) => {
				tVal.orderIndex = index;
			});
			this.setState({
				tableValues,
			});

			if (this.props.onSave) {
				this.props.onSave(data, tableValues);
			}
			this.closeDialog();
		}
	};

	buildDialogClasses = () => {
		let classList = "detail-entry";
		if (!this.props.editable) {
			classList += " detail-entry-read-only";
		}
		return classList;
	};

	public getValues = () => {
		return this.state.tableValues;
	};

	promptCallback = (response: boolean) => {
		if (this.prompt.current) this.prompt.current.close();
		if (!response) {
			this.currentId = "";
			return;
		}
		const tableRow = this.state.tableValues.find((v) => v.id === this.currentId);
		let tableValues = this.state.tableValues;
		tableValues = tableValues.filter((tv) => tv.id !== this.currentId);
		if (this.props.onDelete) this.props.onDelete(this.currentId, tableRow);
		this.setState({ tableValues });
	};

	sortItems = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
		const tableValues = this.state.tableValues;
		const element = tableValues[oldIndex];
		tableValues.splice(oldIndex, 1);
		tableValues.splice(newIndex, 0, element);
		tableValues.forEach((value, index) => {
			value.orderIndex = index;
		});
		this.setState({ tableValues });
	};

	formatOutput = (
		type: any,
		value: any,
		formattingFunction: formattingFunction,
		shortForm?: boolean,
		selectValueLabelPair?: SelectValueLabelPair[]
	) => {
		if (formattingFunction) {
			const formatted = formattingFunction(value, shortForm);
			if (React.isValidElement(formatted) === false) {
				throw new Error("Child has to be a React object!");
			}
			return formatted;
		}

		if (type === "boolean") {
			if (Number(value) === 1) {
				return "✅";
			} else {
				return "🟥";
			}
		}

		if (type === "select") {
			let val = value;
			if (selectValueLabelPair && selectValueLabelPair.find((x) => String(x.value) === String(val))) {
				val = (selectValueLabelPair.find((x) => String(x.value) === String(val)) as SelectValueLabelPair).label;
			}
			return val;
		}
		if (type === "tag-input") {
			if (!selectValueLabelPair) return "";
			return value
				.map((v) => {
					let val = "";
					const tmp = selectValueLabelPair.find((x) => String(x.value) === String(v)) as SelectValueLabelPair;
					if (tmp) {
						val = tmp.label;
					}
					return val;
				})
				.join(", ");
		}
		if (type === "email") {
			return <a href={`mailto:${value}`}>{value}</a>;
		}

		if (React.isValidElement(value) === false && typeof value === "object") {
			throw new Error("Child has to be a React object! " + JSON.stringify(value));
		}
		return value;
	};
	render() {
		const { tableHeaders, tableValues } = this.state;
		if (!tableHeaders) {
			throw new Error("Table Headers must be provided to this component.");
		}
		if (tableHeaders.length === 0) {
			return <></>;
		}
		return (
			<div className="onedash-table">
				<div className="table-toolbox">
					{this.props.searchable && (
						<OneDashForm styling={this.props.formStyling} onChange={this.filterEntries}>
							<OneDashInput name="search" placeholder="Suche nach Eintrag ..." iconRight="fas fa-search" />
						</OneDashForm>
					)}
					{this.props.editable && (
						<button className="add-entry" onClick={this.showAddEntryDialog}>
							Neuer Eintrag
						</button>
					)}
				</div>
				<div className="table-wrapper">
					<SortableContainerEl useDragHandle={true} lockAxis="y" onSortEnd={this.sortItems}>
						<div className="row header">
							{this.props.orderable && <div className="cell cell-icon"></div>}
							{tableHeaders.map((headerRow, index) => (
								<div key={index} className="cell">
									{headerRow.title}
								</div>
							))}
							{this.props.onDelete && <div className="cell cell-icon"></div>}
						</div>
						{tableValues.map((tableRow, index) => (
							<SortableRowEl
								key={index}
								index={tableRow.orderIndex || index}
								onClick={this.showEntryDetails}
								entryId={tableRow.id}
								className="row"
								isOrderable={this.props.orderable}>
								{tableHeaders.map((headerRowEntry, index) => (
									<div key={index} className="cell" data-title={headerRowEntry.title}>
										{this.formatOutput(
											headerRowEntry.type,
											tableRow[headerRowEntry.columnName],
											headerRowEntry.formattingFunction as any,
											true,
											headerRowEntry.selectValueLabelPair
										)}
									</div>
								))}
								{this.props.onDelete && (
									<div
										className="cell cell-icon"
										onClick={() => {
											this.currentId = tableRow.id;
											const p = this.prompt.current;
											if (p) p.open();
										}}>
										<i className="fas fa-trash-alt delete-row"></i>
									</div>
								)}
							</SortableRowEl>
						))}
					</SortableContainerEl>
				</div>

				<PromptDialog ref={this.prompt} callback={this.promptCallback} title="Element wirklich löschen?"></PromptDialog>

				<OneDashDialog
					className="table-detail-dialog"
					isOpen={false}
					closeable={true}
					ref={this.entryDialog}
					title="Details"
					onSaveButtonClick={this.props.editable ? this.saveEntry : undefined}>
					<OneDashForm styling={this.props.formStyling} ref={this.entryDialogForm}>
						{this.props.tableHeaders.map((header, index) => (
							<div key={index}>
								{!header.isId && (
									<div>
										{((this.state.selectedEntry[header.columnName] &&
											this.state.selectedEntry[header.columnName].length > 0) ||
											this.props.editable ||
											header.type === "readOnly") && (
											<div key={index} className={this.buildDialogClasses()}>
												<div className="detail-title">{header.title}</div>
												<div className="detail-value">
													{this.props.editable && (
														<>
															{header.type === "select" &&
																typeof header.selectValueLabelPair === "object" && (
																	<OneDashSelect
																		name={header.columnName}
																		value={
																			this.state.selectedEntry[header.columnName]
																				? this.state.selectedEntry[header.columnName]
																				: "invalid-input"
																		}
																		options={header.selectValueLabelPair || []}
																		placeholder="Wählen Sie eine Option"
																		required={
																			header.columnNotNull && Number(header.columnNotNull) === 1
																				? true
																				: false
																		}
																	/>
																)}
															{header.type === "tag-input" &&
																typeof header.selectValueLabelPair === "object" && (
																	<OneDashTagInput
																		preventDuplicates
																		name={header.columnName}
																		tags={header.selectValueLabelPair}
																		value={this.state.selectedEntry[header.columnName]}
																	/>
																)}
															{header.type === "readOnly" && (
																<>
																	{this.formatOutput(
																		header.type,
																		this.state.selectedEntry,
																		header.formattingFunction as any,
																		false,
																		header.selectValueLabelPair
																	)}
																</>
															)}
															{header.type !== "select" &&
																header.type !== "tag-input" &&
																header.type !== "readOnly" && (
																	<OneDashInput
																		type={header.type}
																		required={
																			header.columnNotNull && Number(header.columnNotNull) === 1
																				? true
																				: false
																		}
																		maxLength={header.columnLength}
																		value={this.state.selectedEntry[header.columnName]}
																		name={header.columnName}
																	/>
																)}
														</>
													)}
													{!this.props.editable && (
														<>
															{this.formatOutput(
																header.type,
																this.state.selectedEntry[header.columnName],
																header.formattingFunction as any,
																false,
																header.selectValueLabelPair
															)}
														</>
													)}
												</div>
											</div>
										)}
									</div>
								)}
							</div>
						))}
					</OneDashForm>
				</OneDashDialog>
			</div>
		);
	}
}

const SortableRowEl = SortableElement(({ children, onClick, entryId, className, isOrderable }: any) => {
	return (
		<div data-entry-id={entryId} onClick={onClick} className={className}>
			{isOrderable && (
				<div className="cell cell-icon drag-handle" data-title="Drag Handle">
					<DragHandle />
				</div>
			)}
			{children}
		</div>
	);
});
const DragHandle = SortableHandle(() => <i className="fas fa-grip-lines" />);
const SortableContainerEl = SortableContainer(({ children }: any) => {
	return <div className="table">{children}</div>;
});

export default OneDashTable;
