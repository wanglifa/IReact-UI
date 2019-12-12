import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
import IconDemo from './lib/icon/icon.demo';
import DialogExample from './lib/dialog/dialog.example'
import ButtonExample from './lib/button/button.example';
import LayoutExample from './lib/layout/layout.example';
import './example.scss'
import {Layout, Aside, Header, Content, Footer} from './lib/layout/layout'
import FormExample from "./lib/form/form.example";
import CollapseExample from "./lib/collapse/collapse.example";
const logo = require('./logo.png')

ReactDOM.render(
  <Router>
    <Layout className="site-page">
      <Header className="site-header">
        <div className="logo">
          <img src={logo.default} width="26" alt=""/>
          <span>IReact-UI</span>
        </div>
      </Header>
      <Layout>
        <Aside className="site-aside">
          <h2>组件</h2>
          <ul>
            <li>
              <NavLink to="/icon">Icon 图标</NavLink>
            </li>
            <li>
              <NavLink to="/button">Button 按钮</NavLink>
            </li>
            <li>
              <NavLink to="/dialog">dialog 对话框</NavLink>
            </li>
            <li>
              <NavLink to="/layout">layout 布局</NavLink>
            </li>
            <li>
              <NavLink to="/form">form 表单</NavLink>
            </li>
            <li>
              <NavLink to="/collapse">collapse 折叠面板</NavLink>
            </li>
          </ul>
        </Aside>
        <Content className="site-main">
          <Route path="/icon" component={IconDemo}/>
          <Route path="/button" component={ButtonExample}/>
          <Route path="/dialog" component={DialogExample}/>
          <Route path="/layout" component={LayoutExample}/>
          <Route path="/form" component={FormExample}/>
          <Route path="/collapse" component={CollapseExample}/>
        </Content>
      </Layout>
      <Footer className="site-footer">
        &copy; 王立发
      </Footer>
    </Layout>
  </Router>
  , document.querySelector('#root'));