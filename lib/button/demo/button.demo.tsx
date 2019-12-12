import ButtonExample from "./button.example";
import ButtonExample2 from "./button.example2";
import ButtonExample3 from "./button.example3";
import React from 'react';
import Demo from '../../../demo'

const x = require('!!raw-loader!./button.example.tsx')
const y = require('!!raw-loader!./button.example2.tsx')
const z = require('!!raw-loader!./button.example3.tsx')

const IconDemo = () => {
  return (
    <div>
      <section>
        <h1>Button 按钮</h1>
        <p className="text">按钮用于开始一个即时操作。</p>
      </section>
      <section>
        <h2>代码示例</h2>
      </section>
      <Demo code={x.default} title="基础按钮"
            description="使用Button，可以传入一个type，type可以接受primary/info/success/warning/danger。type默认是info。"
      >
        <ButtonExample/>
      </Demo>
      <Demo code={y.default} title="可定义尺寸的按钮"
            description="给Button传入一个size，size接受mini/small/medium，默认是mini。"
      >
        <ButtonExample2/>
      </Demo>
      <Demo code={z.default} title="可以接受icon图标"
            description="只需要在Button里使用Icon即可。"
      >
        <ButtonExample3/>
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
          <td>type</td>
          <td className="des">按钮类型（如：primary/info/success/warning/danger）</td>
          <td className="type">string</td>
          <td>info</td>
        </tr>
        <tr>
          <td>size</td>
          <td className="des">按钮尺寸（mini/small/medium）</td>
          <td className="type">string</td>
          <td>mini</td>
        </tr>
        <tr>
          <td>onClick</td>
          <td className="des">点击按钮时的回调	</td>
          <td className="type">React.MouseEventHandler</td>
          <td>--</td>
        </tr>
        <tr>
          <td>className</td>
          <td className="des">自定义Button类名</td>
          <td className="type">string</td>
          <td>--</td>
        </tr>
        <tr>
          <td>style</td>
          <td className="des">自定义Button样式</td>
          <td className="type">React.CSSProperties</td>
          <td>--</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
export default IconDemo;