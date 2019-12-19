import * as React from "react";
import Input from '../input/input';
import {scopedClassMaker} from '../helpers/classes';
const sc = scopedClassMaker('ireact-cascader')
import './cascader.scss'
import Icon from "../icon/icon";
import {Fragment, useEffect, useState} from "react";
interface cascaderProp {
  value: string;
  label: string;
  children?: Options
}
interface cascaderOptions {
  options: Options;
  onChange?: (val: Array<string>) => void;
  y?: number
}
type Options = Array<cascaderProp>
const Menus: React.FunctionComponent<cascaderOptions> = ({options}) => {
  const [n, setN] = useState<cascaderProp>({ value: '', label: ''})
  useEffect(() => {

  }, [n])
  const onClickList = (item: cascaderProp) => {
    setN(i => item)
  }
  return (
    <Fragment>
      <ul className={sc('menu')}>
        {options.map((menu: cascaderProp) =>
          <li className={sc('menu-item')} key={menu.label} onClick={() => {onClickList(menu)}}>
            {menu.label}
            {menu.children && menu.children.length > 0 ? <Icon name="right" className={sc('menu-item-icon')}/> : null}
          </li>
        )}
      </ul>
      {n.children && n.children.length > 0 ? <Menus options={n.children}/> : null}
    </Fragment>
  )
}
const Cascader: React.FunctionComponent<cascaderOptions> = (props) => {
  const [visible, setVisible] = useState(false)
  const onClick = () => {
    setVisible(!visible)
  }
  return (
    <div className={sc('')}>
      <Input onClick={onClick}/>
      <div className={sc({'menus': true, 'visible': visible})}>
        <Menus options={props.options}/>
      </div>
    </div>
  )
}
export default Cascader;