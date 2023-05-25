import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {usePagination, useRowSelect, useTable} from 'react-table';
import './table.module.css';
import {useNavigate} from 'react-router-dom';

interface Props {
	setStateValue: Dispatch<SetStateAction<any>>;
	value: any[];
	route: string;
	columns: any[];
	data: any[];
}

// @ts-ignore
const SelectableTable = ({route = '', columns, data, setStateValue, value}: Props) => {
	const navigate = useNavigate();
	
	const [selected, setSelected] = useState<any>([]);

	const redundancyCheck = (id: string) => {
		if (selected.some((v: any) => v == id)) {
			setSelected(selected.filter((v: any) => v !== id));
			return
		}
		setSelected([...selected, id])
	}
	
	const onClickRow = (row: any) => {
		row.toggleRowSelected();
		redundancyCheck(row.original.id)
	};
	
	useEffect(() => {
		console.log(selected)
		setStateValue(selected)
		console.log(value)
	}, [selected])
	
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		pageOptions,
		gotoPage,
		setPageSize,
		state,
		prepareRow,
	} = useTable(
		{
			columns,
			data,
		},
		usePagination,
		useRowSelect,
		(hooks) => {
			hooks.visibleColumns.push((columns) => [
				{
					id: '선택',
					Header: '선택',
					Cell: ({row}) => (
						<input
							type="checkbox"
							{...row.getToggleRowSelectedProps()}
							onClick={(e) => e.stopPropagation()} // Stop event propagation to prevent row click event
						/>
					),
				},
				...columns,
			]);
		}
	);
	
	const {pageIndex, pageSize} = state;
	
	return (
		<div style={{marginLeft: '5%', width: '90%'}}>
			<div className="table">
				<table {...getTableProps()}>
					<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>{column.render('Header')}</th>
							))}
						</tr>
					))}
					</thead>
					
					<tbody {...getTableBodyProps()}>
					{page.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()} onClick={() => onClickRow(row)}>
								{row.cells.map((cell) => (
									<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
								))}
							</tr>
						);
					})}
					</tbody>
				</table>
				
				<div className="table-pagination">
					<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
						{'<<'}
					</button>
					<button onClick={() => previousPage()} disabled={!canPreviousPage}>
						Previous
					</button>
					<span>
            <strong>
              {pageIndex + 1} / {pageOptions.length}
            </strong>
          </span>
					<button onClick={() => nextPage()} disabled={!canNextPage}>
						Next
					</button>
					<button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>
						{'>>'}
					</button>
				</div>
				<div className="table-pagesize">
					<select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
						{[10, 25, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								{pageSize}개 씩 보기
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};

export default SelectableTable;
