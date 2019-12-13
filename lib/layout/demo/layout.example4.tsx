import React from 'react'
import {Layout, Header, Content, Footer, Aside} from 'ireact-ui'
import './layout.example.scss'

const LayoutExample: React.FunctionComponent = () => {
  return (
    <Layout className="hi">
      <Aside className="z">aside</Aside>
      <Layout>
        <Header className="x">header</Header>
        <Content className="y">content</Content>
        <Footer className="x">footer</Footer>
      </Layout>
    </Layout>
  )
}
export default LayoutExample;