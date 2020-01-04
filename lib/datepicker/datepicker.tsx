import * as React from "react";
import {scopedClassMaker} from '../helpers/classes';
import Input from "../input/input";
import Icon from "../icon/icon";
import './datepicker.scss'
import {useEffect, useRef, useState} from "react";
import Button from "../button/button";
const sc = scopedClassMaker('ireact-datepicker')
interface Prop {
  onChange?: (date: string) => void;
  placeholder?: string;
  defaultValue?: Date;
}
const DatePicker: React.FunctionComponent<Prop> = (props) => {
  const [date, setDate] = useState<Date>(new Date())
  const [copyDate, setCopyDate] = useState(new Date())
  const [displayDays, setDisplayDays] = useState<Date[]>([])
  const [visible, setVisible] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [yearRange, setYearRange] = useState<number[]>([])
  const [defaultDiplay, setDefaultDisplay] = useState<'day' | 'month' | 'year'>('day')
  const [displayAllYear, setDisplayAllYear] = useState<number[]>([])
  const _displayYearTrNumber: number[] = [1,2,3,4]
  const weeks: string[] = ['一', '二', '三', '四', '五', '六', '日']
  const displayMonths: string[] = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
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
    console.log(2)
    console.log(defaultValue, 'Date')
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
  const isCurrentYear = (everyYear: number) => {
    const {year} = getCompareDate(date)
    return year === everyYear
  }
  const onClickDay = (day: Date) => {
    setDate(n => day)
    setVisible(false)
  }
  const onClickToday = () => {
    setDate(new Date())
  }
  const onClickInput = () => {
    setVisible(true)
  }
  const toggleYearOrMonth = (e: React.MouseEvent<SVGElement>, type: number, time: number) => {
    e.preventDefault();
    (defaultDiplay === 'day' || defaultDiplay === 'month') && setDate(new Date((date as any) - (time*24*60*60*1000) * type));
    defaultDiplay === 'year' && setYearRange(prevRange => [prevRange[0]-(10*type), prevRange[1]-(10*type)])
  }
  const onClickDocument: React.EventHandler<any> = (e) => {
    if (wrapperRef.current === e.target || wrapperRef.current!.contains(e.target as Node)) {
      return
    }
    setVisible(false)
    setDefaultDisplay('day')
  }
  const displayYear = () => {
    const arr = []
    for (let i = yearRange[0]; i <= yearRange[1]; i++) {
      arr.push(i)
    }
    return arr
  }
  const onClickDisplayYearOrMonthOrDay = (displayDate: 'day' | 'month' | 'year') => {
    setDefaultDisplay(displayDate)
  }
  const onClickToggleYear = (year: number): void => {
    setDate(new Date(date.setFullYear(year)))
    setDefaultDisplay('day')
  }
  const displayOrHidden = (date: string, displayAttr: string = 'block'): string => {
    return defaultDiplay === date ? displayAttr : 'none'
  }
  const onClickToggleMonth = (val: number) => {
    setDate(new Date(date.setMonth(val)))
    setDefaultDisplay('day')
  }
  useEffect(() => {
    window.addEventListener('click', onClickDocument, false)
    const currentDate = props.defaultValue || new Date()
    setDate(n => currentDate)
    setCopyDate(date)
    return () => window.removeEventListener('click', onClickDocument)
  }, [])
  useEffect(() => {
    setDisplayDays(visibleDays())
    const yearStart = String(date.getFullYear()).slice(0, 3) + '0'
    const yearEnd = String(date.getFullYear()).slice(0, 3) + '9'
    setYearRange([Number(yearStart), Number(yearEnd)])
  }, [date])
  useEffect(() => {
    setDisplayAllYear(displayYear())
  }, [yearRange])
  return (
    <div className={sc('')} ref={wrapperRef}>
      <Input afterIcon={<Icon name={"calendar"}/>}  value={filterValue(copyDate)}
             onChange={onChange} onClick={onClickInput}/>
      <div className={sc({'panel-wrapper': true, 'active': visible})}>
        <div className={sc({'panel': true})}>
          <div className={sc('panel-header')}>
            <Icon name={"doubleleft"} style={{marginRight: '8px'}} onClick={(e) => toggleYearOrMonth(e, 1, 365)}/>
            <Icon name={"left"} onClick={(e) => toggleYearOrMonth(e, 1, 30)}
                  style={{display: defaultDiplay === 'day' ? 'block' : 'none'}}/>
            <span className={sc('panel-header-title')} style={{display: defaultDiplay === 'day' || defaultDiplay === 'month' ? 'block' : 'none'}}>
              <span onClick={() => onClickDisplayYearOrMonthOrDay('year')}>{date.getFullYear()}年</span>
              <span onClick={() => onClickDisplayYearOrMonthOrDay('month')}
                style={{display: displayOrHidden('day', 'inline-flex')}}
              >{date.getMonth()+1}月</span>
            </span>
            <span className={sc('panel-header-title')} style={{display: displayOrHidden('year')}}>
              <span>{`${yearRange[0]}-${yearRange[1]}`}</span>
            </span>
            <Icon name={"right"} style={{marginRight: '8px', display: displayOrHidden('day')}}
                  onClick={(e) => toggleYearOrMonth(e, -1, 30)}
            />
            <Icon name={"doubleright"} onClick={(e) => toggleYearOrMonth(e, -1, 365)}/>
          </div>
          <div className={sc({'panel-body': true, 'panel-body-day': true})} style={{display: displayOrHidden('day')}}>
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
          <div className={sc({'panel-body': true, 'panel-body-year': true})} style={{display: displayOrHidden('year')}}>
            <table>
              <thead>
              </thead>
              <tbody className={sc('tbody')}>
              {_displayYearTrNumber.map((num: number, index: number) =>
                <tr key={num}>
                  {displayAllYear.slice(index*4, index*4+4).map((year: number) =>
                    <td key={year}>
                      <div className={sc({'currentDay': isCurrentYear(year)})}
                        onClick={() => onClickToggleYear(year)}
                      >{year}</div>
                    </td>
                  )}
                </tr>
              )}
              </tbody>
            </table>
          </div>
          <div className={sc({'panel-body': true, 'panel-body-year': true})} style={{display: displayOrHidden('month')}}>
            <table>
              <thead>
              </thead>
              <tbody className={sc('tbody')}>
              {_displayYearTrNumber.map((num: number, index: number) =>
                <tr key={num}>
                  {displayMonths.slice(index*4, index*4+4).map((month: string, index1: number) =>
                    <td key={month}>
                      <div className={sc({'currentDay': isCurrentYear('')})}
                           onClick={() => onClickToggleMonth(index*4+index1)}
                      >{month}</div>
                    </td>
                  )}
                </tr>
              )}
              </tbody>
            </table>
          </div>
          <div className={sc("footer")} style={{display: displayOrHidden('day')}}>
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