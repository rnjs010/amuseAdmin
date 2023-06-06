export const AdTableColumns = [
    {
        Header: 'ID',
        accessor: 'id'
    },
    {
        Header: '광고 제목',
        accessor: 'title'
    },
    {
        Header: '시작일',
        accessor: 'startDate'
    },
    {
        Header: '종료일',
        accessor: 'endDate'
    },
    {
        Header: '카테고리',
        accessor: "adCategory",
        Cell: (props: any) => {
            return props.value.join(", ")
        },
    },
    
    {
        Header : '등록일자',
        accessor : 'createdAt'
    },
    {
        Header : '등록자',
        accessor : 'createdBy'
    },
    {
        Header : '수정일자',
        accessor : 'updatedAt'
    },
    {
        Header : '수정자',
        accessor : 'updatedBy'
    }
];
