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
  const DeepTree = (data: SourceData) => {
    return (
      <div key={data.value}>
        <div>{data.text}</div>
        {data.children?.map(item =>
          DeepTree(item)
        )}
      </div>
    )
  }
  return (
    <div>
      {props.sourceData?.map(item =>
        DeepTree(item)
      )}
    </div>
  )
}
export default NewTree;