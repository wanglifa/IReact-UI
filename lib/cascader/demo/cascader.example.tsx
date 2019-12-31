import * as React from "react";
import {Cascader} from "ireact-ui";
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
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
     <Cascader options={options} onChange={onChange}/>
   </div>
  )
}
export default CascaderExample;