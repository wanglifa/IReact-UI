import InputExample from "./input.example";
import InputExample2 from "./input.example2";
import React from 'react';
import Demo from '../../../demo'

const x = require('!!raw-loader!./input.example.tsx')
const y = require('!!raw-loader!./input.example2.tsx')

const InputDemo = () => {
  return (
    <div>
      <section>
        <h1>Input 输入框</h1>
        <p className="text">通过鼠标或键盘输入内容，是最基础的表单域的包装。</p>
      </section>
      <section>
        <h2>代码示例</h2>
      </section>
      <Demo code={x.default} title="基本使用"
            description="基本使用。"
      >
        <InputExample/>
      </Demo>
      <Demo code={y.default} title="前置或后置icon"
            description="使用beforeIcon属性可以设置前置的icon，afterIcon可以设置后置的。"
      >
        <InputExample2/>
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
          <td>beforeIcon</td>
          <td className="des">前置Icon</td>
          <td className="type">ReactElement</td>
          <td>——</td>
        </tr>
        <tr>
          <td>afterIcon</td>
          <td className="des">后置Icon</td>
          <td className="type">ReactElement</td>
          <td>——</td>
        </tr>
          <tr>
            <td>style</td>
            <td className="des">样式</td>
            <td className="type">CSSProperties</td>
            <td>——</td>
          </tr>
          <tr>
            <td>className</td>
            <td className="des">类</td>
            <td className="type">string</td>
            <td>——</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default InputDemo;