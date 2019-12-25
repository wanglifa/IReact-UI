import * as React from "react";
import Tree from './tree'
const data = [{
  label: '一级 1',
  visible: false,
  children: [{
    label: '二级 1-1',
    visible: false,
    children: [{
      label: '三级 1-1-1',
      visible: false
    }]
  }]
}, {
  label: '一级 2',
  visible: false,
  children: [{
    label: '二级 2-1',
    visible: false,
    children: [{
      label: '三级 2-1-1',
      visible: false
    }]
  }, {
    label: '二级 2-2',
    visible: false,
    children: [{
      label: '三级 2-2-1',
      visible: false
    }]
  }]
}, {
  label: '一级 3',
  visible: false,
  children: [{
    label: '二级 3-1',
    visible: false,
    children: [{
      label: '三级 3-1-1',
      visible: false
    }]
  }, {
    label: '二级 3-2',
    visible: false,
    children: [{
      label: '三级 3-2-1',
      visible: false
    }]
  }]
}]
const TreeExample: React.FunctionComponent = () => {
  return (
    <Tree data={data}/>
  )
}
export default TreeExample;