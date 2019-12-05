import * as React from 'react'
import {ReactFragment} from "react";
export interface FormValue {
  [k: string]: any
}
interface Props {
  value: FormValue;
  fields: Array<{ name: string, label: string, input: { type: string }}>;
  buttons: ReactFragment;
  onSubmit: React.FormEventHandler;
  onChange: (value: FormValue) => void;
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
        <div key={f.name}>
          {f.label}
          <input type={f.input.type} value={formData[f.name]}
            onChange={(e) => onInputChange(f.name, e.target.value)}
          />
        </div>
      )}
      <div>
        {props.buttons}
      </div>
    </form>
  )
}
export default Form