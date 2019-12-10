import * as React from 'react'
import Form, {FormValue} from './form'
import {Fragment, useState} from "react";
import Validator from "./validator";
import Button from "../button/button";

const FormExample:React.FunctionComponent = () => {
  const [formData, setFormData] = useState<FormValue>({
    username: '',
    password: ''
  })
  const userName = ['lifa', 'yitong', 'meinv']
  const checkUserName = (username: string, success: () => void, fail: () => void) => {
    setTimeout(() => {
      console.log(2)
      if (userName.indexOf(username) >= 0) {
        success()
      } else {
        fail()
      }
    }, 3000)
  }
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
      {
        key: 'username',
        validator: {
          name: 'username',
          validate(username: string): Promise<void> {
            console.log(1)
            return new Promise((resolve, reject) => {
              checkUserName(username, resolve, reject)
            })
          }
        }
      },
      {key: 'username', pattern: /[A-za-z0-9]/},
      {key: 'password', required: true},
      {key: 'password', minLength: 8, maxLength: 16},
    ]
    Validator(formData, rules, (errors) => {
      setErrors(errors)
    })
    // setErrors(errors)
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