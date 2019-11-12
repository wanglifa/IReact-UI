import React, {Fragment, ReactElement} from 'react';
import ReactDOM from 'react-dom'
import {Icon} from '../index'
import {scopedClassMaker} from '../classes';
import './dialog.scss'
interface Props {
  visible: boolean;
  title?: string;
  onClose: React.MouseEventHandler;
  buttons: ReactElement[];
  closeOnClickMask?: boolean;
}
const scopedClass = scopedClassMaker('ireact-dialog')
const sc = scopedClass
const Dialog: React.FunctionComponent<Props> = (props) => {
  const x = props.visible ?
    <Fragment>
      <div className={sc('mask')} onClick={(e) => {
        if (props.closeOnClickMask) {
          props.onClose(e)
        }
      }}/>
      <div className={sc()}>
        <div className={sc('close')}>
          <Icon name="close" size="mini" onClick={props.onClose}/>
        </div>
        <header className={sc('header')}>
          {props.title ? props.title : '提示'}
        </header>
        <main className={sc('main')}>
          {props.children}
        </main>
        <footer className={sc('footer')}>
          {props.buttons.map((button, index) => {
            return React.cloneElement(button, {key: index})
          })}
        </footer>
      </div>
    </Fragment>
    :
    null
  return (
    ReactDOM.createPortal(x, document.body)
  )
}
Dialog.defaultProps = {
  closeOnClickMask: false
}
export default Dialog