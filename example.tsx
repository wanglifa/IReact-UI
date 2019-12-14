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
import SlidesExample from "./lib/slides/slides.example";
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
              <NavLink to="/dialog">Dialog 对话框</NavLink>
            </li>
            <li>
              <NavLink to="/layout">Layout 布局</NavLink>
            </li>
            <li>
              <NavLink to="/form">Form 表单</NavLink>
            </li>
            <li>
              <NavLink to="/collapse">Collapse 折叠面板</NavLink>
            </li>
            <li>
              <NavLink to="/slides">Slides 走马灯</NavLink>
            </li>
          </ul>
        </Aside>
        <Content className="site-main">
          <Route path="/icon" component={IconDemo}/>
          <Route path="/button" component={ButtonDemo}/>
          <Route path="/dialog" component={DialogDemo}/>
          <Route path="/layout" component={LayoutDemo}/>
          <Route path="/form" component={FormDemo}/>
          <Route path="/collapse" component={CollapseDemo}/>
          <Route path="/slides" component={SlidesExample}/>
        </Content>
      </Layout>
      <Footer className="site-footer">
        &copy; 王立发
      </Footer>
    </Layout>
  </Router>
  , document.querySelector('#root'));