import * as React from "react";
import {scopedClassMaker} from '../helpers/classes';
import {Fragment, useState} from "react";
import Icon from "../icon/icon";
import './tree.scss'
const sc = scopedClassMaker('ireact-tree')
interface DataProp {
  label: string;
  children?: Options;
  level?: number;
  visible?: boolean;
}
interface Prop {
  data: Options;
  index?: number;
}
type Options = Array<DataProp>
const TreeChildren: React.FunctionComponent<Prop> = (props) => {
  let deepIndex: number = props.index || 0
  const [n, setN] = useState(0)
  const onClick = (node: DataProp) => {
    node.visible = !node.visible
    setN(Math.random())
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
                  <Icon name="smallBottom"/> :
                  null
              }
            </div>
            <div className={sc('label')}>{node.label}</div>
          </div>
          {
            node.children && node.children.length > 0 && node.visible && n ?
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
  return (
    <div className={sc('wrapper')}>
      <TreeChildren data={props.data}/>
    </div>
  )
}
export default Tree;