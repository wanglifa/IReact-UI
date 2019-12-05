import * as React from 'react'
import Form from './form'
import {useState} from "react";

const FormExample:React.FunctionComponent = () => {
  const [formData] = useState({
    username: '',
    password: ''
  })
  const [fields] = useState([
    { name: 'username', label: '用户名', input: { type: 'text'} },
    { name: 'password', label: '密码', input: { type: 'password'} },
  ])
  return (
    <div>
      <Form value={formData} fields={fields}></Form>
    </div>
  )
}
export default FormExample