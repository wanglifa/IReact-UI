import * as React from "react";
import {scopedClassMaker} from '../helpers/classes';
const sc = scopedClassMaker('ireact-datepicker')
interface Prop {
  onChange?: (date: string) => void;
  placeholder?: string;
}
const DatePicker: React.FunctionComponent<Prop> = (props) => {
  const getYearMonthDate = (date: Date): number[] => {
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    return [year, month, day]
  }
  return (
    <div className={sc('')}>
      <input type="text" placeholder={props.placeholder} value="2019-2-2"/>
    </div>
  )
}
DatePicker.defaultProps = {
  placeholder: '请选择'
}
export default DatePicker;