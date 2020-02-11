import * as React from 'react'
import { Button } from 'ireact-ui'
import {FormValue} from '../form'
import Form from "../form";
import Validator from '../validator'
import {Fragment, useState} from "react";

const usernames = ['frank', 'jack', 'frankfrank', 'alice', 'bob'];
const checkUserName = (username: string, succeed: () => void, fail: () => void) => {
  setTimeout(() => {
    console.log('我现在知道用户名是否存在');
    if (usernames.indexOf(username) >= 0) {
      fail();
    } else {
      succeed();
    }
  }, 2000);
};
const FormExample:React.FunctionComponent = () => {
  const [formData, setFormData] = useState<FormValue>({
    username: '',
    password: ''
  })
  const [fields] = useState([
    { name: 'username', label: '用户名', input: { type: 'text'} },
    { name: 'password', label: '密码', input: { type: 'password'} },
  ])
  const [errors, setErrors] = useState({})
  const validator = (username: string) => {
    return new Promise<string>((resolve, reject) => {
      checkUserName(username, resolve, () => reject('unique'))
    })
  }
  const onSubmit = () => {
    const rules = [
      {key: 'username', validator},
      {key: 'username', validator},
      {key: 'password', validator},
      {key: 'password', validator}
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