import * as React from "react";
import {scopedClassMaker} from '../helpers/classes';
import Input from "../input/input";
import Icon from "../icon/icon";
import './datepicker.scss'
import {useEffect, useState} from "react";
import Button from "../button/button";
const sc = scopedClassMaker('ireact-datepicker')
interface Prop {
  onChange?: (date: string) => void;
  placeholder?: string;
  defaultValue?: Date;
}
const DatePicker: React.FunctionComponent<Prop> = (props) => {
  const [date, setDate] = useState<Date>(new Date())
  const [displayDays, setDisplayDays] = useState<Date[]>([])
  const [visible, setVisible] = useState(false)
  const weeks: string[] = ['一', '二', '三', '四', '五', '六', '日']
  const getYearMonthDate = (date: Date): number[] => {
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    return [year, month, day]
  }
  const getCompareDate = (everyDay: Date, date: Date | undefined = undefined) => {
    const [year, month, day] = getYearMonthDate(everyDay)
    const [year1, month1, day1] = date && getYearMonthDate(date) || []
    return {year, month, day, year1, month1, day1}
  }
  const firstDayOfMonth = (date: Date): Date => {
    const {year, month} = getCompareDate(date)
    return new Date(year, month, 1)
  }
  const filterValue = (defaultValue: Date): string => {
    const {year, month, day} = getCompareDate(defaultValue)
    return `${year}-${month+1}-${day}`
  }
  const isCurrentMonth = (day: Date): boolean => {
    const {year, year1, month, month1} = getCompareDate(day, date)
    return year === year1 && month === month1
  }
  const isCurrentDayOrToday = (everyDay: Date, date: Date): boolean => {
    const {year, month, day, year1, month1, day1} = getCompareDate(everyDay, date)
    return year === year1 && month === month1 && day === day1
  }
  const visibleDays = () => {
    const firstDay: any = firstDayOfMonth(date)
    const n: number = firstDay.getDay()
    const arr = []
    const x = firstDay - (n === 0 ? 6 : n-1) * 3600 * 24 * 1000
    for (let i = 0; i < 42; i++) {
      arr.push(new Date(x + i * 3600 * 24 * 1000))
    }
    return arr
  }
  const onChange = () => {
    console.log('aaa')
  }
  const onClickDay = (day: Date) => {
    setDate(n => day)
  }
  const onClickToday = () => {
    setDate(new Date())
  }
  const onClickInput = () => {
    setVisible(true)
  }
  useEffect(() => {
    const currentDate = props.defaultValue || new Date()
    setDate(n => currentDate)
  }, [])
  useEffect(() => {
    setDisplayDays(visibleDays())
  }, [date])
  return (
    <div className={sc('')}>
      <Input afterIcon={<Icon name={"calendar"}/>}  value={filterValue(date)}
             onChange={onChange} onClick={onClickInput}/>
      <div className={sc({'panel-wrapper': true, 'active': visible})}>
        <div className={sc({'panel': true})}>
          <div className={sc('panel-header')}>
            <Icon name={"doubleleft"} style={{marginRight: '8px'}}/>
            <Icon name={"left"}/>
            <span className={sc('panel-header-title')}>{date.getFullYear()}年{date.getMonth()+1}月</span>
            <Icon name={"doubleright"} style={{marginRight: '8px'}}/>
            <Icon name={"right"}/>
          </div>
          <div className={sc('panel-body')}>
            <table>
              <thead>
              <tr className={"row"}>
                {weeks.map((week: string) =>
                  <th className={sc('column-header')} key={week}>
                    <span className={sc('column-header-inner')}>{week}</span>
                  </th>
                )}
              </tr>
              </thead>
              <tbody className={sc('tbody')}>
              {weeks.map((week: string, index: number) =>
                <tr className={sc('row')} key={week}>
                  {displayDays.slice(index*7, index*7 + 7).map((day: Date) =>
                    <td key={day.getDate()} className={sc({'currentMonth': isCurrentMonth(day),
                      'currentDay': isCurrentDayOrToday(day, date), 'isToday': isCurrentDayOrToday(new Date(), day)})} onClick={() => onClickDay(day)}>
                      {day.getDate()}
                    </td>
                  )}
                </tr>
              )}
              </tbody>
            </table>
          </div>
          <div className={sc("footer")}>
            <Button onClick={onClickToday}>今天</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
DatePicker.defaultProps = {
  placeholder: '请选择'
}
export default DatePicker;