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
  level?: number;
  _visible?: boolean;
  _checked?: boolean;
}
interface Prop extends Context{
  data: Options;
  index?: number;
  treeDefaultExpandAll?: boolean;
  treeDefaultExpandedKeys?: string[];
}
interface Context {
  onChange?: (val: DataProp) => void;
  showCheckBox?: boolean;
}
type Options = Array<DataProp>
const C = createContext<Context>({})
const TreeChildren: React.FunctionComponent<Prop> = (props) => {
  let deepIndex: number = props.index || 0
  const { onChange, showCheckBox } = useContext(C)
  const update = useState<number>(-1)[1]
  const onClick = (node: DataProp) => {
    node._visible = !node._visible
    onChange && onChange(node)
    update(Math.random())
  }
  const onClickCheckBox = (e: React.MouseEvent, node: DataProp) => {
    console.log(node)
    e.preventDefault()
    e.stopPropagation()
    node._checked = !node._checked
    update(Math.random())
  }
  deepIndex += 1
  return (
    <Fragment>
      {props.data.map((node: DataProp, index: number) =>
        <div className={sc('item')} key={node.label}>
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
                  <span className={sc({'checkbox-input': true, 'is-checked': node._checked!})}>
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
                <TreeChildren data={node.children} index={deepIndex}/>
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
  const copyDefaultExpandedKey = JSON.parse(JSON.stringify(props.treeDefaultExpandedKeys)) || []
  copyDefaultExpandedKey.length > 0 && copyDefaultExpandedKey.splice(copyDefaultExpandedKey.length-1, 1)
  const treeDataExchange = (arr: Options) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i]._visible = props.treeDefaultExpandAll
      arr[i]._checked = false
      if (copyDefaultExpandedKey.includes(arr[i].label)) {
        arr[i]._visible = true
      }
      if (arr[i].children && arr[i].children!.length > 0) {
        treeDataExchange(arr[i].children!)
      }
    }
  }
  useEffect(() => {
    treeDataExchange(props.data)
    setNewData(props.data)
  }, [])
  return (
    <C.Provider value={{onChange: props.onChange, showCheckBox: props.showCheckBox}}>
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