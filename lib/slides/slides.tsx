import * as React from "react";
import {scopedClassMaker} from '../helpers/classes';
import './slides.scss'
import {Fragment, ReactElement, useEffect, useRef, useState} from "react";
const scopedClass = scopedClassMaker('ireact-slides')
const sc = scopedClass
interface Props extends React.HTMLAttributes<ReactElement>{
  width: number;
  children: Array<ReactElement>;
  duration?: number;
}
interface cloneParams extends React.HTMLAttributes<ReactElement>{

}
const Slides: React.FunctionComponent<Props> = (props) => {
  let [current, setCurrent] = useState(0)
  let timer: number = 0
  const wrapperRef = useRef<HTMLDivElement>(null)
  const childrenLength = props.children.length
  const cloneElement = (child: ReactElement, cloneParams: cloneParams): ReactElement => {
    return React.cloneElement(child, cloneParams)
  }
  const gotToSlide = (index: number): void => {
    if(index < 0) {
      index = childrenLength - 1
    } else if (index > childrenLength - 1) {
      index = 0
    }
    if (current === 0 && index === childrenLength - 1) {
      console.log('从最后一张到第一张')
      wrapperRef.current!.addEventListener('transitionend', () => {
        wrapperRef.current!.hidden = true
        wrapperRef.current!.hidden = false
      }, { once: true })
    } else if (current === childrenLength - 1 && index === 0) {
      console.log('从第一张到最后一张')
      wrapperRef.current!.addEventListener('transitionend', () => {
        wrapperRef.current!.classList.add('ireact-hidden')
        wrapperRef.current!.classList.remove('ireact-hidden')
      }, { once: true })
    }
    setCurrent(n => index)
  }
  const wrapperWidth = (props.children.length + 2) * props.width
  const makeFakeSlides = () => {
    const currentDom: HTMLElement = wrapperRef.current!
    const first = currentDom.children[0].cloneNode(true)
    const last = wrapperRef.current!.children[currentDom.children.length - 1].cloneNode(true)
    currentDom.append(first)
    currentDom.prepend(last)
    wrapperRef.current!.style.transform = `translateX(${-props.width}px)`
  }
  const initTimer = () => {
    timer = window.setTimeout(() => {
      gotToSlide(current + 1)
    }, props.duration)
  }
  const onMouseEnter = () => {
    window.clearTimeout(timer)
  }
  const onMouseLeave = () => {
    initTimer()
  }
  const onClickDot = (index: number): void => {
    setCurrent(n => index)
  }
  useEffect(() => {
    makeFakeSlides()
  }, [])
  useEffect(() => {
    initTimer()
  }, [current])
  return (
    <div className={sc('')} style={{width: `${props.width}px`}} onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={sc('window')}>
        <div className={sc('wrapper')} style={{ width: `${wrapperWidth}px`,
          transform: `translateX(${-(current * (props.width) + props.width)}px)`}}
          ref={wrapperRef}
        >
          {props.children.map((node: ReactElement, index: number) =>
            <Fragment key={index}>
              {cloneElement(node, {style: { width: `${props.width}px`}})}
            </Fragment>
          )}
        </div>
        <div className={sc('btn-wrapper')}>
          {props.children.map((node, index1) =>
            <span className={sc({'dot': true, 'active': current === index1})} key={index1}
              onClick={() => {onClickDot(index1)}}
            ></span>
          )}
        </div>
      </div>
    </div>
  )
}
Slides.defaultProps = {
  duration: 3000
}
export default Slides;