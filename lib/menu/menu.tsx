import * as React from "react";
import {createContext, Fragment, ReactElement, useContext, useEffect, useRef, useState} from "react";
import {scopedClassMaker} from '../helpers/classes';
const scopedClass = scopedClassMaker('ireact-menu')
import './menu.scss'
import Icon from "../icon/icon";
const sc = scopedClass
const C = createContext<any | null>(null)
interface menuProp extends React.HTMLAttributes<ReactElement>{
  onClick?: (val: any) => void;
  selectedName: string;
  mode?: 'vertical' | 'horizontal' | 'inline';
  children: Array<ReactElement>;
  defaultOpenNames?: string[];
}
interface ItemProp {
  name: string;
  disabled?: boolean;
  mode1?: 'vertical' | 'horizontal' | 'inline';
}
interface SubMenuProp {
  name?: string;
  title: ReactElement | string;
  mode1?: 'vertical' | 'horizontal' | 'inline';
  children: Array<ReactElement>;
}
interface ItemGroupProp {
  name?: string;
  title: string;
  mode1?: 'vertical' | 'horizontal' | 'inline';
  children: Array<ReactElement>;
}
interface cloneParams {
  mode1: string
}
interface Prop extends React.FunctionComponent<menuProp>{
  Item: React.FunctionComponent<ItemProp>;
  SubMenu: React.FunctionComponent<SubMenuProp>;
  ItemGroup: React.FunctionComponent<ItemGroupProp>;
}
const Menu: Prop = (prop) => {
  const [openSubMenu, setOpenSubMenu] = useState<string[]>([])
  const cloneElement = (child: ReactElement, cloneParams: cloneParams): ReactElement => {
    return React.cloneElement(child, cloneParams)
  }
  const [selectName, setSelectName] = useState<string>('')
  useEffect(() => {
    setSelectName(prop.selectedName as string)
    setOpenSubMenu(prop.defaultOpenNames!)
  }, [])
  return (
    <C.Provider value={{ selectName, setSelectName, onClick: prop.onClick, openSubMenu, setOpenSubMenu }}>
      <div className={sc({'': true, [`${prop.mode}`]: true, 'root': prop.mode !== 'horizontal'})}
       style={prop.style}
      >
        {prop.children!.map((node: ReactElement, index: number) =>
          <Fragment key={index}>
            {cloneElement(node, {mode1: prop.mode!})}
          </Fragment>
        )}
      </div>
    </C.Provider>
  )
}
const Item: React.FunctionComponent<ItemProp> = (prop) => {
  const {selectName, setSelectName, onClick} = useContext(C)
  const onClickItem = (val: string) => {
    onClick(val)
    setSelectName(val)
  }
  return (
    <Fragment>
      <div className={sc({'item': true, 'item-disabled': prop.disabled ? true : false,
        'item-selected': selectName === prop.name
      })}
        onClick={() => onClickItem(prop.name)}
      >
        {prop.children}
      </div>
    </Fragment>
  )
}
const SubMenu: React.FunctionComponent<SubMenuProp> = (prop) => {
  const [popMinWidth, setPopMinWidth] = useState<number>(0)
  const titleRef = useRef<HTMLDivElement | null>(null)
  const [navVisible, setNavVisible] = useState<boolean>(false)
  const {selectName, openSubMenu, setOpenSubMenu} = useContext(C)
  const [SubMenuLists, setSubMenuLists] = useState<string[]>([])
  const arr: string[] = []
  const deepGetItemList = (obj: any) => {
    if (typeof obj.children === 'string') {
      arr.push(obj.name)
    } else {
      obj.children.map((node: ReactElement) => {
        deepGetItemList(node.props)
      })
    }
  }
  const onClickSubMenu = (name: string, mode: string) => {
    if (mode !== 'horizontal') {
      let copyOpenSubMenu = JSON.parse(JSON.stringify(openSubMenu))
      if (copyOpenSubMenu.includes(name)) {
        copyOpenSubMenu.splice(copyOpenSubMenu.indexOf(name), 1)
      } else {
        copyOpenSubMenu.push(name)
      }
      setOpenSubMenu(copyOpenSubMenu)
    } else {
      return
    }
  }
  useEffect(() => {
    deepGetItemList(prop)
    setSubMenuLists(arr)
    const { width } = titleRef.current!.getBoundingClientRect()
    setPopMinWidth(width)
  }, [])
  useEffect(() => {
    SubMenuLists.includes(selectName) ? setNavVisible(false) : null
  }, [selectName])
  return (
    <Fragment>
      <div className={sc({'submenu': true, [`submenu-${prop.mode1}`]: true, 'submenu-selected': SubMenuLists.includes(selectName)})}
        onMouseEnter={() => setNavVisible(true)}
           onMouseLeave={() => setNavVisible(false)}
      >
        {
          prop.title ?
            <div className={sc('submenu-title')} ref={titleRef} onClick={() => onClickSubMenu(prop.name!, prop.mode1!)}>
              {prop.title}
              {prop.mode1 === 'inline' ? <Icon name={openSubMenu.includes(prop.name) ? 'toparrow' : 'bottom'} className={sc('inline-icon')}/> : null}
            </div> : null
        }
        {
          prop.mode1 === 'horizontal' ?
            <div className={sc('submenu-popup')} style={{display: navVisible ? 'block' : 'none'}}>
              <div className={sc({'': true, 'vertical': true})} style={{minWidth: `${popMinWidth}px`}}>{prop.children}</div>
            </div> :
            <div className={sc({'': true, 'sub': true, [`${prop.mode1}`]: true, 'sub-display': openSubMenu.includes(prop.name)})}>{prop.children}</div>
        }
      </div>
    </Fragment>
  )
}
const ItemGroup: React.FunctionComponent<ItemGroupProp> = (prop) => {
  return (
    <div className={sc('item-group')}>
      {
        prop.title ?
          <div className={sc('item-group-title')}>{prop.title}</div>
          : null
      }
      <div className={sc('item-group-list')}>
        {prop.children}
      </div>
    </div>
  )
}
Menu.Item = Item
Menu.SubMenu = SubMenu
Menu.ItemGroup = ItemGroup;
export default Menu;