import * as React from "react";
import {HTMLAttributes, useEffect, useRef, useState} from "react";
import './scroll.scss'
import scrollbarWidth from "./scrollbar-width";
import {UIEventHandler} from "react";
import {MouseEventHandler} from "react";
import {TouchEventHandler} from "react";
import Icon from "../icon/icon";
interface Prop extends HTMLAttributes<HTMLElement>{
  onPull?: () => void;
}
const Scroll: React.FunctionComponent<Prop> = (props) => {
  const {children, ...rest} = props
  const containerRef = useRef<HTMLDivElement>(null)
  const [barHeight, setBarHeight] = useState(0)
  const [barTop, setBarTop] = useState(0)
  const [translateY, _setTranslateY] = useState(0)
  const setTranslateY = (y:number) => {
    // 最小拖动或者最大拖动的距离限制
    if (y < 0) { y = 0}
    else if (y > 150) {y = 150}
    _setTranslateY(y)
  }
  const [barVisible, setBarVisible] = useState(false)
  const isScrollingRef = useRef(false)
  const startPositionRef = useRef(0) // 每次开始拖动时当前的位置
  const startBarTopRef = useRef(0) // 每次开始拖动的时候滚动条距顶部的位置
  const maxHeightRef = useRef(0)
  const timerIdRef = useRef<number | null>(null)
  const lastYRef = useRef(0)
  const moveCount = useRef(0)
  const pullingRef = useRef(false)
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
  const onTouchStart: TouchEventHandler = (e) => {
    const scrollTop = containerRef.current!.scrollTop
    if (scrollTop !== 0) {return}
    pullingRef.current = true
    moveCount.current = 0
    lastYRef.current = e.touches[0].clientY
  }
  const onTouchMove: TouchEventHandler = (e) => {
    moveCount.current += 1
    const deltaY = e.touches[0].clientY - lastYRef.current
    if (moveCount.current === 1 && deltaY < 0) {
      pullingRef.current = false
      return;
    }
    if(!pullingRef.current) {return}
    setTranslateY(translateY + deltaY)
    lastYRef.current = e.touches[0].clientY // 每次移动过程都把上一次的位置作为开始位置
  }
  const onTouchEnd: TouchEventHandler = (e) => {
    setTranslateY(0) // 鼠标松开回到0的位置
    props.onPull && props.onPull()
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
      <div className="ireact-scroll-inner" style={{right: -scrollbarWidth(),
        transform: `translateY(${translateY}px)`
      }}
        ref={containerRef} onScroll={onScroll}
           onTouchStart={onTouchStart}
           onTouchMove={onTouchMove}
           onTouchEnd={onTouchEnd}
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
      <div className="ireact-scroll-pulling" style={{height: translateY}}>
        {translateY === 150 ?
          <span className={"ireact-scroll-pulling-text"}>释放手指即可更新</span> :
          <Icon name={"pulling"}/>
        }
      </div>
    </div>
  )
}
export default Scroll