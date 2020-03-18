import * as React from "react";
import NewTree from "./newTree";
const sourceData = [
  {
    text: '焦女士1',
    value: '1',
    children: [
      {text: '焦女士1/1', value: '1.1'},
      {text: '焦女士1/2', value: '1.2'},
    ]
  },
  {
    text: '焦女士2',
    value: '2',
    children: [
      {text: '焦女士2/1', value: '2.1'},
      {text: '焦女士2/2', value: '2.2'},
    ]
  }
]
const NewTreeExample: React.FC = () => {
  return (
    <NewTree sourceData={sourceData}/>
  )
}
export default NewTreeExample;