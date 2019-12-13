import React from 'react';
import {modal, Button} from 'ireact-ui';

export default function () {
  const openModal = () => {
    const close = modal(<h1>小改改<Button onClick={() => close()}>关闭</Button></h1>)
  }
  return (
    <div>
      <Button onClick={() => openModal() }>modal</Button>
    </div>
  );
}
