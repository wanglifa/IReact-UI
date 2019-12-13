import React, {useState} from 'react';
import {Dialog, Button} from 'ireact-ui';

export default function () {
  const [x, setX] = useState(false);
  return (
    <div>
      <Button onClick={() => setX(!x)}>click</Button>
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
