import React, {Fragment} from 'react';
import {Icon} from '../index'
import {scopedClassMaker} from '../classes';
import './dialog.scss'
import Button from '../button/button'
interface Props {
  visible: boolean;
  title?: string;
  onClick: React.MouseEventHandler
}
const scopedClass = scopedClassMaker('ireact-dialog')
const sc = scopedClass
const Dialog: React.FunctionComponent<Props> = (props) => {
  return (
    props.visible ?
      <Fragment>
        <div className={sc('mask')}/>
        <div className={sc()}>
          <div className={sc('close')}>
            <Icon name="close" size="mini" onClick={() => props.onClick}/>
          </div>
          <header className={sc('header')}>
            {props.title ? props.title : '提示'}
          </header>
          <main className={sc('main')}>
            {props.children}
          </main>
          <footer className={sc('footer')}>
            <Button type="primary" size="mini">ok</Button>
            <Button size="mini">cancel</Button>
          </footer>
        </div>
      </Fragment>
      :
      null
  )
}
export default Dialog