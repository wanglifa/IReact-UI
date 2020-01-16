import * as React from "react";
import { Menu } from "ireact-ui";
const { SubMenu }  = Menu
import { Icon } from "ireact-ui";
const onClick = (val: any) => {
  console.log(val)
}
const MenuExample: React.FunctionComponent = () => {
  return (
    <Menu onClick={onClick} selectedName={"mail"} mode="horizontal">
      <Menu.Item name="mail">
        <Icon name={"left"} />
        Navigation One
      </Menu.Item>
      <Menu.Item name="app" disabled>
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
          <Menu.Item name="setting:1">Option 1</Menu.Item>
          <Menu.Item name="setting:2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Item 2">
          <Menu.Item name="setting:3">Option 3</Menu.Item>
          <Menu.Item name="setting:4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <Menu.Item name="alipay">
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </Menu.Item>
    </Menu>
  )
}
export default MenuExample;