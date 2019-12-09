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
  errors: {[k: string]: string[]}
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
  return (
    <form onSubmit={onSubmit}>
      <table>
        {props.fields.map(f =>
          <tr key={f.name} className={sc('row')}>
            <td>
              <span className={sc('label')}>
                {f.label}
              </span>
            </td>
            <td>
              <Input type={f.input.type} value={formData[f.name]}
                     onChange={(e) => onInputChange(f.name, e.target.value)}
              />
              <div>{props.errors[f.name]}</div>
            </td>
          </tr>
        )}
        <div>
          {props.buttons}
        </div>
      </table>
    </form>
  )
}
export default Form