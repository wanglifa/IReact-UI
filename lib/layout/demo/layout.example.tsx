import React from 'react'
import {Layout, Header, Content, Footer} from 'ireact-ui'
import './layout.example.scss'

const LayoutExample: React.FunctionComponent = () => {
  return (
    <Layout className="hi">
      <Header className="x">header</Header>
      <Content className="y">content</Content>
      <Footer className="x">footer</Footer>
    </Layout>
  )
}
export default LayoutExample;