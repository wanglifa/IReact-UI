import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
import IconDemo from './lib/icon/demo/icon.demo';
import ButtonDemo from './lib/button/demo/button.demo';
import './example.scss'
import {Layout, Aside, Header, Content, Footer} from './lib/layout/layout'
import DialogDemo from "./lib/dialog/demo/dialog.demo";
import LayoutDemo from "./lib/layout/demo/layout.demo";
import FormDemo from "./lib/form/demo/form.demo";
import CollapseDemo from "./lib/collapse/demo/collapse.demo";
import CascaderDemo from "./lib/cascader/demo/cascader.demo";
import TreeDemo from "./lib/tree/demo/tree.demo";
import MenuDemo from "./lib/menu/demo/menu.demo";
import DatePickerDemo from "./lib/datepicker/demo/datepicker.demo";
import InputDemo from "./lib/input/demo/input.demo";
import TableDemo from "./lib/table/demo/table.demo";
import Icon from "./lib/icon/icon";
import Introduction from "./webComponent/introduction";
import Start from "./webComponent/start";
import Color from "./webComponent/color";
import ScrollDemo from "./lib/scroll/demo/scroll.demo";
import CitySelectDemo from "./lib/citySelect/demo/citySelect.demo";
const logo = require('./logo.png')

ReactDOM.render(
  <Router>
    <Layout className="site-page">
      <Header className="site-header">
        <div className="logo">
          <img src={logo.default} width="26" alt=""/>
          <span>IReact-UI</span>
        </div>
        <a href="https://github.com/wanglifa/IReact-UI" className={"rightIcon"}>
          <Icon name={"github"}/>
        </a>
      </Header>
      <Layout>
        <Aside className="site-aside">
          <ul className={"first"}>
            <li>
              <NavLink to={"/introduction"}>Ireact-UI</NavLink>
            </li>
            <li>
              <NavLink to={"/start"}>开始使用</NavLink>
            </li>
            <li>
              <NavLink to={"/color"}>色彩搭配</NavLink>
            </li>
            <li>
              <div>Components</div>
            </li>
          </ul>
          <ul className={"nav-two"}>
            <li>
              <div>通用</div>
              <NavLink to="/icon">Icon 图标</NavLink>
              <NavLink to="/button">Button 按钮</NavLink>
            </li>
            <li>
              <div>布局</div>
              <NavLink to="/layout">Layout 布局</NavLink>
              <NavLink to="/scroll">Scroll 滚动条</NavLink>
            </li>
            <li>
              <div>导航</div>
              <NavLink to="/menu">Menu 导航菜单</NavLink>
            </li>
            <li>
              <div>数据录入</div>
              <NavLink to="/input">Input 输入框</NavLink>
              <NavLink to="/form">Form 表单</NavLink>
              <NavLink to="/cascader">Cascader 级联选择器</NavLink>
              <NavLink to="/datepicker">DatePicker 日期选择框</NavLink>
            </li>
            <li>
              <div>数据展示</div>
              <NavLink to="/collapse">Collapse 折叠面板</NavLink>
              <NavLink to="/tree">Tree 树形组件</NavLink>
              <NavLink to="/table">Table 表格</NavLink>
              <NavLink to="/citySelect">CitySelect 选择城市</NavLink>
            </li>
            <li>
              <div>信息反馈</div>
              <NavLink to="/dialog">Dialog 对话框</NavLink>
            </li>
          </ul>
        </Aside>
        <Content className="site-main">
          <Route path="/introduction" component={Introduction}/>
          <Route path="/start" component={Start}/>
          <Route path="/color" component={Color}/>
          <Route path="/icon" component={IconDemo}/>
          <Route path="/button" component={ButtonDemo}/>
          <Route path="/input" component={InputDemo}/>
          <Route path="/dialog" component={DialogDemo}/>
          <Route path="/layout" component={LayoutDemo}/>
          <Route path="/form" component={FormDemo}/>
          <Route path="/collapse" component={CollapseDemo}/>
          <Route path="/cascader" component={CascaderDemo}/>
          <Route path="/tree" component={TreeDemo}/>
          <Route path="/datepicker" component={DatePickerDemo}/>
          <Route path="/menu" component={MenuDemo}/>
          <Route path="/table" component={TableDemo}/>
          <Route path="/scroll" component={ScrollDemo}/>
          <Route path="/citySelect" component={CitySelectDemo}/>
        </Content>
      </Layout>
      <Footer className="site-footer">
        &copy; <a href="https://github.com/wanglifa/" target={"_blank"}>王立发</a>
      </Footer>
    </Layout>
  </Router>
  , document.querySelector('#root'));