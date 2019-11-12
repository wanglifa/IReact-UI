import React, {useState} from 'react';
import Dialog from './dialog';
import Button from '../button/button'

export default function () {
  const [x, setX] = useState(false);
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
    </div>
  );
}
