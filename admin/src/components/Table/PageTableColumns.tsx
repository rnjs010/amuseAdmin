import React from "react";
import { Row } from "react-table";
import PageDetail from "../../pages/PageEditingPages/PageDetail";

interface PageRow {
  id: number;
  name: string;
  sequence: number;
  disable: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  // Add any other properties if needed
}

export const PageTableColumns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "페이지",
    accessor: "name",
  },
  {
    Header: "배치 순서",
    accessor: "sequence",
  },
  {
    Header: "비활성화",
    accessor: (d: any) => d.disable.toString(),
  },
  {
    Header: "등록일",
    accessor: "createdAt",
  },
  {
    Header: "등록자",
    accessor: "createdBy",
  },
  {
    Header: "수정일",
    accessor: "updatedAt",
  },
  {
    Header: "편집",
    Cell: ({ row }: { row: Row<PageRow> }) => {
      return <button>편집</button>;
    },
  },
];
