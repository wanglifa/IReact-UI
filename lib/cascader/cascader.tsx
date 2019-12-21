import * as React from "react";
import Input from '../input/input';
import {scopedClassMaker} from '../helpers/classes';
const sc = scopedClassMaker('ireact-cascader')
import './cascader.scss'
import Icon from "../icon/icon";
import {createContext, Fragment, useContext, useEffect, useState} from "react";
interface cascaderProp {
  value: string;
  label: string;
  children?: Options;
  active?: boolean;
}
interface cascaderOptions {
  options: Options | doubleArrOptions;
  onChange?: (val: Array<string>) => void;
  placeholder?: string;
  defaultValue?: string[];
}
type Options = Array<cascaderProp>
type doubleArrOptions = Array<Options>
const C = createContext<any>(null)
const Menus: React.FunctionComponent<cascaderOptions> = ({options}) => {
  const {list, setList, initOptions, onChange, setInputValue, setVisible, defaultValue} = useContext(C)
  const [selectArr, setSelectArr] = useState<Options>([])
  const [isOnchange, setIsOnChange] = useState<boolean>(false)
  let copyList = JSON.parse(JSON.stringify(list))
  const defaultValueArr: doubleArrOptions = []
  const deepList = (arr: Options) => {
    const newArr: Options = []
    const isDisplayCategory: boolean = arr.every((node) => {
      return !defaultValue.includes(node.value)
    })
    if (!isDisplayCategory) {
      arr.map((node) => {
        if (defaultValue.includes(node.value)) {
          newArr.push({...node, active: true})
        } else {
          newArr.push(node)
        }
        node.children && deepList(node.children)
      })
    }
    newArr.length > 0 && defaultValueArr.unshift(newArr)
  }
  const onClickList = (item: cascaderProp, index: number) => {
    let copySelectArr = JSON.parse(JSON.stringify(selectArr))
    let isOnChange: boolean = false
    copyList = index === 0 ? [[...initOptions]] : copyList.slice(0, index + 1)
    copySelectArr = copySelectArr.slice(0, index)
    setSelectArr([...copySelectArr, {...item}])
    if (item.children && item.children.length > 0) {
      copyList.push(item.children)
      isOnChange = false
    } else {
      isOnChange = true
    }
    setList(copyList)
    setIsOnChange(isOnChange)
  }
  const setSelectStatus = () => {
    copyList = copyList.map((arr: Options) => {
      return arr.map((arrItem: cascaderProp) => {
        for (let i = 0; i < selectArr.length; i++) {
          if (selectArr[i].label === arrItem.label && selectArr[i].value === arrItem.value) {
            arrItem.active = true
            break
          } else {
            arrItem.active = false
          }
        }
        return arrItem
      })
    })
    setList(copyList)
  }
  useEffect(() => {
    setSelectStatus()
    if (isOnchange) {
      const arr: Array<string> = selectArr.map((item: cascaderProp): string => item.value)
      const arr1: string = selectArr.map((item: cascaderProp): string => item.label).join('/')
      onChange(arr)
      setInputValue(arr1)
      setVisible(false)
    }
  }, [selectArr])
  useEffect(() => {
    deepList(initOptions)
    setList(defaultValueArr)
  }, [])
  return (
    <Fragment>
      {list.map((node: Options, index: number) =>
        <ul className={sc('menu')} key={index}>
          {node.map((menu: cascaderProp) =>
            <li className={sc({'menu-item': true, 'active': menu.active === true})} key={menu.label} onClick={() => onClickList(menu, index)}>
              {menu.label}
              {menu.children && menu.children.length > 0 ? <Icon name="right" className={sc('menu-item-icon')}/> : null}
            </li>
          )}
        </ul>
      )}
    </Fragment>
  )
}
const Cascader: React.FunctionComponent<cascaderOptions> = (props) => {
  const [visible, setVisible] = useState(false)
  const [list, setList] = useState<doubleArrOptions | any>([])
  const [inputValue, setInputValue] = useState('')
  const initOptions: Options | doubleArrOptions = props.options
  const defaultValue: Array<string> = props.defaultValue!
  const onClick: React.MouseEventHandler = (e) => {
    console.log('风好大好')
    e.stopPropagation()
    setVisible(!visible)
  }
  const onInputChange = () => {
    //
  }
  const onChange = (arr: Array<string>) => {
    props.onChange && props.onChange(arr)
  }
  const onClickMenus: React.MouseEventHandler = (e) => {
    e.stopPropagation()
  }
  useEffect(() => {
    window.addEventListener('click', () => {
      console.log('ducment被点击了')
      setVisible(false)
    }, false)
    if (props.options && props.options.length > 0) {
      (!defaultValue || defaultValue.length === 0) && setList([[...props.options]])
    }
    props.defaultValue && setInputValue(props.defaultValue.join('/'))
  }, [])
  return (
    <C.Provider value={{list, setList, initOptions, onChange, setInputValue, setVisible, defaultValue}}>
      <div className={sc('')}>
        <Input onClick={(e) => onClick(e)} onChange={onInputChange} value={inputValue} readOnly placeholder={props.placeholder}/>
        <div className={sc({'menus': true, 'visible': visible})} onClick={(e) => onClickMenus(e)}>
          <Menus options={list}/>
        </div>
      </div>
    </C.Provider>
  )
}
Cascader.defaultProps = {
  placeholder: '请选择'
}
export default Cascader;