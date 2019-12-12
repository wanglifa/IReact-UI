import * as React from "react";
import {scopedClassMaker} from '../helpers/classes';
import Icon from '../icon/icon';
import './collapse.scss'
const scopedClass = scopedClassMaker('ireact-collapse-panel')
const sc = scopedClass
export interface PanelProp {
  header: string;
  name: string;
  active?: boolean;
  onClick?: (name: string) => void;
}
const Panel: React.FunctionComponent<PanelProp> = (props) => {
  const onClick = () => {
    props.onClick!(props.name)
  }
  return (
    <div className={sc({'active': props.active!}, {extra: 'wrapper'})}>
      <div className={sc('header')} onClick={onClick}>
        {props.active ? <Icon name="bottom" size="mini"/> : <Icon name="right" size="mini"/>}
        <div className={sc('header-text')}>
          {props.header}
        </div>
      </div>
      <div className={sc('content')} >
        <p>
          {props.children}
        </p>
      </div>
    </div>
  );
}
export default Panel;