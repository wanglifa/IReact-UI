import DatePickerExample from "./datepicker.example";
import DatePickerExample2 from "./datepicker.example2";
import React from 'react';
import Demo from '../../../demo'

const x = require('!!raw-loader!./datepicker.example.tsx')
const y = require('!!raw-loader!./datepicker.example2.tsx')

const DatePickerDemo = () => {
  return (
    <div>
      <section>
        <h1>DatePicker 日期选择框</h1>
        <p className="text">输入或选择日期的控件。</p>
      </section>
      <section>
        <h2>代码示例</h2>
      </section>
      <Demo code={x.default} title="基础用法"
            description="直接使用DatePicker，我们可以修改年月日，通过一个onChange事件拿到我们当前选中的日期。"
      >
        <DatePickerExample/>
      </Demo>
      <Demo code={y.default} title="支持默认日期设置"
            description="使用defaultValue属性，接受一个new Date类型的值。"
      >
        <DatePickerExample2/>
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
            <td>placeholder</td>
            <td className="des">输入提示文字</td>
            <td className="type">string</td>
            <td>——</td>
          </tr>
          <tr>
            <td>defaultValue</td>
            <td className="des">默认选中日期</td>
            <td className="type">Date</td>
            <td>——</td>
          </tr>
          <tr>
            <td>onChange</td>
            <td className="des">选中日期后的回调</td>
            <td className="type">{`(date: string) => void`}</td>
            <td>——</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default DatePickerDemo;