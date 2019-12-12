import * as React from "react";
import {scopedClassMaker} from '../helpers/classes';
import './collapse.scss'
import {ReactElement, useState} from "react";
import {PanelProp} from "./panel";
const scopedClass = scopedClassMaker('ireact-collapse')
const sc = scopedClass
interface Props {
  activeName: string[];
  children: Array<ReactElement<PanelProp>>;
  multiple?: boolean;
  onChange: (key: string[]) => void;
}
interface cloneParams {
  active: boolean;
  onClick: (name: string) => void;
}
const Collapse: React.FunctionComponent<Props> = (props) => {
  let [activeName, setActiveName] = useState(props.activeName)
  const onClick = (name: string) => {
    let copyActiveName = JSON.parse(JSON.stringify(activeName))
    if (props.multiple) {
      if (copyActiveName.includes(name)) {
        copyActiveName.splice(copyActiveName.indexOf(name), 1)
      } else {
        copyActiveName.push(name)
      }
    } else if (copyActiveName.includes(name)) {
      copyActiveName = []
    } else {
      copyActiveName = [name]
    }
    setActiveName(copyActiveName)
    props.onChange(copyActiveName)
  }
  const cloneElement = (child: ReactElement, cloneParams: cloneParams): ReactElement => {
    return React.cloneElement(child, cloneParams)
  }
  return (
    <div className={sc('wrapper')}>
      {props.children.map((node) =>
        <div key={node.props.name}>
          {
            activeName.includes(node.props.name) ?
             <div>{cloneElement(node, {active: true, onClick})}</div>
              :
              <div>{cloneElement(node, {active: false, onClick})}</div>
          }
        </div>

      )}
    </div>
  )
}
Collapse.defaultProps = {
  multiple: false
}
export default Collapse;