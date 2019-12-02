import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import IconExample from './lib/icon/icon.example';
import DialogExample from './lib/dialog/dialog.example'
import ButtonExample from './lib/button/button.example';
import LayoutExample from './lib/layout/layout.example';
import './example.scss'
import {Layout, Aside, Header, Content, Footer} from './lib/layout/layout'
const logo = require('./logo.png')

ReactDOM.render(
  <Router>
    <Layout className="page">
      <Header>
        <div className="logo">
          <img src={logo} alt=""/>
          IReact-UI
        </div>
      </Header>
      <Layout>
        <Aside style={{border: '1px solid green'}}>
          <h2>组件</h2>
          <ul>
            <li>
              <Link to="/icon">Icon</Link>
            </li>
            <li>
              <Link to="/button">button</Link>
            </li>
            <li>
              <Link to="/dialog">dialog</Link>
            </li>
            <li>
              <Link to="/layout">layout</Link>
            </li>
          </ul>
        </Aside>
        <Content>
          <Route path="/icon" component={IconExample}></Route>
          <Route path="/button" component={ButtonExample}></Route>
          <Route path="/dialog" component={DialogExample}></Route>
          <Route path="/layout" component={LayoutExample}></Route>
        </Content>
      </Layout>
      <Footer style={{border: '1px solid black'}}>
        footer
      </Footer>
    </Layout>
  </Router>,
  document.querySelector('#root')
);