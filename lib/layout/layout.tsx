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
  const children = props.children as Array<ReactElement>
  const hasAside = children.length
    && children.reduce((result, node) => result || node.type === Aside, false)
  return (
    <div className={classNames(sc(), className, hasAside ? 'hasAside' : '')} {...rest}>
      {props.children}
    </div>
  )
}

export default Layout