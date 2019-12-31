import * as React from "react";
import {scopedClassMaker} from '../helpers/classes';
import {createContext, Fragment, useEffect, useState} from "react";
import Icon from "../icon/icon";
import './tree.scss'
import {useContext} from "react";
const sc = scopedClassMaker('ireact-tree')
export interface DataProp {
  label: string;
  children?: Options;
  _level?: number;
  _visible?: boolean;
  _checked?: '1' | '2' | '3'; //1未选中， 2半选，3选中
  _index?: string;
}
interface Prop extends Context{
  data: Options;
  index?: number;
  treeDefaultExpandAll?: boolean;
  treeDefaultExpandedKeys?: string[];
  sIndex?: number;
}
interface Context {
  onChange?: (val: DataProp) => void;
  showCheckBox?: boolean;
  newData?: Options;
  setNewData?: (val: Options) => void;
  updateParent?: (val: number) => void;
}

type Options = Array<DataProp>
const C = createContext<Context>({})
const TreeChildren: React.FunctionComponent<Prop> = (props) => {
  let deepIndex: number = props.index || 0
  const { onChange, showCheckBox, newData, updateParent } = useContext(C)
  let currentIndex: string = ''
  let currentChecked: '1' | '2' | '3' = '1'
  let currentLevel: number = -1
  let child: Options = []
  const update = useState<number>(-1)[1]
  const onClick = (node: DataProp) => {
    node._visible = !node._visible
    onChange && onChange(node)
    update(Math.random())
  }
  const onClickCheckBox = (e: React.MouseEvent, node: DataProp) => {
    e.preventDefault()
    e.stopPropagation()
    if (node._checked === '3') {
      node._checked = '1'
    } else {
      node._checked = '3'
    }
    currentIndex = node._index!
    currentChecked = node._checked!
    currentLevel = node._level!
    deepCheckedLists(node)
    updateParent!(Math.random())
  }
  const deepCheckedLists = (node: DataProp) => {
    node.children && node.children.length > 0 && deepChildrenChecked(node.children)
    const currentDataObj = newData![currentIndex]
    if (currentDataObj.children && currentDataObj.children.length > 0) {
      deepSiblingChecked(currentDataObj.children!)
    }
    deepParentChecked(currentDataObj)
  }
  const deepChildrenChecked = (arr: Options) =>{
    arr.map((node) => {
      node._checked = currentChecked
      if (node.children && node.children.length > 0) {
        deepChildrenChecked(node.children)
      }
    })
  }
  const deepSiblingChecked = (arr: Options) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]._level === currentLevel) {
        child = arr
        break
      } else {
        if (arr[i].children && arr[i].children!.length > 0) {
          deepSiblingChecked(arr[i].children!)
        }
      }
    }
  }
  const deepParentChecked = (obj: DataProp) => {
    if (JSON.stringify(obj.children) === JSON.stringify(child)) {
      const x = child.every((node: DataProp) => {
        return node._checked === '1'
      })
      const y = child.every((node: DataProp) => {
        return node._checked === '3'
      })
      if (x) {
        obj._checked = '1'
      } else if (y) {
        obj._checked = '3'
      } else {
        obj._checked = '2'
      }
    } else {
      const children = obj.children!
      for (let i = 0; i < children!.length; i++) {
        if (children[i].children && children[i].children!.length > 0) {
          deepParentChecked(children[i])
        }
      }
    }
  }
  deepIndex += 1
  return (
    <Fragment>
      {props.data.map((node: DataProp, index: number) =>
        <div className={sc('item')} key={node.label}>
          <div style={{display: 'none'}}>{node._level = deepIndex}</div>
          <div className={sc('content')} style={{marginLeft: `${(deepIndex-1)*18}px`}}
            onClick={() => {onClick(node)}}
          >
            <div className={sc('icon')}>
              {
                node.children && node.children.length > 0 ?
                  <Icon name="rightArrow" className={sc({'active-icon': node._visible!})}/> :
                  null
              }
            </div>
            {
              showCheckBox ?
                <label className={sc('checkbox')}>
                  <span className={sc({'checkbox-input': true, 'is-checked': node._checked! === '3', 'is-indeterminate': node._checked! === '2'})}>
                    <span className={sc('checkbox-inner')} onClick={(e) => onClickCheckBox(e, node)}></span>
                    <input type="checkbox" aria-hidden="false" className={sc('checkbox-original')}/>
                  </span>
                </label>
                : null
            }
            <div className={sc('label')}>{node.label}</div>
          </div>
          {
            node.children && node.children.length > 0 && node._visible ?
              <div className={sc('children')}>
                <TreeChildren data={node.children} index={deepIndex} sIndex={index}/>
              </div>:
              null
          }
        </div>
      )}
    </Fragment>
  )
}
const Tree: React.FunctionComponent<Prop> = (props) => {
  const [newData, setNewData] = useState<Options>([])
  const updateParent = useState<number>(-1)[1]
  const copyDefaultExpandedKey = props.treeDefaultExpandedKeys ? JSON.parse(JSON.stringify(props.treeDefaultExpandedKeys)) : []
  copyDefaultExpandedKey.length > 0 && copyDefaultExpandedKey.splice(copyDefaultExpandedKey.length-1, 1)
  const treeDataExchange = (arr: Options, sIndex?: string | undefined) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i]._visible = props.treeDefaultExpandAll
      arr[i]._checked = '1'
      arr[i]._index = sIndex || String(i)
      if (copyDefaultExpandedKey.includes(arr[i].label)) {
        arr[i]._visible = true
      }
      if (arr[i].children && arr[i].children!.length > 0) {
        treeDataExchange(arr[i].children!, arr[i]._index)
      }
    }
  }
  useEffect(() => {
    treeDataExchange(props.data, undefined)
    setNewData(props.data)
  }, [])
  return (
    <C.Provider value={{onChange: props.onChange, showCheckBox: props.showCheckBox, newData, setNewData, updateParent}}>
      <div className={sc('wrapper')}>
        <TreeChildren data={newData}/>
      </div>
    </C.Provider>
  )
}
Tree.defaultProps = {
  treeDefaultExpandAll: false,
  showCheckBox: false
}
export default Tree;