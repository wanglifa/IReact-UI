import * as React from "react";
import './newTree.scss'
import TreeItem from "./tree-item";


const NewTree: React.FC<TreeProps> = (props) => {
  const onItemChange = (values: string[] | string) => {
    if (props.multiple) {
      props.onChange(Array.from(new Set(values)) as string[])
    } else {
      props.onChange(values as string)
    }
  }
  return (
    <div>
      {props.sourceData?.map(item =>
        <TreeItem treeProps={props} data={item} level={1} key={item.value} onItemChange={onItemChange}
        />
      )}
    </div>
  )
}
export default NewTree;