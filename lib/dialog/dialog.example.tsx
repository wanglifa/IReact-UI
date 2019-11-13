import React, {useState} from 'react';
import Dialog, {alert, confirm, modal} from './dialog';
import Button from '../button/button'

export default function () {
  const [x, setX] = useState(false);
  const openModal = () => {
    const close = modal(<h1>小改改<Button onClick={() => close()}>关闭</Button></h1>)
  }
  return (
    <div>
      <button onClick={() => setX(!x)}>click</button>
      <Dialog visible={x} title="你好啊" buttons={
        [
          <Button type="primary" size="mini" onClick={() => setX(false)}>ok</Button>,
          <Button size="mini" onClick={() => setX(false)}>cancel</Button>
        ]
      } onClose={() => setX(false)}>
        小改改！
      </Dialog>
      <Button onClick={() => alert('1') }>提示</Button>
      <Button onClick={() => openModal() }>modal</Button>
      <Button onClick={() => confirm('1',() => {console.log('success')}, () => {console.log('fail')}) }>提示</Button>
    </div>
  );
}
