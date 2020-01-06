import * as React from "react";
import Menu from "./menu";
const {SubMenu}  = Menu
import Icon from "../icon/icon";
const onClick = (val: any) => {
  console.log(val)
}
console.log(Menu)
const MenuExample: React.FunctionComponent = () => {
  return (
    <Menu onClick={onClick} selectedKeys={["mail"]} mode="horizontal">
      <Menu.Item key="mail">
        <Icon name={"left"} />
        Navigation One
      </Menu.Item>
      <Menu.Item key="app" disabled>
        <Icon name={"minus"} />
        Navigation Two
      </Menu.Item>
      <SubMenu
        title={
          <span className="submenu-title-wrapper">
              <Icon name={"add"} />
              Navigation Three - Submenu
            </span>
        }
      >
        <Menu.ItemGroup title="Item 1">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <Menu.Item key="alipay">
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </Menu.Item>
    </Menu>
  )
}
export default MenuExample;