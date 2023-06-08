export const PageTableColumns = [
	{
		Header: 'ID',
		accessor: 'id'
	},
	{
		Header: '페이지',
		accessor: 'name'
	},
	{
		Header: "배치 순서",
		accessor: "sequence"
	},
	{
		Header: "비활성화",
		accessor: (d: any) => d.disable.toString()
	},
	{
		Header: '등록일',
		accessor: 'createdAt'
	},
	{
		Header: '등록자',
		accessor: 'createdBy'
	},
	{
		Header: '수정일',
		accessor: 'updatedAt'
	},
	{
		Header: '수정자',
		accessor: 'updatedBy'
	},
];
