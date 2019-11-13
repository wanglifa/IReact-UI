import React, {Fragment, ReactElement} from 'react';
import ReactDOM from 'react-dom'
import {Icon} from '../index'
import {scopedClassMaker} from '../classes';
import Button from '../button/button'
import './dialog.scss'
interface Props {
  visible: boolean;
  title?: string;
  onClose: React.MouseEventHandler;
  buttons?: ReactElement[];
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
          {props.buttons && props.buttons.map((button, index) => {
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
const alert = (content: string) => {
  const component = <Dialog visible={true} onClose={() => {
    // 关闭的时候重新克隆一个componet组件，并且把克隆的这个visble设置为false，挂载到div上
    ReactDOM.render(React.cloneElement(component, {visible: false}), div)
    // 把div从页面上卸载
    ReactDOM.unmountComponentAtNode(div)
    // 删除div
    div.remove()
  }} title="提示">{content}</Dialog>
  const div = document.createElement('div')
  document.body.append(div)
  ReactDOM.render(component, div)
}
const confirm = (content: string, yes?: () => void, no?: () => void) => {
  const onYes = () => {
    yes && yes()
    ReactDOM.render(React.cloneElement(component, {visible: false}), div)
    ReactDOM.unmountComponentAtNode(div)
    div.remove()
  }
  const onNo = () => {
    no && no()
    ReactDOM.render(React.cloneElement(component, {visible: false}), div)
    ReactDOM.unmountComponentAtNode(div)
    div.remove()
  }
  const component = (
    <Dialog onClose={() => {}} visible={true}
            buttons={
              [
                <Button onClick={onYes}>ok</Button>,
                <Button onClick={onNo}>cancel</Button>
              ]
            }
    >
      {content}
    </Dialog>
  )
  const div = document.createElement('div')
  document.body.append(div)
  ReactDOM.render(component, div)
}
export {alert, confirm};
export default Dialog