import MenuExample from "./menu.example";
import MenuExample2 from "./menu.example2";
import React from 'react';
import Demo from '../../../demo'

const x = require('!!raw-loader!./menu.example.tsx')
const y = require('!!raw-loader!./menu.example2.tsx')

const MenuDemo = () => {
  return (
    <div>
      <section>
        <h1>Menu 导航菜单</h1>
        <p className="text">为页面和功能提供导航的菜单列表。</p>
      </section>
      <section>
        <h2>代码示例</h2>
      </section>
      <Demo code={x.default} title="顶部导航"
            description="水平的顶部导航菜单。"
      >
        <MenuExample/>
      </Demo>
      <Demo code={y.default} title="内嵌菜单"
            description="垂直菜单，子菜单内嵌在菜单区域。"
      >
        <MenuExample2/>
      </Demo>
      <section>
        <h2>API</h2>
      </section>
      <section className="sub">
        <h3>Menu</h3>
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
            <td>selectedName</td>
            <td className="des">当前选中的菜单name</td>
            <td className="type">string</td>
            <td>——</td>
          </tr>
          <tr>
            <td>mode</td>
            <td className="des">导航方向样式</td>
            <td className="type">'vertical' | 'horizontal' | 'inline'</td>
            <td>——</td>
          </tr>
          <tr>
            <td>defaultOpenNames</td>
            <td className="des">默认展开的菜单name</td>
            <td className="type">string[]</td>
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
            <td className="des">类名</td>
            <td className="type">string</td>
            <td>——</td>
          </tr>
        </tbody>
      </table>
      <section className="sub">
        <h3>SubMenu</h3>
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
          <td className="des">当前项的name</td>
          <td className="type">string</td>
          <td>——</td>
        </tr>
        <tr>
          <td>title</td>
          <td className="des">菜单列表显示的标题</td>
          <td className="type">ReactElement | string</td>
          <td>——</td>
        </tr>
        </tbody>
      </table>
      <section className="sub">
        <h3>Menu.Item</h3>
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
          <td className="des">当前项的name</td>
          <td className="type">string</td>
          <td>——</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td className="des">当前项是否可点击</td>
          <td className="type">boolean</td>
          <td>——</td>
        </tr>
        </tbody>
      </table>
      <section className="sub">
        <h3>Menu.ItemGroup</h3>
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
          <td className="des">当前项的name</td>
          <td className="type">string</td>
          <td>——</td>
        </tr>
        <tr>
          <td>title</td>
          <td className="des">菜单列表显示的标题</td>
          <td className="type">ReactElement | string</td>
          <td>——</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
export default MenuDemo;