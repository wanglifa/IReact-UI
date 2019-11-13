import React from 'react'
import {scopedClassMaker} from '../classes';
const sc = scopedClassMaker('ireact-layout')
const Footer: React.FunctionComponent = () => {
  return (
    <div className={sc('footer')}>footer</div>
  )
}

export default Footer