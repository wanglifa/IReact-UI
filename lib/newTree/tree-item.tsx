import * as React from "react";
import {ChangeEventHandler, useRef} from "react";
import {useState} from "react";
import Icon from "../icon/icon";
import {scopedClassMaker} from '../helpers/classes';
import useUpdate from "../hooks/useUpdate";
const sc = scopedClassMaker('ireact-new-tree')

interface Props {
  data: SourceDataItem;
  level: number;
  treeProps: TreeProps;
}
interface RecursiveArray<T> extends Array<T | RecursiveArray<T>>{

}
const TreeItem: React.FC<Props> = (props) => {
  const {data, level, treeProps} = props
  const checked = treeProps.multiple ?
    treeProps.selected.indexOf(data.value) >= 0 :
    treeProps.selected === data.value
  const collectChildrenValues = (item: SourceDataItem): any => {
    return flatten(item.children?.map(i => [i.value, collectChildrenValues(i)]))
  }
  const flatten = (arr?: RecursiveArray<string>): string[] => {
    if (!arr) return []
    return arr.reduce<string[]>((result, current) =>
      result.concat(typeof current === 'string' ? current : flatten(current)), [])
  }
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const childrenValues = collectChildrenValues(data)
    console.log(childrenValues, 'aaa')
    if (treeProps.multiple) {
      if (e.target.checked) {
        treeProps.onChange([...treeProps.selected, data.value, ...childrenValues])
      } else {
        treeProps.onChange(treeProps.selected.filter(value => value !== data.value && childrenValues.indexOf(value) === -1))
      }
    } else {
      if (e.target.checked) {
        treeProps.onChange(data.value)
      } else {
        treeProps.onChange('')
      }
    }
  }
  const [expanded, setExpanded] = useState(true)
  const expand = () => {
    setExpanded(true)
  }
  const collapse = () => {
    setExpanded(false)
  }
  const divRef = useRef<HTMLDivElement>(null)
  useUpdate(expanded, () => {
    if (expanded) {
      if (!divRef.current) return;
      divRef.current.style.height = 'auto'
      const {height} = divRef.current.getBoundingClientRect()
      divRef.current.style.height = '0px'
      divRef.current.getBoundingClientRect();
      divRef.current.style.height = height + 'px'
      const afterExpand = () => {
        if (!divRef.current) return;
        divRef.current.style.height = ''
        divRef.current.classList.add('ireact-new-tree-children-present')
        divRef.current.removeEventListener('transitionend', afterExpand)
      }
      divRef.current.addEventListener('transitionend', afterExpand)
    } else {
      if (!divRef.current) return;
      const {height} = divRef.current.getBoundingClientRect()
      divRef.current.style.height = height + 'px'
      divRef.current.getBoundingClientRect()
      divRef.current.style.height = '0px'
      const afterCollapse = () => {
        if (!divRef.current) return;
        divRef.current.style.height = ''
        divRef.current.classList.add('ireact-new-tree-children-gone')
        divRef.current.removeEventListener('transitionend', afterCollapse)
      }
      divRef.current.addEventListener('transitionend', afterCollapse)
    }
  })
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
      <div className={sc({children: true, collapsed: !expanded})} ref={divRef}>
        {data.children?.map(item =>
          <TreeItem treeProps={treeProps} data={item} level={level+1} key={item.value}/>
        )}
      </div>
    </div>
  )
}

export default TreeItem;