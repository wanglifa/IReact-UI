import * as React from "react";
import {scopedClassMaker} from '../helpers/classes';
import './newTree.scss'
import Icon from "../icon/icon";
import {ChangeEventHandler, useState} from "react";
export interface SourceDataItem {
  text: string;
  value: string;
  children?: SourceDataItem[]
}
type A = { selected: string[], multiple: true, onChange: (selected: string[]) => void}
type B = { selected: string, multiple?: false, onChange: (selected: string) => void}
type Prop = {
  sourceData: SourceDataItem[];
} & (A | B)
const sc = scopedClassMaker('ireact-new-tree')
const NewTree: React.FC<Prop> = (props) => {
  const renderItem = (data: SourceDataItem, level: number = 1) => {
    const checked = props.multiple ?
      props.selected.indexOf(data.value) >= 0 :
      props.selected === data.value
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      if (props.multiple) {
        if (e.target.checked) {
          props.onChange([...props.selected, data.value])
        } else {
          props.onChange(props.selected.filter(value => value !== data.value))
        }
      } else {
        console.log(props.selected, 'cccc')
        props.onChange(data.value)
      }
    }
    const [expanded, setExpanded] = useState(false)
    const expand = () => {
      setExpanded(true)
    }
    const collapse = () => {
      setExpanded(false)
    }
    return (
      <div key={data.value} className={sc('')} style={{paddingLeft: level === 1 ? 0 : '1em'}}>
        <div className={sc('label-wrapper')}>
          {data.children && data.children.length > 0 && (expanded ?
            <Icon name="smallBottom" onClick={collapse}/>
            : <Icon name={"rightArrow"} onClick={expand}/>)}
          <input type="checkbox" checked={checked}
            onChange={onChange}
          />
          {data.text}
        </div>
        <div className={sc({children: true, collapsed: !expanded})}>
          {data.children?.map(item =>
            renderItem(item, level+1)
          )}
        </div>
      </div>
    )
  }
  return (
    <div>
      {props.sourceData?.map(item =>
        renderItem(item)
      )}
    </div>
  )
}
export default NewTree;