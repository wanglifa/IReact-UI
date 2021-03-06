import * as React from "react";
import {Table} from "ireact-ui";

const dataSource = [
  {
    key: '1',
    name: 'WangLiFa',
    age: 18,
    address: '人民大会堂',
    tags: ['nice', 'developer'],
    description: '立发是个大帅锅'
  },
  {
    key: '2',
    name: 'LinZengFa',
    age: 42,
    address: '西湖区湖底公园1号',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'WuYiFan',
    age: 24,
    address: '西湖区臭水沟',
    tags: ['cool', 'teacher'],
    description: '立发爱漂亮的小改改'
  }
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sort: true,
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
    key: 'address',
    sort: true
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    render: (tags: string[]) => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? '#2f54eb' : '#52c41a'
          if (tag === 'loser') {
            color = '#fa541c'
          }
          return (
            <div style={{color, borderColor: color}} key={tag} className={"ireact-tag"}>
              {tag.toUpperCase()}
            </div>
          )
        })}
      </span>
    )
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
    <Table columns={columns} dataSource={dataSource}
           onChange={onChange}
    />
  )
}
export default TableExample;