import * as React from "react";
import './table.scss'
import {scopedClassMaker} from '../helpers/classes';
import {useEffect, useState} from "react";
import Icon from "../icon/icon";
const scopedClass = scopedClassMaker('ireact-table')
const sc = scopedClass
interface TableProp {
  columns: Array<ColumnProp<any>>;
  dataSource: any[];
  rowSelection?: boolean;
  onChange?: (val: any) => void;
}
interface ColumnProp<T> {
  title?: string;
  dataIndex?: string;
  key?: string;
  render?: (text: any, row?: T, index?: number) => React.ReactNode;
  sort?: boolean;
  sorter?: (rowA: any, rowB: any) => any;
  description?: string;
}
const Table: React.FunctionComponent<TableProp> = (prop) => {
  const [allSelect, setAllSelect] = useState<string>('0') // 0未选中 1半选 2全选
  const [selectArr, setSelectArr] = useState<boolean[]>([])
  const [initData, setInitData] = useState<any[]>([])
  let selectArrIndex: (number | undefined)[] = []
  const [sortStatus, setSortStatus] = useState<string>('0') // 0未开启排序 1升序 2降序
  const [isOnChange, setIsOnChange] = useState<boolean>(false)
  const [defaultSortIndex, setDefaultSortIndex] = useState<number>(-1)
  const reveseSelectArr =  (arr: boolean[], status: boolean) => {
    prop.dataSource.map((row: any) => {
      arr.push(status)
    })
  }
  const onClickSelected = (type: number, val: any, index?: number) => {
    setIsOnChange(true)
    let copySelectArr: boolean[] = JSON.parse(JSON.stringify(selectArr))
    if (type === 1) {
      const _a = allSelect === '2' ? '0' : '2';
      if (_a === '2') {
        copySelectArr = []
        reveseSelectArr(copySelectArr, true)
      } else if (_a === '0') {
        copySelectArr = []
        reveseSelectArr(copySelectArr, false)
      }
      setAllSelect(_a)
    } else {
      copySelectArr.splice(index!, 1, !selectArr[index!])
    }
    setSelectArr(copySelectArr)
  }
  const sortTypeJudge = (datasource: any[], key: string | number, type: number) => {
    return datasource = typeof datasource[0][key] === 'number' ? datasource.sort((a: any, b: any) => type === 1 ? a[key] - b[key] : b[key] - a[key]) : datasource.sort((a: any, b: any) => type === 1 ? b[key].localeCompare(a[key], 'zh-Hans-CN', {sensitivity: 'accent'})
      : a[key].localeCompare(b[key], 'zh-Hans-CN', {sensitivity: 'accent'})
    );
  }
  const isOnClickSameSort = (copyDefaultIndex: number, index: number) => {
    let _sort: '0' | '1' | '2' = '0'
    if (index !== copyDefaultIndex) {
      _sort = '1'
    } else {
      _sort = sortStatus === '0' ? '1' : sortStatus === '1' ? '2' : '0'
    }
    return _sort
  }
  const onClickSort = (key: string, index: number) => {
    const copyDefaultIndex = defaultSortIndex
    let _sort = isOnClickSameSort(copyDefaultIndex, index)
    let copyInitData = JSON.parse(JSON.stringify(initData))
    if (_sort === '1') {
      sortTypeJudge(copyInitData, key, 1)
    } else if (_sort === '2') {
      sortTypeJudge(copyInitData, key, 2)
    }
    setInitData(copyInitData)
    setSortStatus(_sort)
    setDefaultSortIndex(index)
  }
  useEffect(() => {
    const arr: boolean[] = []
    reveseSelectArr(arr, false)
    setInitData(prop.dataSource)
    setSelectArr(arr)
    return () => {setIsOnChange(false)}
  }, [])
  useEffect(() => {
    let _a: '0' | '1' | '2' = '0'
    _a = selectArr.every((select: boolean) => select === true) ? '2' : _a = selectArr.every((select: boolean) => select === false) ? '0' : '1';
    selectArrIndex = selectArr.map((item: boolean, index: number) => {
      return item === true ? index : undefined;
    })
    let _b = prop.dataSource.map((data: any, index: number) => {
      return selectArrIndex.includes(index) ? data : undefined;
    }).filter(item => item !== undefined)
    isOnChange && prop.onChange!(_b)
    setAllSelect(_a)
  }, [selectArr])
  return (
    <div className={sc({'': true})}>
      <table>
        <thead className={sc('thead')}>
          <tr>
            {
              prop.rowSelection ?
                <th className={sc('selection-column')}>
                  <span className={sc('header-column')} onClick={() => onClickSelected(1, 'aaa')}>
                    <div>
                      <span className={sc('column-title')}>
                        <div className={sc('selection')}>
                          <label className={sc('checkbox-wrappper')}>
                            <span className={sc({'checkbox': true, 'checkbox-indeterminate': allSelect === '1',
                              'checkbox-checked': allSelect === '2'})}>
                              <input type="checkbox" className={sc('checkbox-input')}/>
                              <span className={sc('checkbox-inner')}></span>
                            </span>
                          </label>
                        </div>
                      </span>
                      <span className={sc('column-sorter')}></span>
                    </div>
                  </span>
                </th>
                : null
            }
            {
              prop.columns.map((col: ColumnProp<any>, index: number) =>
                <th key={index}>
                  <span>{col.title}</span>
                  {
                    col.sort ?
                      <span className={sc('sort-icon')} onClick={() => onClickSort(col.key!, index)}>
                        <Icon name={"sortTop"} style={{fill: defaultSortIndex === index && sortStatus === '1' ? '#34c3ff' : '#bfbfbf'}}/>
                        <Icon name={"sortBottom"} style={{fill: defaultSortIndex === index && sortStatus === '2' ? '#34c3ff' : '#bfbfbf'}}/>
                      </span>
                      : null
                  }
                </th>
              )
            }
          </tr>
        </thead>
        <tbody className={sc('tbody')}>
        {initData.map((row: any, index: number) =>
          <tr key={index}>
            {
              prop.rowSelection ?
                <td className={sc('selection-column')}>
                  <span className={sc('header-column')} onClick={() => onClickSelected(2, row, index)}>
                    <div>
                      <span className={sc('column-title')}>
                        <div className={sc('selection')}>
                          <label className={sc('checkbox-wrappper')}>
                            <span className={sc({'checkbox': true, 'checkbox-checked': selectArr[index] === true})}>
                              <input type="checkbox" className={sc('checkbox-input')}/>
                              <span className={sc('checkbox-inner')}></span>
                            </span>
                          </label>
                        </div>
                      </span>
                    </div>
                  </span>
                </td>
                : null
            }
            {prop.columns.map((col: ColumnProp<any>, index1: number) =>
              <td key={index1}>
                {
                  row[col.dataIndex!] && col.render ?
                    col.render(row[col.dataIndex!], row, index) :
                    !row[col.dataIndex!] && col.render ?
                    col.render!('', row, index) :
                      row[col.dataIndex!]
                }
              </td>
            )}

          </tr>
        )}
        </tbody>
      </table>
    </div>
  )
}
Table.defaultProps = {
  rowSelection: false
}
export default Table;