import React from 'react'
import {scopedClassMaker} from '../helpers/classes';
const sc = scopedClassMaker('ireact-layout')
const Content: React.FunctionComponent = () => {
  return (
    <div className={sc('content')}>content</div>
  )
}

export default Content