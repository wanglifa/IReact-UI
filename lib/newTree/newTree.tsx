import * as React from "react";
import './newTree.scss'
interface SourceData {
  text: string;
  value: string;
  children?: SourceData[]
}
interface Prop {
  sourceData: SourceData[]
}
const NewTree: React.FC<Prop> = (props) => {
  const DeepTree = (arr: SourceData[]) => {
    return arr.map((item => {
      if (item.children) {
        DeepTree(item.children)
      } else {
        return (
          <div>{item.text}</div>
        )
      }
    })
  }
  return (
    <div>
      {DeepTree(props.sourceData)}
    </div>
  )
}
export default NewTree;