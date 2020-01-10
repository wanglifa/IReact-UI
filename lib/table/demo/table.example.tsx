import * as React from "react";
import Table from "../table";
import Button from "../../button/button";
const dataSource = [
  {
    key: '1',
    name: '王立发',
    age: 18,
    address: '人民大会堂',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '3',
    name: '增立发',
    age: 24,
    address: '西湖区臭水沟',
  }
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: (title: any) => (
      <a>{title}</a>
    )
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '操作',
    dataIndex: 'operating',
    key: 'operating',
    render: (text: any, row: any) => (
      <span>
        <Button>{row.name}</Button>
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
    <Table columns={columns} dataSource={dataSource} rowSelection
      onChange={onChange}
    />
  )
}
export default TableExample;