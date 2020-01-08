import * as React from "react";
import {createContext, Fragment, ReactElement, useContext, useEffect, useRef, useState} from "react";
import {scopedClassMaker} from '../helpers/classes';
const scopedClass = scopedClassMaker('ireact-menu')
import './menu.scss'
const sc = scopedClass
const C = createContext<any | null>(null)
interface menuProp {
  onClick?: (val: any) => void;
  selectedName: string;
  mode?: 'vertical' | 'horizontal';
  children: Array<ReactElement>;
}
interface ItemProp {
  name: string;
  disabled?: boolean;
  mode1?: 'vertical' | 'horizontal';
}
interface SubMenuProp {
  name?: string;
  title: ReactElement;
  mode1?: 'vertical' | 'horizontal';
  children: Array<ReactElement>;
}
interface ItemGroupProp {
  name?: string;
  title: string;
  mode1?: 'vertical' | 'horizontal';
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
  const cloneElement = (child: ReactElement, cloneParams: cloneParams): ReactElement => {
    return React.cloneElement(child, cloneParams)
  }
  const [selectName, setSelectName] = useState<string>('')
  useEffect(() => {
    setSelectName(prop.selectedName)
  }, [])
  return (
    <C.Provider value={{ selectName, setSelectName, onClick: prop.onClick }}>
      <div className={sc({'': true, 'horizontal': prop.mode === 'horizontal'})}>
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
  const {selectName} = useContext(C)
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
      <div className={sc({'submenu': true, [`submenu-${prop.mode1}`]: true, 'item-selected': SubMenuLists.includes(selectName)})}
        onMouseEnter={() => setNavVisible(true)}
           onMouseLeave={() => setNavVisible(false)}
      >
        {
          prop.title ?
            <div className={sc('submenu-title')} ref={titleRef}>
              {prop.title}
            </div> : null
        }
        <div className={sc('submenu-popup')} style={{display: navVisible ? 'block' : 'none'}}>
          <div className={sc({'': true, 'vertical': true})} style={{minWidth: `${popMinWidth}px`}}>{prop.children}</div>
        </div>
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