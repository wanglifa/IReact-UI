import * as React from "react";
import {InputHTMLAttributes, ReactElement } from "react";
import {scopedClassMaker} from '../helpers/classes';
const sc = scopedClassMaker('ireact-input')
import './input.scss'
interface Props extends InputHTMLAttributes<HTMLInputElement>{
  beforeIcon?: ReactElement;
  afterIcon?: ReactElement;
}
const Input: React.FunctionComponent<Props> = ({className, beforeIcon, afterIcon, ...rest}) => {
  return (
    <div className={sc({'': true }, {extra: beforeIcon ? 'hasLeftIcon' : ''})}>
      {
        beforeIcon ?
        <div className={sc('leftIcon')}>{beforeIcon}</div>
          : null
      }
      <input className={sc('content', {extra: className})} {...rest} style={{paddingRight: afterIcon ? '30px' : '11px'}}/>
      {
        afterIcon ?
          <div className={sc('rightIcon')}>
            {afterIcon}
          </div>
          : null
      }
    </div>
  )
}
export default Input;