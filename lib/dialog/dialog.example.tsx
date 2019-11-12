import React, {useState} from 'react';
import Dialog from './dialog';

export default function () {
  const [x, setX] = useState(false);
  return (
    <div>
      <button onClick={() => setX(!x)}>click</button>
      <Dialog visible={x} title="你好啊" onClick={() => setX(!x)}>
        小改改！
      </Dialog>
    </div>
  );
}
