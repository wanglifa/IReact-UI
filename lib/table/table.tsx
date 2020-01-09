import * as React from "react";
import './table.scss'
import {scopedClassMaker} from '../helpers/classes';
import {useEffect, useState} from "react";
const scopedClass = scopedClassMaker('ireact-table')
const sc = scopedClass
interface TableProp {
  columns: Array<ColumnProp>;
  dataSource: any[];
  rowSelection?: boolean;
  onChange?: (val: any) => void;
}
interface ColumnProp {
  title?: string;
  dataIndex?: string;
  key?: string;
}
const Table: React.FunctionComponent<TableProp> = (prop) => {
  const [allSelect, setAllSelect] = useState<string>('0') // 0未选中 1半选 2全选
  const [selectArr, setSelectArr] = useState<boolean[]>([])
  let selectArrIndex: (number | undefined)[] = []
  const onClickSelected = (type: number, val: any, index?: number) => {
    let copySelectArr: boolean[] = JSON.parse(JSON.stringify(selectArr))
    if (type === 1) {
      const _a = allSelect === '2' ? '0' : '2';
      if (_a === '2') {
        copySelectArr = []
        prop.dataSource.map((row: any) => {
          copySelectArr.push(true)
        })
      } else if (_a === '0') {
        copySelectArr = []
        prop.dataSource.map((row: any) => {
          copySelectArr.push(false)
        })
      }
      setAllSelect(_a)
    } else {
      copySelectArr.splice(index!, 1, !selectArr[index!])
    }
    setSelectArr(copySelectArr)
  }
  useEffect(() => {
    const arr: boolean[] = []
    prop.dataSource.map((row: any) => {
      arr.push(false)
    })
    setSelectArr(arr)
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
    prop.onChange!(_b)
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
              prop.columns.map((col: ColumnProp, index: number) =>
                <th key={index}>{col.title}</th>
              )
            }
          </tr>
        </thead>
        <tbody className={sc('tbody')}>
        {prop.dataSource.map((row: any, index: number) =>
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
            {prop.columns.map((col: ColumnProp, index1: number) =>
              <td key={index1}>
                {row[col.dataIndex!]}
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