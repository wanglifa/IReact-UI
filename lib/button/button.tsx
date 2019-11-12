import React from 'react';
import './button.scss'
import {scopedClassMaker} from '../classes';
import classNames from '../helpers/classes'
interface Props extends React.HTMLAttributes<HTMLDivElement>{
  type?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  size?: 'mini' | 'small' | 'medium';

}
const scopedClass = scopedClassMaker('ireact-button')
const sc = scopedClass
const Button: React.FunctionComponent<Props> = ({ type, size, children, ...restProps }) => {
  return (
    <div className={classNames(sc(), sc(`${type}`), sc(`${size}`))} {...restProps}>
      {children}
    </div>
  )
}
export default Button;