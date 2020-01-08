import * as React from "react";
import Menu from "../menu";
const {SubMenu}  = Menu
import Icon from "../../icon/icon";
const onClick = (val: any) => {
  console.log(val)
}
const MenuExample: React.FunctionComponent = () => {
  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      selectedName={'1'}
      defaultOpenKeys={['sub1']}
      mode="inline"
    >
      <SubMenu
        name="sub1"
        title={
          <span>
              <Icon name="minus" />
              <span>Navigation One</span>
            </span>
        }
      >
        <Menu.ItemGroup name="g1" title="Item 1">
          <Menu.Item name="1">Option 1</Menu.Item>
          <Menu.Item name="2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup name="g2" title="Item 2">
          <Menu.Item name="3">Option 3</Menu.Item>
          <Menu.Item name="4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu
        name="sub2"
        title={
          <span>
              <Icon name="calendar" />
              <span>Navigation Two</span>
            </span>
        }
      >
        <Menu.Item name="5">Option 5</Menu.Item>
        <Menu.Item name="6">Option 6</Menu.Item>
      </SubMenu>
      <SubMenu
        name="sub4"
        title={
          <span>
              <Icon name="code" />
              <span>Navigation Three</span>
            </span>
        }
      >
        <Menu.Item name="9">Option 9</Menu.Item>
        <Menu.Item name="10">Option 10</Menu.Item>
        <Menu.Item name="11">Option 11</Menu.Item>
        <Menu.Item name="12">Option 12</Menu.Item>
      </SubMenu>
    </Menu>
  )
}
export default MenuExample;