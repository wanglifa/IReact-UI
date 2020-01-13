import TableExample from "./table.example";
import TableExample2 from "./table.example2";
import TableExample3 from "./table.example3";
import TableExample4 from "./table.example4";
import TableExample5 from "./table.example5";
import React from 'react';
import Demo from '../../../demo'

const x = require('!!raw-loader!./table.example.tsx')
const y = require('!!raw-loader!./table.example2.tsx')
const z = require('!!raw-loader!./table.example3.tsx')
const w = require('!!raw-loader!./table.example4.tsx')
const g = require('!!raw-loader!./table.example5.tsx')

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
      <Demo code={x.default} title="基础用法"
            description="使用Icon，指定它的name即可。"
      >
        <TableExample/>
      </Demo>
      <Demo code={y.default} title="支持排序"
            description="使用Icon，指定它的name即可。"
      >
        <TableExample2/>
      </Demo>
      <Demo code={z.default} title="可展开"
            description="使用Icon，指定它的name即可。"
      >
        <TableExample3/>
      </Demo>
      <Demo code={w.default} title="带边框"
            description="使用Icon，指定它的name即可。"
      >
        <TableExample4/>
      </Demo>
      <Demo code={g.default} title="固定表头"
            description="使用Icon，指定它的name即可。"
      >
        <TableExample5/>
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