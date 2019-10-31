import React from 'react';
import ReactDom from 'react-dom';
import Icon from './icon/icon'
let fn = (e: React.MouseEvent) => {
    console.log(e.target)
}
ReactDom.render(
    <div>
       <Icon name="qq"
             onClick={fn}
             onMouseEnter={() => console.log('mousenter')}
             onMouseLeave={() => console.log('mouseleave')}
       />
    </div>
    , document.querySelector('#root'));