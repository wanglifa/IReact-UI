import React, {ReactElement} from 'react';
import './layout.scss'
import {scopedClassMaker} from '../classes';
import classNames from '../helpers/classes'
import Aside from './aside';
const sc = scopedClassMaker('ireact-layout')
interface Props extends React.HTMLAttributes<HTMLElement>{

}
const Layout: React.FunctionComponent<Props> = (props) => {
  const {className, ...rest} = props
  let hasAside = false
  if ((props.children as Array<ReactElement>).length) {
    (props.children as Array<ReactElement>).map(node => {
      if (node.type === Aside) {
        hasAside = true
      }
    })
  }
  return (
    <div className={classNames(sc(), className, hasAside ? 'hasAside' : '')} {...rest}>
      {props.children}
    </div>
  )
}

export default Layout