import FormExample from "./form.example";
import FormExample2 from "./form.example2";
import React from 'react';
import Demo from '../../../demo'

const x = require('!!raw-loader!./form.example.tsx')
const y = require('!!raw-loader!./form.example2.tsx')

const FormDemo = () => {
  return (
    <div>
      <section>
        <h1>Form 表单</h1>
        <p className="text">具有数据收集、校验和提交功能的表单，目前只包含输入框元素，其他的后续会加入。</p>
      </section>
      <section>
        <h2>代码示例</h2>
      </section>
      <Demo code={x.default} title="基础用法"
            description="formData用于指定你需要使用的表单字段，fields是一个数组，数组里的每一项都对应着我们formData里定义的key，包括name，label和input，必须配合onChange使用，内容修改的时候通过setState来修改。接受一个errors需要我们初始为一个空对象，当触发提交的时候我们传入一个rules数组，每一项是一个对象。对象里面包含key是我们对应表单的字段，还有后面的是你默认的校验，然后引入我们的Validator，我们可以拿到校验的结果，用来修改我们的初始errors。"
      >
        <FormExample/>
      </Demo>
      <Demo code={y.default} title="支持自定义规则方法"
            description="只需要在onSubmit方法里的rules里的对象中添加一个validator属性，它的值是一个对象，里面的name是需要校验的规则，然后接受一个validate方法。"
      >
        <FormExample2/>
      </Demo>
      <section>
        <h2>API</h2>
      </section>
      <section className="sub">
        <h3>Form</h3>
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
            <td>value</td>
            <td className="des">表单中对应的字段名</td>
            <td className="type">object</td>
            <td>——</td>
          </tr>
          <tr>
            <td>fields</td>
            <td className="des">表单中每一字段对应的内容</td>
            <td className="type">{'Array<{ name: string, label: string, input: { type: string }}>'}</td>
            <td>——</td>
          </tr>
          <tr>
            <td>buttons</td>
            <td className="des">按钮组（最外层一定得是一个Fragment）</td>
            <td className="type">ReactFragment</td>
            <td>——</td>
          </tr>
          <tr>
            <td>onSubmit</td>
            <td className="des">点击按钮提交数据触发的回调</td>
            <td className="type">React.FormEventHandler</td>
            <td>——</td>
          </tr>
          <tr>
            <td>onChange</td>
            <td className="des">表单内容修改时触发的回调</td>
            <td className="type">(value: FormValue) => void</td>
            <td>——</td>
          </tr>
          <tr>
            <td>errors</td>
            <td className="des">校验得到的错误数据</td>
            <td className="type">{'{[k: string]: string[]}'}</td>
            <td>——</td>
          </tr>
          <tr>
            <td>transformError</td>
            <td className="des">自定义翻译错误提示</td>
            <td className="type">(error: string) => string</td>
            <td>——</td>
          </tr>
        </tbody>
      </table>
      <section className="sub">
        <h3>Validator</h3>
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
          <td>formValue</td>
          <td className="des">需要校验的字段名</td>
          <td className="type">{'{[k: string]: any}'}</td>
          <td>——</td>
        </tr>
        <tr>
          <td>rules</td>
          <td className="des">校验规则</td>
          <td className="type">{'Array<{key: string, required?: boolean, minLength?: number, maxLength?: number, pattern?: RegExp, validator?: object}>'}</td>
          <td>——</td>
        </tr>
        <tr>
          <td>callback</td>
          <td className="des">校验完成后的回调</td>
          <td className="type">{'(errors: {[k: string]: any}) => void'}</td>
          <td>——</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
export default FormDemo;