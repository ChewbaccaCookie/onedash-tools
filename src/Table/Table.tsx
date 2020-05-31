/* eslint-disable indent */
/* eslint-disable react/display-name */
import React, { Component } from "react";
import { useTable, Column, useSortBy, useResizeColumns, useFlexLayout, Row } from "react-table";
import "./styles/twenty.scss";
import SETTINGS from "../Utils/Settings";
import Input from "../Form/Input/Input";
import Button from "../Form/Button/Button";
import { SortableElement, SortableHandle, SortableContainer, SortEndHandler } from "react-sortable-hoc";
import Prompt from "../Dialog/Prompt";
import Dialog from "../Dialog/Dialog";
import Select from "../Form/Select/Select";
import TagInput from "../Form/TagInput/TagInput";
import Boolean from "../Form/Boolean/Boolean";
import Utils from "../Utils/Utils";
import Form from "../Form/Form/Form";
import { DialogButton } from "../Dialog/DialogTypes";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TableProps, formattingFunction, TableHeader } from "./TableTypes";
import { ValueLabelPair } from "../ToolTypes";

export default class Table extends Component<TableProps> {
	deleteRowData: any;
	isNewEntry = false;
	promptDialog = React.createRef<Dialog>();
	entryDialog = React.createRef<Dialog>();
	entryForm = React.createRef<Form>();

	state = {
		searchFilter: "",
		selectedEntry: undefined,
	};
	private getTemporaryRowClasses = () => {
		let classList = "onedash-table-sorting-element";

		if (this.props.style) {
			classList += " style-" + this.props.style;
		} else {
			classList += " style-" + SETTINGS.style;
		}
		return classList;
	};

	private getClasses = () => {
		let classList = "onedash-table";
		if (this.props.className) {
			classList += " " + this.props.className;
		}
		if (this.props.disabled) {
			classList += " disabled";
		}
		if (this.props.editable) {
			classList += " editable";
		}
		if (this.props.style) {
			classList += " style-" + this.props.style;
		} else {
			classList += " style-" + SETTINGS.style;
		}
		return classList;
	};

	filterData = () => {
		const sF = this.state.searchFilter;
		let data = Utils.clone(
			this.props.tableValues.filter((x) => {
				let found = sF?.length > 0 ? false : true;
				Object.keys(x).map((columnName) => {
					if (
						String(x[columnName])
							.toLowerCase()
							.indexOf(sF?.toLowerCase()) !== -1
					) {
						found = true;
					}
				});

				return found;
			})
		);
		if (data.length === 0) {
			data = [{ id: -1 }];
		}
		data.forEach((row) => {
			Object.keys(row).forEach((prop) => {
				const header = this.getHeader().find((x) => x.columnName === prop);
				if (!header) return;
				const data = row[prop];
				row[prop] = this.formatOutput(header.type, data, header.formattingFunction, true, header.inputData);
			});
		});
		return data;
	};

	onRowClick = (row) => {
		this.isNewEntry = false;
		const original = row.original;

		let openDialog = true;
		if (this.props.onRowClick) {
			this.props.onRowClick.event(original);
			openDialog = this.props.onRowClick.openDialog !== undefined ? this.props.onRowClick.openDialog : true;
		}
		if (openDialog === true && this.entryForm.current) {
			const selectedEntry = this.props.tableValues.find((x) => x.id === original.id);
			if (this.entryDialog.current) this.entryDialog.current.show();
			this.setState({
				selectedEntry,
			});
		}
	};
	onEntryDelete = (row: any) => {
		this.deleteRowData = row;
		if (this.promptDialog.current) this.promptDialog.current.show();
	};
	deleteEntry = () => {
		const data = this.deleteRowData.original;
		if (this.props.onDelete) this.props.onDelete(data.id, data);
	};

