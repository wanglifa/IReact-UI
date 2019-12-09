import * as React from "react";
import {InputHTMLAttributes} from "react";
import {scopedClassMaker} from '../helpers/classes';
const sc = scopedClassMaker('ireact-input')
import './input.scss'
interface Props extends InputHTMLAttributes<HTMLInputElement>{

}
const Input: React.FunctionComponent<Props> = ({className, ...rest}) => {
  return (
    <input className={sc('', {extra: className})} {...rest}/>
  )
}
export default Input;