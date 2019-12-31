import * as React from "react";
import Cascader from "../cascader";
const options = [
  {
    code: 'zhejiang',
    name: 'Zhejiang',
    items: [
      {
        code: 'hangzhou',
        name: 'Hangzhou',
        items: [
          {
            code: 'xihu',
            name: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    code: 'jiangsu',
    name: 'Jiangsu',
    items: [
      {
        code: 'nanjing',
        name: 'Nanjing',
        items: [
          {
            code: 'zhonghuamen',
            name: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const onChange = (val: Array<string>) => {
  console.log(val)
}
const CascaderExample: React.FunctionComponent = () => {
  return (
   <div>
     <Cascader options={options} onChange={onChange} defaultValue={['zhejiang', 'hangzhou', 'xihu']}
               fieldNames={{label: 'name', value: 'code', children: 'items'}}
     />
   </div>
  )
}
export default CascaderExample;