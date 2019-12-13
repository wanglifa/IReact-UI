import React from 'react'
import Icon from "../../icon/icon";
import { Button } from 'ireact-ui'
const ButtonExample: React.FunctionComponent = () => {
  return (
    <div>
      <Button>
        <Icon name="left" size="mini"/>你好啊
      </Button>
      <Button type="primary">
        <Icon name="add" size="mini"/>你好啊
      </Button>
      <Button type="success">
        <Icon name="collection" size="mini"/>你好啊
      </Button>
      <Button type="warning">
        <Icon name="loading" size="mini"/>你好啊
      </Button>
      <Button type="danger">
        <Icon name="minus" size="mini"/>你好啊
      </Button>
    </div>
  )
}
export default ButtonExample