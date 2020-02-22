import * as React from "react";
import {createContext, useContext, useEffect, useState} from "react";
import './citySelect.scss'
import ReactDOM from 'react-dom'
import Icon from "../icon/icon";
import pinyin from 'tiny-pinyin'
interface Prop {
  dataSource: string[];
  onChange: (p1: string) => void;
}
interface Context {
  lists: {[key: string]: string[]};
  onChange: (p1: string) => void;
}
const CityContext = createContext<Context>({lists: {}, onChange: () => {}})
const CitySelect: React.FunctionComponent<Prop> = (props) => {
  const [dialogVisible, setDialogVisible] = useState(true)
  const lists: Context['lists'] = {}
  props.dataSource.map((city) => {
    const py = pinyin.convertToPinyin(city)
    const index = py[0]
    lists[index] = lists[index] || []
    lists[index].push(city)
  })
  const onClick = () => {
    setDialogVisible(true)
  }
  const onClose = () => {
    setDialogVisible(false)
  }
  return (
    <CityContext.Provider value={{lists, onChange: props.onChange}}>
      <div onClick={onClick}>{props.children}</div>
      {dialogVisible && <Dialog onClose={onClose}/>}
    </CityContext.Provider>
  )
}
const Dialog: React.FC<{onClose: () => void}> = (props) => {
  const {lists, onChange} = useContext(CityContext)
  const indexList = Object.keys(lists).sort()
  const cityList = Object.entries(lists).sort(
    (a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0)
  )
  const onClick = (s: string): void => {
    document.querySelector(`[data-letter="${s}"]`)!.scrollIntoView()
  }
  return ReactDOM.createPortal((
    <div className={"ireact-citySelect-dialog"}>
      <header>
        <Icon name={"left"} onClick={props.onClose}/>
        <span>选择城市</span>
      </header>
      <CurrentLocation/>
      <h2>全部城市</h2>
      <ol className="ireact-citySelect-index">
        {indexList.map(a => <li key={a} onClick={() => onClick(a)}>{a}</li>)}
      </ol>
      <div className="cityList">
        {cityList.map(([letter, list]) =>
          <div key={letter} className={"ireact-citySelect-citySection"}
            data-letter={letter}
          >
            <h4>{letter}</h4>
            {list.map(city =>
              <div className={"ireact-citySelect-cityName"} key={city}
                onClick={() => onChange(city) }
              >{city}</div>
            )}
          </div>
        )}
      </div>
    </div>
  ), document.body)
}
const CurrentLocation: React.FC = () => {
  const [city, setCity] = useState<string>('加载中...')
  useEffect(() => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', 'http://ip-api.com/json/?lang=zh-CN')
    xhr.onload = () => {
      const string = xhr.responseText
      const obj = JSON.parse(string)
      const C = obj.city
      setCity(C)
    }
    xhr.send()
    xhr.onerror = () => {
      setCity('未知')
    }
  }, [])
  return (
    <div className={"currentCity"}>
      {city}
    </div>
  )
}
export default CitySelect;