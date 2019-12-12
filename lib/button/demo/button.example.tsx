import React from 'react'
import Button from '../button'
const ButtonExample: React.FunctionComponent = () => {
  return (
    <div>
      <Button>默认</Button>
      <Button type="primary">primary</Button>
      <Button type="info">info</Button>
      <Button type="success">success</Button>
      <Button type="warning">warning</Button>
      <Button type="danger">danger</Button>
    </div>
  )
}
export default ButtonExample