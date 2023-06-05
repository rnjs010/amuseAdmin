import React from 'react';
import {usePagination, useTable} from 'react-table'
import './table.module.css'
import {useNavigate} from "react-router-dom";


// TODO
// @ts-ignore
const Table = ({route = "", columns, data, pageCount = 1}) => {
	
	const navigate = useNavigate();
	
	const onClickRow = (row: any) => {
		
		const id = row.original.id;
		const type = row.original.type;
		
		if (route == "componentv2") {
			const componentRoutePath = getComponentType(type)
			navigate(`/${route}/${componentRoutePath}/${id}`);
			return;
		}
		
		if (route !== "") {
			navigate(`/${route}/${id}`);
			return;
		}
	};
	
	const getComponentType = (type: string) => {
		if(type  == "리스트") return "listcomponent";
		if(type  == "배너") return "bannercomponent";
		if(type  == "타일") return "tilecomponent";
	}
	
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
	} = useTable({
			columns,
			data,
		},
		usePagination
	);
	
	const {pageIndex, pageSize} = state
	
	// @ts-ignore
	return (
		<div style={{marginLeft: '5%', width: '90%'}}>
			<div className="table">
				<table {...getTableProps()}>
					<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>
									{column.render('Header')}
								</th>
							))}
						</tr>
					))}
					</thead>
					
					<tbody {...getTableBodyProps()}>
					{page.map((row: any) => {
						prepareRow(row)
						return (
							<tr {...row.getRowProps()} onClick={() => onClickRow(row)}>
								{row.cells.map((cell: any) => {
									return (
										<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
									);
								})}
							</tr>
						
						);
					})}
					</tbody>
				</table>
				
				<div className="table-pagination"
					 style={{margin: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
					<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
						{'<<'}
					</button>
					<button onClick={() => previousPage()} disabled={!canPreviousPage}>
						Previous
					</button>
					<span>
					<strong style={{display: 'block', width: '100px', textAlign: 'center'}}>
				{pageIndex + 1} / {pageCount}
					</strong>
					</span>
					<button onClick={() => nextPage()} disabled={!canNextPage}>
						Next
					</button>
					<button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
						{'>>'}
					</button>
				</div>
				{/*<div className="table-pagesize"*/}
				{/*	 style={{margin: '5px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>*/}
				{/*	<select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>*/}
				{/*		{*/}
				{/*			[10, 25, 50].map(pageSize => (*/}
				{/*				<option key={pageSize} value={pageSize}>*/}
				{/*					{pageSize}개 씩 보기*/}
				{/*				</option>*/}
				{/*			))*/}
				{/*		}*/}
				{/*	</select>*/}
				{/*</div>*/}
			</div>
		</div>
	);
}

export default Table;
