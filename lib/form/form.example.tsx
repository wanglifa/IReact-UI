import * as React from 'react'
import Form, {FormValue} from './form'
import {Fragment, useState} from "react";
import Validator from "./validator";
import Button from "../button/button";

const FormExample:React.FunctionComponent = () => {
  const [formData, setFormData] = useState<FormValue>({
    username: 'lifa',
    password: ''
  })
  const [fields] = useState([
    { name: 'username', label: '用户名', input: { type: 'text'} },
    { name: 'password', label: '密码', input: { type: 'password'} },
  ])
  const [errors, setErrors] = useState({})
  const onSubmit = () => {
    console.log('aaa')
    const rules = [
      {key: 'username', required: true},
      {key: 'username', minLength: 8, maxLength: 16},
      {key: 'username', pattern: /[A-za-z0-9]/}
    ]
    const errors = Validator(formData, rules)
    setErrors(errors)
  }
  return (
    <div>
      <Form value={formData} fields={fields}
        buttons={
          <Fragment>
            <Button defaultType="submit" type="primary">提交</Button>
            <Button>返回</Button>
          </Fragment>
        }
        onSubmit={onSubmit}
        onChange={(value) => setFormData(value)}
        errors={errors}
      />
    </div>
  )
}
export default FormExample