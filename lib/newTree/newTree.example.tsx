import * as React from "react";
import NewTree from "./newTree";
import {useState} from "react";
const sourceData = [
  {
    text: '焦女士1',
    value: '1',
    children: [
      {
        text: '焦女士1.1', value: '1.1',
        children: [
          { text: '焦女士1.1.1', value: '1.1.1' , children: [
              {text: '焦女士1.1.1.1', value: '1.1.1.1', children: [
                  {text: '焦女士1.1.1.1.1', value: '1.1.1.1.1'}
                ]}
            ]},
          { text: '焦女士1.1.2', value: '1.1.2' }
        ]
      },
      {text: '焦女士1.2', value: '1.2'},
    ]
  },
  {
    text: '焦女士2',
    value: '2',
    children: [
      {text: '焦女士2.1', value: '2.1'},
      {text: '焦女士2.2', value: '2.2'},
    ]
  }
]

const NewTreeExample: React.FC = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  // const [selectedValue, setSelectValue] = useState('1.1')
  // const [selectValue, setSelectValue] = useState('1.1')
  return (
    <NewTree sourceData={sourceData} onChange={(value: string[]) => setSelectedValues(value)}
             selected={selectedValues} multiple={true}
    />
  )
}
export default NewTreeExample;