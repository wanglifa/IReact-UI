import React from 'react'
import {Layout, Header, Content, Footer, Aside} from 'ireact-ui'
import './layout.example.scss'

const LayoutExample: React.FunctionComponent = () => {
  return (
    <Layout className="hi">
      <Header className="x">header</Header>
      <Layout>
        <Aside className="z">aside</Aside>
        <Content className="y">content</Content>
      </Layout>
      <Footer className="x">footer</Footer>
    </Layout>
  )
}
export default LayoutExample;