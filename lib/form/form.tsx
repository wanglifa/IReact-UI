import * as React from 'react'
import './form.scss'
import {ReactFragment} from "react";
import {scopedClassMaker} from '../helpers/classes';
import Input from "../input/input";
const scopedClass = scopedClassMaker('ireact-form')
const sc = scopedClass
export interface FormValue {
  [k: string]: any
}
interface Props {
  value: FormValue;
  fields: Array<{ name: string, label: string, input: { type: string }}>;
  buttons: ReactFragment;
  onSubmit: React.FormEventHandler;
  onChange: (value: FormValue) => void;
  errors: {[k: string]: string[]};
  transformError?: (error: string) => string;
}
const Form:React.FunctionComponent<Props> = (props) => {
  const formData = props.value
  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault()
    props.onSubmit(e)
  }
  const onInputChange = (name: string, value: string) => {
    const newFormData = {...props.value, [name]: value}
    props.onChange(newFormData)
  }
  const transformError = (error: string): string => {
    const map: {[key: string]: string} = {
      required: '必填',
      minLength: '字符长度过短',
      maxLength: '字符长度过长',
      pattern: '格式不正确'
    }
    return props.transformError && props.transformError(error) || map[error]
  }
  return (
    <form onSubmit={onSubmit}>
      <table className={sc('table')}>
        <tbody>
        {props.fields.map(f =>
          <tr key={f.name} className={sc('tr')}>
            <td className={sc('td')}>
              <span className={sc('label')}>
                {f.label}
              </span>
            </td>
            <td className={sc('td')}>
              <Input type={f.input.type} value={formData[f.name]}
                     onChange={(e) => onInputChange(f.name, e.target.value)}
              />
              <div className={sc('error')}>
                {
                  props.errors[f.name] ?
                  transformError!(props.errors[f.name][0]) :
                  <span>&nbsp;</span>
                }
              </div>
            </td>
          </tr>
        )}
        <tr className={sc('tr')}>
          <td className={sc('td')}/>
          <td className={sc('td')}>{props.buttons}</td>
        </tr>
        </tbody>
      </table>
    </form>
  )
}

export default Form