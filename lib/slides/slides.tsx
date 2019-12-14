import * as React from "react";
import {scopedClassMaker} from '../helpers/classes';
import {ReactElement, useEffect, useState, Fragment} from "react";
const scopedClass = scopedClassMaker('ireact-slides')
import { CSSTransition } from 'react-transition-group';
const sc = scopedClass
import './slides.scss'
interface Prop {
  children: ReactElement[];
  visible?: boolean;
  duration?: number;
}
interface cloneParams {
  visible: boolean
}
const Slides: React.FunctionComponent<Prop> = (props) => {
  const cloneElement = (child: ReactElement, cloneParams: cloneParams): ReactElement => {
    return React.cloneElement(child, cloneParams)
  }
  let arr: Array<cloneParams> = []
  let index: number = 0
  const run = (): void => {
    index += 1
    if (index > props.children.length - 1) {
      index = 0
    }
    arr = arr.map((item, index1): cloneParams => {
      item.visible = index === index1;
      return item
    })
    setState([...arr])
    timer()
  }
  const timer = (): void => {
    setTimeout(() => {
      run()
    }, props.duration)
  }
  let [state, setState] = useState<Array<cloneParams>>(arr)
  for (let i = 0; i < props.children.length; i++) {
    arr.push({ visible: false })
    cloneElement(props.children[i], {visible: state[index].visible})
  }
  useEffect(() => {
    arr[0].visible = true
    setState([...arr])
    timer()
  },[])
  return (
    <div className={sc('')}>
      <div className={sc('window')}>
        <div className={sc('wrapper')}>
          {
            state.length === props.children.length ?
              props.children.map((node, index) =>
                <Fragment key={index}>
                    <CSSTransition in={state[index].visible} classNames="fade" timeout={200} unmountOnExit>
                      <div className={sc('item')} key={index}>{node}</div>
                    </CSSTransition>
                </Fragment>
              )
              : null
          }
        </div>
      </div>
    </div>
  )
}
Slides.defaultProps = {
  duration: 3000
}
export default Slides;