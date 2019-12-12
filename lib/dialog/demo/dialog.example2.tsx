import React from 'react';
import {alert, confirm} from '../dialog';
import Button from '../../button/button'

export default function () {
  return (
    <div>
      <Button onClick={() => alert('1') }>提示</Button>
      <Button onClick={() => confirm('1',() => {console.log('success')}, () => {console.log('fail')}) }>提示</Button>
    </div>
  );
}
