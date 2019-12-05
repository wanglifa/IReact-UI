import * as React from 'react'
import Form, {FormValue} from './form'
import {Fragment, useState} from "react";
import Validator from "./validator";

const FormExample:React.FunctionComponent = () => {
  const [formData, setFormData] = useState<FormValue>({
    username: 'lifa',
    password: ''
  })
  const [fields] = useState([
    { name: 'username', label: '用户名', input: { type: 'text'} },
    { name: 'password', label: '密码', input: { type: 'password'} },
  ])
  const onSubmit = () => {
    const rules = [
      {key: 'username', required: true},
      {key: 'username', minLength: 8, maxLength: 16},
      {key: 'username', pattern: /[A-za-z0-9]/}
    ]
    const errors = Validator(formData, rules)
    console.log(errors, 'errors')
  }
  return (
    <div>
      <Form value={formData} fields={fields}
        buttons={
          <Fragment>
            <button type="submit">提交</button>
            <button>返回</button>
          </Fragment>
        }
        onSubmit={onSubmit}
        onChange={(value) => setFormData(value)}
      />
    </div>
  )
}
export default FormExample