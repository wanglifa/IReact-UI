import * as React from "react";
import {HTMLAttributes, useEffect, useRef, useState} from "react";
import './scroll.scss'
import scrollbarWidth from "./scrollbar-width";
import {UIEventHandler} from "react";
import {MouseEventHandler} from "react";
interface Prop extends HTMLAttributes<HTMLElement>{

}
const Scroll: React.FunctionComponent<Prop> = (props) => {
  const {children, ...rest} = props
  const containerRef = useRef<HTMLDivElement>(null)
  const [barHeight, setBarHeight] = useState(0)
  const [barTop, setBarTop] = useState(0)
  const [barVisible, setBarVisible] = useState(false)
  const isScrollingRef = useRef(false)
  const startPositionRef = useRef(0) // 每次开始拖动时当前的位置
  const startBarTopRef = useRef(0) // 每次开始拖动的时候滚动条距顶部的位置
  const maxHeightRef = useRef(0)
  const timerIdRef = useRef<number | null>(null)
  const onScroll: UIEventHandler = (e) => {
    setBarVisible(true)
    const {current} = containerRef
    const scrollHeight = current!.scrollHeight
    const viewHeight = current!.getBoundingClientRect().height
    const scrollTop = current!.scrollTop
    setBarTop(scrollTop * viewHeight / scrollHeight)
    if (timerIdRef.current) {
      window.clearTimeout(timerIdRef.current)
    }
    timerIdRef.current = window.setTimeout(() => {
      setBarVisible(false)
    }, 300)
  }
  const onMouseDown: MouseEventHandler = (e) => {
    e.stopPropagation()
    isScrollingRef.current = true
    startPositionRef.current = e.screenY
    startBarTopRef.current = barTop
  }
  const onMouseMove = (e: MouseEvent) => {
    if (isScrollingRef.current) {
      const deltay = e.screenY - startPositionRef.current
      const tranlateY = startBarTopRef.current + deltay
      if (tranlateY < 0) {
        return
      } else if (tranlateY > maxHeightRef.current) {
        return
      }
      setBarTop(tranlateY)
      const scrollHeight = containerRef.current!.scrollHeight
      const viewHeight = containerRef.current!.getBoundingClientRect().height
      containerRef.current!.scrollTop = tranlateY * scrollHeight / viewHeight
    }
  }
  const onMouseUp = (e: MouseEvent) => {
    isScrollingRef.current = false
  }
  const onSelectStart = (e: Event) => {
    if (isScrollingRef.current) { e.preventDefault() }
  }
  useEffect(() => {
    const {current} = containerRef
    const viewHeight = current!.getBoundingClientRect().height
    maxHeightRef.current = viewHeight - barHeight
  }, [barHeight])
  useEffect(() => {
    const scrollHeight = containerRef.current!.scrollHeight
    const viewHeight = containerRef.current!.getBoundingClientRect().height
    setBarHeight(viewHeight * viewHeight / scrollHeight)
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('selectstart', onSelectStart)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('selectstart', onSelectStart)
    }
  }, [])
  return (
    <div {...rest} className={"ireact-scroll"}>
      <div className="ireact-scroll-inner" style={{right: -scrollbarWidth()}}
        ref={containerRef} onScroll={onScroll}
      >
        {children}
      </div>
      {
        barVisible &&
        <div className="ireact-scroll-track">
          <div className="ireact-scroll-bar" style={{height: barHeight, transform: `translateY(${barTop}px)`}}
               onMouseDown={onMouseDown}
          ></div>
        </div>
      }
    </div>
  )
}
export default Scroll