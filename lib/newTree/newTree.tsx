import * as React from "react";
import './newTree.scss'
import TreeItem from "./tree-item";


const NewTree: React.FC<TreeProps> = (props) => {
  return (
    <div>
      {props.sourceData?.map(item =>
        <TreeItem treeProps={props} data={item} level={1} key={item.value}
        />
      )}
    </div>
  )
}
export default NewTree;