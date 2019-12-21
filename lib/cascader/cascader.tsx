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
  const defaultValueArr: doubleArrOptions = []
  const deepList = (arr: Options) => {
    const newArr: Options = []
    const a = arr.every((node) => {
      return !defaultValue.includes(node.value)
    })
    if (!a) {
      arr.map((node) => {
        if (defaultValue.includes(node.value)) {
          newArr.push({...node, active: true})
        } else {
          newArr.push(node)
        }
        if (node.children) {
          deepList(node.children)
        }
      })
    }
    if (newArr.length > 0) {
      defaultValueArr.unshift(newArr)
    }
  }
  const onClickList = (item: cascaderProp, index: number) => {
    let copyList = JSON.parse(JSON.stringify(list))
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
    setIsOnChange(isOnChange)
    setList(copyList)
  }
  useEffect(() => {
    console.log(list)
  }, [list])
  useEffect(() => {
    if (isOnchange) {
      const arr: Array<string> = selectArr.map((item: cascaderProp): string => {
        return item.value
      })
      const arr1: string = selectArr.map((item: cascaderProp): string => {
        return item.label
      }).join('/')
      onChange(arr)
      setInputValue(arr1)
      setVisible(false)
    }
  }, [selectArr])
  useEffect(() => {
    deepList(initOptions)
    console.log(defaultValueArr)
    setList(defaultValueArr)
  }, [])
  return (
    <Fragment>
      {list.map((node: Options, index: number) =>
        <ul className={sc('menu')} key={index}>
          {node.map((menu: cascaderProp) =>
            <li className={sc({'menu-item': true, 'active': menu.active === true})} key={menu.label} onClick={() => {onClickList(menu, index)}}>
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
  const onClick = () => {
    setVisible(!visible)
  }
  const onInputChange = () => {
    //
  }
  const onChange = (arr: Array<string>) => {
    props.onChange && props.onChange(arr)
  }
  useEffect(() => {
    if (props.options && props.options.length > 0) {
      if (!defaultValue || defaultValue.length === 0) {
        setList([[...props.options]])
      }
    }
    props.defaultValue && setInputValue(props.defaultValue.join('/'))
  }, [])
  return (
    <C.Provider value={{list, setList, initOptions, onChange, setInputValue, setVisible, defaultValue}}>
      <div className={sc('')}>
        <Input onClick={onClick} onChange={onInputChange} value={inputValue} readOnly placeholder={props.placeholder}/>
        <div className={sc({'menus': true, 'visible': visible})}>
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