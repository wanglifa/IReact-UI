import React from 'react'
import {Layout, Header, Content, Footer, Aside} from 'ireact-ui'
import './layout.example.scss'

const LayoutExample: React.FunctionComponent = () => {
  return (
    <Layout>
      <Header className="x">header</Header>
      <Layout>
        <Content className="y">content</Content>
        <Aside className="z">aside</Aside>
      </Layout>
      <Footer className="x">footer</Footer>
    </Layout>
  )
}
export default LayoutExample;