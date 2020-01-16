import * as React from "react";
import './table.scss'
import {scopedClassMaker} from '../helpers/classes';
import {Fragment, useEffect, useRef, useState} from "react";
import Icon from "../icon/icon";

const scopedClass = scopedClassMaker('ireact-table')
const sc = scopedClass

interface TableProp {
  columns: Array<ColumnProp<any>>;
  dataSource: any[];
  rowSelection?: boolean;
  onChange?: (val: any) => void;
  bordered?: boolean;
  scroll?: ScrollProp; // 高度或宽度超出显示滚动条
}

interface ScrollProp {
  x?: number;
  y?: number;
}

interface ColumnProp<T> {
  title?: string;
  dataIndex?: string;
  key?: string;
  render?: (text: any, row?: T, index?: number) => React.ReactNode;
  sort?: boolean;
  width?: number;
  fixed?: 'left' | 'right' | string;
}

const Table: React.FunctionComponent<TableProp> = (prop) => {
  const [allSelect, setAllSelect] = useState<string>('0') // 0未选中 1半选 2全选
  const [selectArr, setSelectArr] = useState<boolean[]>([])
  const [initData, setInitData] = useState<any[]>([])
  let selectArrIndex: (number | undefined)[] = []
  const [sortStatus, setSortStatus] = useState<string>('0') // 0未开启排序 1升序 2降序
  const [isOnChange, setIsOnChange] = useState<boolean>(false)
  const [defaultSortIndex, setDefaultSortIndex] = useState<number>(-1)
  const reveseSelectArr = (arr: boolean[], status: boolean) => {
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
  const [visibleExpand, setVisibleExpand] = useState<boolean>(false)
  const [expandLists, setExpandLists] = useState<string[]>([])
  const [isLeftFixed, setIsLeftFixed] = useState<boolean>(false)
  const [isRightFixed, setIsRightFixed] = useState<boolean>(false)
  const scrollDom = useRef<HTMLDivElement | null>(null)
  const tableWrapper = useRef<HTMLDivElement | null>(null)
  const [fixedLeftStatus, setFixedLeftStatus] = useState<boolean>(false)
  const [fixedRightStatus, setFixedRightStatus] = useState<boolean>(true)
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
  const onClickExpand = (key: string) => {
    const copyExpandLists: string[] = JSON.parse(JSON.stringify(expandLists))
    if (copyExpandLists.includes(key)) {
      copyExpandLists.splice(copyExpandLists.indexOf(key))
    } else {
      copyExpandLists.push(key)
    }
    setExpandLists(copyExpandLists)
  }
  const getTableWidth = () => {
    return tableWrapper.current!.getBoundingClientRect().width
  }
  const getVisibleExpand = () => {
    for (let i = 0; i < prop.dataSource.length; i++) {
      if (prop.dataSource[i].description) {
        setVisibleExpand(true)
        break
      }
    }
  }
  const listenerScroll = () => {
    let _fixedLeftStatus: boolean = fixedLeftStatus
    let _fixedRightStatus: boolean = fixedRightStatus
    if (prop.scroll && prop.scroll.x) {
      if (scrollDom.current!.scrollLeft > 0) {
        _fixedLeftStatus = true
      } else {
        _fixedLeftStatus = false
      }
      if (scrollDom.current!.scrollLeft === prop.scroll.x - getTableWidth()) {
        _fixedRightStatus = false
      } else {
        _fixedRightStatus = true
      }
    }
    setFixedLeftStatus(_fixedLeftStatus)
    setFixedRightStatus(_fixedRightStatus)
  }
  const getIsLeftOrRightFixed = () => {
    for (let i = 0; i < prop.columns.length; i++) {
      if (prop.columns[i].fixed === 'left') {
        setIsLeftFixed(true)
      } else if (prop.columns[i].fixed === 'right') {
        setIsRightFixed(true)
      }
    }
  }
  useEffect(() => {
    const arr: boolean[] = []
    reveseSelectArr(arr, false)
    getVisibleExpand()
    getIsLeftOrRightFixed()
    setInitData(prop.dataSource)
    setSelectArr(arr)
    scrollDom.current!.addEventListener('scroll', listenerScroll, false)
    return () => {
      setIsOnChange(false)
      scrollDom.current!.removeEventListener('scroll', listenerScroll)
    }
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
    <div className={sc({
      '': true,
      'bordered': prop.bordered!,
      'fixed-header': prop.scroll && prop.scroll.y ? true : false
    })}
         ref={tableWrapper}
    >
      {
        prop.scroll && prop.scroll.y ?
          <div>
            <table>
              <thead></thead>
              <tbody className={sc('thead')}>
              <tr>
                {
                  visibleExpand ?
                    <th className={sc('row-expand-icon-th')}></th>
                    : null
                }
                {
                  prop.rowSelection ?
                    <th className={sc('selection-column')}>
                  <span className={sc('header-column')} onClick={() => onClickSelected(1, 'aaa')}>
                    <div>
                      <span className={sc('column-title')}>
                        <div className={sc('selection')}>
                          <label className={sc('checkbox-wrappper')}>
                            <span className={sc({
                              'checkbox': true, 'checkbox-indeterminate': allSelect === '1',
                              'checkbox-checked': allSelect === '2'
                            })}>
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
                    <th key={index} style={{width: col.width}}>
                      <span>{col.title}</span>
                      {
                        col.sort ?
                          <span className={sc('sort-icon')} onClick={() => onClickSort(col.key!, index)}>
                        <Icon name={"sortTop"}
                              style={{fill: defaultSortIndex === index && sortStatus === '1' ? '#34c3ff' : '#bfbfbf'}}/>
                        <Icon name={"sortBottom"}
                              style={{fill: defaultSortIndex === index && sortStatus === '2' ? '#34c3ff' : '#bfbfbf'}}/>
                      </span>
                          : null
                      }
                    </th>
                  )
                }
              </tr>
              </tbody>
            </table>
          </div> : null
      }
      <div style={{
        maxHeight: prop.scroll && prop.scroll.y ? `${prop.scroll.y}px` : 'auto',
        overflowY: prop.scroll && prop.scroll.y ? 'scroll' : 'unset',
        overflowX: prop.scroll && prop.scroll.x ? `scroll` : 'unset'
      }} ref={scrollDom}>
        <table style={{width: prop.scroll && prop.scroll.x ? `${prop.scroll.x}px` : '100%'}}>
          <thead className={sc('thead')}>
          {prop.scroll && prop.scroll.y ? null
            :
            <tr>
              {
                visibleExpand ?
                  <th className={sc('row-expand-icon-th')}></th>
                  : null
              }
              {
                prop.rowSelection ?
                  <th className={sc('selection-column')}>
                  <span className={sc('header-column')} onClick={() => onClickSelected(1, 'aaa')}>
                    <div>
                      <span className={sc('column-title')}>
                        <div className={sc('selection')}>
                          <label className={sc('checkbox-wrappper')}>
                            <span className={sc({
                              'checkbox': true, 'checkbox-indeterminate': allSelect === '1',
                              'checkbox-checked': allSelect === '2'
                            })}>
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
                        <Icon name={"sortTop"}
                              style={{fill: defaultSortIndex === index && sortStatus === '1' ? '#34c3ff' : '#bfbfbf'}}/>
                        <Icon name={"sortBottom"}
                              style={{fill: defaultSortIndex === index && sortStatus === '2' ? '#34c3ff' : '#bfbfbf'}}/>
                      </span>
                        : null
                    }
                  </th>
                )
              }
            </tr>
          }
          </thead>
          <tbody className={sc('tbody')}>
          {initData.map((row: any, index: number) =>
            <Fragment key={index}>
              <tr>
                {
                  row.description && visibleExpand ?
                    <td className={sc('row-expand-icon-cell')} onClick={() => onClickExpand(row.key)}>
                      <div className={sc({
                        'row-expand-icon': true, 'row-collapsed': expandLists.includes(row.key) === false,
                        'row-expanded': expandLists.includes(row.key) === true
                      })}></div>
                    </td>
                    : !row.description && visibleExpand ?
                    <td className={sc('row-expand-icon-cell')}>
                      <div></div>
                    </td> : null
                }
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
                  <td key={index1} style={{width: col.width}}>
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
              {row.description ?
                <tr className={sc({
                  'expanded-row': true,
                  'default-expanded-row': true, 'expanded-display': expandLists.includes(row.key)
                })}>
                  <td></td>
                  <td colSpan={prop.columns.length}>
                    <p>{row.description}</p>
                  </td>
                </tr>
                : null
              }
            </Fragment>
          )}
          </tbody>
        </table>
      </div>
      {isLeftFixed ?
        <div className={sc({'fixed-left': true, 'active': fixedLeftStatus})}>
          <div className={sc('body-outer')}>
            <div className={sc('body-inner')}>
              <table className={sc('fixed')}>
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
                            <span className={sc({
                              'checkbox': true, 'checkbox-indeterminate': allSelect === '1',
                              'checkbox-checked': allSelect === '2'
                            })}>
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
                  {prop.columns.map((col: ColumnProp<any>, index: number) =>
                    col.fixed === 'left' ?
                      <th className={sc('row-cell-break-word')} key={index} style={{width: `${col.width}px`}}>
                          <span className={sc('header-column')}>
                            <div>
                              <span className={sc('column-title')}>
                                {col.title}
                              </span>
                            </div>
                          </span>
                      </th> : null
                  )}
                </tr>
                </thead>
                <tbody className={sc('tbody')}>
                {prop.dataSource.map((row: any, index: number) =>
                  <tr className={sc('row')} key={index}>
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
                      col.fixed === 'left' ?
                        <td key={index1}>
                          {
                            row[col.dataIndex!] && col.render ?
                              col.render(row[col.dataIndex!], row) :
                              !row[col.dataIndex!] && col.render ?
                                col.render!('', row) :
                                row[col.dataIndex!]
                          }
                        </td>
                        : null
                    )}
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div> : null
      }
      {isRightFixed ?
        <div className={sc({'fixed-right': true, 'active': fixedRightStatus})}>
          <div className={sc('body-outer')}>
            <div className={sc('body-inner')}>
              <table className={sc('fixed')}>
                <thead className={sc('thead')}>
                <tr>
                  {prop.columns.map((col: ColumnProp<any>, index: number) =>
                    col.fixed === 'right' ?
                      <th className={sc('row-cell-break-word')} key={index} style={{width: `${col.width}px`}}>
                          <span className={sc('header-column')}>
                            <div>
                              <span className={sc('column-title')}>
                                {col.title}
                              </span>
                            </div>
                          </span>
                      </th> : null
                  )}
                </tr>
                </thead>
                <tbody className={sc('tbody')}>
                {prop.dataSource.map((row: any, index: number) =>
                  <tr className={sc('row')} key={index}>
                    {prop.columns.map((col: ColumnProp<any>, index1: number) =>
                      col.fixed === 'right' ?
                        <td key={index1}>
                          {
                            row[col.dataIndex!] && col.render ?
                              col.render(row[col.dataIndex!], row) :
                              !row[col.dataIndex!] && col.render ?
                                col.render!('', row) :
                                row[col.dataIndex!]
                          }
                        </td>
                        : null
                    )}
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div> : null
      }
    </div>
  )
}
Table.defaultProps = {
  rowSelection: false,
  bordered: false
}
export default Table;