import * as React from "react";
import {HTMLAttributes} from "react";
import './scroll.scss'
interface Prop extends HTMLAttributes<HTMLElement>{

}
const Scroll: React.FunctionComponent<Prop> = (props) => {
  const {children, ...rest} = props
  return (
    <div {...rest} className={"ireact-scroll"}>
      <div className="ireact-scroll-inner">
        {children}
      </div>
    </div>
  )
}
export default Scroll