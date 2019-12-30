import * as React from "react";
import Cascader from "ireact-ui";
const options = [
  {
    label: 'zhejiang',
    value: 'Zhejiang',
    children: [
      {
        label: 'hangzhou',
        value: 'Hangzhou',
        children: [
          {
            label: 'xihu',
            value: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    label: 'jiangsu',
    value: 'Jiangsu',
    children: [
      {
        label: 'nanjing',
        value: 'Nanjing',
        children: [
          {
            label: 'zhonghuamen',
            value: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const onChange = (val: Array<string>) => {
  //console.log(val)
}
const CascaderExample: React.FunctionComponent = () => {
  return (
   <div>
     <Cascader options={options} onChange={onChange}/>
   </div>
  )
}
export default CascaderExample;