	formatOutput = (
		type: any,
		value: any,
		formattingFunction?: formattingFunction,
		shortForm?: boolean,
		inputData?: ValueLabelPair[]
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
				return "❌";
			}
		}

		if (type === "select") {
			let val = value;
			if (inputData?.find((x) => String(x.value) === String(val))) {
				val = inputData?.find((x) => String(x.value) === String(val))?.label;
			}

			return val;
		}
		if (type === "tag-input") {
			if (!inputData) return "";
			return value
				.map((v) => {
					let val = "";
					const tmp = inputData.find((x) => String(x.value) === String(v)) as ValueLabelPair;
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
		if (value === null) {
			value = "";
		}
		if (React.isValidElement(value) === false && typeof value === "object") {
			throw new Error("Child has to be a React object! " + JSON.stringify(value));
		}
		return value;
	};

	getHeader = () => {
		return this.props.tableHeaders.map((th: TableHeader) => {
			if (typeof th.inputData === "string" && th.inputData !== "") {
				th.inputData = JSON.parse(th.inputData);
			}
			return th;
		});
	};

	saveEntry = () => {
		const form = this.entryForm.current;
		const dialog = this.entryDialog.current;
		if (!form || !form.validateInputs() || !dialog) return false;
		const selectedEntry = form.getData();
		if (this.state.selectedEntry) selectedEntry.id = (this.state.selectedEntry as any).id;
		this.setState({ selectedEntry }, () => {
			if (this.props.onSave) this.props.onSave(selectedEntry, this.isNewEntry);
			this.isNewEntry = false;
			dialog.hide();
		});
		return true;
	};

	addEntry = () => {
		const openDialog = this.props.onAddClick?.openDialog !== undefined ? this.props.onAddClick.openDialog : true;
		if (this.props.onAddClick?.event) this.props.onAddClick.event();
		if (openDialog === true && this.entryDialog.current) {
			this.isNewEntry = true;
			this.entryDialog.current.show();
		}
	};
	onKeyDown = (e: any) => {
		if (e.key === "F6") {
			if (this.saveEntry()) {
				setTimeout(() => {
					this.addEntry();
				}, 600);
			}
		}
	};

	render() {
		const data = this.filterData();
		const headers = this.getHeader();

		const buttons: DialogButton[] = [{ type: "close", closeOnClick: true, text: "Abbrechen" }];
		if (this.props.editable === true) {
			buttons.push({ type: "save", closeOnClick: false, text: "Speichern", onClick: this.saveEntry });
		}

		const getColumnWidth = (data: any[], accessor: string, headerText: string) => {
			const maxWidth = 600;
			const magicSpacing = 8;
			const cellLength = Math.max(
				...data.map((row) => (`${row[accessor]}` || "").length),
				headerText.length * 1.4
			);

			return Math.min(maxWidth, cellLength * magicSpacing);
		};

		const columns: Column<any>[] = headers
			.filter((x) => x.visible !== 0 && x.visible !== false)
			.map((x) => {
				return {
					Header: x.title,
					accessor: x.columnName,
					width: getColumnWidth(data, x.columnName, x.title),
				};
			});

		return (
			<div onKeyDown={this.onKeyDown} style={this.props.cssStyles} className={this.getClasses()}>
				<div className="table-toolbar">
					<div className="left">
						{this.props.searchable && (
							<Input
								disabled={this.props.disabled}
								type="search"
								onChange={(searchFilter) => this.setState({ searchFilter: searchFilter.value })}
								name="search"
								placeholder="Suchen ..."></Input>
						)}
					</div>
					<div className="right">
						{this.props.editable && (
							<Button onClick={this.addEntry} disabled={this.props.disabled}>
								Neuer Eintrag
							</Button>
						)}
					</div>
				</div>
				<GenericTable
					editable={this.props.editable}
					tempClasses={this.getTemporaryRowClasses()}
					data={data}
					onRowClick={this.onRowClick}
					onEntryDelete={this.onEntryDelete}
					columns={columns}
					onSortEnd={(e) =>
						this.props.onOrderChange ? this.props.onOrderChange(e.oldIndex, e.newIndex) : undefined
					}
					orderable={
						this.props.orderable &&
						(this.state.searchFilter === "" || this.state.searchFilter === undefined)
							? true
							: false
					}
				/>
				<Prompt
					dialogRef={this.promptDialog}
					accept={{ event: this.deleteEntry }}
					title="Eintrag löschen?"
					text="Soll der Eintrag gelöscht werden?"
				/>

				<Dialog
					settings={{ maxWidth: this.props.dialogMaxWidth }}
					className="entry-dialog"
					title="Eintrag bearbeiten"
					buttons={buttons}
					onClose={() => this.setState({ selectedEntry: undefined })}
					ref={this.entryDialog}>
					<Form ref={this.entryForm} onSubmit={this.saveEntry} className="dialog-form">
						{headers.map((header, index) => {
							let entryData = undefined;
							if (this.state.selectedEntry)
								entryData = (this.state.selectedEntry as any)[header.columnName];
							return (
								<React.Fragment key={index}>
									{!header.isId && (entryData || this.props.editable || header.readonly === true) && (
										<div className="dialog-entry" key={index}>
											<div key={index}>
												{this.props.editable && !(header.readonly === true) && (
													<>
														{header.type === "select" &&
															typeof header.inputData === "object" && (
																<>
																	<Select
																		label={header.title}
																		name={header.columnName}
																		value={entryData ? entryData : "invalid-input"}
																		native
																		style={this.props.style}
																		options={header.inputData || []}
																		placeholder="Wählen Sie eine Option"
																		required={
																			header.required &&
																			Number(header.required) === 1
																				? true
																				: false
																		}
																	/>
																</>
															)}
														{header.type === "tag-input" &&
															typeof header.inputData === "object" && (
																<TagInput
																	label={header.title}
																	style={this.props.style}
																	name={header.columnName}
																	tags={header.inputData}
																	value={entryData}
																	required={
																		header.required && Number(header.required) === 1
																			? true
																			: false
																	}
																/>
															)}
														{header.type === "boolean" && (
															<Boolean
																label={header.title}
																style={this.props.style}
																name={header.columnName}
																value={entryData}
																required={
																	header.required && Number(header.required) === 1
																		? true
																		: false
																}
															/>
														)}
														{header.type !== "select" &&
															header.type !== "tag-input" &&
															header.type !== "boolean" && (
																<Input
																	label={header.title}
																	style={this.props.style}
																	type={header.type}
																	required={
																		header.required && Number(header.required) === 1
																			? true
																			: false
																	}
																	maxLength={header.maxLength}
																	value={entryData}
																	name={header.columnName}
																/>
															)}
													</>
												)}
												{(!this.props.editable || header.readonly === true) && (
													<div className="entry readonly">
														<p className="label">{header.title}</p>
														<div className="value">
															{this.formatOutput(
																header.type,
																entryData,
																header.formattingFunction,
																false,
																header.inputData
															)}
														</div>
													</div>
												)}
											</div>
										</div>
									)}
								</React.Fragment>
							);
						})}
					</Form>
				</Dialog>
			</div>
		);
	}
}

interface GenericTableProps {
	columns: Column<any>[];
	data: any[];
	onRowClick: (row: Row<any>) => void;
	onEntryDelete: (row: Row<any>) => void;
	orderable?: boolean;
	editable?: boolean;
	tempClasses: string;
	onSortEnd?: SortEndHandler;
}
function GenericTable({
	columns,
	data,
	orderable,
	editable,
	onRowClick,
	onEntryDelete,
	tempClasses,
	onSortEnd,
}: GenericTableProps) {
	const defaultColumn = React.useMemo(
		() => ({
			minWidth: 50,
			maxWidth: 400,
		}),
		[]
	);

	const orderHook = (hooks: any) => {
		if (orderable === true) {
			hooks.visibleColumns.push((columns: any) => [
				// Let's make a column for selection
				{
					maxWidth: 50,
					width: 50,
					id: "order-icon",
					Header: () => <div></div>,
					Cell: () => (
						<div className="td drag-handle-wrapper" style={{ width: "100%", height: "100%" }}>
							<DragHandle />
						</div>
					),
				},
				...columns,
			]);
		}
	};
	const deleteHook = (hooks: any) => {
		if (editable === true) {
			hooks.visibleColumns.push((columns: any) => [
				...columns,
				{
					maxWidth: 50,
					width: 50,
					id: "delete-icon",
					Header: () => <div></div>,
					Cell: ({ row }: any) => (
						<div
							className="trash-icon-wrapper"
							onClick={() => onEntryDelete(row)}
							style={{ width: "100%", height: "100%" }}>
							<span className="trash-icon">
								<span />
								<i />
							</span>
						</div>
					),
				},
			]);
		}
	};

	const tableProps = useTable(
		{
			columns,
			data,
			defaultColumn,
		},
		useResizeColumns,
		useFlexLayout,
		orderHook,
		deleteHook,
		useSortBy
	);

	const onClick = (e: any, row: any) => {
		if (!e.target.classList.contains("td")) return;
		if (onRowClick) onRowClick(row);
	};

	if (orderable === false) {
		return (
			<div {...tableProps.getTableProps()} className="table">
				<div>
					{tableProps.headerGroups.map((headerGroup, i) => (
						<div key={i} {...headerGroup.getHeaderGroupProps()} className="tr">
							{headerGroup.headers.map((column: any, ii) => (
								<div key={ii} {...column.getHeaderProps(column.getSortByToggleProps())} className="th">
									{column.render("Header")}
									<span
										className={
											column.isSorted
												? column.isSortedDesc
													? " sorting-icon down"
													: " sorting-icon up"
												: "sorting-icon"
										}></span>

									<div
										{...column.getResizerProps()}
										className={`resizer ${column.isResizing ? "isResizing" : ""}`}
									/>
								</div>
							))}
						</div>
					))}
				</div>
				<div className="tbody">
					<div>
						{!(tableProps.rows.length === 1 && tableProps.rows[0].original.id === -1) &&
							tableProps.rows.map((row, i) => {
								tableProps.prepareRow(row);

								return (
									<div key={i} onClick={(e) => onClick(e, row)} {...row.getRowProps()} className="tr">
										{row.cells.map((cell, ii) => {
											return (
												<div key={{ ii }} {...cell.getCellProps()} className="td">
													{cell.render("Cell")}
												</div>
											);
										})}
									</div>
								);
							})}

						{tableProps.rows.length === 1 && tableProps.rows[0].original.id === -1 && (
							<div className="tr full-size">
								<div className="td">Es konnte kein Eintrag gefunden werden</div>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div {...tableProps.getTableProps()} className="table">
				<div>
					{tableProps.headerGroups.map((headerGroup, i) => (
						<div key={i} {...headerGroup.getHeaderGroupProps()} className="tr">
							{headerGroup.headers.map((column: any, ii) => (
								<div key={ii} {...column.getHeaderProps()} className="th">
									{column.render("Header")}
									<div
										{...column.getResizerProps()}
										className={`resizer ${column.isResizing ? "isResizing" : ""}`}
									/>
								</div>
							))}
						</div>
					))}
				</div>
				<div className="tbody">
					<SortingContainer onSortEnd={onSortEnd} helperClass={tempClasses} useDragHandle={true} lockAxis="y">
						{!(tableProps.rows.length === 1 && tableProps.rows[0].original.id === -1) &&
							tableProps.rows.map((row, i) => {
								tableProps.prepareRow(row);

								return (
									<SortableItem key={i} index={row.original.order || i}>
										<div onClick={(e) => onClick(e, row)} {...row.getRowProps()} className="tr">
											{row.cells.map((cell, ii) => {
												return (
													<div key={{ ii }} {...cell.getCellProps()} className="td">
														{cell.render("Cell")}
													</div>
												);
											})}
										</div>
									</SortableItem>
								);
							})}

						{tableProps.rows.length === 1 && tableProps.rows[0].original.id === -1 && (
							<div className="tr full-size">
								<div className="td">Es konnte kein Eintrag gefunden werden</div>
							</div>
						)}
					</SortingContainer>
				</div>
			</div>
		);
	}
}

const DragHandle = SortableHandle(() => <span className="drag-handle"></span>);

const SortableItem = SortableElement(({ children }) => <>{children}</>);

const SortingContainer = SortableContainer(({ children }) => {
	return <div className="sorting-container">{children}</div>;
});
