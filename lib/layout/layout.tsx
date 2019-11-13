import React from 'react'
import './layout.scss'
import {scopedClassMaker} from '../classes';
import classNames from '../helpers/classes'
const sc = scopedClassMaker('ireact-layout')
interface Props extends React.HTMLAttributes<HTMLElement>{

}
const Layout: React.FunctionComponent<Props> = (props) => {
  const {className, ...rest} = props
  return (
    <div className={classNames(sc(), className)} {...rest}>
      {props.children}
    </div>
  )
}

export default Layout