import * as React from 'react';
import Highlight, {defaultProps} from "prism-react-renderer";
import {useState} from "react";
import Button from './lib/button/button'
interface Props {
  code: string
}
const Demo: React.FunctionComponent<Props> = (props) => {
  const [codeVisible, setCodeVisible] = useState(false)
  const code = (<Highlight {...defaultProps} code={props.code} language="jsx">
    {({className, style, tokens, getLineProps, getTokenProps}) => (
      <pre className={className} style={style}>
              {tokens.map((line, i) => (
                <div {...getLineProps({line, key: i})}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({token, key})} />
                  ))}
                </div>
              ))}
            </pre>
    )}
  </Highlight>)
  return (
    <div>
      <div className="example">
        {props.children}
      </div>
      <div>
        <Button onClick={() => setCodeVisible(!codeVisible)} type="primary" size="mini">查看代码</Button>
        {codeVisible && code}
      </div>
    </div>
  )
}
export default Demo