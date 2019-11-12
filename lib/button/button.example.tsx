import React from 'react'
import Button from './button'
import Icon from '../icon/icon'
const ButtonExample: React.FunctionComponent = () => {
  return (
    <div>
      <Button onClick={() => {console.log('aaa')}}>小改改</Button>
      <Button type="primary">小改改</Button>
      <Button type="info" size="mini">小改改</Button>
      <Button type="success" size="small">
        <Icon name="wechat"/>小改改
      </Button>
      <Button type="warning" size="medium">小改改</Button>
      <Button type="danger">小改改</Button>
    </div>
  )
}
export default ButtonExample