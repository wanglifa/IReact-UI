import * as React from 'react'
import {FormValue, Form, Button, Validator} from 'ireact-ui'
import {Fragment, useState} from "react";

const FormExample:React.FunctionComponent = () => {
  const [formData, setFormData] = useState<FormValue>({
    username: '',
    password: ''
  })
  const userName = ['lifa', 'yitong', 'meinv']
  const checkUserName = (username: string, success: () => void, fail: () => void) => {
    setTimeout(() => {
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
    const rules = [
      {key: 'username', required: true},
      {
        key: 'username',
        validator: {
          name: 'unique',
          validate(username: string): Promise<void> {
            return new Promise((resolve, reject) => {
              checkUserName(username, resolve, reject)
            })
          }
        }
      },
      {key: 'password', minLength: 8, maxLength: 16},
    ]
    Validator(formData, rules, (errors) => {
      setErrors(errors)
    })
    // setErrors(errors)
  }
  const tranformError = (message: string) => {
    const map: {[key: string]: string} = {
      unique: '用户名已存在'
    }
    return map[message]
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
        transformError={tranformError}
        onChange={(value) => setFormData(value)}
        errors={errors}
      />
    </div>
  )
}
export default FormExample