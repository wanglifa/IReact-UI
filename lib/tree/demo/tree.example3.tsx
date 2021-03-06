import * as React from "react";
import {Tree, DataProp} from 'ireact-ui'
const data = [{
  label: '一级 1',
  children: [{
    label: '二级 1-1'
  }]
}, {
  label: '一级 2',
  children: [{
    label: '二级 2-1'
  }, {
    label: '二级 2-2'
  }]
}, {
  label: '一级 3',
  children: [{
    label: '二级 3-1'
  }, {
    label: '二级 3-2'
  }]
}]
const onChange = (val: DataProp) => {
  console.log(val)
}
const TreeExample: React.FunctionComponent = () => {
  return (
    <Tree data={data} onChange={onChange} treeDefaultExpandedKeys={['一级 1', '二级 1-1']}
      showCheckBox
    />
  )
}
export default TreeExample;