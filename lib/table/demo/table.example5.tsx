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
  },
  {
    key: '4',
    name: 'haah',
    age: 28,
    address: '西湖区臭水沟'
  },
  {
    key: '5',
    name: 'fasdf',
    age: 34,
    address: '西湖区臭水沟'
  },
  {
    key: '6',
    name: 'xigua',
    age: 28,
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
    ),
    width: 150
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 150
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 150
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
const onChange = (val: any) => {
  console.log(val)
}
const TableExample: React.FunctionComponent = () => {
  return (
    <Table columns={columns} dataSource={dataSource} bordered
      onChange={onChange} scroll={{y: 240}}
    />
  )
}
export default TableExample;