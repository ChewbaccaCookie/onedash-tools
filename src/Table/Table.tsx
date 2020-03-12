import React, { Component } from "react";
import { useTable, Column, useSortBy, useBlockLayout, useResizeColumns } from "react-table";
import "./styles/twenty.scss";
import SETTINGS from "../Utils/Settings";

export default class Table extends Component<TableProps> {
	private getClasses = () => {
		let classList = "onedash-table";
		if (this.props.className) {
			classList += " " + this.props.className;
		}
		if (this.props.style) {
			classList += " style-" + this.props.style;
		} else {
			classList += " style-" + SETTINGS.style;
		}
		return classList;
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
				<GenericTable data={this.props.tableValues} columns={columns} />
			</div>
		);
	}
}

interface GenericTableProps {
	columns: Column<any>[];
	data: any[];
}
function GenericTable({ columns, data }: GenericTableProps) {
	const defaultColumn = React.useMemo(
		() => ({
			minWidth: 30,
			width: 150,
			maxWidth: 400,
		}),
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
		{
			columns,
			data,
			defaultColumn,
		},
		useSortBy,
		useBlockLayout,
		useResizeColumns
	);

	// Render the UI for your table
	return (
		<table {...getTableProps()}>
			<thead>
				{headerGroups.map((headerGroup, i) => (
					<tr key={i} {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column: any, index) => (
							<th key={index} {...column.getHeaderProps(column.getSortByToggleProps())}>
								{column.render("Header")}
								<span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>

								<div {...column.getResizerProps()} className={`resizer ${column.isResizing ? "isResizing" : ""}`} />
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row, i) => {
					prepareRow(row);
					return (
						<tr key={i} {...row.getRowProps()}>
							{row.cells.map((cell, index) => {
								return (
									<td key={index} {...cell.getCellProps()}>
										{cell.render("Cell")}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
