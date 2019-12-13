import React from 'react';
import Demo from '../../../demo'
import CollapseExample from "./collapse.example";
import CollapseExample2 from "./collapse.example2";
import CollapseExample3 from "./collapse.example3";

const x = require('!!raw-loader!./collapse.example.tsx')
const y = require('!!raw-loader!./collapse.example2.tsx')
const z = require('!!raw-loader!./collapse.example3.tsx')

const CollapseDemo = () => {
  return (
    <div>
      <section>
        <h1>Collapses 折叠面板</h1>
        <p className="text">可以折叠/展开的内容区域。</p>
      </section>
      <section>
        <h2>代码示例</h2>
      </section>
      <Demo code={x.default} title="折叠面板"
            description="可以同时展开多个面板，这个例子默认展开了第一个。"
      >
        <CollapseExample/>
      </Demo>
      <Demo code={y.default} title="手风琴"
            description="手风琴，每次只打开一个 tab。"
      >
        <CollapseExample2/>
      </Demo>
      <Demo code={z.default} title="可禁用展开项"
            description="对不需要展开的面板设置disabled属性。"
      >
        <CollapseExample3/>
      </Demo>
      <section>
        <h2>API</h2>
      </section>
      <section className="sub">
        <h3>Collapse</h3>
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
            <td>activeName</td>
            <td className="des">默认展开项</td>
            <td className="type">string[]</td>
            <td>--</td>
          </tr>
          <tr>
            <td>multiple</td>
            <td className="des">是否支持展开多个</td>
            <td className="type">boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>onChange</td>
            <td className="des">点击面板时触发的回调</td>
            <td className="type">(key: string[]) => void</td>
            <td>--</td>
          </tr>
        </tbody>
      </table>
      <section className="sub">
        <h3>Panel</h3>
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
          <td>header</td>
          <td className="des">面板头内容</td>
          <td className="type">string</td>
          <td>--</td>
        </tr>
        <tr>
          <td>name</td>
          <td className="des">对应activeName</td>
          <td className="type">boolean</td>
          <td>--</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td className="des">是否可点击展开</td>
          <td className="type">boolean</td>
          <td>false</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
export default CollapseDemo;