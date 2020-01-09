import TableExample from "./table.example";
import React from 'react';
import Demo from '../../../demo'

const x = require('!!raw-loader!./table.example.tsx')

const TableDemo = () => {
  return (
    <div>
      <section>
        <h1>Table 表格</h1>
        <p className="text">语义化的矢量图标。</p>
      </section>
      <section>
        <h2>代码示例</h2>
      </section>
      <Demo code={x.default} title="基础图标"
            description="使用Icon，指定它的name即可。"
      >
        <TableExample/>
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
            <td>name</td>
            <td className="des">图标名称（如：add/alipay/bottom/close/code/qq/right/wechat）</td>
            <td className="type">string</td>
            <td>——</td>
          </tr>
          <tr>
            <td>size</td>
            <td className="des">图标尺寸（mini/small/medium）</td>
            <td className="type">string</td>
            <td>——</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default TableDemo;