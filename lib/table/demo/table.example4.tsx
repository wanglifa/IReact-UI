import * as React from "react";
import Table from "../table";
const dataSource = [
  {
    key: '1',
    name: 'WangLiFa',
    age: 18,
    address: '人民大会堂'
  },
  {
    key: '2',
    name: 'LinZengFa',
    age: 42
  },
  {
    key: '3',
    name: 'WuYiFan',
    age: 24,
    address: '西湖区臭水沟'
  }
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (title: any) => (
      <a>{title}</a>
    )
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Action',
    dataIndex: 'operating',
    key: 'operating',
    render: (text: any, row: any) => (
      <span>
        <a>Invite {row.name}</a>
        <a>Delete</a>
      </span>
    )
  }
];
const TableExample: React.FunctionComponent = () => {
  return (
    <Table columns={columns} dataSource={dataSource} bordered/>
  )
}
export default TableExample;