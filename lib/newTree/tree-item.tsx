import * as React from "react";
import {ChangeEventHandler} from "react";
import {useState} from "react";
import Icon from "../icon/icon";
import {scopedClassMaker} from '../helpers/classes';
const sc = scopedClassMaker('ireact-new-tree')

interface Props {
  data: SourceDataItem;
  level: number;
  treeProps: TreeProps;
}
const TreeItem: React.FC<Props> = (props) => {
  const {data, level, treeProps} = props
  const checked = treeProps.multiple ?
    treeProps.selected.indexOf(data.value) >= 0 :
    treeProps.selected === data.value
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (treeProps.multiple) {
      if (e.target.checked) {
        treeProps.onChange([...treeProps.selected, data.value])
      } else {
        treeProps.onChange(treeProps.selected.filter(value => value !== data.value))
      }
    } else {
      console.log(treeProps.selected, 'cccc')
      treeProps.onChange(data.value)
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
          <TreeItem treeProps={treeProps} data={item} level={level+1} key={item.value}/>
        )}
      </div>
    </div>
  )
}

export default TreeItem;