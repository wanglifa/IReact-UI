import LayoutExample from "./layout.example";
import LayoutExample2 from "./layout.example2";
import LayoutExample3 from "./layout.example3";
import LayoutExample4 from "./layout.example4";
import React from 'react';
import Demo from '../../../demo'

const x = require('!!raw-loader!./layout.example.tsx')
const y = require('!!raw-loader!./layout.example2.tsx')
const z = require('!!raw-loader!./layout.example3.tsx')
const w = require('!!raw-loader!./layout.example4.tsx')

const LayoutDemo = () => {
  return (
    <div>
      <section>
        <h1>Layout 布局</h1>
        <p className="text">协助进行页面级整体布局。</p>
      </section>
      <section>
        <h2>代码示例</h2>
      </section>
      <Demo code={x.default} title="上中下布局"
            description="使用Layout，里面使用Header、Content和Footer，每个组件都接受ClassName用来设置自定义类。"
      >
        <LayoutExample/>
      </Demo>
      <Demo code={y.default} title="Aside在Content的左侧"
            description="在Layout里再套一层Layout，里面是Aside和Content。"
      >
        <LayoutExample2/>
      </Demo>
      <Demo code={z.default} title="Aside在Content的右侧"
            description="只需要在Layout里把Aside放到Content后面即可。"
      >
        <LayoutExample3/>
      </Demo>
      <Demo code={w.default} title="Aside单独在左侧"
            description="Layout里直接子组件是Aside和Layout，Layout里又包含Header和Content和Footer。"
      >
        <LayoutExample4/>
      </Demo>
      <section>
        <h2>API</h2>
      </section>
      <section className="sub">
        <h3>Layout</h3>
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
            <td>className</td>
            <td className="des">容器 className</td>
            <td className="type">string</td>
            <td>--</td>
          </tr>
          <tr>
            <td>style</td>
            <td className="des">指定样式</td>
            <td className="type">object</td>
            <td>——</td>
          </tr>
        </tbody>
      </table>
      <p className="intro">
        Aside、Header、Content、footer API 与 Layout相同。
      </p>
    </div>
  )
}
export default LayoutDemo;