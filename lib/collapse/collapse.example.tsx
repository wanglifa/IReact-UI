import * as React from "react";
import Collapse from "./collapse";
import Panel from "./panel";
const text = '太喜欢你们了'
function callback(key: string[]) {
  console.log(key)
}
const CollapseExample: React.FunctionComponent = () => {
  return (
    <div>
      <Collapse activeName={['1']} onChange={callback}>
        <Panel header="我爱美女" name="1">
          {text}
        </Panel>
        <Panel header="我爱美女" name="2">
          {text}
        </Panel>
        <Panel header="我爱美女" name="3">
          {text}
        </Panel>
      </Collapse>
    </div>
  )
}
export default CollapseExample;