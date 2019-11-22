import React, {Fragment, ReactElement, ReactNode} from 'react';
import ReactDOM from 'react-dom'
import {Icon} from '../index'
import {scopedClassMaker} from '../helpers/classes';
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
      <div className={sc({'': true})}>
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
const modal = (content: ReactNode, buttons?: ReactElement[], title?: string) => {
  const onClose = () => {
    ReactDOM.render(React.cloneElement(component, {visible: false}), div)
    ReactDOM.unmountComponentAtNode(div)
    div.remove()
  }
  const component = <Dialog onClose={onClose} visible={true} title={title}
    buttons={buttons}
  >
    {content}
  </Dialog>
  const div = document.createElement('div')
  ReactDOM.render(component, div)
  return onClose
}
const alert = (content: string) => {
  const onClose = modal(content, [<Button onClick={() => onClose()} type="primary">ok</Button>], '提示')
}
const confirm = (content: string, yes?: () => void, no?: () => void) => {
  const buttons = [
    <Button onClick={() => onYes()} type="primary">ok</Button>,
    <Button onClick={() => onNo()}>cancel</Button>
  ]
  const onClose = modal(content, buttons, '确认')
  const onYes = () => {
    yes && yes()
    onClose()
  }
  const onNo = () => {
    no && no()
    onClose()
  }

}

export {alert, confirm, modal};
export default Dialog