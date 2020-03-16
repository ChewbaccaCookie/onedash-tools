/* eslint-disable react/display-name */
import React, { Component } from "react";
import { useTable, Column, useSortBy, useResizeColumns, useFlexLayout, Row } from "react-table";
import "./styles/twenty.scss";
import SETTINGS from "../Utils/Settings";
import Input from "../Form/Input/Input";
import Button from "../Form/Button/Button";
import { SortableElement, SortableHandle, SortableContainer } from "react-sortable-hoc";

export default class Table extends Component<TableProps> {
	state = {
		searchFilter: "",
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
		let data = this.props.tableValues.filter((x) => {
			let found = sF?.length > 0 ? false : true;
			Object.keys(x).map((columnName) => {
				if (String(x[columnName]).indexOf(sF) !== -1) {
					found = true;
				}
			});

			return found;
		});
		if (data.length === 0) {
			data = ["not-found"];
		}

		return data;
	};

	onRowClick = (row) => {
		const original = row.original;
		let openDialog = true;
		if (this.props.onRowClick) {
			this.props.onRowClick.event(original);
			openDialog = this.props.onRowClick.openDialog ? this.props.onRowClick.openDialog : true;
		}
		console.log(openDialog);
	};

	render() {
		const columns: Column<any>[] = this.props.tableHeaders
			.filter((x) => x.visible !== 0 && x.visible !== false)
			.map((x) => {
				return {
					Header: x.title,
					accessor: x.columnName,
				};
			});
		return (
			<div style={this.props.cssStyles} className={this.getClasses()}>
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
						{this.props.editable && <Button disabled={this.props.disabled}>Neuer Eintrag</Button>}
					</div>
				</div>
				<GenericTable
					data={this.filterData()}
					onRowClick={this.onRowClick}
					columns={columns}
					orderable={this.props.orderable && this.state.searchFilter === "" ? true : false}
				/>
			</div>
		);
	}
}

interface GenericTableProps {
	columns: Column<any>[];
	data: any[];
	onRowClick: (row: Row<any>) => void;
	orderable?: boolean;
}
function GenericTable({ columns, data, orderable, onRowClick }: GenericTableProps) {
	const tableBody = React.createRef<HTMLDivElement>();
	const defaultColumn = React.useMemo(
		() => ({
			minWidth: 25,
			maxWidth: 400,
		}),
		[]
	);

	const { getTableProps, headerGroups, rows, prepareRow } = useTable(
		{
			columns,
			data,
			defaultColumn,
		},
		useResizeColumns,
		useFlexLayout,
		useSortBy,
		(hooks) => {
			if (orderable) {
				hooks.visibleColumns.push((columns: any) => [
					// Let's make a column for selection
					{
						width: 25,
						id: "order-icon",
						Header: () => <div></div>,
						Cell: () => (
							<div className="td drag-handle-wrapper" style={{ width: 30 }}>
								<DragHandle />
							</div>
						),
					},
					...columns,
				]);
			}
		}
	);

	return (
		<div {...getTableProps()} className="table">
			<div>
				{headerGroups.map((headerGroup, i) => (
					<div
						key={i}
						{...headerGroup.getHeaderGroupProps({
							// style: { paddingRight: '15px' },
						})}
						className="tr">
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
			<div ref={tableBody} className="tbody">
				<SortingContainer
					helperContainer={tableBody.current ? tableBody.current : undefined}
					useDragHandle={true}
					lockAxis="y">
					{!(rows.length === 1 && rows[0].original === "not-found") &&
						rows.map((row, i) => {
							prepareRow(row);

							return (
								<SortableItem key={i} index={row.original.order || i}>
									<div
										onClick={(e: any) => {
											if (
												!e.target.classList.contains("drag-handle-wrapper") &&
												!e.target.classList.contains("drag-handle")
											)
												onRowClick(row);
										}}
										{...row.getRowProps()}
										className="tr">
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

					{rows.length === 1 && rows[0].original === "not-found" && (
						<div className="tr full-size">
							<div className="td">Es konnte kein Eintrag gefunden werden</div>
						</div>
					)}
				</SortingContainer>
			</div>
		</div>
	);
}

const DragHandle = SortableHandle(() => <span className="drag-handle"></span>);

const SortableItem = SortableElement(({ children }) => <>{children}</>);

const SortingContainer = SortableContainer(({ children }) => {
	return <>{children}</>;
});
