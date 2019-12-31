import CascaderExample from "./cascader.example";
import CascaderExample2 from "./cascader.example2";
import CascaderExample3 from "./cascader.example3";
import React from 'react';
import Demo from '../../../demo'

const x = require('!!raw-loader!./cascader.example.tsx')
const y = require('!!raw-loader!./cascader.example2.tsx')
const z = require('!!raw-loader!./cascader.example3.tsx')

const CascaderDemo = () => {
  return (
    <div>
      <section>
        <h1>Cascader 级联选择</h1>
        <p className="text">级联选择框。</p>
      </section>
      <section>
        <h2>代码示例</h2>
      </section>
      <Demo code={x.default} title="基本"
            description="省市区级联，引入我们的Cascader，你只需要传入一个options即可，options格式如下。"
      >
        <CascaderExample/>
      </Demo>
      <Demo code={y.default} title="可以设置默认选中值"
            description="默认的选中值通过defaultValue属性来展示，它是一个字符串数组。"
      >
        <CascaderExample2/>
      </Demo>
      <Demo code={z.default} title="可以自定义字段名"
            description="通过设置fieldNames属性，它是一个对象分别对应你要设置的label，value和children。"
      >
        <CascaderExample3/>
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
          <td>options</td>
          <td className="des">可选项数据源</td>
          <td className="type">Options[]</td>
          <td>——</td>
        </tr>
        <tr>
          <td>onChange</td>
          <td className="des">选择完成时触发的回调</td>
          <td className="type">{`(val: Array<string>) => void`}</td>
          <td>——</td>
        </tr>
        <tr>
          <td>placeholder</td>
          <td className="des">输入框占位文本</td>
          <td className="type">string</td>
          <td>请选择</td>
        </tr>
        <tr>
          <td>defaultValue</td>
          <td className="des">默认选中值</td>
          <td className="type">string[]</td>
          <td>——</td>
        </tr>
        <tr>
          <td>fieldNames</td>
          <td className="des">自定义字段名</td>
          <td className="type">{`{label: string; value: string; children: string}`}</td>
          <td>——</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
export default CascaderDemo;