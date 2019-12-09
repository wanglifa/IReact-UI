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
      {props.fields.map(f =>
        <div key={f.name} className={sc('item')}>
          <div className={sc('label')}>{f.label}</div>
          <div className={sc('inputMain')}>
            <Input type={f.input.type} value={formData[f.name]}
                   onChange={(e) => onInputChange(f.name, e.target.value)}
            />
            <div className={sc('error')}>
              {props.errors[f.name]}
            </div>
          </div>
        </div>
      )}
      <div>
        {props.buttons}
      </div>
    </form>
  )
}
export default Form