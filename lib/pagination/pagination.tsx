import * as React from "react";
import {useEffect, useState} from "react";
import Icon from "../icon/icon";
import './pagination.scss'
interface Prop {
  defaultCurrent?: number;
  total?: number;
}
const Pagination: React.FC<Prop> = (props) => {
  const [page, setPage] = useState<(JSX.Element | number | string)[]>([])
  const [_what, setWhat] = useState(0)
  // const [pages, setPages] = useState([])
  useEffect(() => {
    setWhat(props.defaultCurrent!)
  }, [])
  useEffect(() => {
    const newPage: (string | number)[] = [1, props.total!, _what, _what-1, _what-2,_what+1,_what+2]
      .sort((a, b) => a - b)
      .filter(num => num > 0)
    const _y: (string | number | JSX.Element)[] = unique(newPage)
    _y.map((item: number, index: number) => {
      if ((_y as number[])[index+1] - (_y as number[])[index] > 1) {
        _y.splice(index+1, 0, '...')
      }
    })
    setPage(_y)
  }, [_what])
  const unique = (pageArr: (number | string)[]) => {
    let hash = {}
    pageArr.map((item: number) =>
      hash[item] = true
    )
    let pages1 = Object.keys(hash)
    return pages1.map(item =>
      Number(item)
    )
  }
  const onClickPage = (num: number) => {
    console.log(num, 'num')
    if (num <= 0 || num > props.total! - 2) {
      return
    }
    setWhat(num)
  }
  return (
    <ul className="ireact-pagination">
      <li>
        <Icon name={"left"} onClick={() => onClickPage(_what - 1)}/>
      </li>
      {page.map((i, index) =>
        <li key={index}>{i}</li>
      )}
      <li>
        <Icon name={"right"} onClick={() => onClickPage(_what + 1)}/>
      </li>
    </ul>
  )
}
export default Pagination