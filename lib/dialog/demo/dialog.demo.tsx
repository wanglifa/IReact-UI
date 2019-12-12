import DialogExample from "./dialog.example";
import DialogExample2 from "./dialog.example2";
import DialogExample3 from "./dialog.example3";
import React from 'react';
import Demo from '../../../demo'

const x = require('!!raw-loader!./dialog.example.tsx')
const y = require('!!raw-loader!./dialog.example2.tsx')
const z = require('!!raw-loader!./dialog.example3.tsx')

const DialogDemo = () => {
  return (
    <div>
      <section>
        <h1>Dialog 对话框</h1>
        <p className="text">按钮用于开始一个即时操作。</p>
      </section>
      <section>
        <h2>代码示例</h2>
      </section>
      <Demo code={x.default} title="基础用法"
            description="使用Dialog，设置visible属性用来控制弹窗显示与隐藏，通过title指定标题，我们弹窗里的按钮则需要通过一个buttons属性传入，buttons类型是一个ReactElement[]，然后关闭的时候也需要我们手动触发onCLose来修改visible属性。"
      >
        <DialogExample/>
      </Demo>
      <Demo code={y.default} title="内置alert和confrim api"
            description="只需要引入alert和confirm就可以直接使用。alert接受一个文本是字符串类型，confirm第一个参数是文本内容，第二个是确认的回调，第三个是取消的回调。"
      >
        <DialogExample2/>
      </Demo>
      <Demo code={z.default} title="可以在Dialog中使用HTML"
            description="使用Dialog内置的modal api，可以直接在里面写React代码。"
      >
        <DialogExample3/>
      </Demo>
      <section>
        <h2>API</h2>
      </section>
      <section className="sub">
        <h3>Dialog</h3>
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
          <td>visible</td>
          <td className="des">是否显示Dialog</td>
          <td className="type">boolean</td>
          <td>--</td>
        </tr>
        <tr>
          <td>title</td>
          <td className="des">标题</td>
          <td className="type">string</td>
          <td>--</td>
        </tr>
        <tr>
          <td>onClose</td>
          <td className="des">关闭Dialog的回调</td>
          <td className="type">React.MouseEventHandler</td>
          <td>--</td>
        </tr>
        <tr>
          <td>buttons</td>
          <td className="des">按钮组</td>
          <td className="type">ReactElement[]</td>
          <td>--</td>
        </tr>
        <tr>
          <td>closeOnClickMask</td>
          <td className="des">是否可以点击遮罩关闭</td>
          <td className="type">boolean</td>
          <td>false</td>
        </tr>
        </tbody>
      </table>
      <section className="sub">
        <h3>modal</h3>
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
          <td>content</td>
          <td className="des">文本内容（必传参数）</td>
          <td className="type">ReactNode</td>
          <td>--</td>
        </tr>
        <tr>
          <td>buttons</td>
          <td className="des">按钮组（可选参数）</td>
          <td className="type">ReactElement[]</td>
          <td>--</td>
        </tr>
        <tr>
          <td>title</td>
          <td className="des">弹窗标题（可选参数）</td>
          <td className="type">string</td>
          <td>--</td>
        </tr>
        </tbody>
      </table>
      <section className="sub">
        <h3>confirm</h3>
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
          <td>content</td>
          <td className="des">文本内容（必传参数）</td>
          <td className="type">string</td>
          <td>--</td>
        </tr>
        <tr>
          <td>yes</td>
          <td className="des">确认的回调（可选参数）</td>
          <td className="type">() => void</td>
          <td>--</td>
        </tr>
        <tr>
          <td>no</td>
          <td className="des">取消的回调（可选参数）</td>
          <td className="type">() => void</td>
          <td>--</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
export default DialogDemo;