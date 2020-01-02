import * as React from "react";
import DatePicker from "./datepicker";
const onChange = (date: string) => {
  console.log(date)
}
const DatePickerExample: React.FunctionComponent = () => {
  return (
    <DatePicker onChange={onChange} defaultValue={new Date()}/>
  )
}
export default DatePickerExample;