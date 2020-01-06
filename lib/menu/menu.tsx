import * as React from "react";
import {ReactElement} from "react";
interface menuProp {
  onClick?: (val: any) => void;
  selectedKeys: string[];
  mode?: 'vertical' | 'horizontal';
}
interface ItemProp {
  key: string;
  disabled?: boolean;
}
interface SubMenuProp {
  key?: string;
  title: ReactElement;
}
interface ItemGroupProp {
  key?: string;
  title: string;
}
interface Prop extends React.FunctionComponent<menuProp>{
  Item: React.FunctionComponent<ItemProp>;
  SubMenu: React.FunctionComponent<SubMenuProp>;
  ItemGroup: React.FunctionComponent<ItemGroupProp>;
}
const Menu: Prop = (prop) => {
  return (
    <div>{prop.children}</div>
  )
}
const Item: React.FunctionComponent = (prop) => {
  return (
    <div>{prop.children}</div>
  )
}
const SubMenu: React.FunctionComponent = (prop) => {
  return (
    <div>{prop.children}</div>
  )
}
const ItemGroup: React.FunctionComponent = (prop) => {
  return (
    <div>
      {prop.children}
    </div>
  )
}
Menu.Item = Item
Menu.SubMenu = SubMenu
Menu.ItemGroup = ItemGroup;
export default Menu;