import * as React from "react";
import Input from '../input'
import Icon from "../../icon/icon";
const InputExample: React.FunctionComponent = () => {
  return (
    <Input placeholder="请输入" beforeIcon={
      <Icon name="add"/>
    } afterIcon={
      <Icon name={"close"}/>
    } style={{width: '260px'}}/>
  )
}
export default InputExample;