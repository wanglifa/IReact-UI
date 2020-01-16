import * as React from "react";
import { DatePicker } from "ireact-ui";
const onChange = (date: string) => {
  console.log(date)
}
const DatePickerExample: React.FunctionComponent = () => {
  return (
    <DatePicker onChange={onChange}/>
  )
}
export default DatePickerExample;