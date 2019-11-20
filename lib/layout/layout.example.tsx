import React from 'react'
import Layout from './layout'
import Header from './header'
import Content from './content'
import Footer from './footer'
import Aside from './aside'

const LayoutExample: React.FunctionComponent = () => {
  return (
    <div>
      <div>
        <h1>第一个例子</h1>
        <Layout style={{height: 500}} className="hi">
          <Header>header</Header>
          <Content>content</Content>
          <Footer>footer</Footer>
        </Layout>
      </div>
      <div>
        <h1>第二个例子</h1>
        <Layout style={{height: 500}} className="hi">
          <Header>header</Header>
          <Layout>
            <Aside>aside</Aside>
            <Content>content</Content>
          </Layout>
          <Footer>footer</Footer>
        </Layout>
      </div>
      <div>
        <h1>第三个例子</h1>
        <Layout style={{height: 500}} className="hi">
          <Aside>aside</Aside>
          <Layout>
            <Header>header</Header>
            <Content>content</Content>
            <Footer>footer</Footer>
          </Layout>
        </Layout>
      </div>
    </div>
  )
}
export default LayoutExample;