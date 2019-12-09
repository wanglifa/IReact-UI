import React from 'react';
import './button.scss'
import {scopedClassMaker} from '../helpers/classes';
import classNames from '../helpers/classes'
interface Props extends React.HTMLAttributes<HTMLButtonElement>{
  type?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  size?: 'mini' | 'small' | 'medium';
  defaultType?: 'submit' | 'button'
}
const scopedClass = scopedClassMaker('ireact-button')
const sc = scopedClass
const Button: React.FunctionComponent<Props> = ({ type, size, children, defaultType, ...restProps }) => {
  return (
    <button className={classNames(sc({'': true}), sc(`${type}`), sc(`${size}`))} {...restProps}
      type={defaultType}
    >
      {children}
    </button>
  )
}
Button.defaultProps = {
  size: 'mini',
  type: 'info'
}
export default Button;