import TreeExample from "./tree.example";
import TreeExample2 from "./tree.example2";
import TreeExample3 from "./tree.example3";
import React from 'react';
import Demo from '../../../demo'

const x = require('!!raw-loader!./tree.example.tsx')
const y = require('!!raw-loader!./tree.example2.tsx')
const z = require('!!raw-loader!./tree.example3.tsx')

const TreeDemo = () => {
  return (
    <div>
      <section>
        <h1>Tree 树形控件</h1>
        <p className="text">多层次的机构列表。</p>
      </section>
      <section>
        <h2>代码示例</h2>
      </section>
      <Demo code={x.default} title="基础用法"
            description="引入并使用Tree组件，只需要传入一个data即可展示我们的树形列表。"
      >
        <TreeExample/>
      </Demo>
      <Demo code={y.default} title="指定默认展开项"
            description="设置treeDefaultExpandedKeys属性，它是一个字符串数组。"
      >
        <TreeExample2/>
      </Demo>
      <Demo code={z.default} title="可以选中"
            description="设置showCheckBox属性，它是一个布尔值。"
      >
        <TreeExample3/>
      </Demo>
      <section>
        <h2>API</h2>
      </section>
      <table className="api-table">
        <thead>
          <tr>
            <th>参数</th>
            <th className="des">说明</th>
            <th className="type">类型</th>
            <th>默认值</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>data</td>
            <td className="des">展示的数据源</td>
            <td className="type">{`Array<DataProp>`}</td>
            <td>——</td>
          </tr>
          <tr>
            <td>treeDefaultExpandAll</td>
            <td className="des">是否全部展开</td>
            <td className="type">boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>treeDefaultExpandedKeys</td>
            <td className="des">默认展开的数据项</td>
            <td className="type">string[]</td>
            <td>——</td>
          </tr>
          <tr>
            <td>showCheckBox</td>
            <td className="des">是否展开选中框</td>
            <td className="type">boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>onChange</td>
            <td className="des">点击选择触发的回调</td>
            <td className="type">(val: DataProp) => void</td>
            <td>——</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default TreeDemo;