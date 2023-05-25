export const ProductTableColumns = [
	{
		Header: 'ID',
		accessor: 'id'
	},
	{
		Header: '상품명',
		accessor: 'title'
	},
	{
		Header: '카테고리',
		accessor: 'categoryNames',
        Cell: (props: any) => {
            if (typeof(props.value) == 'object'){
                return props.value.join(", ");
            }
            return props;
        },
	},
	{
		Header: '등록일자',
		accessor: 'createdAt'
	},
	{
		Header: '등록자',
		accessor: 'createdBy'
	},
];
