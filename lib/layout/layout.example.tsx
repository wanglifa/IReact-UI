import React from 'react'
import Layout from './layout'
import Header from './header'
import Content from './content'
import Footer from './footer'
import Aside from './aside'
import './layout.example.scss'

const LayoutExample: React.FunctionComponent = () => {
  return (
    <div>
      <div>
        <h1>第一个例子</h1>
        <Layout className="hi">
          <Header className="x">header</Header>
          <Content className="y">content</Content>
          <Footer className="x">footer</Footer>
        </Layout>
      </div>
      <div>
        <h1>第二个例子</h1>
        <Layout className="hi">
          <Header className="x">header</Header>
          <Layout>
            <Aside className="z">aside</Aside>
            <Content className="y">content</Content>
          </Layout>
          <Footer className="x">footer</Footer>
        </Layout>
      </div>
      <div>
        <h1>第三个例子</h1>
        <Layout>
          <Header className="x">header</Header>
          <Layout>
            <Content className="y">content</Content>
            <Aside className="z">aside</Aside>
          </Layout>
          <Footer className="x">footer</Footer>
        </Layout>
      </div>
      <div>
        <h1>第四个例子</h1>
        <Layout className="hi">
          <Aside className="z">aside</Aside>
          <Layout>
            <Header className="x">header</Header>
            <Content className="y">content</Content>
            <Footer className="x">footer</Footer>
          </Layout>
        </Layout>
      </div>
    </div>
  )
}
export default LayoutExample;