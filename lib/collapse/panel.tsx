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
  disabled?: boolean;
}
const Panel: React.FunctionComponent<PanelProp> = (props) => {
  const onClick = () => {
    if (!props.disabled) {
      props.onClick!(props.name)
    }
  }
  return (
    <div className={sc({'active': props.active!, 'disabled': props.disabled!}, {extra: 'wrapper'})}>
      <div className={sc('header')} onClick={onClick}>
        <Icon name="right" size="mini" className={sc('icon')}/>
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
Panel.defaultProps = {
  disabled: false
}
export default Panel;