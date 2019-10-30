import React from 'react';
import ReactDom from 'react-dom';
import Icon from './icon'
let fn = (e: React.MouseEvent) => {
    console.log((e.target as HTMLDivElement).style)
}
ReactDom.render(
    <div>
       <Icon name="qq" onClick={fn}/>
    </div>
    , document.querySelector('#root'));