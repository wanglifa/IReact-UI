import React from 'react'
import {scopedClassMaker} from '../helpers/classes';
const sc = scopedClassMaker('ireact-layout')
const Aside: React.FunctionComponent = () => {
  return (
    <div className={sc('aside')}>aside</div>
  )
}

export default Aside