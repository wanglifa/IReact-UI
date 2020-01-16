import TableExample from "./table.example";
import TableExample2 from "./table.example2";
import TableExample3 from "./table.example3";
import TableExample4 from "./table.example4";
import TableExample5 from "./table.example5";
import TableExample6 from "./table.example6";
import TableExample7 from "./table.example7";
import React from 'react';
import Demo from '../../../demo'

const x = require('!!raw-loader!./table.example.tsx')
const y = require('!!raw-loader!./table.example2.tsx')
const z = require('!!raw-loader!./table.example3.tsx')
const w = require('!!raw-loader!./table.example4.tsx')
const g = require('!!raw-loader!./table.example5.tsx')
const e = require('!!raw-loader!./table.example6.tsx')
const q = require('!!raw-loader!./table.example7.tsx')

const TableDemo = () => {
  return (
    <div>
      <section>
        <h1>Table 表格</h1>
        <p className="text">展示行列数据。</p>
      </section>
      <section>
        <h2>代码示例</h2>
      </section>
      <Demo code={x.default} title="基础用法"
            description="简单的表格，最后一列是各种操作。"
      >
        <TableExample/>
      </Demo>
      <Demo code={q.default} title="支持全选"
            description="使用rowSelection属性可以开启表格的全选功能，同时需要一个onChangg回调监听选中的数据。"
      >
        <TableExample7/>
      </Demo>
      <Demo code={y.default} title="支持排序"
            description="在columns中对需要排序的列里指定一个sort为true即可，目前只支持默认的排序。"
      >
        <TableExample2/>
      </Demo>
      <Demo code={z.default} title="可展开"
            description="对于表格内容过多时我们可以为每一行添加一个展开的行，只需对dataSource里需要展开的添加一个description属性即可。"
      >
        <TableExample3/>
      </Demo>
      <Demo code={w.default} title="带边框"
            description="使用bordered属性即可设置表格样式为带边框的。"
      >
        <TableExample4/>
      </Demo>
      <Demo code={g.default} title="固定表头"
            description="设置scroll属性它可以接受x和y属性，都是number，y就是指定表格内容的高度，超过这个高度就会出现滚动条（固定表头需要为每一列设置width属性）。"
      >
        <TableExample5/>
      </Demo>
      <Demo code={e.default} title="固定列"
            description="设置scroll属性里的x属性，它的值就是需要展示的最大宽度的值，必须超过当前表格的宽度，然后对需要固定的列也就是columns设置一个fixed属性，它接收left和right（注意需要固定的列必须设置width属性，否则会有对不齐的问题）。"
      >
        <TableExample6/>
      </Demo>
      <section>
        <h2>API</h2>
      </section>
      <section className={"sub"}>
        <h3>Table</h3>
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
            <td>columns</td>
            <td className="des">表格列的配置描述，具体见下表</td>
            <td className="type">ColumnProp[]</td>
            <td>——</td>
          </tr>
          <tr>
            <td>dataSource</td>
            <td className="des">数据数组</td>
            <td className="type">any[]</td>
            <td>——</td>
          </tr>
          <tr>
            <td>rowSelection</td>
            <td className="des">是否开启全选</td>
            <td className="type">boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>onChange</td>
            <td className="des">全选回调</td>
            <td className="type">{'(val: any) => void'}</td>
            <td>false</td>
          </tr>
          <tr>
            <td>bordered</td>
            <td className="des">是否是带边框的表格</td>
            <td className="type">boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>scroll</td>
            <td className="des">表格是否可滚动</td>
            <td className="type">{'{x?: number, y?: number}'}</td>
            <td>false</td>
          </tr>
        </tbody>
      </table>
      <section className={"sub"}>
        <h3>Columns</h3>
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
          <td>title</td>
          <td className="des">列头显示文字</td>
          <td className="type">string</td>
          <td>——</td>
        </tr>
        <tr>
          <td>dataIndex</td>
          <td className="des">列数据在数据项中对应的 key</td>
          <td className="type">string</td>
          <td>——</td>
        </tr>
        <tr>
          <td>key</td>
          <td className="des">React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性</td>
          <td className="type">string</td>
          <td>——</td>
        </tr>
        <tr>
          <td>render</td>
          <td className="des">生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引</td>
          <td className="type">{'(text: any, row?: T, index?: number) => React.ReactNode'}</td>
          <td>——</td>
        </tr>
        <tr>
          <td>sort</td>
          <td className="des">是否开启排序</td>
          <td className="type">boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>width</td>
          <td className="des">每一列的宽度（在固定表头和列的时候是必须的）</td>
          <td className="type">number</td>
          <td>——</td>
        </tr>
        <tr>
          <td>fixed</td>
          <td className="des">列是否固定</td>
          <td className="type">'left' | 'right</td>
          <td>——</td>
        </tr>
        </tbody>
      </table>
      <section className={"sub"}>
        <h3>scroll</h3>
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
          <td>x</td>
          <td className="des">设置横向滚动，也可用于指定滚动区域的宽和高</td>
          <td className="type">number</td>
          <td>——</td>
        </tr>
        <tr>
          <td>y</td>
          <td className="des">设置纵向滚动，也可用于指定滚动区域的宽和高</td>
          <td className="type">number</td>
          <td>——</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
export default TableDemo;