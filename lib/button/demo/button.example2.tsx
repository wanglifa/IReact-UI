import React from 'react'
import Button from '../button'
const ButtonExample2: React.FunctionComponent = () => {
  return (
    <div>
      <div className="row">
        <Button size="mini">小改改</Button>
        <Button type="primary" size="mini">小改改</Button>
        <Button type="info" size="mini">小改改</Button>
        <Button type="success" size="mini">小改改</Button>
        <Button type="warning" size="mini">小改改</Button>
        <Button type="danger" size="mini">小改改</Button>
      </div>
      <div className="row">
        <Button size="small">小改改</Button>
        <Button type="primary" size="small">小改改</Button>
        <Button type="info" size="small">小改改</Button>
        <Button type="success" size="small">小改改</Button>
        <Button type="warning" size="small">小改改</Button>
        <Button type="danger" size="small">小改改</Button>
      </div>
      <div className="row">
        <Button size="medium">小改改</Button>
        <Button type="primary" size="medium">小改改</Button>
        <Button type="info" size="medium">小改改</Button>
        <Button type="success" size="medium">小改改</Button>
        <Button type="warning" size="medium">小改改</Button>
        <Button type="danger" size="medium">小改改</Button>
      </div>
    </div>
  )
}
export default ButtonExample2