import * as React from "react";
import {scopedClassMaker} from '../helpers/classes';
import {Fragment} from "react";
import Icon from "../icon/icon";
import './tree.scss'
const sc = scopedClassMaker('ireact-tree')
interface DataProp {
  label: string;
  children?: Options;
  level?: number;
}
interface Prop {
  data: Options;
  index?: number;
}
type Options = Array<DataProp>
const TreeChildren: React.FunctionComponent<Prop> = (props) => {
  let deepIndex: number = props.index || 0
  deepIndex += 1
  return (
    <Fragment>
      {props.data.map((node: DataProp) =>
        <div className={sc('item')} key={node.label}>
          <div className={sc('content')} style={{marginLeft: `${(deepIndex-1)*18}px`}}>
            { node.children && node.children.length > 0 ?
              <div className={sc('icon')}>
                <Icon name="smallBottom"/>
              </div> :
              null
            }
            <div className={sc('label')}>{node.label}</div>
          </div>
          <div className={sc('children')}>
            {
              node.children && node.children.length > 0 ?
                <TreeChildren data={node.children} index={deepIndex}/> :
                null
            }
          </div>
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