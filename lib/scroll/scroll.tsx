import * as React from "react";
import {HTMLAttributes, useEffect, useRef, useState} from "react";
import './scroll.scss'
import scrollbarWidth from "./scrollbar-width";
import {UIEventHandler} from "react";
interface Prop extends HTMLAttributes<HTMLElement>{

}
const Scroll: React.FunctionComponent<Prop> = (props) => {
  const {children, ...rest} = props
  const containerRef = useRef<HTMLDivElement>(null)
  const [barHeight, setBarHeight] = useState(0)
  const [barTop, setBarTop] = useState(0)
  const onScroll: UIEventHandler = (e) => {
    const {current} = containerRef
    const scrollHeight = current!.scrollHeight
    const viewHeight = current!.getBoundingClientRect().height
    const scrollTop = current!.scrollTop
    setBarTop(scrollTop * viewHeight / scrollHeight)
  }
  useEffect(() => {
    const scrollHeight = containerRef.current!.scrollHeight
    const viewHeight = containerRef.current!.getBoundingClientRect().height
    setBarHeight(viewHeight * viewHeight / scrollHeight)
  }, [])
  return (
    <div {...rest} className={"ireact-scroll"}>
      <div className="ireact-scroll-inner" style={{right: -scrollbarWidth()}}
        ref={containerRef} onScroll={onScroll}
      >
        {children}
      </div>
      <div className="ireact-scroll-track">
        <div className="ireact-scroll-bar" style={{height: barHeight, transform: `translateY(${barTop}px)`}}></div>
      </div>
    </div>
  )
}
export default Scroll